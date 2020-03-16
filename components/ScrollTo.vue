<template>
  <div class="scroller-type">
    <div class="container">
      <p>
      <a class="scroller-btn" :href="target">
        <img alt="Scroll Down" :src="image" />
      </a>
      </p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'scroll-to',
  props: {
    target: {
      type: String,
      default: '#'
    },
    image: {
      type: String,
      default: "/img/arrow-down.png"
    }
  },
  data() {
    return {
      TIMEOUT: 1
    }
  },
  mounted() {
    //console.log(this.image)
    // From testing, without a brief timeout, it won't work.
    if (this.$route.hash)
      setTimeout(() => this.scrollTo(this.$route.hash), this.TIMEOUT)
  },
  methods: {
    scrollTo: function(hashtag) {
      setTimeout(() => {
        location.href = hashtag
      }, this.TIMEOUT)
    }
  }
}
</script>
<style></style>
