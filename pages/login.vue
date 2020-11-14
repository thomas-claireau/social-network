<template>
  <div class="login">
    <ImgLoader classes="background-starter" url="img/background-starter.jpg" />
    <Form name="login" action="/login" method="post" :structure="form" />
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: [
        {
          name: 'email',
          tag: 'input',
          type: 'email',
          id: 'email',
          placeholder: 'Email',
        },
        {
          name: 'password',
          tag: 'input',
          type: 'password',
          id: 'password',
          placeholder: 'Mot de passe',
        },
        {
          name: 'submit',
          tag: 'button',
          type: 'submit',
          id: 'submit',
          value: 'Se connecter',
        },
      ],
    }
  },
}
</script>

<style lang='scss' scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

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

  /deep/ form {
    max-width: rem(300px);
    width: rem(300px);
    margin: auto;
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
}
</style>