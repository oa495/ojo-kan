<template>
    <section class="modules">
        <ul>
            <li class="module" v-for="module in modules" :key="module" v-if="modules">
                <button :disabled="!isModuleActive(module)" v-on:click="toggleContent(module)" class="trigger">{{ module }}
                    <span v-if="module === activeModule">
                        ↑
                    </span>
                    <span v-else>
                        ↓
                    </span>
                </button>
                <div class="content" v-if="module === activeModule">
                    <span class="step-indicator">
                        {{ step }} / {{ moduleSteps[module] }}
                    </span>
                    <!-- Module content goes here -->
                    <div class="step">
                        <p>This is the content for {{ module }}.</p>
                        <p>La la la </p>
                        <p>La la la </p>
                        <p>La la la </p>
                        <p>La la la </p>
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
        <ModuleTimer v-if="displayTimer()" @activateModule="activateModules" :frequency="frequency" :timeStarted="timeStarted" />
        <button @click="resetAll">reset all</button>
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

export default {
    name: 'LearningModule',
    data() {
        return {
            step: 1,
            modules: ['pronouns', 'nouns', 'verbs'],
            activeModule: 'verbs',
            shouldModuleBeActive: true,
            timeStarted: null,
            moduleSteps: {
                'pronouns': 4,
                'nouns': 2,
                'verbs': 5,
            },
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
        toggleContent(module) {
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
.modules {
    width: 30%;
    position: fixed;
    right: 0;
    position: fixed;
    height: 90vh;
    border: 2px solid black;
    margin: 1rem;
    bottom: 1em;
    top: 1em;
    overflow-y: scroll;
    overflow-x: hidden;
}

.modules ul {
    display: flex;
    flex-direction: column;
    flex-basis: auto;
    height: inherit;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: inherit;
}

.modules li {
    font-family: 'Ojuju', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 4.8rem;
    height: inherit;
}

.trigger {
    width: 100%;
    padding: 0.8rem;
    transition: all 0.4s;
    background-color: #fff;
    color: #000;
}

.trigger:disabled {
    color: #666 !important;
    cursor: not-allowed;
    opacity: 0.6;
}

.trigger:disabled:hover {
    color: #666 !important;
}

li:nth-of-type(odd) .trigger {
    background-color: #000;
    color: #fff;
}

li:nth-of-type(odd) .trigger:hover {
    background-color: #fff;
    color: #000;
}

li:nth-of-type(even) .trigger:hover {
    background-color: #000;
    color: #fff;
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
</style>
