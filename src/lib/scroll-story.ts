export function boundedProgress(value: number) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}
export function storyIndex(progress: number, count: number) {
  return count > 0
    ? Math.min(count - 1, Math.floor(boundedProgress(progress) * count))
    : 0;
}
export function storyLightness(progress: number) {
  const p = boundedProgress(progress);
  const edge = Math.min(p / 0.2, (1 - p) / 0.2, 1);
  return edge * edge * (3 - 2 * edge);
}
export function storyWash(progress: number) {
  const amount = storyLightness(progress);
  const dark = [9, 11, 13];
  const light = [245, 242, 235];
  return `rgb(${dark.map((v, i) => Math.round(v + (light[i] - v) * amount)).join(', ')})`;
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
