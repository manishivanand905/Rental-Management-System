import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  FormGrid,
  FormGroup,
  HelperText,
  ImagePreview,
  ImagePreviewCard,
  Input,
  InlineFieldGroup,
  Label,
  MemberCard,
  MemberGrid,
  Modal,
  ModalActions,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Required,
  Select,
} from "./tenantFormStyles";

const emptyMember = { name: "", aadhaarNo: "" };
const memberOptions = Array.from({ length: 11 }, (_, index) => index);

const createInitialState = (tenant) => ({
  roomNo: tenant?.roomNo || "",
  residentType: tenant?.residentType || "Tenant",
  name: tenant?.name || "",
  phoneNo: tenant?.phoneNo || "",
  occupation: tenant?.occupation || "",
  aadharCard: tenant?.aadharCard || "",
  rentAmount: tenant?.rentAmount || "",
  startDate: tenant?.startDate ? String(tenant.startDate).slice(0, 10) : "",
  vacateDate: tenant?.vacateDate ? String(tenant.vacateDate).slice(0, 10) : "",
  status: tenant?.status || "Active",
  profileImage: tenant?.profileImage || {},
  imagePreviewUrl: tenant?.profileImage?.url || "",
  imageData: "",
  removeProfileImage: false,
  members: tenant?.members?.length ? tenant.members.map((member) => ({ ...member })) : [],
});

const TenantForm = ({ tenant, onSave, onCancel }) => {
  const [formData, setFormData] = useState(createInitialState(tenant));
  const memberCountLabel =
    formData.residentType === "Owner"
      ? "Number of additional members"
      : "Number of other members";
  const memberHelperText =
    formData.residentType === "Owner"
      ? "Add family member details if needed."
      : "The main tenant is already entered above. Add only extra members if needed.";

  useEffect(() => {
    setFormData(createInitialState(tenant));
  }, [tenant]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleMemberCountChange = (event) => {
    const nextCount = Number(event.target.value);

    setFormData((current) => ({
      ...current,
      members: Array.from({ length: nextCount }, (_, index) =>
        current.members[index] ? { ...current.members[index] } : { ...emptyMember }
      ),
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((current) => ({
      ...current,
      members: current.members.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const encodedImage = String(reader.result || "");

      setFormData((current) => ({
        ...current,
        imageData: encodedImage,
        imagePreviewUrl: encodedImage,
        removeProfileImage: false,
      }));
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFormData((current) => ({
      ...current,
      imageData: "",
      imagePreviewUrl: "",
      removeProfileImage: Boolean(current.profileImage?.public_id || current.profileImage?.url),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.roomNo || !formData.name || !formData.phoneNo || !formData.rentAmount || !formData.startDate) {
      window.alert("Please fill in the required lease fields.");
      return;
    }

    onSave({
      _id: tenant?._id,
      roomNo: formData.roomNo,
      residentType: formData.residentType,
      name: formData.name,
      phoneNo: formData.phoneNo,
      occupation: formData.occupation,
      aadharCard: formData.aadharCard,
      rentAmount: Number(formData.rentAmount),
      startDate: formData.startDate,
      vacateDate: formData.vacateDate || undefined,
      status: formData.status,
      profileImage: formData.profileImage,
      imageData: formData.imageData || undefined,
      removeProfileImage: formData.removeProfileImage,
      members: formData.members.filter((member) => member.name.trim() || member.aadhaarNo.trim()),
    });
  };

  return (
    <Modal>
      <ModalOverlay onClick={onCancel} />
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{tenant ? "Edit tenant" : "Add tenant"}</ModalTitle>
          <HelperText>
            Rent due dates follow the same day each month.
          </HelperText>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>
                  Room No <Required>*</Required>
                </Label>
                <Input name="roomNo" value={formData.roomNo} onChange={handleChange} placeholder="101" required />
              </FormGroup>

              <FormGroup>
                <Label>
                  {formData.residentType === "Owner" ? "Owner name" : "Tenant name"} <Required>*</Required>
                </Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formData.residentType === "Owner" ? "Owner name" : "Tenant name"}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Phone No <Required>*</Required>
                </Label>
                <Input name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="9876543210" required />
              </FormGroup>

              <FormGroup>
                <Label>Occupation or company</Label>
                <Input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
              </FormGroup>

              <FormGroup>
                <Label>Owner or tenant</Label>
                <Select name="residentType" value={formData.residentType} onChange={handleChange}>
                  <option value="Tenant">Tenant</option>
                  <option value="Owner">Owner</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Aadhaar Card</Label>
                <Input
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleChange}
                  placeholder={formData.residentType === "Owner" ? "Owner Aadhaar" : "Tenant Aadhaar"}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Monthly rent <Required>*</Required>
                </Label>
                <Input type="number" min="0" name="rentAmount" value={formData.rentAmount} onChange={handleChange} placeholder="12500" required />
              </FormGroup>

              <FormGroup>
                <Label>
                  Joining date <Required>*</Required>
                </Label>
                <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Vacate date</Label>
                <Input type="date" name="vacateDate" value={formData.vacateDate} onChange={handleChange} />
              </FormGroup>

              <FormGroup>
                <Label>Tenant image</Label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                <HelperText>The selected image will be uploaded to Cloudinary automatically.</HelperText>
                {formData.imagePreviewUrl ? (
                  <ImagePreviewCard>
                    <ImagePreview src={formData.imagePreviewUrl} alt="Tenant preview" />
                    <Button type="button" $variant="ghost" onClick={handleRemoveImage}>
                      Remove image
                    </Button>
                  </ImagePreviewCard>
                ) : null}
              </FormGroup>
            </FormGrid>

            <HelperText>Members</HelperText>
            <InlineFieldGroup>
              <Label>{memberCountLabel}</Label>
              <Select value={formData.members.length} onChange={handleMemberCountChange}>
                {memberOptions.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Select>
            </InlineFieldGroup>
            <HelperText>{memberHelperText}</HelperText>
            <MemberGrid>
              {formData.members.map((member, index) => (
                <MemberCard key={index}>
                  <Input
                    value={member.name}
                    onChange={(event) => handleMemberChange(index, "name", event.target.value)}
                    placeholder={`Member ${index + 1} name`}
                  />
                  <Input
                    value={member.aadhaarNo}
                    onChange={(event) => handleMemberChange(index, "aadhaarNo", event.target.value)}
                    placeholder={`Member ${index + 1} Aadhaar number`}
                  />
                </MemberCard>
              ))}
            </MemberGrid>
          </form>
        </ModalBody>

        <ModalActions>
          <ButtonGroup>
            <Button type="button" $variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" $variant="primary" onClick={handleSubmit}>
              {tenant ? "Save changes" : "Create tenant"}
            </Button>
          </ButtonGroup>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default TenantForm;
