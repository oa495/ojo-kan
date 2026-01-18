<template>
    <span class="module-timer">
        Next Module Activates in: <span class="time">{{ formattedTime }}</span>
    </span>
</template>
<script>
import { moduleProgress } from '@/stores/module-progress'

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const ONE_WEEK_MS = 7 * ONE_DAY_MS; // 7 days in milliseconds
const ONE_HOUR_MS = 60 * 1000; // 1 hour in milliseconds


// const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
// const ONE_WEEK_MS = 7 * ONE_DAY_MS; // 7 days in milliseconds
// const ONE_HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds

export default {
    name: 'ModuleTimer',
    props: {
        timeTillNextModule: Number,
        frequency: String,
        timeStarted: Number,
        activateModule: Function,
    },
    data() {
        return {
            timerId: null,
            timeRemaining: 0,
            activationTimeoutId: null,
        }
    },
    mounted() {
        let lastModuleFinishedTimestamp = localStorage.getItem('lastModuleFinishedTimestamp');
        // timer already running
        if (this.timerId) {
            return;
        } else if (lastModuleFinishedTimestamp) {
            // no timer running but timestamp exists so flow has been run before just reloaded so check local storage
            // update time remaining
            this.setElapsedTime(lastModuleFinishedTimestamp);
            if (this.timeRemaining <= 0) {
                // activate modules 
                this.$emit('activateModule', true); 
                return;
            }
            this.startTimer(this.timeRemaining);

        } else {
            // start new timer
            this.startTimer(this.prepareTimeToWait());
        }
    },
    computed: {
        formattedTime() {
            let totalSeconds = Math.floor(this.timeRemaining / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
    },
    methods: {
        setElapsedTime(lastFinishedTimestamp) {
            const store = moduleProgress();
            // store.resetAllProgress();
            // localStorage.clear();
           
            let progressInStorage = localStorage.getItem('moduleProgress');

            console.log(progressInStorage, '---');
            console.log(store.moduleProgress);
            
            let anyModuleCompleted = false;
            if (progressInStorage) {
                const parsedProgress = JSON.parse(progressInStorage);
                 anyModuleCompleted = Object.keys(parsedProgress).some(key => {
                    return parsedProgress[key] === true;
                });
            } else {
                anyModuleCompleted = Object.values(store.moduleProgress).some(module => {
                    return module === true;
                });
            }
            if (anyModuleCompleted) {
                // check timer
                const now = new Date().getTime();
                // how much time has elapsed since last finished
                const elapsed = now - lastFinishedTimestamp;
                // get frequency from store
                const frequency = this.frequency;
                if (frequency === 'hourly' && elapsed < ONE_HOUR_MS) {
                    this.timeRemaining = ONE_HOUR_MS - elapsed;
                }
                if (frequency === 'daily' && elapsed < ONE_DAY_MS) {
                    this.timeRemaining = ONE_DAY_MS - elapsed;
                }
                if (frequency === 'weekly' && elapsed < ONE_WEEK_MS) {
                    this.timeRemaining = ONE_WEEK_MS - elapsed;
                }
            }
        },
        prepareTimeToWait() {
            const frequency = this.frequency;
            let timeToWait = 0;
            if (frequency === 'hourly') {
                timeToWait = ONE_HOUR_MS;
            } else if (frequency === 'daily') {
                timeToWait = ONE_DAY_MS;
            } else if (frequency === 'weekly') {
                timeToWait = ONE_WEEK_MS;
            }
            return timeToWait;
        },
        startTimer(timeToWait) {
            // set time in local storage 
            localStorage.setItem('lastModuleFinishedTimestamp', this.timeStarted);      
            // ensure timeToWait is defined
            timeToWait = timeToWait || 0;

            // reactive remaining time and activation flag
            this.timeRemaining = timeToWait;

            // update remaining time every second
            this.timerId = setInterval(() => {
                if (this.timeRemaining <= 1000) {
                    this.timeRemaining = 0;
                    clearInterval(this.timerId);
                } else {
                    this.timeRemaining -= 1000;
                    console.log('Time remaining:', this.timeRemaining);
                }
            }, 1000);

            // final activation timeout
            this.activationTimeoutId = setTimeout(() => {
                // activate modules
                this.$emit('activateModule', true); 
                clearInterval(this.timerId);
            }, timeToWait);
        }
    }
}
</script>
<style scoped>
.module-timer {
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    text-decoration: dotted;
    font-weight: 200;
    width: 80%;
    text-align: right;
    margin-bottom: 1em;
}

.time {
   font-weight: bold;
   font-size: 1.4rem;
}
</style>