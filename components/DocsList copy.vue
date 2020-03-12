<template>
  <div>
    <el-table ref="doclist"
      header-cell-class-name="table-transparent"
      header-row-class-name="table-transparent"
      row-class-name="table-transparent"
      highlight-current-row
      @current-change="onChange"
      :data="docs"
    >
    <el-table-column
      v-if="showImage"
      width="100">
      <template slot-scope="scope">
        <el-image :src="scope.row.imageURL">
          <div slot="error" class="image-slot">
            <i class="nc-icon nc-explore-2"></i>
          </div>
        </el-image>
      </template>
    </el-table-column>
      <el-table-column
        @label="title"
        min-width="100"
        property="title"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'docs-list',
  components: {

  },
  props: {
    docs: {
      type: Array,
      description: 'array of doc objects'
    },
    showImage: {
      type: Boolean,
      description: 'show images',
      default: false
    }
  },
  methods: {
    onChange(row) {
      if (row)
        this.$emit('change', row.docid)
    }
  }

}
</script>

<style>
</style>
