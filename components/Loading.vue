<template>
  <transition name="slide-fade">
    <div class="loading" v-if="loading">
      <SvgLoader url="img/loader" />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'loading',
  computed: {
    ...mapGetters({ loading: 'loading/getLoading' }),
  },
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  opacity: 0.8;
  z-index: 1000;

  /deep/ svg {
    width: rem(60px);
    height: rem(60px);
  }
}
</style>