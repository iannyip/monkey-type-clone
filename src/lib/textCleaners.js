export const cleanVerseNumbers = (inputString) => {
  const replaceSquareBrackets = (match, offset, string) => {
    return match.replace(/\[|\]/g, '');
  };
  const regex = /\[\d+\]/g;
  return inputString.replace(regex, replaceSquareBrackets);
};

export const cleanBreakLines = (inputString) => {
  const regex = /(\\n)+/g;
  return inputString.replace(regex, ' ?n ');
};

export const cleanWhiteSpaces = (inputString) => {
  const regex = /\s{2,}/g;
  return inputString.replace(regex, ' ');
};

export const removeQuotesWrapping = (inputString) => {
  // console.log(inputString[0] === '"');
  // inputString.replace(/^".*/, '');
  // inputString.replace(/"$/, '');
  return inputString.slice(1, -1).trim();
};
