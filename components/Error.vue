<template>
  <transition name="slide-fade">
    <div class="error" v-if="error">
      {{ error }}
      <div class="cross-container" @click="removeError()">
        <SvgLoader url="img/icons/cross" @click="removeError()" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Error',
  updated() {
    setTimeout(() => {
      this.$store.dispatch('error/removeError')
    }, 5000)
  },
  methods: {
    removeError() {
      console.log('passe')
      this.$store.dispatch('error/removeError')
    },
  },
  computed: {
    ...mapGetters({ error: 'error/getError' }),
  },
}
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  max-width: rem(300px);
  position: fixed;
  top: rem(40px);
  left: rem(40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(10px);
  background-color: $error;
  color: #fff;
  font-weight: 600;
  border-radius: rem(3px);
  z-index: 100;

  @media screen and (max-width: $break-tablet) {
    max-width: none;
    width: 90%;
    top: rem(20px);
    left: 50%;
    transform: translateX(-50%);
  }

  .cross-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    /deep/ svg {
      width: rem(15px);
      height: rem(15px);

      path {
        fill: #fff;
      }
    }
  }
}
</style>