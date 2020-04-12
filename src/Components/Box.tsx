import React from "react";

interface Props {
  time?: boolean,
  label?: string,
  error?: boolean
}

export const Box: React.FC<Props> = ({ children, time, label, error }) => {

  return (
    <div className={`box${time ? " time-box" : (error && Number(children) > 0) ? " error-box" : ""}`}>
      <div className="box-label">{label}</div>
      {children}
    </div>
  )
}