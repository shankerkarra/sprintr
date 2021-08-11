<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between">
    <p class="pt-3 text-light hoverable">
      <router-link :to="{ name: 'BackLogItems', params: {id: backlog.id}}">
        {{ backlog.name }}
      </router-link> -->
    </p>
    <h5 class="pt-3 hoverable" @click="destory(backlog.id)">
      🗑
    </h5>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { backlogService } from '../services/BacklogService'
export default {
  props: {
    backlog: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async destory(id) {
        logger.log(id)
        await backlogService.destroy(id)
        await backlogService.getAll()
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
