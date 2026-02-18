<script>
import LearningModule from '../components/LearningModule.vue'
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency'
import { verbs, pronouns, nouns, miscTwo, allWords, adjectivesAdverbs, misc, nounsTwo, verbsTwo, verbsThree } from '../words'
import { storeToModuleMap } from '@/constants'

function handleTranslation(word, translation, el) {
  const translationToUse = {
    "1": {
        "6": "me",
        "12": "my",
        "18": "me"
    },
    "2": {
      "52": "she says",
      "64": "she says",
      "78": "world",
      "106": "she says",
      "130": "she says",
      "136": "she says",
    },
    "3": {
      "24": "it",
      "28": "it says",
      "36": "world",
      "50": "she",
      "58": "it said",
      "80": "its",
      "82": "it",
      "96": "it",
      "104": "it",
      "118": "it",
      "126": "it",
      "140": "it",
      "148": "it",
      "162": "it",
      "170": "it",
      "178": "it",
      "186": "it",
      "194": "it",
      "202": "it",
      "210": "it",
      "214": "it",
      "218": "it",
    },
    "4": {
      "30": "she", 
      "38": "she", 
      "42": "him", 
      "44" : "she", 
      "50": "her", 
      "56": "her", 
      "58": "she", 
    },
    "5": {
      "24": "she",
      "54": "she says",
      "62": "she",
      "98": "he",
      "142": "he",
      "154": "he",
      "164": "he",
      "170": "his",
      "184": "it",
      "198": "it",
      "202": "it",
      "206": "it",
      "214": "it",
    },
    "6": {
      "4": "his",
      "10": "she says",
      "14": "her",
      "20": "his",
      "24": "he",
      "42": "he",
      "48": "his",
      "52": "he says",
      "54": "he",
      "64": "his",
      "72": "she",
      "78": "her",
      "80": "she",
      "88": "she says",
      "90": "she",
      "104": "her",
      "110": "her",
      "118": "she says",
      "120": "she",
      "126": "she",
      "138": "her",
      "156": "he",
      "168": "she",
      "170": "she",
      "172": "she",
      "174": "she",
    },
    "7": {
      "4": "she",
      "12": "her",
      "28": "it",
      "44": "it",
      "54": "it",
      "70": "it",
      "80": "it",
      "96": "it",
      "106": "it",
      "122": "it",
      "134": "it",
      "150": "it",
      "162": "its",
      "166": "it",
      "176": "it",
      "180": "it",
    },
    "8": {
      "6": "it",
      "12": "it says",
      "30": "it says",
      "32": "na me",
    },
    "9": {
      "4" : "she",
      "8" : "she",
      "16": "life",
      "18" : "her",
      "30": "come",
      "36" : "she",
      "50" : "she",
      "60": "come",
      "58" : "she",
      "74" : "her",
      "80": "she",
    },
    "10": {
      "6": "it",
      "28": "he",
      "40": "it",
    },
    "11": {
      "14": "he",
      "18": "her",
      "20": "she",
      "28": "she",
      "40": "she",
      "52": "she",
      "56": "she",
      "94": "her",
      "98": "he",
      "142": "her",
      "136": "her",
    }
  }
  const parent = el.parentElement;
  if (parent.tagName === 'P') {  
    let index = parent.dataset.index;
    if ((index === '2' || index === '10') && word === 'wà') return 'come';
    if (translation === 'brother/sister') return 'brother';
    if ((index === '3' || index === '6') && word === 'wà') return 'will'
    let childIndex = el.dataset.index;

    let chosenTranslation = translationToUse[index][childIndex];
    if (chosenTranslation) return chosenTranslation;
  }
  return translation;
}
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
                // Preserve inline elements like <i> and <sup> by walking child nodes
                let globalIndex = 0;
                const parts = Array.from(paragraph.childNodes).flatMap(node => {
                  if (node.nodeType === Node.TEXT_NODE) {
                    // split text nodes into words + separators
                    return node.textContent.split(/(\s+)/).map(part => {
                      // keep empty parts (can happen) but still increment index
                      if (part === '') {
                        globalIndex++;
                        return part;
                      }
                      const cleanedPart = part.trim().toLowerCase().replace(/[.,!?;:"]/g, '');
                      const translation = allWords[cleanedPart];
                      if (translation && part.trim() !== '') {
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
                                      : Object.keys(verbsThree).includes(cleanedPart)
                                        ? 'verbs_three'
                                        : Object.keys(miscTwo).includes(cleanedPart)
                                          ? 'misc_two'
                                      : 'word';
                        const out = `<button disabled="true" data-index="${globalIndex}" class="${highlightClass} word">${part}</button>`;
                        globalIndex++;
                        return out;
                      }
                      globalIndex++;
                      return part;
                    });
                  } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // preserve element exactly (e.g. <i>, <sup>) and count as one item
                    const out = node.outerHTML;
                    globalIndex++;
                    return out;
                  }
                  // ignore other node types but don't change indexing logic
                  globalIndex++;
                  return '';
                });
      
                paragraph.innerHTML = parts.join('');
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
        case 'verbs_three': 
          wordsToHighlight = verbsThree;
          break;
        case 'misc_two':
          wordsToHighlight = miscTwo;
          break;
      }
      moduleElements.forEach(el => {
          const isUppercase = el.textContent[0] === el.textContent[0].toUpperCase();
          const text = el.textContent.trim().toLowerCase();
          // split word from punctuation safely
          // This line is already present and handles the word/punctuation split
          const match = text.match(/^([\p{L}]+(?:-[\p{L}]+)*)([.,!?;:]*)$/u);
          const word = match ? match[1] : text;
          const punctuation = match ? match[2] : '';
          let translation;
          if (word === 'ni') {
            // get word right after
            let nextSib = el.nextElementSibling?.textContent.replace(/([.,!?;:]*)$/u, '');
            if (nextSib === 'isabatu' || nextSib === 'ẹwu' || nextSib === 'shirt'|| nextSib === 'shoe') {
              translation = 'wear'
            }
            else if (nextSib === 'origho') {
              translation = 'on';
            } else translation = 'in';
          } else if (word === 'tsi') {
            let nextSib = el.nextElementSibling?.textContent.replace(/([.,!?;:]*)$/u, '');
              if (nextSib === 'abẹtẹ' || nextSib === 'alẹ' || nextSib === 'room' || nextSib === 'ground') {
                translation = 'towards'
              } else {
                translation = 'before';
              }
          } else if (word === 'jẹ') {
              let nextSib = el.nextElementSibling?.textContent.replace(/([.,!?;:]*)$/u, '');
              if (nextSib === 'di' || nextSib == 'let') {
                translation = 'allow';
              }
              else translation = 'accept';
          } else {
            translation = wordsToHighlight[word] || text;
            if (translation.includes('/')) {
              // there's multiple meanings to choose from e.g he/she/it
              translation = handleTranslation(word, translation, el);
            }
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
        this.allModulesCompleted = false;
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
          <p data-index="1">
            Mai retin mi. Ọ́má ghaan<sup><a class="footnote-link" id="ref1" href="#fn1">[1]</a></sup> mi.
            Aghan retin mi di èmi<sup><a class="footnote-link" id="ref2" href="#fn2">[2]</a></sup> gin gbẹ aghan.
          </p>
          <p data-index="2">
            Ọnobirẹn ọkan ti a kpe Ọlikpẹrẹbu.
            Éè nẹ ajá Itsẹkiri kì ajá Itsẹkiri<sup><a class="footnote-link" id="ref3" href="#fn3">[3]</a></sup> tee wà gbaa bẹ ọnobirẹn wee,
            gin aghan fẹ gba tse obirẹn<sup><a class="footnote-link" id="ref4" href="#fn4">[4]</a></sup>, ain éè jẹ. 
            Èyí ma bà ain éè jẹ.
            Ubo kì ubo ni ẹye wee dede,
            ajá Itsẹkiri kì ajá Itsẹkiri dede wà<sup><a class="footnote-link" id="ref5" href="#fn5">[5]</a></sup> gbaa<sup><a class="footnote-link" id="ref6" href="#fn6">[6]</a></sup> ri ọnobirẹn wee ain éè jẹ.
            Nikọ rẹ tse ti wo gba gin éè jẹ? Ain éè jẹ, ain éè fẹ aghan kì aghan.
          </p> 
          <p data-index="3">
            Ọjọ ọkan ẹgualẹ ọkan ni inọ oko ti a kpe Oribiti.
            O<sup><a class="footnote-link" id="ref7" href="fn7">[7]</a></sup> gbo.
            Ain ọnobirẹn bokọ ni ẹye wee, ọnobirẹn ti a bẹ ti o gin éè jẹ? Ain mo wà tó uwẹrẹ.
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
            O rè, o gin o wà bà ọnobirẹn Ọlikpẹrẹbu wee.
          </p>

          <p data-index="4">
            Ọnobirẹn wee de gẹrẹ sẹngua.
            Ọnobirẹn wee Ọlikpẹrẹbu ghele olikperebu<sup><a class="footnote-link" id="ref8" href="#fn8">[8]</a></sup>.

            Ọnobirẹn Ọlikpẹrẹbu gbaa ri, o sá gbaa buru, o dinma ro.
            O kpe iyẹ ro biri ọwa ro, o gin èyí ọkọ ti ' èmi fẹ dọ.
          </p>
          <p data-index="5">
            Iyọ! A gin " èyí ọnọkẹrẹn ti wo fẹ dọ? "
            O gin " èyí ọnọkẹrẹn ti ' èmi fẹ dọ oo. "
            Wo desin tsi?
            Ain èyí ọnọkẹrẹn ti o fẹ dọ.
            A gin osan oo.
            Ẹgualẹ wee gba wọ ' ulí, a kin, a mu___gbẹ<sup><a class="footnote-link" id="ref9" href="#fn9">[9]</a></sup> ọjẹ.
            O gin éè te jẹrun, gin di ' a gbe ọjẹ wee, di ' a gbe-tsi abẹtẹ wee.
            A gbe-tsi abẹtẹ wee.
            O gba tsọn èyí tsọn èyí.
            O wọ inọ abẹtẹ wee, o dá ara ro gba dá ẹgualẹ wee Oribiti wee.
            O da ọjẹ wee tsi alẹ wee, o la, o la, o la jẹ̀ kuro.
            O dá tsitsi irẹye.
          </p>

          <p data-index="6">
            Aya ro gin 'ehen'! Ain ọkọ ro jẹ ọjẹ ro kuro.
            O gba kani uwẹrẹ gba tó tsitsi orun bọbọ.
            O kpe ana ro ghaan,
            ain o fẹ rè ulí rẹẹn o.
            Ọnobirẹn wee gege o din ẹrun ro,
            o gbe ni origho, ain o wà lele bà rè.

            Iyọ! Iyẹ ro biri ọwa ro gin máà rè, ain o wà rè, o wà lele bà rè.

            Omere ro Akpofi ri ẹgualẹ wee ni abẹtẹ wee tsi. 
            O gin Ọlikpẹrẹbu.
            Ọlikpẹrẹbu éè retin, o gin o wà lele bà rè.
        </p>
        <p data-index="7">
            Ti o gbaa rè, omere ro ọnọkẹrẹn kaka lele, kaka lele ni ẹyin.

            O gbaa tó ubo ti ọl- aṣọ<sup><a class="footnote-link" id="ref10" href="fn10">[10]</a></sup> gha, o mu___gbẹ aṣọ ọl- aṣọ.

            O gbaa tó ubo ti ọl- ẹsẹn  gha, o mu___gbẹ ẹsẹn ọl- ẹsẹn.

            O gbaa tó ubo ti ọl- ẹwọ gha, o mu___gbẹ ẹwọ ọl- ẹwọ.

            O gbaa tó ubo ti ọl- origho gha, o mu___gbẹ origho gbẹ ọl- origho.
            O gbaa tó ubo ti ọl- ẹju gha, o mu___gbẹ ẹju ọl- ẹju.

            Ara ro dede o dá, ẹwu biri aṣọ o kó-tsi.
            
            O dá ẹgualẹ.
          </p>

          <p data-index="8">
            Ẹru-ka-ba Ọlikpẹrẹbu.
            Ẹgualẹ wee kpe, ain Ọlikpẹrẹbu wo ' éè rè ubo kì ubo,
            ain owún biri uwọ oo.
            Wo ' éè rè ubo kì ubo.
          </p>
          <p data-index="9">
            Ọlikpẹrẹbu, o sọn.
            O gin " èyí ẹye ro re oo. "
            Ọrọnrọn irẹye wà gbaa bẹ.
            O gin éè jẹ.
            Éè forijẹ.
            Eh! O jẹ gin ọribiti o wà dọ.
            Ẹgualẹ wee ka din ẹsẹn ro gba egin.
            O kani uwẹrẹ.
          </p>
          <p data-index="10">
            Ira ti o wà, ti ẹgualẹ rè ubo bọbọ,
            Akpofi wà kuri oko. 
            O ri Ọlikpẹrẹbu din gba egin.
            O nẹ ọ̀mà ti urun burukun ma tsi,
            ọ̀mà wee ka lù <i>gbangan</i>.
            Ẹgualẹ wee ka gbo.
          </p>
          <p data-index="11">
            Akpofi gba obobo kuri egin wee.
            O mu___gbẹ ro.

            O kó obobo wee, o kó titi ni ọ̀mà wee.
            O kó titi ni ọ̀mà wee, o kó titi ni ọ̀mà wee.

            Obobo wee ti a mu___ni<sup><a class="footnote-link" id="ref11" href="fn11">[11]</a></sup> ọ̀mà wee, éè jẹ di ọ̀mà wee do lù.

            Omere ro rè, o bọ Ọlikpẹrẹbu.
            Ọlikpẹrẹbu sa, Ọlikpẹrẹbu sa, Ọlikpẹrẹbu sa.

            Aghan gba sá kẹkẹkẹkẹ, a tó ubo wee ti iyẹ ro biri ọwa ro gha<sup><a class="footnote-link" id="ref12" href="fn12">[12]</a></sup>, Ọlikpẹrẹbu tsibu.
          </p>
        <div class="footnotes" v-if="allModulesCompleted">
          <hr>
          <ol>
              <li id="fn1">
                When 'ghaan' is used, the preceding word becomes plural. 
                <a class="footnote-link" href="#ref1" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn2">
                Whenever two vowels meet, the first vowel is ignored and the words join and are said together.
                `di èmi` becomes `dèmi`, `ti a kpe` becomes `ta kpe.` This pattern was not adhered to on this site 
                because I wanted to preserve the full words for learning purposes.
                  <a class="footnote-link" href="#ref2" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn3">
                When `kì` is used as in `ajá Itsẹkiri kì ajá Itsẹkiri`, it turns the meaning of the reduplication into 'any.'
                So `ajá Itsẹkiri kì ajá Itsẹkiri` becomes 'any/every Itsẹkiri town.'
                <a class="footnote-link" href="#ref3" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn4">
                'obirẹn' and 'aya' both mean wife but 'obirẹn' is used as a representation 
                of the role, not to address a married woman.
                <a class="footnote-link" href="#ref4" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn5">
                Some words like `wà` have the same spelling, different meanings based on context.
                <a class="footnote-link" href="#ref5" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn6">
                When you see or hear `gbaa` it means the preceding action is present continuous.
                <a class="footnote-link" href="#ref6" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn7">
                Itsẹkiri does not have gendered pronouns. Meaning is gleaned through context.
                <a class="footnote-link" href="#ref7" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn8">
                In this story, 'Ọlikpẹrẹbu' is the akpuja (nickname) of the main character, it translates roughly to 
                "a woman who has it all."
                <a class="footnote-link" href="#ref8" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn9">
                The word for 'give,' mu___gbẹ is meant to be broken up with the thing being given in the middle 
                when written correctly. e.g `mu ọjẹ gbẹ` or `mu ẹsẹn gbẹ`
                <a class="footnote-link" href="#ref9" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn10">
                To indicate 'owner of something' like 'owner of cloth', the word for owner
                `ọl` combines with the item `aṣọ`. So it should be written as `ọlaṣọ.` Another
                example is `ọlẹsẹn` (owner of leg). 
                <a class="footnote-link" href="#ref10" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn11">
                `mu___ni` follows the same pattern as `mu___gbẹ` e.g `mu aṣọ ni`
                <a class="footnote-link" href="#ref11" title="Return to text">&#8617;</a> 
              </li>
              <li id="fn12">
                `gha` is best translated into Pidgin English. Meaning the location of a thing, where something is.
                `bokọ wo gha?` is like "where are you?"
                <a class="footnote-link" href="#ref12" title="Return to text">&#8617;</a> 
              </li>
          </ol>
        </div>
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
  display: inline-block;
}


fieldset button {
  margin-top: 1rem;
}

.pronouns, .verbs,
.nouns, .misc, .misc_two
.adjectives_adverbs, .nouns_two,
.verbs_two, .verbs_three {
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

.circle sup {
  display: none;
}

.circle.complete {
  background-color: black;
}

.circle.complete sup {
  display: inline-block;
}

.circle.complete p {
  position: relative; 
  color: white;
  font-size: 1.8rem;
}

hr {
  color: white;
}

.footnotes li {
  font-size: 1rem !important;
  color: white;
}

.footnote-link, .footnote-link:visited, .footnote-link:active, .footnote-link:focus {
  color: white;
  text-decoration: none;
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
