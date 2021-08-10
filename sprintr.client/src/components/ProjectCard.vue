<template>
  <div class="col-md-8 bg-primary d-flex">
    <p>{{ project.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>
