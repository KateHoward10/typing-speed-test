import React from "react";

interface Props {
  time?: boolean
}

export const Box: React.FC<Props> = ({ children, time }) => {

  return (
    <div className={time ? "time-box" : "box"}>
      {children}
    </div>
  )
}