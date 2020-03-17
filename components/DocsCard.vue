<template>
  <card class="card-refine">

    <template #header>
      <div class="row">
        <div class="col">
          <p>
            <span class="doc-title">{{doc.title}}</span><br />
            <span class="doc-dateline">{{doc.dateline}}</span>
          </p>
        </div>

        <div class="col-2">
          <!--
          <base-button v-if="doc" class="btn-success btn-round" size="sm" tag="a" :href="pdfurl" download> PDF </base-button>
          -->
        </div>
      </div>

      <p v-if="doc.compilation" class="doc-compilation">{{ doc.compilation.join(' > ') }}</p>
    </template>

    <markdown-view :source="doc.article"></markdown-view>

    <template #footer>
      <p v-if="doc.tags" class="doc-tags">{{ doc.tags.join('; ') }}</p>
    </template>
  </card>
</template>

<script>
import MarkdownView from './MarkdownView'

export default {
  name: "DocsCard",
  components: {
    MarkdownView
  },
  props: {
    doc: {
      type: Object,
      default: null,
      description: "The document to view."
    }
  },
  computed: {
    pdfurl() {
      let u = '/api/docs/' + encodeURIComponent(this.docid) + '.pdf'
      // console.log(u);
      return u
    }
  }
}
</script>
