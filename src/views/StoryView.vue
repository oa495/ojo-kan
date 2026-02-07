<script>
import LearningModule from '../components/LearningModule.vue'
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency'
import { verbs, pronouns, nouns, allWords, adjectives_adverbs, misc } from '../words'
import { storeToModuleMap } from '@/constants'

export default {
  data() {
    return {
      frequency: '',
      store: learningFrequency(),
      allModulesCompleted: false,
      isModuleActive: false,
      announceMessage: '',
      scrolled: false
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
            const newHTML = wordsAndSeparators.map((part, i) => {
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
                              : Object.keys(misc).includes(cleanedPart)
                                ? 'misc'
                              : Object.keys(adjectives_adverbs).includes(cleanedPart)
                                ? 'adjectives_adverbs'
                              : 'word';
                  // If it is, wrap it in a button with the highlight class
                  return `<button disabled="true" index="${i}" class="${highlightClass} word">${part}</button>`;
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
                    this.onCompleteModule(module, storeToModuleMap[module]);
                }
            }
          this.scrolled = true;
        } else {
          const storyEl = document.getElementById('story');
          storyEl.addEventListener('scroll', this.onScrollOnce);
        }
    });

    if (localStorage.getItem('learningFrequency')) {
        this.frequency = localStorage.getItem('learningFrequency');
        this.store.setFrequency(this.frequency);
    } 
  },
  methods: {
    onScrollOnce() {
      this.scrolled = true;
    },
    changeFrequency() {
      if (this.frequency) {
        this.store.setFrequency(this.frequency);
        localStorage.setItem('learningFrequency', this.frequency);
      }
    },
    onCompleteModule(moduleNameInStore, module) {
      console.log(`Module completed: ${module} in app.vue`);
      const moduleElements = document.querySelectorAll(`button.${module}`);
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
        case 'misc':
          wordsToHighlight = misc;
          break;
        case 'adjectives_adverbs':
          wordsToHighlight = adjectives_adverbs;
          break;
      }
      moduleElements.forEach(el => {
          const isUppercase = el.textContent[0] === el.textContent[0].toUpperCase();
          const text = el.textContent.trim().toLowerCase();
          // split word from punctuation safely
          // This line is already present and handles the word/punctuation split
          const match = text.match(/^([\p{L}]+)([.,!?;:]*)$/u);
          const word = match ? match[1] : text;
          const punctuation = match ? match[2] : '';
          console.log(word, punctuation, match)
          const translation = wordsToHighlight[word] || text;
          el.textContent = isUppercase ? translation[0].toUpperCase() + translation.slice(1) + punctuation : translation + punctuation;
          el.classList.add('translated');
          el.removeAttribute('disabled');
          // change to button tag
          el.dataset.translation = word;
      });

      this.scrolled = true;

      let store = moduleProgress();
      store.completeModule(moduleNameInStore);
      this.clearAriaAnnouncements();
      const storyEl = document.getElementById('story');
      storyEl.scrollTo(0, 0);
      storyEl.focus();

      if (store.allModulesCompleted()) {
        console.log('All modules completed!');
        const circle = document.querySelector('.circle');
        circle.classList.add('complete');
        this.allModulesCompleted = true;
        this.shuffleWords();
        this.announceMessage = 'All modules completed! You have unlocked all the words in the story.';
      } else {
          this.announceMessage = 'A module has been completed. New words have been unlocked in the story.';
      }
    },
    clearAriaAnnouncements() {
      setTimeout(() => {
        this.announceMessage = '';
      }, 5000);
    },
    resetAllModules() {
        const translated = document.querySelectorAll('.translated');
        translated.forEach(el => {
            const originalWord = el.dataset.translation;
            el.textContent = originalWord;
            el.classList.remove('translated');
            el.setAttribute('disabled', true);
        });
        let store = moduleProgress();
        store.resetAllProgress();
        const circle = document.querySelector('.circle');
        circle.classList.remove('complete');
        this.announceMessage = 'All modules have been reset. You are now back at the beginning.';
        this.clearAriaAnnouncements();
    },
    toggleWord(event) {
      let target = event.target;
      if (target.matches('button.translated')) {
        // toggle word and translation
        let translated = target.dataset.translation;
        let currentText = target.textContent;
        const isUppercase = currentText[0] === currentText[0].toUpperCase();
        const match = currentText.match(/^([\p{L}\s]+?)([.,!?;:?]*)$/u);
        const word = match ? match[1] : currentText;
        target.dataset.translation = word;

        const punctuation = match ? match[2] : '';
        target.textContent = isUppercase ? translated[0].toUpperCase() + translated.slice(1) + punctuation : translated + punctuation;
      }
    },
    shuffleWords() {
      let paragraphs = document.querySelectorAll('main p');
        paragraphs.forEach(paragraph => {
          const originalText = paragraph.textContent;
          const wordsAndSeparators = originalText.split(/(\s+)/);
        });
    },
    onModuleActivated(isModuleActive) {
      this.isModuleActive = isModuleActive;
    }
  }
}

</script>

<template>
  <div class="container story">
    <section class="intro">
      <h1>
        Ọj'ọkan
      </h1>
      <p class="project-description">An Itsẹkiri folktale that unveils itself to the reader as they learn words from the language. <u>Click on "bubble" to get started learning.</u> 
      </p>
      <fieldset class="frequency-selection">
        <legend>Choose a frequency for the tale to unfold:</legend>
        <div>
          <input type="radio" v-model="frequency" id="own-pace" name="frequency" value="own-pace" @change="changeFrequency" />
          <label for="own-pace">Own pace</label>
        </div>
        <div>
          <input type="radio" v-model="frequency" id="hour" name="frequency" value="hourly" checked="" @change="changeFrequency"/>
          <label for="hour">Hourly</label>
        </div>
        <div>
          <input type="radio" v-model="frequency" id="day" name="frequency" value="daily" @change="changeFrequency" />
          <label for="day">Daily</label>
        </div>
        <div>
          <input type="radio" v-model="frequency" id="surprise-me" name="frequency" value="surprise-me" @change="changeFrequency" />
          <label for="surprise-me">Surprise me!</label>
        </div>
      </fieldset>
    </section>
    <div class="big-circle">
      <div class="circle" @click="toggleWord">
        <div id="announce" aria-live="polite" class="sr-only">
          <p>{{announceMessage}}</p>
        </div>
        <main :aria-hidden="isModuleActive ? 'true' : 'false'" id="story">
          <p>
            Mai retin mi. Ọma t'a ka bì. Ọma ọnobirẹn.
            Ọnọkẹrẹn èyí ma bẹ o ka gin éè jẹ.
            Ọnọkẹrẹn èyí ma bẹ o ka gin éè jẹ.
            Ọnọkẹrẹn èyí ma bẹ o ka gin éè jẹ. 
            Nikọ sin???
            Aghan retin mi di èmi gin gbẹ aghan.
          </p>
          <p>
            Ọmẹtiẹ ọnobirẹn ọkan ti a kpe Ọlikpẹrẹbu.
            Éè nẹ ajá Itsẹkiri kí ajá Itsẹkiri tee wa gba-a bẹ ọma wee,
            gin aghan fẹ gba tse obirẹn, ain éè jẹ. 
            Èyí ma bà ain éè jẹ.
            Ubo kì ubo ni ẹye wee dede,
            ajá Itsẹkiri kí ajá Itsẹkiri dede owún wa gba fẹ ọma wee ain éè jẹ.
            Nikọ re/e tse ti wo gba gin we jẹ? Ain éè jẹ, ain we fẹ aghan kí aghan.
          </p> 
          <p>
            Ọjọ ọkan ke ẹgualẹ ọkan ni inọ oko ti a ka kpe owún Oribiti.
            Ain ọma bokọ e w ' ẹye ọma ọnobirẹn t'a ka bẹ t'o ka gin éè forijẹ, ain won wa ra tó uwẹre.
            Oribiti wee ke won gba re ra dá ara ro

            O gba tó ubo ti ẹsẹn gha, o ka bí ' ẹsẹn.
            O gba tó ubo ti ẹwọ gha, o ka bí ' ẹwọ.
            O gba tó ubo ti origho gha, o ka bí ' origho.
            O gba tó ubo ti ẹju gha, o ka bí ' ẹju.

            O ka ni ' ẹwu.
            O ka ró ' aṣọ.
            O ka ni ' isabatu. 
            O ka bí ' ọkpa.
            O ka bí ' ẹkoro.
            O ka re o gin o wa bà ọmẹtiẹ onobirẹn Ọlikpẹrẹbu wee.
            Ọma wee de do sẹngua.
            Oma wee Olikperubu ghele olikperebu.

            Ọmatiẹ ọnobirẹn Ọlikpẹrẹbu gba ri, o ka sa gbaa buru, o ka dinma ro, o ka kpe iye ro biri ọwa ro, o ka gin èyí ọkọ ti ' èmi fe dọ re.
          </p>
          <p>
            Iyọ! A ka gin èyí ọnọkẹrẹn ti wo fẹ dọ?
            O ka gin èyí ọnọkẹrẹn t'emi fẹ dọ re oo.
            Wo desin tsi?
            Ain ọnọkẹrẹn ti o fẹ dọ we re.
            A ka gin o san oo.
            Ẹgualẹ wee gba wọ ' ulí, a ka kin, a ka mu ọjẹ gbẹẹ.
            O ka gin ain we te jẹrun gin d'a gbe ọjẹ wee d'a gbe tsi abẹtẹ, a ka gbe tsi abẹtẹ.
            O gba tsọn èyí tsọn èyí.
            O ka wọ inọ abẹtẹ wee, o ka dá ara ro gba dá ẹgualẹ wee Oribiti wee.
            O ka da ọjẹ we tsi'alẹ, o la, o ka la, o ka la jẹ̀ kuro.
            O ka dá tsitsi irẹye.
          </p>
        </main>
        <LearningModule :scrolled="scrolled" @completeModule="onCompleteModule" @reset="resetAllModules" @moduleActive="onModuleActivated" />
      </div>
    </div>
  </div>
</template>

<style>
.intro {
  position: absolute;
  left: 0;
  border: 1px dashed black;
  width: 15%;
  margin: 0.2em;
  line-height: 1.6em;
}
.intro h1 {
  font-size: 3rem;
  line-height: 0.9em;
  font-style: italic;
  text-align: left;
  margin: 1rem;
  padding-bottom: 0.2em;
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

main {
  z-index: 999;
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

.pronouns, .verbs, .nouns, .misc, .adjectives_adverbs {
  transition: all 0.3s ease-in-out;
}

.translated {
  display: inline-block;
  cursor: pointer;
  font-size: 1.8rem;
  background-color: black;
  color: white;
}

.translated:focus {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}

.circle.complete {
  background-color: black;
}

.circle.complete p {
  position: relative; 
  color: white;
  font-size: 1.8rem;
}

main button {
  display: inline;
}

.word {
  display: inline-block; /* Essential for transform to work */
  transition: transform 0.5s ease; 
}

.word:disabled {
  cursor: none;
}

.container.story {
  padding-bottom: 10rem;
}

</style>
