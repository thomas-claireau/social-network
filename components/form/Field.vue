<template>
  <div class="form-field">
    <div :class="`${tag} ${error ? 'error' : ''} ${value ? 'focus' : ''}`">
      <SvgLoader
        :url="`img/icons/${name ? name : 'default'}`"
        v-if="type !== 'submit'"
      />
      <input
        :type="type"
        :id="id"
        :name="name"
        v-if="tag === 'input'"
        :placeholder="placeholder"
        @click="focus"
        @blur="blur"
        v-model="inputData"
        :pattern="regex"
      />

      <textarea
        :name="name"
        :id="id"
        :placeholder="placeholder"
        @click="focus"
        @blur="blur"
        v-model="inputData"
        :pattern="regex"
        v-if="tag === 'textarea'"
      ></textarea>
    </div>

    <FieldInfo v-if="type != 'submit'" :type="name" />

    <Button
      v-if="type == 'submit'"
      tag="button"
      type="form"
      :disabled="disabled"
      classes="rounded"
      bg="success"
    >
      {{ label }}
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Field',
  data() {
    return {
      value: null,
    }
  },
  props: {
    type: String,
    tag: String,
    id: String,
    name: String,
    placeholder: String,
    regex: RegExp,
    disabled: Boolean,
    label: String,
  },
  updated() {
    this.$emit('input-changed', this.value, {
      name: this.name,
      value: this.value,
      error: this.error,
    })
  },
  methods: {
    focus(e) {
      if (e.target.parentNode) e.target.parentNode.classList.add('focus')
    },
    blur(e) {
      if (e.target.parentNode) e.target.parentNode.classList.remove('focus')
    },
  },
  computed: {
    inputData: {
      get() {
        return this.value
      },
      set(newValue) {
        this.value = newValue
      },
    },
    error() {
      if (!this.regex || !this.value) return null

      return !this.regex.test(this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  width: 100%;
  display: flex;
  flex-direction: column;

  > div {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.input {
      min-height: rem(50px);
      padding: 0 rem(15px);

      &:before {
        border-radius: rem(30px);
      }

      input {
        width: 100%;
        height: 100%;
        margin-left: rem(10px);
        -webkit-appearance: none;
        background-color: transparent;
        border: none;
        outline: 0;
        font-size: rem(16px);
        font-weight: 400;
        color: #fff;

        &::placeholder {
          position: relative;
          top: rem(2px);
          font-size: rem(16px);
          font-weight: 400;
          opacity: 0.7;
          color: #fff;
        }
      }
    }

    &.textarea {
      align-items: flex-start;
      padding: rem(15px);
      min-height: rem(150px);

      &:before {
        border-radius: rem(10px);
      }

      textarea {
        width: 100%;
        height: 100%;
        margin-left: rem(10px);
        margin-top: rem(-3px);
        background-color: transparent;
        border: none;
        font-family: $mainFont;
        font-size: rem(15px);
        color: #fff;
        outline: 0;
        resize: none;

        &::placeholder {
          color: #fff;
          font-style: italic;
        }
      }
    }

    &.input,
    &.textarea {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0.15;
        transition: all 0.3s ease-in-out;
        z-index: -1;
      }

      &.focus {
        &:before {
          opacity: 0.2;
          transition: all 0.3s ease-in-out;
        }
      }
    }

    &.error {
      /deep/ svg {
        path {
          fill: $error;
          transition: all 0.3s ease-in-out;
        }
      }
    }

    /deep/ svg {
      min-width: rem(17px);

      path {
        fill: #fff;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}

::v-deep .button-container {
  button {
    width: 100%;
  }
}
</style>

<style scoped lang="scss">
</style>