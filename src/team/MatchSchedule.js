import React from "react";

const MatchSchedule = ({ matches }) => {
  return (
    <div className="match-schedule">
      <h3>경기 일정 및 결과</h3>
      {matches.map((match, index) => (
        <div key={index} className="match">
          <p>{match.date}</p>
          <p>{match.location}</p>
          <p>{match.opponent}</p>
          {match.result && <p>결과: {match.result}</p>}
        </div>
      ))}
    </div>
  );
};

export default MatchSchedule;
