import { HorizontalBar, mixins } from 'vue-chartjs'
import * as themes from './themes'

export default {
  name: 'horizontal-bar-chart',
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: {
    options: Object,
    gradientColors: {
      type: Array,
      default: () => themes.gradients.default,
      validator: val => val.length > 1
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: val => val.length > 1
    }
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
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

      this.gradientStops.forEach((stop, index) => {
        gradientStroke.addColorStop(stop, this.gradientColors[index])
      })

      chartData.datasets.forEach(set => {
        if (!set.backgroundColor) set.backgroundColor = gradientStroke
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
