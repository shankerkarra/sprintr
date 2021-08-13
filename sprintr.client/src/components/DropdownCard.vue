<template>
  <option v-for="s in sprints" :value="s.id" :key="s.id">
    {{ s.name }}
  </option>
</template>

<script>
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
    }
  }
}
</script>
