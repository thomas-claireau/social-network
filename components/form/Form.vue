<template>
  <form :action="action" :method="method" @submit.prevent="sendForm">
    <div class="row" v-for="(row, rowIndex) in structure" :key="rowIndex">
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
        v-for="(item, index) in row"
        :key="index"
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
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  margin: rem(50px auto);

  .row {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media screen and (max-width: $break-tablet) {
      flex-direction: column;
    }

    &:not(:first-child) {
      margin-top: rem(35px);

      @media screen and (max-width: $break-tablet) {
        margin-top: rem(20px);
      }
    }

    /deep/ .form-field {
      @media screen and (max-width: $break-tablet) {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
      }

      &:not(:first-child) {
        margin-left: rem(10px);

        @media screen and (max-width: $break-tablet) {
          margin-left: auto;
          margin-top: rem(20px);
        }
      }
    }
  }
}
</style>