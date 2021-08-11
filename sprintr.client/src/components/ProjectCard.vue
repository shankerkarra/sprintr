<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between">
    <p class="pt-3 text-light hoverable">
      <router-link :to="{ name: 'ProjectBacklog', params: {id: project.id} }">
        {{ project.name }}
      </router-link>
    </p>
    <h5 class="pt-3 hoverable" @click="destory(project.id)">
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
      async destory(projectid, backlogid) {
        logger.log(AppState.backlogitems)
        logger.log(projectid)
        await projectService.destroy(projectid)
        await projectService.getAll()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
