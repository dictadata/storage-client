import { Line, mixins } from 'vue-chartjs'
// import * as themes from './themes'

export default {
  name: 'multi-line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: Object,
    gradients: Array
  },
  data() {
    return {
      ctx: null
    }
  },
  methods: {
    updateGradients(chartData) {
      if (!chartData) return

      const ctx =
        this.ctx || document.getElementById(this.chartId).getContext('2d')
      // const width = ctx.canvas.width
      const height = ctx.canvas.height

      chartData.datasets.forEach((dataset, dindex) => {
        if (dindex < this.gradients.length) {
          let gradient = ctx.createLinearGradient(0, height - 50, 0, 50)
          let stops = this.gradients[dindex].stops
          let colors = this.gradients[dindex].colors

          stops.forEach((stop, gindex) => {
            gradient.addColorStop(stop, colors[gindex])
          })

          if (!dataset.backgroundColor) dataset.backgroundColor = gradient
        }
      })
    }
  },
  mounted() {
    this.updateGradients(this.chartData)
    this.renderChart(this.chartData, this.options)

    this.$watch(
      'chartData',
      (newVal, oldVal) => {
        if (newVal !== oldVal)
          this.updateGradients(newVal)
      }
    )
  }
}
