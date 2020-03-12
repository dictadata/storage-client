<template>
  <section class="headline-group">

      <div v-for="(doc, index) in docs" :key="doc.docid">
        <div v-if="index < maxDocs" class="row">
          <div class="col" @click="onClick(doc)">

          <card class="card">
            <div class="row" >
              <div v-if="showImage" class="col-auto headline-cell">
                <figure class="headline-image">
                  <img v-if="doc.imageURL" :src="doc.imageURL" alt="" height="32" width="32">
                  <img v-else src="/img/dicta_neuron_orange.png" alt="" height="32" width="32">
                </figure>
              </div>
              <div class="col headline-cell">
                <p class="headline-title">
                  {{ doc.title }}
                </p>
                <p v-if="showTagline" class="headline-tagline">
                  &nbsp; {{ doc.tagline }}
                </p>
              </div>
            </div>
          </card>

          </div>
        </div>
      </div>

  </section>
</template>

<script>

export default {
  name: 'headlines-vertical',
  components: {

  },
  props: {
    docs: {
      type: Array,
      description: 'array of doc objects'
    },
    maxDocs: {
      type: Number,
      description: "number of headlines to show",
      default: 4
    },
    showImage: {
      type: Boolean,
      description: 'show images',
      default: true
    },
    showTagline: {
      type: Boolean,
      description: 'show taglines',
      default: true
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
