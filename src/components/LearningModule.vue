<template>
    <section class="modules">
        <ul>
            <li class="module" v-for="module in modules" :key="module" v-if="modules">
                <button :disabled="!modulesActive" v-on:click="toggleContent(module)" class="trigger">{{ module }}
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
                    <div class="step-1">
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
    </section>
</template>
<script>
import { moduleProgress } from '@/stores/module-progress'
import { learningFrequency } from '@/stores/frequency';

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const ONE_WEEK_MS = 7 * ONE_DAY_MS; // 7 days in milliseconds
const ONE_HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds

const moduleToStoreMap = {
    'Module 1': 'module1',
    'Module 2': 'module2',
    'Module 3': 'module3',
    'Module 4': 'module4',
    'Module 5': 'module5',
    'Module 6': 'module6',
};

export default {
    name: 'LearningModule',
    data() {
        return {
            timerId: null,
            activateModules: true,
            step: 1,
            modules: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6'],
            activeModule: null,
            moduleSteps: {
                'Module 1': 4,
                'Module 2': 2,
                'Module 3': 5,
                'Module 4': 5,
                'Module 5': 2,
                'Module 6': 3,
            },
            frequency: learningFrequency().frequency
        }
    },
    computed: {
        modulesActive() {
            console.log('Checking if modules are active...');
            if (this.timerId != null) {
                return this.activateModules
            }
            // get module store
            const allModules = moduleProgress().moduleProgress;
            let progressInStorage = localStorage.getItem('moduleProgress');

            let anyModuleCompleted = false;
            if (progressInStorage) {
                const parsedProgress = JSON.parse(progressInStorage);
                 anyModuleCompleted = Object.keys(parsedProgress).forEach(key => {
                    moduleProgress().moduleProgress[key] = parsedProgress[key];
                });
            } else {
                anyModuleCompleted = Object.values(allModules).some(module => {
                    return module === true;
                });
            }
            if (anyModuleCompleted) {
                // check timestamp
                const lastFinishedTimestamp = localStorage.getItem('lastModuleFinishedTimestamp');
                if (lastFinishedTimestamp) {
                    const now = new Date().getTime();
                    const elapsed = now - lastFinishedTimestamp;
                    // get frequency from store
                    const frequencyStore = learningFrequency();
                    const frequency = frequencyStore.frequency;
                    if (frequency === 'hourly' && elapsed < ONE_HOUR_MS) {
                        return false;
                    }
                    if (frequency === 'daily' && elapsed < ONE_DAY_MS) {
                        return false;
                    }
                    if (frequency === 'weekly' && elapsed < ONE_WEEK_MS) {
                        return false;
                    }
                    return true;
                }
            }
            return true;
        }
    },
    methods: {
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

            this.setTime();
            this.activeModule = null;
            this.activateModules = false;
            this.step = 1;
        },
        setTime() {
            // Implement timer logic based on this.frequency
            const now = new Date().getTime();
            // set time in local storage 
            localStorage.setItem('lastModuleFinishedTimestamp', now);
            const frequencyStore = learningFrequency();
            const frequency = frequencyStore.frequency;
            let timeToWait;
            if (frequency === 'hourly') {
                timeToWait = ONE_HOUR_MS;
            }
            if (frequency === 'daily') {
                timeToWait = ONE_DAY_MS;
            }
            if (frequency === 'weekly') {
                timeToWait = ONE_WEEK_MS;
            }
            this.timerId = setTimeout(() => {
                this.activateModules = true;
            }, timeToWait);
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
    color: rgba(0, 0, 0, 0.6);

}
</style>
