<template>
  <nav class="navbar" :class="navClasses">
    <div :class="containerClasses">
      <slot name="brand"></slot>

      <slot name="toggle-button">
        <button v-if="hasMenu" class="navbar-toggler collapsed" type="button" data-toggle="collapse" @click="toggleMenu" :aria-expanded="ariaExpanded" aria-label="Toggle navigation" ref="toggler">
          <span class="navbar-toggler-icon"></span>
        </button>
      </slot>

      <collapse-transition @before-enter="onTransitionStart" @after-leave="onTransitionEnd">
        <div v-show="show" class="navbar-collapse collapse" :class="navMenuClasses">
          <slot></slot>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'dicta-nav',
  props: {
    showMenu: {
      type: Boolean,
      default: false,
      description: 'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)'
    },
    position: {
      type: String,
      default: 'top',
      description: 'Navbar position (top|bottom|sticky)',
      validator(value) {
        return [
          'none',
          'top',
          'bottom',
          'sticky'
        ].includes(value)
      }
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand'
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent'
    },
    theme: {
      type: String,
      default: 'light',
      description: 'boostrap theme'
    },
    bg: {
      type: String,
      default: 'white',
      description: 'bootstrap background color',
      validator(value) {
        return [
          'light',
          'dark',
          'white',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info'
        ].includes(value)
      }
    },
    menuClasses: {
      type: [String, Object, Array],
      default: '',
      description: 'Navbar menu (items) classes. Can be used to align menu items to the right/left'
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container-fluid',
      description: 'Container classes. Can be used to control container classes (contains both navbar brand and menu items)'
    }
  },
  model: {
    prop: 'showMenu',
    event: 'change'
  },
  components: {
    CollapseTransition
  },
  data() {
    return {
      transitionFinished: true
    }
  },
  computed: {
    show() {
      return this.showMenu;
    },
    hasMenu() {
      return this.$slots.default
    },
    ariaExpanded() {
      return this.showMenu ? "true" : "false"
    },
    navClasses() {
      let classes = [
        { [`navbar-expand-${this.expand}`]: this.expand },
        { 'navbar-transparent': !this.showMenu && this.transparent },
        `navbar-${this.theme}`
      ]

      if (this.position === 'none')
        classes.push('position-relative')
      else if (this.position === 'sticky')
        classes.push('sticky-top')
      else
        classes.push(`fixed-${this.position}`)

      if (!this.transparent || !this.transitionFinished)
        classes.push(`bg-${this.bg}`)

      return classes
    },
    navMenuClasses() {
      let classes = []

      if (this.showMenu) {
        classes.push('show')
      } else {
        //
      }

      classes.push(this.menuClasses.split(' '))
      return classes
    }
  },
  watch: {
    showMenu: function (newVal, oldVal) {
      /*if (newVal) {
        this.$refs.toggler.classList.remove("collapsed")
      } else {
        this.$refs.toggler.classList.add("collapsed")
      }*/
      //console.log(JSON.stringify(this.$refs.navMenu.classList, null, "  "))
    }
  },
  methods: {
    toggleMenu() {
      this.$emit('change', !this.showMenu)
    },
    onTransitionStart() {
      this.transitionFinished = false
    },
    onTransitionEnd() {
      this.transitionFinished = true
    }
  }
}
</script>
<style></style>
