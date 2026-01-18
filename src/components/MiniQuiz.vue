<template>
    <form v-for="(englishWord, itsekiriWord, index) in wordsToTest">
        <div v-if="index === 0">
            <label for="english-word">What's does "{{ itsekiriWord }}" mean?</label>
            <div class="input-group">
                <input type="text" id="english-translation" name="english-translation" v-on:change="validateAnswer($event, englishWord, index)"/>
                <span v-if="firstAnswer">&#10003;</span>
            </div>
        </div>
        <div v-else>
            <label for="itsekiri-word">What's the English word for "{{ englishWord }}"?</label>
            <div class="input-group">
                <input type="text" id="itsekiri-translation" name="itsekiri-translation"  v-on:change="validateAnswer($event, itsekiriWord, index)"/>
                <span class="check" v-if="secondAnswer">&#10003;</span>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
    name: 'ModuleTimer',
    props: {
        stepContent: Object,
        modulePassed: Boolean
    },
    data() {
        return {
            wordsToTest: [],
            firstAnswer: false,
            secondAnswer: false
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
    },
    methods: {
        validateAnswer(e, translated, index) {
            let val = e.target.value;
            if (val === translated) {
                if (index == 0) {
                    this.firstAnswer = true;
                } else {
                    this.secondAnswer = true;
                }
            } else {
                if (index == 0) {
                    this.firstAnswer = false;
                } else {
                    this.secondAnswer = false;
                }
            }
            if (this.firstAnswer && this.secondAnswer) {
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
}

.input-group {
    display: inline-flex;
    align-items: center;
}
</style>