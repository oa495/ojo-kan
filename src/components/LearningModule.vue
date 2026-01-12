<template>
    <section class="modules">
        <ul>
            <li :disabled="!isModuleActive(module)" class="module" v-for="module in modules" :key="module">
                <button class="activate" @click="activateModule(module)">{{ moduleNameToLongNameMap[module] }}</button>
                <div class="content" v-if="module === activeModule && step > 0">
                    <span class="step-indicator">
                        {{ step }} / {{ moduleSteps[module] }}
                    </span>
                    <div class="step">
                        <p>This is the content for {{ module }}.</p>
                        <p>La la la </p>
                        <p>La la la </p>
                    </div>
                    <footer>
                        <button class="step-button" :disabled="step <= 1" v-on:click="updateStep(-1)">←</button>
                        <button class="step-button" v-if="isLastStep()" v-on:click="completeModule(module)">Complete {{
                            module }}</button>
                        <button class="step-button" :disabled="isLastStep()" v-else
                            v-on:click="updateStep(1)">→</button>
                    </footer>
                </div>
            </li>
        </ul>
        <!-- <ModuleTimer v-if="displayTimer()" @activateModule="activateModules" :frequency="frequency" :timeStarted="timeStarted" />
        <button @click="resetAll">reset all</button> -->
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
        activateModule(module) {
            if (this.activeModule === module) {
                this.activeModule = null;
            } else {
                this.activeModule = module;
            }
            this.step = 1;
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
<style scoped>
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
    width: 4em;
    height: 4em;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

button.activate {
    margin: 0;
    font-size: 3rem;
    text-align: center;
    border: none;
    background-color: transparent;
    max-width: 80%;
    font-weight: 500;
}

.module .content {
    font-size: 1.6rem;
    border-bottom: 2px solid black;
}

.content footer {
    display: flex;
    align-items: center;
    padding: 1rem;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
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
    top: 0;
    left: 0;
}

li.module:nth-of-type(2) {
    top: 0;
    right: 0;
}

li.module:nth-of-type(3) {
    bottom: 0;
    left: 0;
}

li.module:nth-of-type(4) {
    bottom: 0;
    right: 0;
}
</style>
