import React from "react";


export const StatusColumnFormatter = (cellContent, row) => {

  const statusCssClasses = new Map([
    ["PENDING", "info"],
    ["BOOKED", "success"]
  ]);

  return (
    <span
      className={`label label-lg label-light-${
        statusCssClasses.get(row.status)
        } label-inline`}
    >
      {row.status}
    </span>
  );
};