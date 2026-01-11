const verbs = {
    'retin': 'listen',
    'gin': 'say',
    'je': 'agree',
    'di': 'let',
    'bẹ': 'beg',
    'ka': 'enable',
    'bi': 'birth'
}

const pronouns = {
    'eyi': 'this',
    'aghan': 'they',
    'o': 'she/he',
    'mi': 'me',
    'mo': 'I',
    'Nikor': 'what',
    'Bokor': 'what/where'
};

const nouns = {
    'oma': 'child',
    'onibiren': 'girl',
    'onokeren': 'boy'
}

const allWords = { ...verbs, ...pronouns, ...nouns };
export { verbs, pronouns, nouns, allWords };