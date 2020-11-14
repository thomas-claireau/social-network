<template>
  <div class="style-guide">
    <Button tag="a" bg="error">Je suis un lien</Button>
    <Button tag="a" bg="warning">Je suis un lien</Button>
    <Button tag="a" bg="success">Je suis un lien</Button>
    <Button tag="a" bg="info">Je suis un lien</Button>
    <Button tag="a" bg="info">
      Je suis un lien
      <SvgLoader url="img/icons/angle" />
    </Button>
    <Button classes="rounded" tag="a" bg="info">
      <SvgLoader url="img/icons/angle" />
      Je suis un lien
    </Button>
    <Button tag="button" :disabled="true">Je suis un lien</Button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.style-guide {
  width: 100vw;
  height: 100vh;
  background-color: rgb(202, 202, 202);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>