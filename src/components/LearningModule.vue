<template>
    <section class="modules">
        <ul>
            <li class="module inactive" v-for="module in modules" :key="module">
                <button @click="startModule(module, $event)" class="module-trigger">{{ moduleNameToLongNameMap[module] }}</button>
                <!-- <div class="content" v-if="module === activeModule && step > 0">
                    <span class="step-indicator">
                        {{ step }} / {{ moduleSteps[module] }}
                    </span>
                    <div class="step">
                        <p>This is the content for {{ module }}.</p>
                        <p>La la la </p>
                        <p>La la la </p>
                    </div>
                </div> -->
                <!-- <footer>
                    <button class="step-button" :disabled="step <= 1" v-on:click="updateStep(-1)">←</button>
                    <button class="step-button" v-if="isLastStep()" v-on:click="completeModule(module)">Complete {{
                        module }}</button>
                    <button class="step-button" :disabled="isLastStep()" v-else
                        v-on:click="updateStep(1)">→</button>
                </footer> -->
            </li>
        </ul>
        <!-- <ModuleTimer v-if="displayTimer()" @activateModule="activateModules" :frequency="frequency" :timeStarted="timeStarted" />
        <button class="button" @click="resetAll">reset all</button> -->
    </section>
</template>
<script>
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency';
import ModuleTimer from './ModuleTimer.vue';

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

export default {
    name: 'LearningModule',
    data() {
        return {
            step: 0,
            modules: Object.keys(moduleToStoreMap),
            activeModule: 'verbs',
            shouldModuleBeActive: true,
            timeStarted: null,
            moduleSteps: {
                'pronouns': 4,
                'nouns': 2,
                'verbs': 5,
            },
            moduleNameToLongNameMap: moduleNameToLongNameMap,
            frequency: learningFrequency().frequency
        }
    },
    components: {
        ModuleTimer
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
    emits: ["completeModule"],
    methods: {
        resetAll() {
            localStorage.clear()
            this.shouldModuleBeActive = true;
            this.timeStarted = null;
            this.step = 1;
            this.activeModule = null;
        },
        isModuleActive(module) {
            if (this.shouldModuleBeActive) {
                const progress = localStorage.getItem('moduleProgress');
                if (progress) {
                    const parsedProgress = JSON.parse(progress);
                    return !parsedProgress[moduleToStoreMap[module]];
                }
                return this.shouldModuleBeActive;
            }
            return false;
        },
        activateModules() {
            this.timeStarted = null;
            this.shouldModuleBeActive = true;
            localStorage.setItem('timerOn', false);
        },
        displayTimer() {
            if (localStorage.getItem('timerOn')) {
                return true;
            }        
            return !this.shouldModuleBeActive
        },
        updateStep(direction) {
            let activeModule = this.activeModule;
            // get total steps for active module
            let totalSteps = this.moduleSteps[activeModule];
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
        completeModule(module) {
            const store = moduleProgress();
            store.completeModule(moduleToStoreMap[module]);
            console.log(`${module} completed!`);

            localStorage.setItem('moduleProgress', JSON.stringify(store.moduleProgress));
            this.activeModule = null;
            this.shouldModuleBeActive = false;
            this.step = 1;
            this.timeStarted = new Date().getTime();
            localStorage.setItem('timerOn', true);
            this.$emit('completeModule', module);
        },
        isLastStep() {
            let activeModule = this.activeModule;
            let totalSteps = this.moduleSteps[activeModule];
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

.modules li {
    font-family: 'Ojuju', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 4.8rem;
    height: inherit;
    border-radius: 50%;
    border: 1px solid black;
    width: 2em;
    height: 2em;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
}

li.module {
    transition: all 0.3s ease-in-out;
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

/* grow to the size of .circle */
li.module.active {
    transform: scale(5);
}

@keyframes float {
  from {
    transform: rotate(0deg) translate3d(0.2em, 0, 0.05em) rotate(0deg);
  }

  to {
    transform: rotate(360deg) translate3d(0.2em, 0, 0.05em) rotate(-360deg);
  }
}

.step-button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease-in-out;
    margin: 0 0.5rem 0 0.5rem;
}

.module-trigger {
    all: unset;
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
    max-width: 80%;
    height: 100%;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.module-trigger:hover {
    transform: scale(1.1);
}

.module .content {
    font-size: 1.6rem;
    border-bottom: 2px solid black;
}

footer {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.step-indicator {
    font-size: 1.2rem;
    font-weight: 300;
    width: inherit;
    display: flex;
    justify-content: end;
    margin: 0.4rem 1.1rem 0 0;
    color: rgba(0, 0, 0, 0.6)
}

.step {
    margin: 0.4rem;
}

li.module:nth-of-type(1) {
    left: 20%;
    top: 0;
}
</style>
