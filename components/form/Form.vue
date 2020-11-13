<template>
  <form :action="action" :method="method" @submit.prevent="sendForm">
    <div v-frag v-for="(item, index) in structure" :key="index">
      <Field
        :tag="item.tag"
        :type="item.type"
        :id="item.name"
        :name="item.name"
        :regex="regex[item.name]"
        :placeholder="item.placeholder"
        @input-changed="updateForm"
        :disabled="item.type == 'submit' && error"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      error: true,
      form: {},
      regex: {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      },
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    structure: {
      type: Array,
      required: true,
    },
  },
  created() {
    // create form structure
    this.structure.forEach((item) => {
      if (item.name != 'submit') this.$set(this.form, item.name, null)
    })
  },
  methods: {
    updateForm(data, index) {
      this.$set(this.form, index, data)
    },
    sendForm(e) {
      const formData = new FormData(e.target)
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
}
</style>