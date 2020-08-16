<template>
  <div
    class="form-group"
    :class="{
      'input-group': hasIcon,
      'input-group-focus': focused,
      'has-danger': error,
      'has-success': !error && touched,
      'has-label': label
    }"
  >
    <slot name="label">
      <label v-if="label" class="btn btn-primary"> {{ label }} {{ required ? '*' : '' }} </label>
    </slot>

    <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-prepend">
        <div class="input-group-text"><i :class="addonLeftIcon"></i></div>
      </span>
    </slot>

    <slot>
      <input
        ref="filesInput"
        type="file"
        :accept="accept"
        v-bind="$attrs"
        v-on="listeners"
        class="form-control"
        aria-describedby="addon-right addon-left"
      />

      <div>
        <el-table
          :data="filesData">
          <el-table-column
            prop="name"
            label="Name">
          </el-table-column>
          <el-table-column
            label="Date">
            <template v-slot="scope">
              <span>{{ formatDate(scope.row.lastModified) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="Size">
          </el-table-column>
          <el-table-column
            prop="type"
            label="Type">
          </el-table-column>
        </el-table>
      </div>

    </slot>

    <slot name="error" v-if="error || $slots.error">
      <label class="error">{{ error }}</label>
    </slot>

    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-append">
        <div class="input-group-text"><i :class="addonRightIcon"></i></div>
      </span>
    </slot>

    <slot name="helperText"></slot>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'

export default {
  inheritAttrs: false,
  name: 'files-input',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  model: {
    prop: 'fileList',
    event: 'input'
  },
  props: {
    required: Boolean,
    accept: {
      type: String,
      description: 'File types to allow',
      default: '.txt'
    },
    fileList: {
      type: FileList,
      description: 'Input value for files'
    },
    label: {
      type: String,
      description: 'Input label'
    },
    error: {
      type: String,
      description: 'Input error',
      default: ''
    },
    addonRightIcon: {
      type: String,
      description: 'Input icon on the right'
    },
    addonLeftIcon: {
      type: String,
      description: 'Input icon on the left'
    }
  },
  data() {
    return {
      focused: false,
      touched: false,
      filesData: []
    }
  },
  computed: {
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots
      return (
        addonRight !== undefined || addonLeft !== undefined ||
        this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined
      )
    },
    listeners() {
      return {
        change: this.onChange,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      }
    }
  },
  methods: {
    onChange(evt) {
      // console.log('change')
      // el-table needs an array instead of an object
      this.filesData.length = 0
      let files = this.$refs.filesInput.files
      for (let i = 0; i < files.length; i++)
        this.filesData.push(files.item(i))

      this.$emit('change', evt.target.files)
    },
    onInput(evt) {
      // console.log('input')
      if (!this.touched) this.touched = true
      this.$emit('input', evt.target.files)
    },
    onFocus() {
      this.focused = true
    },
    onBlur() {
      this.focused = false
    },
    formatDate(t) {
      let s = new Date(t).toISOString()
      return s.substring(0, 10) + ' ' + s.substring(11, 19) + 'Z'
    }
  }
}
</script>
<style>
</style>
