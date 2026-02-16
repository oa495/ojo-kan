<script>
import LearningModule from '../components/LearningModule.vue'
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency'
import { verbs, pronouns, nouns, allWords, adjectivesAdverbs, misc, nounsTwo, verbsTwo } from '../words'
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
                              : Object.keys(adjectivesAdverbs).includes(cleanedPart)
                                ? 'adjectives_adverbs'
                              : Object.keys(nounsTwo).includes(cleanedPart)
                                ? 'nouns_two'
                              : Object.keys(verbsTwo).includes(cleanedPart)
                                ? 'verbs_two'
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
          wordsToHighlight = adjectivesAdverbs;
          break;
        case 'nouns_two':
          wordsToHighlight = nounsTwo;
          break;
        case 'verbs_two': 
          wordsToHighlight = verbsTwo;
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
          let translation;
          if (word === 'ni') {
            // get word right after
            let nextSib = el.nextElementSibling?.textContent.replace(/([.,!?;:]*)$/u, '');
            if (nextSib === 'isabatu' || nextSib === 'ẹwu' || nextSib === 'shirt'|| nextSib === 'shoe') {
              translation = 'wear'
            }
            else translation = 'in';
          } else if (word === 'tsi') {
            let nextSib = el.nextElementSibling?.textContent.replace(/([.,!?;:]*)$/u, '');
              if (nextSib === 'abẹtẹ' || nextSib === 'alẹ' || nextSib === 'room' || nextSib === 'ground') {
                translation = 'in the way of'
              } else {
                translation = 'before';
              }
          } else {
            translation = wordsToHighlight[word] || text;
          }
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
        Kp'ọjọ
        <span>kp'ọjọ</span>
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
            Mai retin mi. Ọ́má ti ' a bì. Ọ́má ọnobirẹn.
            Ọnọkẹrẹn èyí ma bẹ o gin éè jẹ.
            Ọnọkẹrẹn èyí ma bẹ o gin éè jẹ.
            Ọnọkẹrẹn èyí ma bẹ o gin éè jẹ. 
            Nikọ sin???
            Aghan retin mi di èmi gin gbẹ aghan.
          </p>
          <p>
            Ọmẹtiẹ ọnobirẹn ọkan ti a kpe Ọlikpẹrẹbu.
            Éè nẹ ajá Itsẹkiri kì ajá Itsẹkiri tee wà gbaa bẹ ọ́má wee,
            gin aghan fẹ gba tse obirẹn, ain éè jẹ. 
            Èyí ma bà ain éè jẹ.
            Ubo kì ubo ni ẹye wee dede,
            ajá Itsẹkiri kì ajá Itsẹkiri dede owún wà gbaa ri ọ́má wee ain éè jẹ.
            Nikọ rẹ tse ti wo gba gin éè jẹ? Ain éè jẹ, ain éè fẹ aghan kì aghan.
          </p> 
          <p>
            Ọjọ ọkan ẹgualẹ ọkan ni inọ oko ti a kpe owún Oribiti.
            O gbo.
            Ain ọ́má bokọ ni ẹye wee, ọ́má ọnobirẹn ti a bẹ ti o gin éè jẹ? Ain won wà tó uwẹrẹ.
            Oribiti wee gba rè dá ara ro.

            O gba tó ubo ti ẹsẹn gha, o bí ' ẹsẹn.
            O gba tó ubo ti ẹwọ gha, o bí ' ẹwọ.
            O gba tó ubo ti origho gha, o bí ' origho.
            O gba tó ubo ti ẹju gha, o bí ' ẹju.

            O ni ' ẹwu.
            O ró ' aṣọ.
            O ni ' isabatu. 
            O bí ' ọkpa.
            O bí ' ẹkoro.
            O rè, o gin o wà bà ọmẹtiẹ ọnobirẹn Ọlikpẹrẹbu wee.
          </p>

          <p>
            Ọ́má wee de gẹrẹ sẹngua.
            Ọ́má wee Olikperubu ghele olikperebu.

            Ọmẹtiẹ ọnobirẹn Ọlikpẹrẹbu gba ri, o sá gbaa buru, o dinma ro.
            O kpe iyẹ ro biri ọwa ro, o gin èyí ọkọ ti ' èmi fẹ dọ.
          </p>
          <p>
            Iyọ! A gin "èyí ọnọkẹrẹn ti wo fẹ dọ?"
            O gin èyí ọnọkẹrẹn ti ' èmi fẹ dọ oo.
            Wo desin tsi?
            Ain ọnọkẹrẹn ti o fẹ dọ.
            A gin osan oo.
            Ẹgualẹ wee gba wọ ' ulí, a kin, a mu ọjẹ gbẹẹ.
            O gin éè te jẹrun, gin di ' a gbe ọjẹ wee, di ' a gbe-tsi abẹtẹ wee.
            A gbe-tsi abẹtẹ wee.
            O gba tsọn èyí tsọn èyí.
            O wọ inọ abẹtẹ wee, o dá ara ro gba dá ẹgualẹ wee Oribiti wee.
            O da ọjẹ wee tsi alẹ wee, o la, o la, o la jẹ̀ kuro.
            O dá tsitsi irẹye.
          </p>

          <p>
            Aya ro gin 'ehen'! ain ọkọ ro jẹ ọjẹ ro kuro
            O gba kani uwẹrẹ gba to tsitsi orun bọbọ
            O kpe ana ro ghan
            Ain o fẹ ro li rẹẹn o
            Ọmẹtiẹ ọnobirẹn wee gege o din ẹrun ro,
            o gbe ni origho ain wo wa lele ba re

            Iyo! Iyo ro biri ọwa ro gin do máà re, ain o wà re, o wà lele ba re
            Ti o gba re, omere ro ọnọkẹrẹn kaka lele, kaka lele ni ẹyin

            O gba to ubo ti ọl- aṣọ gha, o mu aṣọ gbẹ ọl- aṣọ.

            O gba to ubo ti ọl- ẹsẹn  gha, o mu ẹsẹn gbẹ ọl- ẹsẹn.

            O gba to ubo ti ọl- ẹwọ gha, o mu ẹwọ gbẹ ọl- ẹwọ.

            O gba to ubo ti ọl- origho gha, o mu origho gbẹ ọl- origho.
            O gba to ubo ti ọl- ẹju gha, o mu ẹju gbẹ ọl- ẹju.

            Ara ro dede o dá, ẹwu biri aṣọ o kó'tsi.
            
            O dá ẹgualẹ.
          </p>

          <p>
            O kpe, ain Ọlikpẹrẹbu wo ' éè rè ubo kì ubo
            Ain owún biri uwọ oo
            Owún biri uwọ rẹn, wo ' éè rè ubo kì ubo.
          </p>
          <p>
            Ọlikpẹrẹbu o sọn
            O gin "eyi ẹye ro re oo"
            Ọrọnrọn irẹye wa gbaa bẹ wun
            O gin wee jẹ
            Éè forijẹ
            Eh! O jẹ gin ọribiti o sin wa dó
            O kani uwẹrẹ
          </p>

          <p>
            Omere ro re, o bọ Ọlikpẹrẹbu, o gba bọ Ọlikpẹrẹbu ké, Ọlikpẹrẹbu sa, Ọlikpẹrẹbu sa, Ọlikpẹrẹbu sa.

            Obobo wee ti a mu-ni ọ̀mà we, éè jẹ di ọ̀mà wee do lù.
            Aghan gba sa kẹkẹkẹkẹ, a tó ubo ti iyẹ ro biri ọwa ro gha, Ọlikpẹrẹbu tsibu.
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

.intro h1 span {
  display: block;
  margin-left: 1em;
  margin-top: 0.1em;
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
  transition: all 0.5s ease; 
}

.word:disabled {
  cursor: none;
}

.container.story {
  padding-bottom: 10rem;
}

@media (max-width: 500px) {
  .intro h1 {
    text-align: center;
  }
}


</style>
