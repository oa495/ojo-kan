<template>
    <section class="modules">
        <ul>
            <li class="module" v-for="module in modules" :key="module" v-if="modules">
                <button v-on:click="toggleContent(module)" class="trigger">{{ module }}
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
            }
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
}

.modules .trigger:nth-child(odd) {
    background-color: #000;
    color: #fff;
}

.modules .trigger:nth-child(odd):hover {
    background-color: #fff;
    color: #000;
}

.modules .trigger:nth-child(even):hover {
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

.step-button {
    padding: 0.5rem;
    width: fit-content;
    background-color: white;
    border: 1px dashed black;
}

.step-button:hover {
    background-color: black;
    color: white;
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
