<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between align-items-center">
    <p class="pt-3 text-light hoverable">
      <router-link :to="{ name: 'ProjectBacklog', params: {id: project.id} }">
        {{ project.name }}
      </router-link>
    </p>
    <img class="rounded-circle" :src="account.picture" :alt="project.name" height="40">
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
