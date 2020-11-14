<template>
  <div v-frag>
    <Form
      name="forgot-password"
      action="/forgot-password"
      method="post"
      :structure="form"
    />
  </div>
</template>

<script>
export default {
  layout: 'starter',
  name: 'forgot-password',
  data() {
    return {
      form: [
        {
          name: 'email',
          tag: 'input',
          type: 'text',
          id: 'email',
          placeholder: 'Email',
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