<template>
  <div v-frag v-html="require(`~/assets/${url}.svg?raw`)"></div>
</template>

<script>
export default {
  props: {
    url: String,
  },
}
</script>

<style>
</style>