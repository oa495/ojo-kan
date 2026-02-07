<template>
    <section class="modules">
        <ul>
            <li class="module inactive" v-for="module in modules" :key="module" :id="module">
                <button :disabled="!isModuleActive(module)" @click="startModule(module, $event)" class="module-trigger">
                    <span v-if="module === activeModule">X</span>
                    <span v-else>{{ moduleNameToLongNameMap[module] }}</span>
                </button>
                <div class="content" v-if="module === activeModule && step > 0">
                    <span class="step-indicator">
                        {{ step }} / {{ moduleStepsCount[module] }}
                    </span>
                    <ul class="steps">
                        <li class="step" v-for="(partitionedStepContent, partitionedStepContentIndex) in partitionedStepContent(module)" :key="partitionedStepContentIndex"
                        v-show="step === partitionedStepContentIndex + 1"
                        >
                            <table>
                                <tr class="row" v-for="(translation, itsekiriWord) in partitionedStepContent" :key="itsekiriWord">
                                    <td> <span class="word itsekiri">{{ itsekiriWord }}</span></td>
                                    <td>&rarr;</td>
                                    <td class="word"><span>{{ translation }}</span></td>
                                </tr>
                            </table>
                        </li>
                        <li v-if="step === moduleStepsCount[module]">
                            <MiniQuiz @passModule="passModule" :stepContent="stepContent(module)" @completeModule="completeModule" />
                        </li>
                    </ul>
                    <footer>
                        <button aria-label="Previous step" class="step-button button" :disabled="step <= 1 ? true : false" v-on:click="updateStep(-1)">←</button>
                       <button class="step-button button" v-if="isLastStep()" :disabled="!modulePassed ? true : false" @click="completeModule(module, $event)">Complete</button>
                        <button aria-label="Next step" class="step-button button" :disabled="isLastStep()" v-else
                            v-on:click="updateStep(1)">→</button>
                    </footer>
                </div>
     
            </li>
        </ul>
    </section>
    <span v-if="!scrolled" class="down-arrow">&darr;</span>
    <div class="module-timer-container">
        <ModuleTimer v-if="displayTimer" @activateModule="activateModules" :timeStarted="timeStarted" />
        <button class="button" @click="resetAll">Reset Modules</button>
    </div>
</template>
<script>
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency';
import ModuleTimer from './ModuleTimer.vue';
import { verbs, pronouns, nouns, misc, adjectives_adverbs } from '../words'
import MiniQuiz from './MiniQuiz.vue';
import { moduleToStoreMap, moduleNameToLongNameMap } from '@/constants'

function generateRandomPositionsOutsideCircle({ count }) {
  const positions = [];
  const radius = 65; // percentage; 0 is center of circle, 50 is on circumference, 55 is slightly outside

  for (let i = 0; i < count; i++) {
    const baseAngle = (i / count) * Math.PI * 2;
    const angle = baseAngle + Math.random() * (1.2 / count) * Math.PI;

    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    positions.push({ x, y });
  }
  return shuffleArray(positions);
}

function placeModules() {
  const modules = document.querySelectorAll("li.module");

  const positions = generateRandomPositionsOutsideCircle({
    count: modules.length
  });

  modules.forEach((module, index) => {
    module.style.left = `${Math.min(positions[index].x, 80)}%`;
    module.style.top = `${Math.min(positions[index].y, 100)}%`;
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function partitionProperties(obj, partsCount) {
  // 1. Convert the object's properties into an array of [key, value] entries
  const entries = Object.entries(obj); //
  const totalEntries = entries.length;
  const parts = [];

  // 2. Iterate and use slice to divide the entries into N chunks
  for (let i = 1, start = 0; i <= partsCount; ++i) {
    // Calculate the end index for each slice
    // Using bitwise OR 0 ( | 0) is a fast way to get an integer part (floor)
    const end = (i / partsCount * totalEntries) | 0;

    // 3. Slice the array of entries and convert each chunk back to an object
    const chunk = entries.slice(start, end);
    parts.push(Object.fromEntries(chunk)); //

    start = end;
  }

  return parts;
}

function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}


export default {
    name: 'LearningModule',
    data() {
        return {
            step: 0,
            modules: Object.keys(moduleToStoreMap),
            activeModule: null,
            shouldModuleBeActive: true,
            timeStarted: null,
            reset: false,
            moduleStepsCount: {
                'pronouns': Math.round(Object.keys(pronouns).length / 4) + 1,
                'nouns': Math.round(Object.keys(nouns).length / 4) + 1,
                'verbs': Math.round(Object.keys(verbs).length / 4) + 1,
                'misc': Math.round(Object.keys(misc).length / 4) + 1,
                'adjectives_adverbs': Math.round(Object.keys(adjectives_adverbs).length / 4) + 1
            },
            moduleNameToLongNameMap: moduleNameToLongNameMap,
            frequency: learningFrequency().frequency,
            modulePassed: false,
            handleResize: null,
        }
    },
    props: {
        scrolled: Boolean
    },
    components: {
        ModuleTimer,
        MiniQuiz
    },
    emits: ["completeModule", "reset", "moduleActive"],
    created() {
        this.handleResize = throttle(() => {
            this.resizeModule();
        }, 200);
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    mounted() {
        placeModules();
        // set time started if timer is on
        const timerState = localStorage.getItem('timerOn');
        if (timerState && timerState === 'true') {
            const timeStarted = localStorage.getItem('lastModuleFinishedTimestamp');
            if (timeStarted) this.timeStarted = parseInt(timeStarted);
        }
    },
    computed: {
        isModuleActive() {
             return (module) => {
                if (this.reset) {
                    return true;
                }
                /*
                    The possible cases:
                    - Flow has just started, all modules active
                    - flow has started and a module has been selected, others are inactive
                    - A module has been completed so all modules are inactive, timer is on
                    - timer is off check module progress
                    - reload, timer is on
                */
                // if timer is on then no modules should be active
                if (this.displayTimer) return false;

                // if this is false that means we have finished a module
                if (!this.shouldModuleBeActive) {
                    // if timer is on then no modules should be active
                    // if timer is off then it's time to reactivate
                    // check localstorage, some modules may be completed
                    const progress = localStorage.getItem('moduleProgress');
                    if (progress) {
                        const parsedProgress = JSON.parse(progress);
                        return !parsedProgress[moduleToStoreMap[module]];
                    }
                } else {
                    // either we are just starting or the timer just went off or 
                    // we have started and haven't finished a module
                    // no module has been started yet or we're resetting
                    if (this.activeModule === null) {
                        // module has been finished before
                        const progress = localStorage.getItem('moduleProgress');
                        if (progress) {
                            const parsedProgress = JSON.parse(progress);
                            return !parsedProgress[moduleToStoreMap[module]];
                        }
                        // no progress captured, all modules can be active
                        return true;
                    }
                    else if (module === this.activeModule) { // activeModule is not null so only "activate" the active module
                        return true;
                    } 
                    return false;
                }
                return false;
            }
        },
        displayTimer() {
            return this.timeStarted;
        },
    },
    methods: {
        resizeModule() {
            const activeModule = document.querySelector('.module.active');
            if (!activeModule) return;
            const targetElement = document.querySelector('.modules');            
            this.growToEl(targetElement, activeModule);
        },
        partitionedStepContent(module) {
            const steps = this.moduleStepsCount[module];
            if (module === 'pronouns') {
                return partitionProperties(pronouns, steps - 1);
            } else if (module === 'nouns') {
               return partitionProperties(nouns, steps - 1);
            } else if (module === 'verbs') {
                return partitionProperties(verbs, steps - 1);
            }
            else if (module === 'misc') {
                return partitionProperties(misc, steps - 1);
            } else if (module === 'adjectives_adverbs') {
                return partitionProperties(adjectives_adverbs, steps - 1);
            }
            return content;
        },
        stepContent(module) {
            if (module === 'pronouns') {
                return pronouns;
            } else if (module === 'nouns') {
               return nouns;
            } else if (module === 'verbs') {
                return verbs;
            } else if (module === 'misc') {
                return misc;
            } else if (module === 'adjectives_adverbs') {
                return adjectives_adverbs;
            }
        },
        resetAll() {
            this.shouldModuleBeActive = true;
            this.timeStarted = null;

            localStorage.clear();
            this.step = 1;
            this.activeModule = null;
            this.modulePassed = false;
            let store = moduleProgress();
            store.resetAllProgress();
            this.$emit('reset', true);
            this.reset = true;
        },
        activateModules() {
            this.reset = false;
            this.timeStarted = null;
            this.shouldModuleBeActive = true;
            localStorage.removeItem('timerOn');
        },
        updateStep(direction) {
            let activeModule = this.activeModule;
            // get total steps for active module
            let totalSteps = this.moduleStepsCount[activeModule];
            if (direction === -1) {
                if (this.step <= 1) return;
                this.step -= 1;
                if (this.step == 0) {
                    // set focus so it's not lost

                }
            } else {
                if (this.step >= totalSteps) return;
                this.step += 1;
            }
        },
        startModule(module, event) {
            this.reset = false;
            if (this.activeModule === module) {
                this.activeModule = null;
                this.shrinkElement(event.target);
                this.$emit('moduleActive', false);
            } else {
                this.activeModule = module;
                this.growElement(event.target);
                this.$emit('moduleActive', true);
            }
            this.step = 1;
        },
        shrinkElement(el) {
            // Get element
            const element = el;
            // Find the closest li ancestor
            const liElement = element.closest('li.module');
            liElement.classList.remove('active');
            liElement.classList.add('inactive');

            // Reset styles
            liElement.style.width = '';
            liElement.style.height = '';
        },
        growElement(el) {
            // Get element
            const element = el;
            // Find the closest li ancestor
            const liElement = element.closest('li.module');
            liElement.classList.remove('inactive');
            liElement.classList.add('active');

            // Get the computed dimensions of the target element using getBoundingClientRect()
            // This provides precise, floating-point values for the total rendered width and height
            const targetElement = document.querySelector('.modules');
            const elementToGrow = liElement;
            
            this.growToEl(targetElement, elementToGrow);
        },
        growToEl(targetElement, elementToGrow) {           
            const targetDimensions = targetElement.getBoundingClientRect();
            const targetWidth = targetDimensions.width;
            const targetHeight = targetDimensions.height;

            // Apply the retrieved dimensions to the element to grow
            // We must append 'px' to the numeric values when setting the style properties
            elementToGrow.style.width = `${targetWidth}px`;
            elementToGrow.style.height = `${targetHeight}px`;   
        },
        passModule() {
            this.modulePassed = true;
        },
        completeModule(module, event) {
            // get progress from localstorage and update store (which does not persist on reload)
            const progress = localStorage.getItem('moduleProgress');
            const store = moduleProgress();

            let parsedProgress;
            if (progress) {
                parsedProgress = JSON.parse(progress);
                for (let module in parsedProgress) {
                    if (parsedProgress[module] === true) {
                        store.completeModule(module);
                    }
                }
            }
            let moduleStoreName = moduleToStoreMap[module];
            store.completeModule(moduleStoreName);
            console.log(`${module} completed!`);
            localStorage.setItem('moduleProgress', JSON.stringify(store.moduleProgress));
            
            this.activeModule = null;
            this.shouldModuleBeActive = false;
            this.modulePassed = false;
            this.step = 1;

            // if all modules completed
            if (!store.allModulesCompleted()) {
                this.timeStarted = new Date().getTime();
                localStorage.setItem('timerOn', true);
            }
           
            this.$emit('completeModule', moduleStoreName, module);
            this.shrinkElement(event.target);
        },
        isLastStep() {
            let activeModule = this.activeModule;
            let totalSteps = this.moduleStepsCount[activeModule];
            return this.step === totalSteps;
        }
    },
}

</script>
<style scoped>
table {
    width: 100%;
    table-layout: fixed;
}

.modules ul {
    height: inherit;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
}

.modules {
  position: absolute;
  height: 100%;
  width: 100%;
}

.modules .module {
    width: 8em;
    height: 8em;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 50%;
    border: 1px solid black;
}

li.module {
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, left 0.3s ease-in-out, top 0.3s ease-in-out;
    z-index: 99;
}

.module.active {
    z-index: 1000;
    left: unset !important;
    top: unset !important;
}

.module.active .module-trigger {
    width: unset;
    height: unset;
    font-size: 2rem;
    font-weight: 700;
}

li.module.inactive {
    animation: float calc(var(--vue-timing)*4) linear infinite;
    -webkit-animation: float calc(var(--vue-timing)*4) linear infinite;
}

li.module:has(.module-trigger:disabled) {
    opacity: 0.5;
}

.module-trigger {
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    width: 80%;
    height: 80%;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.module-trigger:disabled {
    cursor: not-allowed;
}

.module-trigger:hover {
    transform: scale(1.1);
}

@keyframes float {
  from {
    transform: rotate(0deg) translate3d(0.2em, 0, 0.05em) rotate(0deg);
  }

  to {
    transform: rotate(360deg) translate3d(0.2em, 0, 0.05em) rotate(-360deg);
  }
}

@keyframes down {
    0%, 100% { 
        transform: translateY(-0.2em);
    }

    50% {
        transform: translateY(0.2em);
    }
}

.down-arrow {
    font-size: 1.6rem;
    margin-bottom: 1.5em;
    animation: down 4s linear infinite;
    -webkit-animation: down 4s linear infinite;
}

.module .content {
    font-size: 1.6rem;
    height: 70%;
    width: 70%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

footer {
    width: 92%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.8rem;
}

.step-indicator {
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0.4rem 1.6rem 0 0;
    color: rgba(0, 0, 0, 0.6);
    align-self: flex-end;
}

.steps {
    margin: 0.4rem;
    width: 100%;
    min-height: 80%;
}

.step {
    display: grid;
    font-size: 1.4em;
    max-height: 70%;
    overflow-y: scroll;
    scrollbar-color: black transparent;
    scrollbar-width: thin;
}

.step-button {
    font-size: 1.2rem;
    transition: all 0.3s ease-in-out;
    margin: 0 0.5rem 0 0.5rem;
    width: fit-content;
}

.module-timer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 99;
}

.row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2em;
}

.word {
    padding: 0 1em;
}

.word.itsekiri {
    border-bottom: 1px dashed;
}

@media (max-width: 800px) {
  .modules .module {
    min-width: 6em;
    min-height: 6em;
    font-size: 0.8em;
  }

  .module .content {
    font-size: 1.4em;
  }

  table {
    margin: auto;
  }
}

@media (max-width: 500px) {
  footer {
    width: auto;
  }
}


</style>
