<template>
  <section class="docs-list">

    <div v-for="(doc, index) in docs" :key="doc.docid">
      <div v-if="index < maxDocs" class="row">
        <div class="col" @click="onClick(doc)">

          <figure v-if="showImage" class="docs-image">
            <img v-if="doc.imageURL" :src="doc.imageURL" alt="" height="32">
            <img v-else src="/img/dicta_neuron_orange.png" alt="" height="32">
          </figure>

          <p class="docs-title">
            {{ doc.title }}
          </p>

          <p v-if="showTagline" class="docs-tagline">
            &nbsp; {{ doc.tagline }}
          </p>

        </div>
      </div>
    </div>

  </section>
</template>

<script>

export default {
  name: 'docs-list',
  props: {
    docs: {
      type: Array,
      description: 'array of doc objects'
    },
    maxDocs: {
      type: Number,
      description: "number of titles to show",
      default: 1000
    },
    showImage: {
      type: Boolean,
      description: 'show images',
      default: false
    },
    showTagline: {
      type: Boolean,
      description: 'show taglines',
      default: false
    }
  },
  methods: {
    onClick(doc) {
      if (doc)
        this.$emit('change', doc.docid)
    }
  }

}
</script>

<style>
</style>
