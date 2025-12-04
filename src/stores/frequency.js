import { ref } from 'vue'
import { defineStore } from 'pinia'

export const learningFrequency = defineStore('learning-frequency', () => {
  const frequency = ref('daily');

  function setFrequency(newFrequency) {
    frequency.value = newFrequency.toLowerCase();
  }

  return { frequency, setFrequency }
})
