<template>
  <div>
    <p>Task Listing</p>
  </div>
  <div class="row justify-content-center mt-3">
    <TaskCard v-for="b in backlogs" :key="b.id" :backlog="b" />
    <!-- Cross check whether we are passing the Backlog Id -->
  </div>
</template>

<script>
import { computed, onMounted, reactive  } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
import { taskService } from '../services/TaskService'


export default {
  name: 'Tasklog',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newTask: { projectId: route.params.id, sprintId: '', backlogId: AppState.backlogitems.id }
// defaulting the SprintId = ''
    })
    onMounted(async() => {
      try {
        await projectService.getById(route.params.id)
        await projectService.getTasksByProject(route.params.id)
      } catch (error) {
        Pop.toast('Error fetching Backlogs', error)
      }
    })
    return {
      state,
      project: computed(() => AppState.activeProject),
      backlogs: computed(() => AppState.backlogitems),
      async destroy(id) {
        await projectService.destroy(id)
        router.push({ name: 'BacklogHome' })
        // Re-check the routing Page
      },
      async create() {
        try {
          await taskService.create(state.newtask)
          await projectService.getTasksByProject(route.params.id)
          state.newTask = {}
          state.newTask = { projectId: route.params.id }
          state.newTask = { backlogId: ??}
        } catch (error) {
          Pop.toast('We couldn\'t make that Task - ', error)
        }
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
