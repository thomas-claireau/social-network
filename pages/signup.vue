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
        [
          {
            name: 'firstname',
            tag: 'input',
            type: 'text',
            id: 'firstname',
            placeholder: 'Prénom',
          },
          {
            name: 'lastname',
            tag: 'input',
            type: 'text',
            id: 'lastname',
            placeholder: 'Nom',
          },
        ],
        [
          {
            name: 'username',
            tag: 'input',
            type: 'text',
            id: 'username',
            placeholder: "Nom d'utilisateur",
          },
          {
            name: 'email',
            tag: 'input',
            type: 'text',
            id: 'email',
            placeholder: 'Email',
          },
        ],
        [
          {
            name: 'biography',
            tag: 'textarea',
            type: 'textarea',
            id: 'biography',
            placeholder: 'Présentez-vous en quelques mots',
          },
        ],
        [
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
        ],
        [
          {
            name: 'submit',
            tag: 'button',
            type: 'submit',
            id: 'submit',
            value: 'Créer mon compte',
          },
        ],
      ],
    }
  },
}
</script>

<style lang='scss' scoped>
form {
  max-width: rem(600px);
  width: rem(600px);

  @media screen and (max-width: $break-tablet) {
    max-width: none;
    width: 100%;
  }
}
</style>