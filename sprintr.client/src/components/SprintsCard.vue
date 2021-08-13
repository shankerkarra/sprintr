<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between">
    <p class="pt-3 text-light hoverable">
      <router-link :to="{ name: 'Sprint', params: {sprintId: sprint.id, projectId: project.id}}">
        {{ sprint.name }}
      </router-link> -->
    </p>
    <h5 class="pt-3 hoverable" @click="destory(sprint.id, project.id)">
      🗑
    </h5>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sprintService } from '../services/SprintService'
import { projectService } from '../services/ProjectService'
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.activeProject),
      async destory(id, projectid) {
        logger.log(AppState.activeProject)
        logger.log(id)
        await sprintService.destroy(id)
        await projectService.getSprintsByProject(projectid)
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
