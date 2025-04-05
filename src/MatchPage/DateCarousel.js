import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

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

  const formatDate = (date) => date.getDate(); // 숫자 일
  const formatDay = (date) =>
    date.toLocaleDateString("ko-KR", { weekday: "short" }); // 요일

  return (
    <ButtonGroup className="d-flex justify-content-center flex-wrap gap-2">
      {days.map((day) => (
        <Button
          key={day.toISOString()}
          variant={
            selectedDate.toDateString() === day.toDateString()
              ? "primary"
              : "outline-secondary"
          }
          onClick={() => setSelectedDate(day)}
        >
          <div style={{ fontWeight: "bold" }}>{formatDate(day)}일</div>
          <small>{formatDay(day)}</small>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default DateCarousel;
