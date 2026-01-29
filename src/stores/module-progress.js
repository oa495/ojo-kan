import { ref } from 'vue'
import { defineStore } from 'pinia'

export const moduleProgress = defineStore('module-progress', () => {
  const moduleProgress = ref({
    module1: false,
    module2: false,
    module3: false,
    module4: false,
  });


  function completeModule(module) {
     moduleProgress.value[module] = true;
  }

  function allModulesCompleted() {
    return Object.values(moduleProgress.value).every(status => status === true);
  }

  function resetAllProgress() {
    for (const module in moduleProgress.value) {
      moduleProgress.value[module] = false;
    }
  }
  return { moduleProgress, completeModule, resetAllProgress, allModulesCompleted }
})
