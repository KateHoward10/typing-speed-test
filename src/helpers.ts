export function formatTime(time: number) {
  return `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;
}

export function numberOfWords(text: string) {
  return text.split(" ").filter(word => word !== "").length;
}

export function numberOfErrors(typed: string, toCopy: string) {
  return typed.split(" ").filter((word: string, index: number) => word !== "" && word !== toCopy.split(" ")[index]).length;
}