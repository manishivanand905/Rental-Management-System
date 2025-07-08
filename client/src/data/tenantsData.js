export const tenantsData = [
  {
    id: 1,
    roomNo: "3",
    name: "Vivek",
    phoneNo: "1234567890",
    occupation: "student",
    aadharCard: "123456789023",
    rentAmount: 5000,
    startDate: "2025-06-07",
    vacateDate: null,
    status: "Active",
    payments: [
      {
        id: 1,
        month: "June 2025",
        dueDate: "2025-06-06",
        amount: 5000,
        status: "Unpaid",
        paidDate: null,
      },
      {
        id: 2,
        month: "July 2025",
        dueDate: "2025-07-06",
        amount: 5000,
        status: "Paid",
        paidDate: "2025-07-08",
      },
    ],
  },
];

export const roomsData = [
  { roomNo: "1", isOccupied: false },
  { roomNo: "2", isOccupied: false },
  { roomNo: "3", isOccupied: true },
  { roomNo: "4", isOccupied: false },
  { roomNo: "5", isOccupied: false },
  { roomNo: "6", isOccupied: false },
  { roomNo: "7", isOccupied: false },
  { roomNo: "8", isOccupied: false },
  { roomNo: "9", isOccupied: false },
  { roomNo: "10", isOccupied: false },
];
