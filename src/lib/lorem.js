import { LoremIpsum } from 'lorem-ipsum';
import { cleanBreakLines, removeQuotesWrapping } from './textCleaners';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export function getLoremIpsumWords(wordCount) {
  return lorem.generateWords(wordCount);
}

export function getLoremIpsumParagraphs(paraCount) {
  const rawText = lorem.generateParagraphs(paraCount);
  let cleanedText = JSON.stringify(rawText);
  cleanedText = cleanBreakLines(cleanedText);
  cleanedText = removeQuotesWrapping(cleanedText);
  return cleanedText;
}

// console.log(lorem.generateSentences(5));
