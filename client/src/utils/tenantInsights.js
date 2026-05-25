import {
  differenceInCalendarDays,
  format,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
} from "date-fns";

const toDate = (value) => {
  if (!value) {
    return null;
  }

  return value instanceof Date ? value : parseISO(String(value));
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatDisplayDate = (value, pattern = "dd MMM yyyy") => {
  const date = toDate(value);
  return date ? format(date, pattern) : "Not set";
};

export const formatPhoneNumber = (phoneNo = "") => {
  const clean = String(phoneNo).replace(/\D/g, "");

  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }

  return phoneNo;
};

export const getTenantPaymentState = (tenant) => {
  const now = startOfDay(new Date());
  const payments = (tenant.payments || [])
    .map((payment) => ({
      ...payment,
      dueDateObject: toDate(payment.dueDate),
    }))
    .filter((payment) => payment.dueDateObject)
    .sort((left, right) => left.dueDateObject - right.dueDateObject);

  const unpaidPayments = payments.filter((payment) => payment.status !== "Paid");
  const nextUnpaidPayment = unpaidPayments.find(
    (payment) => !isBefore(payment.dueDateObject, now)
  );
  const overduePayment = unpaidPayments.find((payment) =>
    isBefore(payment.dueDateObject, now)
  );
  const referencePayment = overduePayment || nextUnpaidPayment || payments[payments.length - 1];

  if (!referencePayment) {
    return {
      tone: "neutral",
      label: "No schedule",
      detail: "Add a lease start date to generate rent milestones.",
      dueDate: null,
      amount: Number(tenant.rentAmount || 0),
    };
  }

  if (referencePayment.status === "Paid" && !nextUnpaidPayment && !overduePayment) {
    return {
      tone: "success",
      label: "Paid ahead",
      detail: `Latest payment cleared on ${formatDisplayDate(referencePayment.paidDate || referencePayment.dueDate)}`,
      dueDate: referencePayment.dueDateObject,
      amount: Number(referencePayment.amount || tenant.rentAmount || 0),
    };
  }

  if (overduePayment) {
    return {
      tone: "danger",
      label: "Overdue",
      detail: `${Math.abs(differenceInCalendarDays(overduePayment.dueDateObject, now))} days late`,
      dueDate: overduePayment.dueDateObject,
      amount: Number(overduePayment.amount || tenant.rentAmount || 0),
    };
  }

  if (nextUnpaidPayment && isToday(nextUnpaidPayment.dueDateObject)) {
    return {
      tone: "warning",
      label: "Due today",
      detail: "Collect rent today",
      dueDate: nextUnpaidPayment.dueDateObject,
      amount: Number(nextUnpaidPayment.amount || tenant.rentAmount || 0),
    };
  }

  if (nextUnpaidPayment) {
    return {
      tone: "info",
      label: "Upcoming",
      detail: `Due in ${differenceInCalendarDays(nextUnpaidPayment.dueDateObject, now)} days`,
      dueDate: nextUnpaidPayment.dueDateObject,
      amount: Number(nextUnpaidPayment.amount || tenant.rentAmount || 0),
    };
  }

  return {
    tone: "success",
    label: "Paid",
    detail: "No unpaid rent detected",
    dueDate: referencePayment.dueDateObject,
    amount: Number(referencePayment.amount || tenant.rentAmount || 0),
  };
};

export const getTenantMonthlyStatus = (tenant) => {
  const now = new Date();
  const currentMonthPayment = (tenant.payments || [])
    .map((payment) => ({
      ...payment,
      dueDateObject: toDate(payment.dueDate),
    }))
    .find((payment) => {
      const dueDate = payment.dueDateObject;

      return (
        dueDate &&
        dueDate.getMonth() === now.getMonth() &&
        dueDate.getFullYear() === now.getFullYear()
      );
    });

  if (!currentMonthPayment) {
    return {
      tone: "info",
      label: "No bill",
      detail: "Current month rent is not generated yet.",
    };
  }

  if (currentMonthPayment.status === "Paid") {
    return {
      tone: "success",
      label: "Paid",
      detail: `${formatDisplayDate(currentMonthPayment.dueDate)} rent cleared`,
    };
  }

  return {
    tone: "danger",
    label: "Unpaid",
    detail: `${formatDisplayDate(currentMonthPayment.dueDate)} rent pending`,
  };
};

export const getDashboardInsights = (tenants) => {
  const activeTenants = tenants.filter((tenant) => tenant.status === "Active");
  const inactiveTenants = tenants.filter((tenant) => tenant.status !== "Active");
  const uniqueRooms = new Set(activeTenants.map((tenant) => tenant.roomNo)).size;

  let monthlyExpected = 0;
  let collectedThisMonth = 0;
  let overdueAmount = 0;
  let dueTodayCount = 0;
  let upcomingCount = 0;

  const spotlight = [];

  activeTenants.forEach((tenant) => {
    monthlyExpected += Number(tenant.rentAmount || 0);
    const paymentState = getTenantPaymentState(tenant);

    if (paymentState.tone === "danger") {
      overdueAmount += paymentState.amount;
    }

    if (paymentState.label === "Due today") {
      dueTodayCount += 1;
    }

    if (paymentState.label === "Upcoming") {
      upcomingCount += 1;
    }

    const currentMonthPaid = (tenant.payments || []).some((payment) => {
      const dueDate = toDate(payment.dueDate);
      const now = new Date();

      return (
        dueDate &&
        payment.status === "Paid" &&
        dueDate.getMonth() === now.getMonth() &&
        dueDate.getFullYear() === now.getFullYear()
      );
    });

    if (currentMonthPaid) {
      collectedThisMonth += Number(tenant.rentAmount || 0);
    }

    spotlight.push({
      id: tenant._id,
      roomNo: tenant.roomNo,
      name: tenant.name,
      amount: paymentState.amount,
      ...paymentState,
    });
  });

  const collectionRate =
    monthlyExpected > 0 ? Math.round((collectedThisMonth / monthlyExpected) * 100) : 0;

  return {
    activeTenants: activeTenants.length,
    inactiveTenants: inactiveTenants.length,
    occupiedRooms: uniqueRooms,
    monthlyExpected,
    collectedThisMonth,
    collectionRate,
    overdueAmount,
    dueTodayCount,
    upcomingCount,
    spotlight: spotlight.sort((left, right) => {
      const priority = { danger: 0, warning: 1, info: 2, success: 3, neutral: 4 };
      return priority[left.tone] - priority[right.tone];
    }),
  };
};
