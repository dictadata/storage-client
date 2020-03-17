<template>
  <div class="markdown">
    <textarea ref="area"></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'

export default {
  name: 'MarkdownEdit',
  components: {
  },
  props: {
    value: {
      type: String,
      description: 'The market down text',
      default: ''
    }
  },

  mounted() {
    this.mde = new SimpleMDE({
      element: this.$refs.area, // Tie SimpleMDE to your textarea
      // Set your SimpleMDE configuration here
      // e.g. remove the status bar (status: false), customise the
      // toolbar (toolbar: ["bold", "italic", "heading"]) or similar
      showIcons: ["code", "table", "horizontal rule"],
      initialValue: this.value
    })
    // this.mde.value(this.value)

    var self = this
    this.mde.codemirror.on('change', function() {
      // Catch on change events
      self.$emit('input', self.mde.value())
    })
  },

  watch: {
    // Setup a watch to track changes,
    // and only update when changes are made
    value(newVal) {
      if (newVal !== this.mde.value())
        this.mde.value(newVal)
    }
  },

  beforeDestroy() {
    // Clean up when the component gets destroyed
    this.mde.toTextArea()
  }
}

</script>

<style>
@import '~simplemde/dist/simplemde.min.css';
.editor-toolbar {
  text-align: center;
}
</style>
