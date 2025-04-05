import React from "react";
import MatchCard from "./MatchCard";

const MatchDaySection = ({ date, matches }) => {
  return (
    <div className="mb-4">
      <h5 className="mb-3">{date}</h5>
      {matches.map((match) => (
        <MatchCard key={match.match_id} match={match} />
      ))}
    </div>
  );
};

export default MatchDaySection;
