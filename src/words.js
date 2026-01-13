const verbs = {
    'retin': 'listen',
    'gin': 'say',
    'je': 'agree',
    'di': 'let',
    'bẹ': 'beg',
    'ka': 'enable',
    'bi': 'birth',
    'kpe': 'call',
    'gba': 'take',
    'wa': 'come',
    'fẹ': 'want',
    'tse': 'do',
}

const pronouns = {
    'eyi': 'this',
    'aghan': 'they',
    'a': 'they',
    'o': 'she/he',
    'mi': 'me',
    'mo': 'I',
    'Nikor': 'what',
    'Bokor': 'what/where',
    'nikọ': 'what'
};

const adjectves = {
    'ọkan': 'one',
    'inọ': 'inside',
}

const nouns = {
    'ọma': 'child',
    'ọnobirẹn': 'girl',
    'ọnọkẹrẹn': 'boy',
    'ẹye': 'world',
    'ẹgualẹ': 'snake',
    'ọjọ': 'day',
    'ubo': 'place',
    'oko': 'bush',
    'aja': 'town',
    'obirẹn': 'wife'
}

const allWords = { ...verbs, ...pronouns, ...nouns };
export { verbs, pronouns, nouns, allWords };