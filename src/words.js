const verbs = {
    'retin': 'listen',
    'gin': 'say',
    'je': 'agree',
    'di': 'let',
    'bẹ': 'beg',
    'ka': 'able',
    'bì': 'born',
    'kpe': 'call',
    'gba': 'take',
    'wa': 'come/will',
    'fẹ': 'want/find',
    'tse': 'do',
    'bà': 'meet',
    'gba-a': '-ing',
    'bí': 'borrow',
    'forijẹ': 'agree',
    'buru': 'meet in motion',
    'dinma': 'embrace (romantically)',
    'do': 'marry',
    'ró': 'tie',
    'ni': 'wear', // add accent
}

const pronouns = {
    'eyi': 'this',
    'aghan': 'they',
    'a': 'they',
    'o': 'she/he',
    'ain': 'she/he says',
    'mai': 'I say',
    'mi': 'me',
    'èmi': 'me',
    'mo': 'I',
    'Bokor': 'what',
    'nikọ': 'what',
    'dede': 'all',
    'wee': 'the',
    'ma': 'when',
    'ro': 'her/him',
};

const adjectives_adverbs = {
    'sẹngua': 'beautiful',
    'ghele':'really',
    'do': 'very'
}

const identifiers = {
    'ọkan': 'one',
    'inọ': 'inside',
    'wee': 'the',
    'sin': 'is it',
    'ti': 'that',
    'wen': 'not',
    'éè': 'not',
    'gha': 'where',
    'de/derekede': 'but'
}

const nouns = {
    'ọlikpẹrẹbu': '',
    'ọma': 'child',
    'ọmẹtiẹ': 'small child',
    'ọnobirẹn': 'woman',
    'ọnọkẹrẹn': 'man',
    'ẹye': 'world',
    'ẹgualẹ': 'snake',
    'ọjọ': 'day',
    'ubo': 'place',
    'oko': 'bush',
    'ajá': 'town',
    'obirẹn': 'wife',
    'ẹsẹn': 'leg',
    'ẹwọ': 'hand',
    'origho': 'head',
    'ẹju': 'eye',
    'ẹwu': 'shirt',
    'aṣọ': 'cloth',
    'isabatu': 'shoe',
    'ọkpa': 'walking stick',
    'ẹkoro': 'cap',
    'uwẹre': 'there',
    'iyẹ': 'mother',
    'ọwa': 'father',
    'ọkọ': 'husband',
    
}

const allWords = { ...verbs, ...pronouns, ...nouns, ...identifiers };
export { verbs, pronouns, nouns, identifiers, allWords };