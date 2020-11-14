<template>
  <div class="additional-links">
    <NuxtLink to="/login" v-if="type == 'signup' || type == 'forgot-password'"
      >J'ai déja un compte</NuxtLink
    >
    <NuxtLink to="/signup" v-if="type == 'login' || type == 'forgot-password'"
      >Créer un compte</NuxtLink
    >
    <NuxtLink to="/forgot-password" v-if="type != 'forgot-password'"
      >Mot de passe oublié</NuxtLink
    >
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
}
</script>

<style lang="scss" scoped>
.additional-links {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: rem(30px);

  > a {
    font-size: rem(14px);
    text-decoration: none;
    color: #fff;

    &:not(:first-child) {
      margin-top: rem(10px);
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>