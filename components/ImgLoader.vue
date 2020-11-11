<template>
  <div>
    <img :src="src" />
  </div>
</template>

<script>
export default {
  name: 'ImgLoader',
  data() {
    return {
      src: '',
    }
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      default: 'large',
    },
  },
  created() {
    switch (this.format) {
      case 'large':
        this.src = require(`@/assets/${this.url}?resize&size=1920&format=webp`)
        break
      case 'medium':
        this.src = require(`@/assets/${this.url}?resize&size=1000&format=webp`)
        break
      case 'small':
        this.src = require(`@/assets/${this.url}?resize&size=500&format=webp`)
        break
      default:
        break
    }
  },
}
</script>

<style>
</style>