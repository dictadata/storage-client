<template>
  <div :class="mdClass" v-html="markedHTML"></div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'markdown-view',
  components: {
  },
  props: {
    source: {
      type: String,
      description: 'The raw markdown text',
      default: ''
    },
    mdClass: {
      type: String,
      description: 'CSS class for styling the markdown HTML',
      default: 'markdown'
    }
  },

  computed: {
    markedHTML() {
      return marked(this.source, { breaks: true, baseUrl: '/viewer/' })
    }
  },

  mounted() {},

  watch: {
    // Setup a watch to track changes,
    // and only update when changes are made
    source(newVal) {
      if (newVal) { // != this.mde.value()) {
      //  this.mde.value(newVal)
      }
    }
  }

}

</script>

<style>
</style>
