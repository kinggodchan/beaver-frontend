import React from "react";
import TeamInfo from "./TeamInfo";
import TeamMembers from "./TeamMembers";
import MatchSchedule from "./MatchSchedule";
import Header from "./Header";
import "./TeamPage.css";

const teamData = {
  name: "초밥 FC",
  members: 21,
  skillLevel: "아마추어",
  description: "안녕하십니까, 초밥FC팀입니다. 현재 21명으로 구성된 팀이 운영되고 있습니다. 더 원활한 팀 운영과 경기가 진행될 수 있도록 규칙을 정했습니다.",
  rules: ["응", "어", "야"],
  captain: "손흥민",
  players: ["김동식", "김성찬", "이범찬"],
  matches: [
    { date: "2/22 14:00", location: "OO야외 풋살 경기장", opponent: "막두 FC", result: null },
    { date: "2/15 14:00", location: "OO야외 풋살 경기장", opponent: "케이 FC", result: "승 3:2" },
  ],
};

const TeamPage = () => {
  return (
    <div>
      <Header />
      <div className="team-container">
        <TeamInfo team={teamData} />
        <TeamMembers captain={teamData.captain} players={teamData.players} />
        <MatchSchedule matches={teamData.matches} />
      </div>
    </div>
  );
};

export default TeamPage;
