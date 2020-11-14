<template>
  <div v-frag>
    <Form name="login" action="/login" method="post" :structure="form" />
  </div>
</template>

<script>
export default {
  layout: 'starter',
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
form {
  max-width: rem(300px);
  width: rem(300px);
}
</style>