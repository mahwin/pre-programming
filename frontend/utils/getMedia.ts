function getMediaTheme() {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false
    : true;
}

export { getMediaTheme };
