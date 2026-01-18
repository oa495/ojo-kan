<template>
    <section class="modules">
        <ul>
            <li class="module inactive" v-for="module in modules" :key="module">
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
                                    <span class="word itsekiri"><td>{{ itsekiriWord }}</td></span>
                                    <span>&rarr;</span>
                                    <span class="word"><td>{{ translation }}</td></span>
                                </tr>
                            </table>
                        </li>
                        <li v-if="step === moduleStepsCount[module]">
                            <MiniQuiz @passModule="passModule" :stepContent="stepContent(module)" />
                        </li>
                    </ul>
                    <footer>
                        <button class="step-button button" :disabled="step <= 1 ? true : false" v-on:click="updateStep(-1)">←</button>
                       <button class="step-button button" v-if="isLastStep()" :disabled="!modulePassed ? true : false" @click="completeModule(module, $event)">Complete {{
                            module }}</button>
                        <button class="step-button button" :disabled="isLastStep()" v-else
                            v-on:click="updateStep(1)">→</button>
                    </footer>
                </div>
     
            </li>
        </ul>
    </section>
    <div class="module-timer-container" v-if="displayTimer()" >
        <ModuleTimer @activateModule="activateModules" :frequency="frequency" :timeStarted="timeStarted" />
        <button class="button" @click="resetAll">Reset Modules</button>
    </div>
</template>
<script>
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency';
import ModuleTimer from './ModuleTimer.vue';
import { verbs, pronouns, nouns } from '../words'
import MiniQuiz from './MiniQuiz.vue';

const moduleToStoreMap = {
    'pronouns': 'module1',
    'nouns': 'module2',
    'verbs': 'module3',
};

const moduleNameToLongNameMap = {
    'pronouns': 'Na...',
    'nouns': 'Who you be?',
    'verbs': 'What shall we do today?',
};

function generateRandomPositionsOutsideCircle({
  centerX,
  centerY,
  circleRadius,
  count,
  minOffset = 20,   // minimum distance outside the circle
  maxOffset = 80    // maximum distance outside the circle
}) {
  const positions = [];

  for (let i = 0; i < count; i++) {
     const angle = Math.random() * Math.PI * 2;
    const distance =
      circleRadius +
      minOffset +
      Math.random() * (maxOffset - minOffset);

    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    positions.push({ x, y });
  }

  return positions;
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

export default {
    name: 'LearningModule',
    data() {
        return {
            step: 0,
            modules: Object.keys(moduleToStoreMap),
            activeModule: null,
            shouldModuleBeActive: true,
            timeStarted: null,
            moduleStepsCount: {
                'pronouns': Math.round(Object.keys(pronouns).length / 4) + 1,
                'nouns': Math.round(Object.keys(nouns).length / 4) + 1,
                'verbs': Math.round(Object.keys(verbs).length / 4) + 1,
            },
            moduleNameToLongNameMap: moduleNameToLongNameMap,
            frequency: learningFrequency().frequency,
            modulePassed: false
        }
    },
    components: {
        ModuleTimer,
        MiniQuiz
    },
    mounted() {
        const appDiv = document.querySelector('#app');
        const rect = appDiv.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const circleRadius = rect.width / 2;
        

        const positions = generateRandomPositionsOutsideCircle({
            centerX,
            centerY,
            circleRadius,
            count: 20,
            minOffset: 15,
            maxOffset: 60
        });
        const modules = document.querySelectorAll('li.module');

        modules.forEach((module, index) => {            
            module.style.left = `${positions[index].x}px)`;
            module.style.top = `calc(10% + ${positions[index].y}px)`;
            module.style.transform = 'translate(-50%, -50%)';
        });
    },
    methods: {
        partitionedStepContent(module) {
            const steps = this.moduleStepsCount[module];
            if (module === 'pronouns') {
                return partitionProperties(pronouns, steps - 1);
            } else if (module === 'nouns') {
               return partitionProperties(nouns, steps - 1);
            } else if (module === 'verbs') {
                return partitionProperties(verbs, steps - 1);
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
            }
        },
        resetAll() {
            localStorage.clear()
            this.shouldModuleBeActive = true;
            this.timeStarted = null;
            this.step = 1;
            this.activeModule = null;
            this.modulePassed = false;
        },
        isModuleActive(module) {
            /*
                The possible cases:
                 - Flow has just started, all modules active
                 - flow has started and a module has been selected, others are inactive
                 - A module has been completed so all modules are inactive, timer is on
                 - timer is off check module progress
            */
            // if this is false that means we have finished a module
            if (!this.shouldModuleBeActive) {
                // if timer is on then no modules should be active
                if (this.displayTimer()) return false;
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

                // no module has been started yet
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
        },
        activateModules() {
            this.timeStarted = null;
            this.shouldModuleBeActive = true;
            localStorage.setItem('timerOn', false);
        },
        displayTimer() {
            const timerState = localStorage.getItem('timerOn');
            if (timerState) {
                return timerState === 'true' ? true : false;
            }        
            return !this.shouldModuleBeActive;
        },
        updateStep(direction) {
            let activeModule = this.activeModule;
            // get total steps for active module
            let totalSteps = this.moduleStepsCount[activeModule];
            if (direction === -1) {
                if (this.step <= 1) return;
                this.step -= 1;
            } else {
                if (this.step >= totalSteps) return;
                this.step += 1;
            }
        },
        startModule(module, event) {
            if (this.activeModule === module) {
                this.activeModule = null;
                this.shrinkElement(event.target);
            } else {
                this.activeModule = module;
                this.growElement(event.target);
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
            liElement.style.left = '';
            liElement.style.top = '';
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
            const targetElement = document.querySelector('.circle');
            const elementToGrow = liElement;
            const targetDimensions = targetElement.getBoundingClientRect();
            const targetWidth = targetDimensions.width;
            const targetHeight = targetDimensions.height;

            // Apply the retrieved dimensions to the element to grow
            // We must append 'px' to the numeric values when setting the style properties
            elementToGrow.style.width = `${targetWidth}px`;
            elementToGrow.style.height = `${targetHeight}px`;

            // set position to on top of target element
            elementToGrow.style.left = `${targetDimensions.left + targetWidth / 2}px`;
            elementToGrow.style.top = `${targetDimensions.top + targetHeight / 2}px`;
        },
        passModule() {
            this.modulePassed = true;
        },
        completeModule(module, event) {
            const store = moduleProgress();
            store.completeModule(moduleToStoreMap[module]);
            console.log(`${module} completed!`);
            localStorage.setItem('moduleProgress', JSON.stringify(store.moduleProgress));
            this.activeModule = null;
            this.shouldModuleBeActive = false;
            this.modulePassed = false;
            this.step = 1;
            this.timeStarted = new Date().getTime();
            localStorage.setItem('timerOn', true);
            this.$emit('completeModule', module);
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
<style>
.modules ul {
    height: inherit;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
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
    transition: all 0.3s ease-in-out;
}

.module.active .module-trigger {
    width: unset;
    height: unset;
    font-size: 2rem;
    font-weight: 700;
}

li.module.inactive:nth-of-type(odd) {
    animation: float calc(var(--vue-timing)*14) linear infinite;
    -webkit-animation: float calc(var(--vue-timing)*14) linear infinite;
    animation-direction: reverse;
    -webkit-animation-direction: reverse;
}

li.module.inactive:nth-of-type(even) {
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
    height: inherit;
    font-size: 1.4em;
}

.step-button {
    font-size: 1.2rem;
    transition: all 0.3s ease-in-out;
    margin: 0 0.5rem 0 0.5rem;
    width: fit-content;
}

.module-timer-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: end;
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
</style>
