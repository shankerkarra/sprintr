<template>
  <div class="post-form">
    <form class="d-flex" @submit.prevent="create">
      <div class="form-group col-md-5 pt-3">
        <input
          type="text"
          name="name"
          v-model="state.newProject.name"
          class="form-control"
          placeholder="Name your Project..."
          required
        />
      </div>
      <div class="form-group col-md-6 pt-3 px-1">
        <input
          type="text"
          name="description"
          v-model="state.newProject.description"
          class="form-control"
          placeholder="Whats this project about?"
        />
      </div>
      <div class="d-flex align-items-center">
        <button type="submit" class="btn btn-outline-dark">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      newProject: {}
    })
    return {
      state,
      async create() {
        try {
          const newId = await projectService.create(state.newProject)
          await projectService.getAll()
          state.newProject = {}
          router.push({ name: 'ProjectBacklog', params: { projectId: newId } })
        } catch (error) {
          Pop.toast('We could not make that Post', error)
        }
      }
    }
  }
}
</script>
