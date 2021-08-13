<template>
  <option :value="sprint.id">
    {{ sprint.name }}
  </option>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    sprint: {
      type: Object,
      required: true
    }
  }
}
</script>
