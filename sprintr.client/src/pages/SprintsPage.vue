<template>
  <div class="row bg-dark justify-content-between">
    <div class="col-md-3 col-8 text-light ">
      <h5 class="hoverable pt-1"
          data-toggle="modal"
          data-target="#sprintInfo"
      >
        {{ sprint.name }}
      </h5>

      <div class="modal fade"
           id="sprintInfo"
           tabindex="-1"
           role="dialog"
           aria-labelledby="sprintInfoTitle"
           aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered text-dark" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {{ sprint.name }}
                <br>
                ⚖ {{ total }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Start Date: {{ sprint.startDate }} </p>
              <p>End Date: {{ sprint.endDate }} </p>
              <span v-if="!sprint.isOpen">
                <p>This Sprint is Closed</p>
              </span>
              <span v-else>
                <p>This Sprint is Open</p>
              </span>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(sprint.id)">
                🗑
              </h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center mt-3">
    <TaskCardSprint v-for="t in tasks" :key="t.id" :task="t" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { sprintService } from '../services/SprintService'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
export default {
  name: 'Sprint',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      try {
        await sprintService.getById(route.params.sprintId)
        await sprintService.getTaskBySprint(route.params.sprintId)
      } catch (error) {
        Pop.toast(error)
      }
    })
    function caculateTotal() {
      let totalWeight = 0
      for (let i = 0; i < AppState.tasks.length; i++) {
        totalWeight += AppState.tasks[i].weight
      }
      return totalWeight
    }
    return {
      tasks: computed(() => AppState.tasks),
      sprint: computed(() => AppState.activeSprint),
      total: computed(caculateTotal),
      async destroy(id) {
        await sprintService.destroy(id)
        router.push({ name: 'ProjectSprint' })
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
