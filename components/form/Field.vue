<template>
  <div class="form-field" :class="`${tag} ${error ? 'error' : ''}`">
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
      @focus="focus"
      @blur="blur"
      v-model="inputData"
    />

    <SvgLoader url="img/icons/cross" v-if="type !== 'submit'" />

    <Button v-if="type == 'submit'" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'Field',
  data() {
    return {
      value: null,
      error: null,
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
    this.handleError()
  },
  methods: {
    focus(e) {
      if (e.target.parentNode) e.target.parentNode.classList.add('focus')
    },
    blur(e) {
      if (e.target.parentNode) e.target.parentNode.classList.remove('focus')
    },
    handleError() {
      if (!this.regex || !this.value) {
        this.error = null
      } else {
        this.error = !this.regex.test(this.value)
      }
    },
  },
  computed: {
    inputData: {
      get() {
        return this.value
      },
      set(newValue) {
        this.value = newValue
        this.$emit('input-changed', newValue, this.name)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  position: relative;
  max-width: rem(300px);
  width: rem(300px);
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:not(:first-child) {
    margin-top: rem(40px);
  }

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
</style>