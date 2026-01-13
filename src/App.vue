<script>
import LearningModule from './components/LearningModule.vue'
import { learningFrequency } from '@/stores/frequency'
import { verbs, pronouns, nouns, allWords } from './words'

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
        let paragraphs = document.querySelectorAll('main p');
        paragraphs.forEach(paragraph => {
          const originalText = paragraph.textContent;
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

        paragraph.innerHTML = newHTML;
      });
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
  <h1>
    Kp'ojo <br><span style="margin-left: 0.5em;">kp'ojo</span>
  </h1>
  <div class="circle">
    <main>
      <p>
        Mai da retin mi. Ọma ta ka bi. Ọma ọnobirẹn.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ. 
        Nikor sin?
        Aghan retin mi di èmi gin gbẹ aghan.
      </p>
      <p>
        Mai da retin mi. Ọma ta ka bi. Ọma ọnobirẹn.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ. 
        Nikor sin?
        Aghan retin mi di èmi gin gbẹ aghan.
      </p>
      <p>
        Mai da retin mi. Ọma ta ka bi. Ọma ọnobirẹn.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ. 
        Nikor sin?
        Aghan retin mi di èmi gin gbẹ aghan.
      </p>
    </main>
  </div>
  <fieldset class="frequency-selection">
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

      <button class="submit" v-on:click="submitFrequency()">Submit</button>
    </fieldset>
   
  <LearningModule @completeModule="onCompleteModule"  />
</template>

<style>
body {
  margin: 0;
  font-family: 'Ojuju', sans-serif;
  height: 98vh;
}

h1 {
  margin: 0;
  font-size: 8rem;
  line-height: 0.8em;
  position: absolute;
  z-index: 999;
  top: 0;
 text-shadow:
    6px 6px 0 #fff,
    -6px 6px 0 #fff,
    -6px -6px 0 #fff,
    6px -6px 0 #fff;
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

p {
  max-width: 70%;
  margin: 1em auto;
}

main {
  font-weight: 400;
  font-style: normal;
  font-size: 1.4rem;
  margin: 1.2rem;
  line-height: 1.2;
  height: 100%;
  align-content: center;
}

.circle {
  height: 80%;
  width: 80%;
  border: 1px solid;
  border-radius: 50%;
  background-color: white;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: auto;
  justify-content: end;
  padding: 2em;
}

fieldset {
  margin: 1rem;
  padding: .5rem;
  width: fit-content;
  background: white;
  z-index: 999;
  position: absolute;
  bottom: 0;
}

legend {
  font-weight: 600;
}

label {
  margin-left: .5rem;
}

button {
  cursor: pointer;
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

#app {
  height: 100%;
  width: 55%;
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  /* make background a repeating svg */
  background-image: url('assets/snake.svg');
  background-repeat: repeat; 
  background-size: 6rem 6rem;
}


</style>
