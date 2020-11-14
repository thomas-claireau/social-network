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
        :disabled="item.type == 'submit' && disabledForm"
        :label="item.value"
      />
    </div>
    <AdditionalLinks :type="name" />
  </form>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      form: {},
      disabledForm: true,
      regex: {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'password-confirmation': /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
      if (item.name != 'submit')
        this.$set(this.form, item.name, { value: '', error: null })
    })
  },
  methods: {
    updateForm(data, index) {
      this.$set(this.form, index.name, { value: data, error: index.error })
      this.isError()
    },
    sendForm(e) {
      const formData = new FormData(e.target)
    },
    isError() {
      for (const item of this.structure) {
        if (item.name != 'submit') {
          const field = this.form[item.name]

          if (field.error || field.error == null) {
            this.disabledForm = true
            break
          }

          this.disabledForm = false
        }
      }
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