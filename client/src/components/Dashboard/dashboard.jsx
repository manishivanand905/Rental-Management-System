import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDollarSign,
  faCalendarAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  DashboardContainer,
  DashboardGrid,
  DashboardCard,
  CardIcon,
  CardContent,
  CardTitle,
  CardValue,
  CardSubtitle,
  AdditionalInfoGrid,
  InfoCard,
  InfoCardHeader,
  InfoCardContent,
  InfoRow,
  CollectionBar,
  CollectionProgress,
  OccupancyRate,
  OccupancyNumber,
  OccupancyText,
} from "./dashboardStyles";

const Dashboard = ({ tenants }) => {
  const totalRooms = 10;
  const occupiedRooms = tenants.filter(
    (tenant) => tenant.status === "Active"
  ).length;
  const vacantRooms = totalRooms - occupiedRooms;

  // Calculate current month's rent balance (remaining amount to be collected)
  const getCurrentMonthRentBalance = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let totalExpected = 0;
    let totalCollected = 0;

    tenants.forEach((tenant) => {
      if (tenant.status === "Active") {
        // Find current month payment
        const currentMonthPayment = tenant.payments.find((payment) => {
          const paymentDate = new Date(payment.dueDate);
          return (
            paymentDate.getMonth() === currentMonth &&
            paymentDate.getFullYear() === currentYear
          );
        });

        // Expected amount for this month
        const expectedAmount = currentMonthPayment
          ? currentMonthPayment.amount
          : tenant.rentAmount;

        totalExpected += expectedAmount;

        // Collected amount for this month (only if paid)
        if (currentMonthPayment && currentMonthPayment.status === "Paid") {
          totalCollected += currentMonthPayment.amount;
        }
      }
    });

    return {
      remaining: totalExpected - totalCollected,
      expected: totalExpected,
      collected: totalCollected,
      collectionRate:
        totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0,
    };
  };

  // Calculate expected rent for this month
  const expectedThisMonth = tenants.reduce((total, tenant) => {
    if (tenant.status === "Active") {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const currentMonthPayment = tenant.payments.find((payment) => {
        const paymentDate = new Date(payment.dueDate);
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      });
      return (
        total +
        (currentMonthPayment ? currentMonthPayment.amount : tenant.rentAmount)
      );
    }
    return total;
  }, 0);

  const rentBalance = getCurrentMonthRentBalance();

  const dashboardData = [
    {
      title: "Occupied Rooms",
      value: occupiedRooms,
      icon: faHome,
      color: "success",
    },
    {
      title: "Vacant Rooms",
      value: vacantRooms,
      icon: faHome,
      color: "warning",
    },
    {
      title: "Rent Balance",
      value: `₹${rentBalance.remaining.toLocaleString()}`,
      subtitle: `${rentBalance.collectionRate.toFixed(1)}% collected`,
      icon: faDollarSign,
      color: rentBalance.remaining > 0 ? "error" : "success",
    },
    {
      title: "Expected This Month",
      value: `₹${expectedThisMonth.toLocaleString()}`,
      subtitle: `Total: ₹${rentBalance.expected.toLocaleString()}`,
      icon: faCalendarAlt,
      color: "info",
    },
  ];

  return (
    <DashboardContainer>
      <DashboardGrid>
        {dashboardData.map((item, index) => (
          <DashboardCard key={index} color={item.color} className="fade-in">
            <CardIcon color={item.color}>
              <FontAwesomeIcon icon={item.icon} />
            </CardIcon>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardValue>{item.value}</CardValue>
              {item.subtitle && (
                <CardSubtitle color={item.color}>{item.subtitle}</CardSubtitle>
              )}
            </CardContent>
          </DashboardCard>
        ))}
      </DashboardGrid>

      {/* Additional Info Cards */}
      <AdditionalInfoGrid>
        <InfoCard>
          <InfoCardHeader>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>Collection Summary</span>
          </InfoCardHeader>
          <InfoCardContent>
            <InfoRow>
              <span>Total Expected:</span>
              <strong>₹{rentBalance.expected.toLocaleString()}</strong>
            </InfoRow>
            <InfoRow>
              <span>Total Collected:</span>
              <strong style={{ color: "#48bb78" }}>
                ₹{rentBalance.collected.toLocaleString()}
              </strong>
            </InfoRow>
            <InfoRow>
              <span>Remaining Balance:</span>
              <strong
                style={{
                  color: rentBalance.remaining > 0 ? "#f56565" : "#48bb78",
                }}
              >
                ₹{rentBalance.remaining.toLocaleString()}
              </strong>
            </InfoRow>
            <CollectionBar>
              <CollectionProgress
                width={rentBalance.collectionRate}
                color={
                  rentBalance.collectionRate > 80
                    ? "#48bb78"
                    : rentBalance.collectionRate > 50
                    ? "#ed8936"
                    : "#f56565"
                }
              />
            </CollectionBar>
          </InfoCardContent>
        </InfoCard>

        <InfoCard>
          <InfoCardHeader>
            <FontAwesomeIcon icon={faHome} />
            <span>Occupancy Rate</span>
          </InfoCardHeader>
          <InfoCardContent>
            <OccupancyRate>
              <OccupancyNumber>
                {((occupiedRooms / totalRooms) * 100).toFixed(1)}%
              </OccupancyNumber>
              <OccupancyText>
                {occupiedRooms} of {totalRooms} rooms occupied
              </OccupancyText>
            </OccupancyRate>
          </InfoCardContent>
        </InfoCard>
      </AdditionalInfoGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
