export const searchText = (search: string, text: string): boolean => {
  const re = new RegExp("\\w*" + search + "\\w*", "ig");
  return re.test(text);
};

export const formatText = (
  text: string,
  max: number,
  emptyText: string = ""
) => {
  if (!text.length) return emptyText;
  if (text.length > max) return text.slice(0, max) + "...";

  return text;
};
