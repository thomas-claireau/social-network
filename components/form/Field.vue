<template>
  <div class="form-field">
    <SvgLoader :src="`img/icons/${name ? name : 'default'}`" />
    <input
      :type="type"
      :id="id"
      :name="name"
      v-if="tag === 'input'"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    type: String,
    tag: String,
    id: String,
    name: String,
    placeholder: String,
  },
}
</script>

<style lang="scss">
</style>