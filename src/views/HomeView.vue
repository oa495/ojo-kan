<script>
import LearningModule from '../components/LearningModule.vue'
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency'
import { verbs, pronouns, nouns, allWords } from '../words'


const storeToModuleMap = {
    'module1': 'pronouns',
    'module2': 'nouns',
    'module3': 'verbs',
};

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
      
        const progress = localStorage.getItem('moduleProgress');
        const store = moduleProgress();

        let parsedProgress;
        if (progress) {
            parsedProgress = JSON.parse(progress);
            for (let module in parsedProgress) {
                if (parsedProgress[module] === true) {
                    store.completeModule(module);
                    this.onCompleteModule(storeToModuleMap[module]);
                }
            }
        }
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
          const text = el.textContent.trim().toLowerCase();
          // split word from punctuation safely
          const match = text.match(/^([a-zA-Z]+)([.,!?;:]*)$/);
          const word = match ? match[1] : text;
          const punctuation = match ? match[2] : '';
          const translation = wordsToHighlight[word] || text;
          el.textContent = translation + punctuation;
          el.classList.add('translated');
          el.dataset.translation = word;
      });
    },
    resetAllModules() {
        const translated = document.querySelectorAll('.translated');
        translated.forEach(el => {
            const originalWord = el.dataset.translation;
            el.textContent = originalWord;
            el.classList.remove('translated');
        });
    }
  }
}

</script>

<template>
  <section class="intro">
    <h1>
      Ọj'ọkan
    </h1>
    <p class="project-description">An Itsekiri folktake that unveils itself to the reader as they learn the language step by step. Click on a 
    </p>
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

      <button class="submit button" v-on:click="submitFrequency()">Submit</button>
    </fieldset>
  </section>
  <div class="circle">
    <main>
      <p>
        Mai da retin mi. Ọma ta ka bi. Ọma ọnobirẹn.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ.
        Ọnọkẹrẹn eyi ma bẹ o ka gin éè jẹ. 
        Nikọ sin?
        Aghan retin mi di èmi gin gbẹ aghan.
      </p>
      <p>
        Ọmẹtiẹ ọnobirẹn ọkan ti a kpe wun Ọlikpẹrẹbu.
        Éè nẹ aja Itsẹkiri kí ajá Itsẹkiri tee wa gba-a bẹ oma wee,
        gin aghan fẹ gba tse obirẹn, ain wen jẹ. 
        Eyí ma ba ain wen jẹ.
        Ubo kì ubo ni ẹye we dede,
        aja Itsẹkiri kí ajá Itsẹkiri dede owun wa gba fẹ ọma we ain wen jẹ.
        Nikọ re/e tse ti wo gba gin we jẹ? Ain wen jẹ, ain we fẹ aghan ki aghan.
      </p>
          <p>
        Ọmẹtiẹ ọnobirẹn ọkan ti a kpe wun Ọlikpẹrẹbu.
        Éè nẹ aja Itsẹkiri kí ajá Itsẹkiri tee wa gba-a bẹ oma wee,
        gin aghan fẹ gba tse obirẹn, ain wen jẹ. 
        Eyí ma ba ain wen jẹ.
        Ubo kì ubo ni ẹye we dede,
        aja Itsẹkiri kí ajá Itsẹkiri dede owun wa gba fẹ ọma we ain wen jẹ.
        Nikọ re/e tse ti wo gba gin we jẹ? Ain wen jẹ, ain we fẹ aghan ki aghan.
      </p>
      <p>
        Ọmẹtiẹ ọnobirẹn ọkan ti a kpe wun Ọlikpẹrẹbu.
        Éè nẹ aja Itsẹkiri kí ajá Itsẹkiri tee wa gba-a bẹ oma wee,
        gin aghan fẹ gba tse obirẹn, ain wen jẹ. 
        Eyí ma ba ain wen jẹ.
        Ubo kì ubo ni ẹye we dede,
        aja Itsẹkiri kí ajá Itsẹkiri dede owun wa gba fẹ ọma we ain wen jẹ.
        Nikọ re/e tse ti wo gba gin we jẹ? Ain wen jẹ, ain we fẹ aghan ki aghan.
      </p>
      <p>
        Ọjọ ọkan ke ẹgualẹ okan ni inọ oko ti a ka kpe wun Oribiti.
      </p>
    </main>
  </div>
  <LearningModule @completeModule="onCompleteModule" @reset="resetAllModules" />
</template>

<style>
.intro {
  position: absolute;
  left: 0;
  border: 1px dashed black;
  width: 15%;
  margin: 0.2em;
}

h1 {
  margin: 1rem;
  font-size: 3rem;
  line-height: 0.9em;
  font-style: italic;
  text-align: left;
}

.project-description {
  margin: 0 1rem 1rem 1rem;
  font-size: 1.2rem;
  font-weight: 300;
}

fieldset {
  margin: 1rem;
  padding: .5rem;
  width: fit-content;
  background: white;
  font-family: 'Open Sans', sans-serif;
}

legend {
  font-weight: 600;
}

label {
  margin-left: .5rem;
}


fieldset button {
  margin-top: 1rem;
}

.translated {
  transform: translateY(-10px);
  display: inline-block;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  font-size: 1.8rem;
}
</style>
