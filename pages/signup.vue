<template>
  <div v-frag>
    <Form name="signup" action="/signup" method="post" :structure="form" />
  </div>
</template>

<script>
export default {
  layout: 'starter',
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
form {
  max-width: rem(400px);
  width: rem(400px);

  @media screen and (max-width: $break-small) {
    max-width: rem(300px);
    width: rem(300px);
  }
}
</style>