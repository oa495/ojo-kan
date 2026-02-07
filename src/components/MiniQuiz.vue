<template>
    <div ref="rootElement" class="quiz-container">
        <form v-for="(englishWord, itsekiriWord, index) in wordsToTest">
            <div v-if="index === 0">
                <label for="english-word">What's does "{{ itsekiriWord }}" mean?</label>
                <div class="input-group">
                    <input :aria-invalid="!validFirstAnswer" type="text" id="english-translation" name="english-translation" v-on:change="validateAnswer($event, englishWord, index)"/>
                    <div class="error-message" role="alert">
                        <span aria-label="First answer correct" v-if="validFirstAnswer">&#10003;</span>
                        <span v-else-if="this.firstAnswer.length" aria-label="First answer incorrect">
                            &#x2715;
                        </span>
                    </div>
                </div>
            </div>
            <div v-else>
                <label for="itsekiri-word">What's the Itsekiri word for "{{ englishWord }}"?</label>
                <div class="input-group">
                    <input :aria-invalid="!validSecondAnswer" type="text" id="itsekiri-translation" name="itsekiri-translation" v-on:change="validateAnswer($event, itsekiriWord, index)"/>
                    <div class="error-message" role="alert">
                        <span aria-label="Second answer correct" class="check" v-if="validSecondAnswer">
                            &#10003;
                        </span>
                        <span v-else-if="this.secondAnswer.length > 0" aria-label="Second answer incorrect">
                            &#x2715;
                        </span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import { ref } from 'vue';

function removeAccents(str) {
  // Normalize to NFD (Canonical Decomposition) to separate base letters and accents
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const rootElement = ref(null);

export default {
    name: 'ModuleTimer',
    props: {
        stepContent: Object,
        modulePassed: Boolean
    },
    data() {
        return {
            wordsToTest: [],
            validFirstAnswer: false,
            validSecondAnswer: false,
            firstAnswer: '',
            secondAnswer: ''
        }
    },
    emits: ["passModule"],
    mounted() {
        const stepContent = this.stepContent;
        const entries = Object.entries(stepContent);
        this.wordsToTest = entries.sort(() => Math.random() - 0.5).slice(0, 2);
        this.wordsToTest = Object.fromEntries(
            Object.entries(stepContent).sort(() => Math.random() - 0.5).slice(0, 2)
        );
        // set focus on first input
        this.$nextTick(() => {
            const containerEl = this.$refs.rootElement;
            if (containerEl) {
                const firstInput = containerEl.querySelector('#english-translation');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        });
    },
    methods: {
        validateAnswer(e, translated, index) {
            let origVal = e.target.value;
            if (origVal.length <= 0) return;
            let val = removeAccents(origVal.toLowerCase());
            translated = removeAccents(translated.toLowerCase());
            if (val === translated) {
                if (index == 0) {
                    this.firstAnswer = val;
                    this.validFirstAnswer = true;
                } else {
                    this.secondAnswer = val;
                    this.validSecondAnswer = true;
                }
            } else {
                if (index == 0) {
                    this.firstAnswer = val;
                    this.validFirstAnswer = false;
                } else {
                    this.secondAnswer = val;
                    this.validSecondAnswer = false;
                }
            }
            if (this.validFirstAnswer && this.validSecondAnswer) {
                this.$emit('passModule', true);
            }
        }
    }
}
</script>

<style>
form div {
    padding: 1em 0;
}

input[type="text"] {
    border: none;
    border-bottom: 1px solid black;
    padding: 0.5em;
    font-size: 1.2em;
    font-family: 'Open Sans', sans-serif;
    line-height: 1.4em;
}

.input-group {
    display: inline-flex;
    align-items: center;
}

.error-message {
    display: inline;
    padding-left: 0.5em;
}

@media (max-width: 500px) {
    input[type="text"] {
        padding: 0.2em 0;
        max-width: 80%;
        font-size: 1em;
    }
    .input-group {
        padding-top: 0.5em;
    }

    form div {
        padding: 0.8em 0;
    }
}

</style>