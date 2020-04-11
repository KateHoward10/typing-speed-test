import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextField: React.FC<Props> = ({ onChange }) => {

  return (
    <textarea onChange={onChange} placeholder="Start typing to begin..." autoFocus />
  )
}