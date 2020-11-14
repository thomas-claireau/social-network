<template>
  <div class="signup">
    <ImgLoader classes="background-starter" url="img/background-starter.jpg" />
    <Form name="signup" action="/signup" method="post" :structure="form" />
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      form: [
        {
          name: 'username',
          tag: 'input',
          type: 'text',
          id: 'username',
          placeholder: 'Username',
        },
        {
          name: 'email',
          tag: 'input',
          type: 'text',
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
          name: 'password-confirmation',
          tag: 'input',
          type: 'password',
          id: 'password-confirmation',
          placeholder: 'Confirmez votre mot de passe',
        },
        {
          name: 'submit',
          tag: 'button',
          type: 'submit',
          id: 'submit',
          value: 'Créer mon compte',
        },
      ],
    }
  },
}
</script>

<style lang='scss' scoped>
.signup {
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
    max-width: rem(400px);
    width: rem(400px);
    margin: auto;

    @media screen and (max-width: $break-small) {
      max-width: rem(300px);
      width: rem(300px);
    }
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