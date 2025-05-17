import React from "react";

const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
};

const DateCarousel = ({ selectedDate, setSelectedDate }) => {
  const days = getNext7Days();

  const formatDate = (date) => date.getDate();
  const formatDay = (date) =>
    date.toLocaleDateString("ko-KR", { weekday: "short" });

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
      {days.map((day) => {
        const isSelected = selectedDate.toDateString() === day.toDateString();

        return (
          <div
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            style={{
              width: "56px",
              height: "70px",
              borderRadius: "12px",
              backgroundColor: isSelected ? "#228B22" : "#f5f5f5",
              color: isSelected ? "#ffffff" : "#000000",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: isSelected ? "700" : "500",
              boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {formatDate(day)}
            </div>
            <div style={{ fontSize: "12px", opacity: isSelected ? 0.95 : 0.6 }}>
              {formatDay(day)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateCarousel;
