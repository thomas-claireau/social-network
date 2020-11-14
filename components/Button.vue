<template>
  <div class="button-container">
    <button
      :class="supClasses"
      v-if="tag == 'button'"
      type="submit"
      :disabled="disabled"
    >
      <slot></slot>
    </button>

    <a :class="supClasses" href="" v-if="tag == 'a'">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    url: String,
    classes: String,
    tag: String,
    bg: String,
    type: String,
    disabled: Boolean,
  },
  created() {
    if (process.browser && this.url) {
      const host = window.location.host
      console.log(host)
    }
  },
  methods: {
    checkClass(btnClass) {
      return btnClass ? btnClass : ''
    },
  },
  computed: {
    supClasses() {
      const bg = this.checkClass(this.bg)
      const classes = this.checkClass(this.classes)

      return `button ${bg} ${classes}`
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  width: fit-content;
  height: auto;
  min-height: rem(45px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: rem(10px);
  padding: rem(0 20px);
  border-radius: rem(3px);
  text-decoration: none;
  color: #fff;
  background-color: $default;
  border: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: rem(16px);
  font-family: $mainFont;

  &:hover:not(:disabled) {
    background-color: darken($default, 5%);
    transition: all 0.15s ease-in-out;
  }

  &:disabled {
    background-color: lighten($default, 15%);
    cursor: not-allowed;
  }

  /deep/ svg {
    width: rem(13px);
    height: rem(13px);

    g path {
      fill: #fff;
    }
  }
}

@mixin bgButton($variable, $color) {
  .button {
    &.#{$color} {
      background-color: $variable;

      &:hover:not(:disabled) {
        background-color: darken($variable, 4%);
      }

      &:disabled {
        background-color: lighten($default, 15%);
      }
    }
  }
}

@include bgButton($error, 'error');
@include bgButton($warning, 'warning');
@include bgButton($success, 'success');
@include bgButton($info, 'info');

.button {
  &:not(:first-child) {
    margin-top: rem(20px);
  }

  &.rounded {
    border-radius: rem(100px);
  }
}
</style>