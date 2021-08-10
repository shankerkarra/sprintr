<template>
  <div class="col-md-7 col-7 bg-primary d-flex mt-3 justify-content-between">
    <p class="pt-3">
      {{ project.name }}
    </p>
    <h5 class="pt-3 action" v-if="account.id === project.creatorId" @click="destory(project._id)">
      🗑
    </h5>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { projectService } from '../services/ProjectService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async destory(id) {
        logger.log(id)
        await projectService.destroy(id)
        await projectService.getAll()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.action {
  cursor: pointer;
}
</style>
