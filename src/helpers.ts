export function formatTime(time: number) {
  return `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;
}

export function numberOfWords(text: string) {
  return text.split(" ").filter(word => word !== "").length;
}

export function numberOfErrors(typed: string, toCopy: string) {
  const typedWords = typed.split(" ");
  return typedWords.filter((word: string, index: number) => index !== typedWords.length - 1 && word !== "" && word !== toCopy.split(" ")[index]).length;
}

export function formatText(text: string) {
  return text.replace(/ {2}/g, ' ').replace(/“|”/g, '"').replace(/’/g, "'").replace(/$(\r|\n{2})(?=.)/gm, " ");
}

export function getPropertyValue(element: HTMLElement, property: any) {
  return Number(getComputedStyle(element)[property]?.replace('px', ''));
}