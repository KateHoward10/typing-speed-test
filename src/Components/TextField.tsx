import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  textTyped: string
}

export const TextField = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { onChange, textTyped } = props;

  return (
    <textarea ref={ref} onChange={onChange} onPaste={e => e.preventDefault()} value={textTyped} placeholder="Start typing to begin..." autoFocus />
  )
});