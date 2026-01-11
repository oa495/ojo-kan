<script>
import LearningModule from './components/LearningModule.vue'
import { learningFrequency } from '@/stores/frequency'
import { verbs, pronouns, nouns, allWords } from './words'
import { h } from 'vue';

export default {
  data() {
    return {
      frequency: '',
      store: learningFrequency(),
    }
  },
  components: {
    LearningModule
  },
  mounted() {
      this.$nextTick(() => {
        let paragraphs = document.querySelector('main');
        const originalText = paragraphs.textContent;
        const wordsAndSeparators = originalText.split(/(\s+)/);
        const newHTML = wordsAndSeparators.map(part => {
            // Check if the part (trimmed and lowercased) is in our object
            const cleanedPart = part.trim().toLowerCase().replace(/[.,!?;:"]/g, '');
            console.log('All words:', allWords);
            const translation = allWords[cleanedPart];
            if (translation) {
                const highlightClass = Object.keys(pronouns).includes(cleanedPart)
                    ? 'pronouns'
                    : Object.keys(nouns).includes(cleanedPart)
                        ? 'nouns'
                        : Object.keys(verbs).includes(cleanedPart)
                            ? 'verbs'
                            : 'word';
                // If it is, wrap it in a span with the highlight class
                return `<span class="${highlightClass}">${part}</span>`;
            }
            // Otherwise, return the part as is (including spaces and punctuation)
            return part;
        }).join('');

        paragraphs.innerHTML = newHTML;
      });
  },
  methods: {
    submitFrequency() {
      if (this.frequency) {
        this.store.setFrequency(this.frequency);
        console.log('Frequency set to:', this.store.frequency);
      }
    },
    onCompleteModule(module) {
      console.log(`Module completed: ${module} in app.vue`);
      const moduleElements = document.querySelectorAll(`span.${module}`);
      let wordsToHighlight = allWords;
      switch (module) {
        case 'pronouns':
          wordsToHighlight = pronouns;
          break;
        case 'nouns':
          wordsToHighlight = nouns;
          break;
        case 'verbs':
          wordsToHighlight = verbs;
          break;
      }
      moduleElements.forEach(el => {
          const word = el.textContent.trim().toLowerCase();
          const translation = wordsToHighlight[word];
          el.textContent = translation;
          el.classList.add('translated');
          el.dataset.translation = word;
      });
    }
  }
}

</script>

<template>
  <fieldset>
    <legend>Choose a frequency:</legend>
    <div>
      <input type="radio" v-model="frequency" id="hour" name="frequency" value="hourly" checked=""/>
      <label for="hour">Hourly</label>
    </div>
    <div>
      <input type="radio" v-model="frequency" id="day" name="frequency" value="daily"  />
      <label for="day">Daily</label>
    </div>
    <div>
      <input type="radio" v-model="frequency" id="week" name="frequency" value="weekly" />
      <label for="week">Weekly</label>
    </div>

    <button v-on:click="submitFrequency()">Submit</button>
  </fieldset>
  <h1>Kpi'ojo</h1>
  <main>
    <p>
      Mai da retin mi. Ọma ta ka bi. Ọma ọnobirẹn.
      Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
      Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
      Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ. 
      Nikor sin?
      Aghan retin mi di èmi gin gbẹ aghan.
    </p>
  </main>
  <LearningModule @completeModule="onCompleteModule"  />
</template>

<style>
body {
  display: grid;
  grid-template-columns: 70%;
  margin: 0;
  font-family: 'Ojuju', sans-serif;
}

h1 {
  margin: 0;
  font-size: 8rem;
}

button {
  all: unset;
  cursor: pointer;
  width: 100%;
  height: auto;
  display: block;
  font-weight: 300;
  transition: all 0.3s ease-in-out;
}

main {
  font-weight: 400;
  font-style: normal;
  font-size: 3.4rem;
  margin: 2rem;
  line-height: 1.2;
}

fieldset {
  margin: 1rem;
  padding: .5rem;
  width: fit-content;
}

legend {
  font-weight: 600;
}

label {
  margin-left: .5rem;
}

button {
  padding: 0.5rem;
  width: fit-content;
  background-color: white;
  border: 1px dashed black;
}

button:hover {
  background-color: black;
  color: white;
}

fieldset button {
  margin-top: 1rem;
}

.translated {
  transform: translateY(-10px);
  display: inline-block;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  font-size: 3.5rem;
}
</style>
