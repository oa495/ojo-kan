const storeToModuleMap = {
    'module1': 'pronouns',
    'module2': 'nouns',
    'module3': 'verbs',
    'module4': 'misc',
    'module5': 'adjectives_adverbs',
    'module6': 'nouns_two',
    'module7': 'verbs_two',
    'module8': 'verbs_three',
    'module9': 'misc_two'
};


const moduleToStoreMap = {
    'pronouns': 'module1',
    'nouns': 'module2',
    'verbs': 'module3',
    'misc': 'module4',
    'adjectives_adverbs': 'module5',
    'nouns_two': 'module6',
    'verbs_two': 'module7',
    'verbs_three': 'module8',
    'misc_two': 'module9'
};

const moduleNameToLongNameMap = {
    'pronouns': 'Wetin we go call you?',
    'nouns': 'Who you be?',
    'verbs': 'Wetin you go do?',
    'misc': 'All join.',
    'adjectives_adverbs': 'How ein be?',
    'nouns_two': 'Who you be? (pt. 2)',
    'verbs_two': 'Wetin you go do? (pt. 2)',
    'verbs_three': "Wetin you go do (pt. 3)?",
    'misc_two': "Different different kain."
};

export { moduleNameToLongNameMap, moduleToStoreMap, storeToModuleMap };