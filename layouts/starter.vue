<template>
  <div class="starter">
    <SvgLoader classes="logo" url="img/logo-social-network" />
    <ImgLoader classes="background-starter" url="img/background-starter.jpg" />
    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
.starter {
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: rem(50px 0);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.8;
  }

  /deep/ .background-starter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -1;
  }

  /deep/ .logo {
    width: rem(80px);
    height: rem(80px);
    position: relative;
    z-index: 10;

    path {
      fill: #fff;
      opacity: 1;
      stroke: #fff;
    }
  }
}
</style>
