<template>
  <div class="row bg-dark justify-content-start">
    <div class="col-md-2 col-6 border border-dark text-center bg-grey">
      <router-link :to="{ name: 'ProjectBacklog' }">
        <h4> Backlog </h4>
      </router-link>
    </div>
    <div class="col-md-2 col-6 border border-dark text-center bg-light">
      <h4> Sprint </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectSprint'
}
</script>
