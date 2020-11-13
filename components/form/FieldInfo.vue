<template>
  <span class="info" v-if="message">{{ message }}</span>
</template>

<script>
export default {
  name: 'FieldInfo',
  props: {
    type: String,
  },
  computed: {
    message() {
      switch (this.type) {
        case 'password':
          return 'Le mot de passe doit contenir 8 caractères minimum, 1 majuscule, 1 minuscule et 1 chiffre'
          break
        default:
          return ''
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.info {
  margin: rem(10px 0 0 10px);
  font-size: rem(11px);
  color: #fff;
}
</style>