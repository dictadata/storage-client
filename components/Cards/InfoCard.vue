<template>
  <card class="card-stats">
    <div class="row">
      <div v-if="$slots.header" class="col-5">
        <div class="icon-big text-center">
          <slot name="header"></slot>
        </div>
      </div>
      <div v-if="$slots.content || title" class="col-7">
        <div class="numbers">
          <slot name="content">
            <p v-if="subTitle" class="card-category">{{subTitle}}</p>
            <h4 v-if="title" class="card-title">{{title}}</h4>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="$slots.footer" class="stats">
      <slot name="footer"></slot>
    </div>
  </card>
</template>
<script>
import Card from './Card.vue'
export default {
  name: 'info-card',
  components: {
    Card
  },
  props: {
    title: String,
    subTitle: String
  }
}
</script>
<style>
</style>
