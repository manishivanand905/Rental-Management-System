const crypto = require('node:crypto');
const https = require('node:https');

const getCloudinaryConfig = () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: process.env.CLOUDINARY_FOLDER || 'rental-management/tenants',
});

const ensureCloudinaryConfig = () => {
  const config = getCloudinaryConfig();

  if (!config.cloudName || !config.apiKey || !config.apiSecret) {
    throw new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env.'
    );
  }

  return config;
};

const createSignature = (params, apiSecret) => {
  const serializedParams = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(`${serializedParams}${apiSecret}`).digest('hex');
};

const postCloudinaryForm = (path, params) =>
  new Promise((resolve, reject) => {
    const requestBody = new URLSearchParams(params).toString();

    const request = https.request(
      {
        hostname: 'api.cloudinary.com',
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(requestBody),
        },
      },
      (response) => {
        let responseBody = '';

        response.on('data', (chunk) => {
          responseBody += chunk;
        });

        response.on('end', () => {
          let parsedBody = {};

          try {
            parsedBody = responseBody ? JSON.parse(responseBody) : {};
          } catch (error) {
            reject(new Error('Cloudinary returned an unreadable response.'));
            return;
          }

          if (
            response.statusCode &&
            response.statusCode >= 200 &&
            response.statusCode < 300 &&
            !parsedBody.error
          ) {
            resolve(parsedBody);
            return;
          }

          reject(
            new Error(
              parsedBody.error?.message ||
                `Cloudinary request failed with status ${response.statusCode}.`
            )
          );
        });
      }
    );

    request.on('error', reject);
    request.write(requestBody);
    request.end();
  });

const uploadTenantImage = async (imageData) => {
  const { cloudName, apiKey, apiSecret, folder } = ensureCloudinaryConfig();

  if (!/^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(String(imageData || '').trim())) {
    throw new Error('Please choose a valid image file.');
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signatureParams = {
    folder,
    timestamp,
  };

  const signature = createSignature(signatureParams, apiSecret);
  const response = await postCloudinaryForm(`/v1_1/${cloudName}/image/upload`, {
    file: imageData,
    api_key: apiKey,
    timestamp: String(timestamp),
    signature,
    folder,
  });

  return {
    url: response.secure_url || response.url,
    public_id: response.public_id,
  };
};

const destroyCloudinaryImage = async (publicId) => {
  if (!publicId) {
    return { result: 'skipped' };
  }

  const { cloudName, apiKey, apiSecret } = ensureCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureParams = {
    invalidate: 'true',
    public_id: publicId,
    timestamp,
  };

  const signature = createSignature(signatureParams, apiSecret);
  const response = await postCloudinaryForm(`/v1_1/${cloudName}/image/destroy`, {
    public_id: publicId,
    api_key: apiKey,
    invalidate: 'true',
    timestamp: String(timestamp),
    signature,
  });

  if (!['ok', 'not found'].includes(response.result)) {
    throw new Error('Cloudinary could not delete the tenant image.');
  }

  return response;
};

module.exports = {
  destroyCloudinaryImage,
  uploadTenantImage,
};
