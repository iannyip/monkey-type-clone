// 1. PACKAGES
import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// 2. CONSTANTS
const API_URL = 'https://api.esv.org/v3/passage/text/';
// const queryParam = 'John+11';

const cleanVerseNumbers = (inputString) => {
  const replaceSquareBrackets = (match, offset, string) => {
    return match.replace(/\[|\]/g, '');
  };
  const regex = /\[\d+\]/g;
  return inputString.replace(regex, replaceSquareBrackets);
};

const cleanBreakLines = (inputString) => {
  const regex = /(\\n)+/g;
  return inputString.replace(regex, ' ?n ');
};

const cleanWhiteSpaces = (inputString) => {
  const regex = /\s{2,}/g;
  return inputString.replace(regex, ' ');
};

const removeQuotesWrapping = (inputString) => {
  // console.log(inputString[0] === '"');
  // inputString.replace(/^".*/, '');
  // inputString.replace(/"$/, '');
  return inputString.slice(1, -1).trim();
};

// 3. AXIOS CALL
export default async function fetchPassage(queryParam) {
  try {
    console.log(API_URL);
    const config = {
      method: 'get',
      url: API_URL,
      headers: {
        Authorization: 'Token ' + process.env.REACT_APP_ESV_API_TOKEN,
      },
      params: {
        q: queryParam,
        'include-passage-references': false,
        'include-verse-numbers': true,
        'include-first-verse-numbers': true,
        'include-footnotes': false,
        'include-headings': true,
        'include-short-copyright': false,
        'indent-paragraphs': 0,
      },
    };

    const response = await axios(config);
    console.log(response.data);
    console.log('cleaning-----------------------------');
    const stringifiedData = JSON.stringify(response.data.passages[0]);
    let cleanedText = stringifiedData;
    cleanedText = cleanVerseNumbers(cleanedText);
    cleanedText = cleanBreakLines(cleanedText);
    cleanedText = cleanWhiteSpaces(cleanedText);
    cleanedText = removeQuotesWrapping(cleanedText);
    return cleanedText;
  } catch (error) {
    console.log(error.message);
  }
}
