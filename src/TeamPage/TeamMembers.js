import React from "react";
import "./TeamMembers.css";

const TeamMembers = ({ members }) => {
  return (
    <div className="team-members">
      <h3>팀 멤버</h3>
      {members.length === 0 ? (
        <p>아직 멤버가 없습니다.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.user_id} className="member-card">
              <img src={member.profile_image} alt={member.name} className="member-avatar" />
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
