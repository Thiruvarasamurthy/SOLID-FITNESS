export function boundedProgress(value: number) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}
export function storyIndex(progress: number, count: number) {
  return count > 0
    ? Math.min(count - 1, Math.floor(boundedProgress(progress) * count))
    : 0;
}
export function revealedWordCount(progress: number, count: number) {
  return Math.ceil(boundedProgress(progress) * Math.max(0, count));
}
export function canPinStory(
  width: number,
  height: number,
  contentHeight: number,
) {
  return width >= 1024 && contentHeight <= height - 232;
}
