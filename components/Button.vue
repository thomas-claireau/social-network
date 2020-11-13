<template>
  <div v-frag>
    <button type="submit" :disabled="disabled">Se connecter</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: Boolean,
  },
}
</script>

<style>
</style>