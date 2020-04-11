import React, { useEffect, useRef } from "react";

interface Props {
  textToCopy: string,
  textTyped: string
}

export const TextToCopy: React.FC<Props> = ({ textToCopy, textTyped }) => {
    let containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef?.current;
      const lastWord = container?.children?.[textTyped.split(" ").length - 1];
      if (container && lastWord instanceof HTMLElement) {
        const lastWordOffset = lastWord?.offsetTop;
        if (lastWordOffset - 10 !== container?.scrollTop) {
          container.scroll({ top: lastWordOffset - 10, left: 0, behavior: 'smooth' });
        }
      }
    }, [textTyped])

  return (
    <div ref={containerRef} className="text-to-copy">{textToCopy.split(" ").map((word: string, index: number) => index === textTyped.split(" ").length - 1 ? (
        <span key={index} style={{ color: 'green' }}> {word}</span>
    ) : (
      <span key={index} style={{ color: textTyped.split(" ")[index] === word ? 'grey' : 'black'}}> {word}</span>
    ))}</div>
  )
}