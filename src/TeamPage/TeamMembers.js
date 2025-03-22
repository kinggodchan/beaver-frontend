import React from "react";
import "./TeamMembers.css";

const TeamMembers = ({ team, members }) => {
  return (
    <div className="team-members">
      <h3>주장</h3>
      {team.captain === null ?(
        <p>주장이름</p>
      ) : (
      <ul>
      <li key={team.captain.id}className="member-card">
              <div className="member-info">
                <h3>{team.captain.username}</h3>
                <p></p>
              </div>
            </li>
            </ul>

      )}
      <h3>팀 멤버</h3>
      {members.length === 0 ? (
        <p>아직 멤버가 없습니다.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.user_id} className="member-card">
              <div className="member-info">
                <h3>{member.username}</h3>
                <p>{member.position}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamMembers;
