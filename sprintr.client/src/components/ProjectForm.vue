<template>
  <div class="post-form">
    <form class="d-flex" @submit.prevent="create">
      <div class="form-group pt-3">
        <input
          type="text"
          name="name"
          v-model="state.newProject.name"
          class="form-control"
          placeholder="Name your Project..."
          required
        />
      </div>
      <div class="form-group pt-3">
        <input
          type="text"
          name="description"
          v-model="state.newProject.description"
          class="form-control"
          placeholder="Whats this project about?"
        />
      </div>
      <div class="d-flex align-items-center">
        <button type="submit" class="btn btn-outline-success">
          ➕
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
export default {
  setup() {
    const state = reactive({
      newProject: {}
    })
    return {
      state,
      async create() {
        try {
          await projectService.create(state.newProject)
          await projectService.getAll()
          state.newProject = {}
        } catch (error) {
          Pop.toast('We could not make that Post', error)
        }
      }
    }
  }
}
</script>
