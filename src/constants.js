const storeToModuleMap = {
    'module1': 'pronouns',
    'module2': 'nouns',
    'module3': 'verbs',
    'module4': 'misc',
    'module5': 'adjectives_adverbs'
};


const moduleToStoreMap = {
    'pronouns': 'module1',
    'nouns': 'module2',
    'verbs': 'module3',
    'misc': 'module4',
    'adjectives_adverbs': 'module5'
};

const moduleNameToLongNameMap = {
    'pronouns': 'Wetin we go call you?',
    'nouns': 'Who you be?',
    'verbs': 'Wetin you go do?',
    'misc': 'All join.',
    'adjectives_adverbs': 'How ein be?'
};

export { moduleNameToLongNameMap, moduleToStoreMap, storeToModuleMap };