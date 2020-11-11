<template>
  <div v-frag v-html="require(`~/assets/${src}.svg?raw`)"></div>
</template>

<script>
import frag from 'vue-frag'

export default {
  props: {
    src: String,
  },
  directives: {
    frag,
  },
}
</script>

<style>
</style>