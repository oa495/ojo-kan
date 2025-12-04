import { ref } from 'vue'
import { defineStore } from 'pinia'

export const moduleProgress = defineStore('module-progress', () => {
  const moduleProgress = ref({
    module1: false,
    module2: false,
    module3: false,
    module4: false,
    module5: false,
    module6: false,
  });

  function completeModule(module) {
    if (moduleProgress.value.hasOwnProperty(module)) {
      moduleProgress.value[module] = true;
    }
  }

  return { moduleProgress, completeModule }
})
