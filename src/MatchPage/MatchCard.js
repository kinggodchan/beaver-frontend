import { div } from "framer-motion/client";
import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MatchCard = ({ match }) => {
  const isWaiting = match.status === "WAITING";

  const statusText = isWaiting ? "신청 가능" : "마감";
  const statusVariant = isWaiting ? "primary" : "secondary";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${match.match_id}`);
  };

  const time = new Date(match.match_date).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="panel panel-default mb-3 shadow-sm"
      onClick={handleClick}
      style={{ width: "1000px", cursor: "pointer", margin: "20px auto" }}
    >
      <div className="panel-body">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-xs-2 text-center">
            <h5>{time}</h5>
          </div>
          <div className="col-xs-7">
            <strong>{match.location}</strong>
            <div>
              {match.host_team.team_name}
              {match.opponent_team
                ? ` vs ${match.opponent_team.team_name}`
                : ""}
            </div>
          </div>
          <div className="col-xs-3 text-right">
            <span
              className={`label label-${statusVariant}`}
              style={{
                padding: "6px",
                backgroundColor: "#232323", // 원하는 배경색
                color: "#fff", // 글자색
              }}
            >
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
