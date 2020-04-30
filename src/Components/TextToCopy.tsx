import React, { useEffect, useRef } from 'react';
import { getPropertyValue } from '../helpers';

interface Props {
  textToCopy : string,
  textTyped: string
}

export const TextToCopy: React.FC<Props> = ({ textToCopy, textTyped }) => {
    let containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef?.current;
      const lastWord = container?.children?.[textTyped.split(" ").length - 1];
      if (textTyped === "") container?.scroll({ top: 0, left: 0, behavior: 'smooth' });
      if (container && lastWord instanceof HTMLElement) {
        const lastWordOffset = lastWord?.offsetTop;
        const padding = getPropertyValue(container, 'paddingTop');
        const lineHeight = getPropertyValue(container, 'lineHeight');
        if (lastWordOffset + padding + lineHeight > container?.scrollTop + container?.clientHeight) {
          container.scroll({ top: lastWordOffset - padding, left: 0, behavior: 'smooth' });
        }
      }
    }, [textTyped])

  return (
    <div ref={containerRef} className="text-to-copy">
      {textToCopy.length > 0 ? textToCopy.split(" ").map((word: string, index: number) => index === textTyped.split(" ").length - 1 ? (
        <span key={index} style={{ color: 'green' }}> {word}</span>
      ) : (
        <span key={index} style={{ color: textTyped.split(" ")[index] === word ? 'grey' : 'black'}}> {word}</span>
      )) : "Loading text..."}
    </div>
  )
}