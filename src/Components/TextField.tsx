import React, { useRef } from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextField: React.FC<Props> = ({ onChange }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <textarea onChange={onChange} ref={inputRef} />
    </div>
  )
}