import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  textTyped: string
}

export const TextField: React.FC<Props> = ({ onChange, textTyped }) => {

  return (
    <textarea onChange={onChange} value={textTyped} placeholder="Start typing to begin..." autoFocus />
  )
}