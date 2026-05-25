import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBuildingCircleCheck,
  faCircleExclamation,
  faCoins,
  faWandMagicSparkles,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {
  AlertCard,
  AlertGrid,
  AlertMeta,
  AlertTitle,
  DashboardContainer,
  InsightAccent,
  InsightCard,
  InsightGrid,
  InsightIcon,
  InsightLabel,
  InsightMeta,
  InsightValue,
  SpotlightAmount,
  SpotlightCard,
  SpotlightHeader,
  SpotlightStatus,
  SpotlightSubtitle,
  SpotlightTitle,
  SummaryCard,
  SummaryHeader,
  SummaryMetric,
  SummaryProgress,
  SummaryProgressBar,
  SummaryTimeline,
} from "./dashboardStyles";
import {
  formatCurrency,
  formatDisplayDate,
  getDashboardInsights,
} from "../../utils/tenantInsights";

const cardMotion = {
  hidden: { opacity: 0, y: 28 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: index * 0.08 },
  }),
};

const Dashboard = ({ tenants }) => {
  const insights = getDashboardInsights(tenants);

  const insightCards = [
    {
      label: "Monthly expected",
      value: insights.monthlyExpected,
      tone: "primary",
      icon: faWallet,
      prefix: "Rs. ",
      meta: `${insights.activeTenants} active`,
    },
    {
      label: "Collected",
      value: insights.collectedThisMonth,
      tone: "success",
      icon: faCoins,
      prefix: "Rs. ",
      meta: `${insights.collectionRate}% rate`,
    },
    {
      label: "Overdue",
      value: insights.overdueAmount,
      tone: "danger",
      icon: faCircleExclamation,
      prefix: "Rs. ",
      meta: `${insights.dueTodayCount} due today`,
    },
    {
      label: "Rooms",
      value: insights.occupiedRooms,
      tone: "info",
      icon: faBuildingCircleCheck,
      prefix: "",
      meta: `${insights.inactiveTenants} inactive`,
    },
  ];

  return (
    <DashboardContainer id="overview">
      <InsightGrid>
        {insightCards.map((card, index) => (
          <InsightCard
            key={card.label}
            as={motion.article}
            variants={cardMotion}
            initial="hidden"
            animate="show"
            custom={index}
            tone={card.tone}
          >
            <InsightAccent tone={card.tone} />
            <InsightIcon tone={card.tone}>
              <FontAwesomeIcon icon={card.icon} />
            </InsightIcon>
            <div>
              <InsightLabel>{card.label}</InsightLabel>
              <InsightValue>
                {card.prefix}
                <CountUp end={card.value} duration={1.4} separator="," />
              </InsightValue>
              <InsightMeta>{card.meta}</InsightMeta>
            </div>
          </InsightCard>
        ))}
      </InsightGrid>

      <AlertGrid>
        <SummaryCard as={motion.section} variants={cardMotion} initial="hidden" animate="show" custom={4}>
          <SummaryHeader>
            <div>
              <AlertTitle>Collection</AlertTitle>
              <AlertMeta>This month.</AlertMeta>
            </div>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </SummaryHeader>
          <SummaryMetric>{insights.collectionRate}%</SummaryMetric>
          <SummaryProgress>
            <SummaryProgressBar width={insights.collectionRate} />
          </SummaryProgress>
          <SummaryTimeline>
            <span>Upcoming: {insights.upcomingCount}</span>
            <strong>Rs. {formatCurrency(insights.monthlyExpected - insights.collectedThisMonth)}</strong>
          </SummaryTimeline>
        </SummaryCard>

        <AlertCard as={motion.section} variants={cardMotion} initial="hidden" animate="show" custom={5}>
          <SummaryHeader>
            <div>
              <AlertTitle>Priority</AlertTitle>
              <AlertMeta>Needs attention.</AlertMeta>
            </div>
            <FontAwesomeIcon icon={faBolt} />
          </SummaryHeader>
          {insights.spotlight.slice(0, 3).map((item) => (
            <SpotlightCard key={item.id}>
              <SpotlightHeader>
                <div>
                  <SpotlightTitle>
                    Room {item.roomNo} - {item.name}
                  </SpotlightTitle>
                  <SpotlightSubtitle>
                    {item.dueDate ? formatDisplayDate(item.dueDate) : "No due date"}
                  </SpotlightSubtitle>
                </div>
                <SpotlightStatus tone={item.tone}>{item.label}</SpotlightStatus>
              </SpotlightHeader>
              <SpotlightAmount>Rs. {formatCurrency(item.amount)}</SpotlightAmount>
              <InsightMeta>{item.detail}</InsightMeta>
            </SpotlightCard>
          ))}
          {insights.spotlight.length === 0 && <InsightMeta>No tenant data.</InsightMeta>}
        </AlertCard>
      </AlertGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
