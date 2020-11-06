import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


export const SkillNameColumnFormatter = (cellContent, row) => {

  return (
    <OverlayTrigger
      placement="right-end"
      overlay={<Tooltip id="skill-tooltip"> {row.skill_desc}</Tooltip>}
    >
      <span>{row.skill_name}</span>
    </OverlayTrigger>

  );
};