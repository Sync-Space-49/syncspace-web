import React from "react";

const MembersOrg = ({member}) => {
  return (
    <div>
        <p>{member.username} is a member of this organization</p>
    </div>
  );
};

export default MembersOrg;