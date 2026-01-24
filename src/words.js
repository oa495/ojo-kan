const verbs = {
    'retin': 'listen',
    'gin': 'say',
    'je': 'agree',
    'di': 'let',
    'bẹ': 'beg',
    'ka': 'enable',
    'bi': 'born',
    'kpe': 'call',
    'gba': 'take',
    'wa': 'come|will',
    'fẹ': 'want|find',
    'tse': 'do',
}

const pronouns = {
    'eyi': 'this',
    'aghan': 'they',
    'a': 'they',
    'o': 'she/he',
    'mi': 'me',
    'mo': 'I',
    'Bokor': 'what/where',
    'nikọ': 'what',
    'dede': 'all',
    'wee': 'the',
    'ma': 'when'
};

const identifiers = {
    'ọkan': 'one',
    'inọ': 'inside',
    'wee': 'the'
}

const nouns = {
    'ọma': 'child',
    'ọmẹtiẹ': 'small child',
    'ọnobirẹn': 'woman',
    'ọnọkẹrẹn': 'man',
    'ẹye': 'world',
    'ẹgualẹ': 'snake',
    'ọjọ': 'day',
    'ubo': 'place',
    'oko': 'bush',
    'aja': 'town',
    'obirẹn': 'wife'
}

const allWords = { ...verbs, ...pronouns, ...nouns, ...identifiers };
export { verbs, pronouns, nouns, identifiers, allWords };