<template>
  <div class="worksheet">
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-header" v-if="$slots.header || title">
      <slot name="header">
        <h4 class="card-title">{{title}}</h4>
        <p class="card-category">{{subTitle}}</p>
      </slot>
    </div>

    <div class="card-body table-full-width">
      <el-table border striped show-summary fit
        :size="size"
        row-class-name="ws-row"
        :header-cell-class-name="cellStyles"
        :cell-class-name="cellStyles"
        empty-text=" "
        :data="rows"
        :summary-method="getSummary"
        >
        <el-table-column v-for="column in columns" :key="column.field" :prop="column.field" :label="columnHeading(column)" sortable
          :formatter="formatCell">
        </el-table-column>
      </el-table>
    </div>

    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'worksheet',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    findColumn(field) {
      for (let i = 0; i < this.columns.length; i++)
        if (this.columns[i].field === field) return this.columns[i]

      return null
    },

    hasValue(row, column) {
      var data = row
      if (column.hasOwnProperty('path') && row.hasOwnProperty(column.path))
        data = row[column.path]
      return typeof data[column.field] !== 'undefined'
    },
    hasAccumulator(column) {
      return column.hasOwnProperty('accumulate')
    },
    cellRawValue(row, column) {
      var data = row
      if (column.hasOwnProperty('path') && row.hasOwnProperty(column.path))
        data = row[column.path]
      return data[column.field]
    },
    cellValue(row, column) {
      var data = row
      if (column.hasOwnProperty('path') && row.hasOwnProperty(column.path))
        data = row[column.path]

      if (column.hasOwnProperty('accumulate'))
        column.accumulator += data[column.field]

      if (column.type === 'date') return this.formatDate(data[column.field])
      else if (column.type === 'integer')
        return this.formatInteger(data[column.field])
      else if (column.type === 'number' || column.type === 'float')
        return this.formatNumber(data[column.field])
      else return data[column.field]
    },
    columnSummary(column) {
      if (!column.hasOwnProperty('accumulate')) return ' '

      if (column.type === 'date') return this.formatDate(column.accumulator)
      else if (column.type === 'integer')
        return this.formatInteger(column.accumulator)
      else if (column.type === 'number' || column.type === 'float')
        return this.formatNumber(column.accumulator)
      else return column.accumulator
    },
    columnHeading(column) {
      if (column.hasOwnProperty('accumulate')) column.accumulator = 0

      if (column.hasOwnProperty('label')) return column.label
      else return column.field
    },
    columnStyles(row, column) {
      var data = row
      if (
        row != null &&
        column.hasOwnProperty('path') &&
        row.hasOwnProperty(column.path)
      )
        data = row[column.path]

      var styles = []
      if (row != null && row.hasOwnProperty('separator'))
        styles.push('ws-border')
      if (column.type === 'date') styles.push('ws-date')
      else if (column.type === 'integer') {
        styles.push('ws-number')
        if (row !== null && data[column.field] < 0) styles.push('ws-red')
      } else if (column.type === 'number' || column.type === 'float') {
        styles.push('ws-number')
        if (row !== null && data[column.field] < 0.0) styles.push('ws-red')
      }
      return styles
    },

    cellStyles(params) {
      // console.log("cellStyles", params);
      // let { row, column, rowIndex, columnIndex } = params;

      if (this.rows.length === 0)
        return ''

      let row = this.rows[params.rowIndex]
      let column = this.columns[params.columnIndex]

      let data = row
      if (
        row != null &&
        column.hasOwnProperty('path') &&
        row.hasOwnProperty(column.path)
      )
        data = row[column.path]

      let styles = []
      // if (this.condensed)
      //  styles.push('ws-condensed');
      if (row != null && row.hasOwnProperty('separator'))
        styles.push('ws-border')
      if (column.type === 'date') styles.push('ws-date')
      else if (column.type === 'integer') {
        styles.push('ws-number')
        if (row !== null && data[column.field] < 0) styles.push('ws-red')
      } else if (column.type === 'number' || column.type === 'float') {
        styles.push('ws-number')
        if (row !== null && data[column.field] < 0.0) styles.push('ws-red')
      }
      return styles.join(' ')
    },
    // eslint-disable-next-line no-unused-vars
    getSummary(params) {
      // console.log("getSummary", params)
      // const { columns, data } = params;
      let sums = []

      this.columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Totals'
          return
        }

        if (!column.hasOwnProperty('accumulate')) sums[index] = ' '

        if (column.type === 'date')
          sums[index] = this.formatDate(column.accumulator)
        else if (column.type === 'integer')
          sums[index] = this.formatInteger(column.accumulator)
        else if (column.type === 'number' || column.type === 'float')
          sums[index] = this.formatNumber(column.accumulator)
        else sums[index] = column.accumulator
      })

      return sums
    },
    // eslint-disable-next-line no-unused-vars
    formatCell(row, elcolumn, cellValue, rowIndex) {
      // console.log( "formatCell", row, elcolumn, cellValue, rowIndex);
      const column = this.findColumn(elcolumn.property)

      let data = row
      if (column.hasOwnProperty('path') && row.hasOwnProperty(column.path))
        data = row[column.path]

      if (column.hasOwnProperty('accumulate'))
        column.accumulator += data[column.field]

      if (column.type === 'date') return this.formatDate(data[column.field])
      else if (column.type === 'integer')
        return this.formatInteger(data[column.field])
      else if (column.type === 'number' || column.type === 'float')
        return this.formatNumber(data[column.field])
      else return data[column.field]
    },

    formatDate(sdate) {
      if (!sdate)
        return ("")
      var tdate = new Date(sdate)
      // return tdate.toString().substring(0, 10)
      return (
        (tdate.getMonth() + 1).toString().padStart(2, '0') + '/' +
        tdate.getDate().toString().padStart(2, '0') + '/' +
        tdate.getFullYear().toString()
      )
    },
    formatInteger(value) {
      var num = (Math.round(value * 100) / 100).toFixed(0)
      var str = num.toString().padStart(6, ' ')
      return str
    },
    formatNumber(value) {
      var num = (Math.round(value * 100) / 100).toFixed(2)
      var str = num.toString().padStart(6, ' ')
      return str
    },

    // events
    clickedRow(value) {
      this.$emit('clicked-row', value)
    }
  }
}
</script>
<style>

</style>
