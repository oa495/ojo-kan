import { ref } from 'vue'
import { defineStore } from 'pinia'

export const moduleProgress = defineStore('module-progress', () => {
  const moduleProgress = ref({
    module1: false,
    module2: false,
    module3: false,
  });


  function completeModule(module) {
     moduleProgress.value[module] = true;
  }

  function resetAllProgress() {
    for (const module in moduleProgress.value) {
      moduleProgress.value[module] = false;
    }
  }
  return { moduleProgress, completeModule, resetAllProgress }
})
