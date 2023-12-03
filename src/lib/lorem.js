import { LoremIpsum } from 'lorem-ipsum';

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
  return lorem.generateParagraphs(paraCount);
}

// console.log(lorem.generateSentences(5));
