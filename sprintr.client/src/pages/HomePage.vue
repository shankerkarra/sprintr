<template>
  <div class="row justify-content-center">
    <ProjectForm />
  </div>
  <div class="row justify-content-center mt-3" v-if="user.isAuthenticated">
    <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
  </div>
  <div v-else>
    <img src="../assets/img/JogMan.png" alt="Man Running">
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { projectService } from '../services/ProjectService'
import ProjectForm from '../components/ProjectForm.vue'
import Pop from '../utils/Notifier'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectService.getAll()
      } catch (error) {
        Pop.toast('Couldn\'t find projects - ', error)
      }
    })
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      projects: computed(() => AppState.projects),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
  components: {
    ProjectForm
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
