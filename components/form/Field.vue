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

      <SvgLoader url="img/icons/cross" v-if="type !== 'submit'" />
    </div>

    <FieldInfo v-if="type != 'submit'" :type="name" />

    <Button
      v-if="type == 'submit'"
      tag="button"
      type="form"
      :disabled="disabled"
    >
      Se connecter
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
  max-width: rem(300px);
  width: rem(300px);
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: rem(35px);
  }

  > div {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.input,
    &.textarea {
      min-height: rem(50px);
      padding: 0 rem(15px);

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: rem(30px);
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
        &.cross {
          height: rem(15px);
          opacity: 1;
          transform: translateX(rem(50px));
          transition: all 0.15s ease-in-out;
        }

        g path {
          fill: $error;
          transition: all 0.3s ease-in-out;
        }
      }
    }

    /deep/ svg {
      min-width: rem(17px);

      &.cross {
        opacity: 0;
        transform: translateX(rem(0px));
        transition: all 0.15s ease-in-out;
      }

      g path {
        fill: #fff;
        transition: all 0.3s ease-in-out;
      }
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
}
</style>