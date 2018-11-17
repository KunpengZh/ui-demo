<style scoped>
.docSearchContainer {
  padding: 10px;
}
</style>
<template>
 <div class="elementContainer">
     <div class="docSearchContainer">
        <Navagator :orinavagators="orinavagators" :criteriaTags="criteriaTags" :filterShow="true" v-on:filterChange="handleFilterChange" v-on:filterLogicChange="filterLogicChange"/>
        <el-card style="margin-top: 20px; padding-top: 10px;" v-if="showDocSearch">
            <DocumentTable :tableData="tableData" :tableHeight="tableHeight" v-on:documentUpdate="handleDocumentUpdate"/>
        </el-card>
        <DocumentUpdate v-else :document="document" :updatedTags="updatedTags"/>
     </div>
    
</div>
</template>
<script>
import Navagator from "./components/Navagator";
import DocumentTable from "./components/DocumentTable";
import DocumentUpdate from "./components/DocumentUpdate";
export default {
  data() {
    return {
      showDocSearch: true,
      orinavagators: [],
      tableHeight: "500px",
      tableData: [],
      selectedTags: {},
      document: {
        GUID: "",
        url: "",
        docName: "",
        author: "",
        date: new Date(),
        tags: {}
      },
      criteriaTags: null,
      updatedTags: null
    };
  },
  name: "DocumentSearch",
  components: {
    Navagator,
    DocumentTable,
    DocumentUpdate
  },
  methods: {
    handleDocumentUpdate(doc) {
      this.document = doc;
      this.criteriaTags = this.copyTagsToNewObj(doc.tags);
      this.updatedTags = this.criteriaTags;
      this.showDocSearch = false;
    },
    copyTagsToNewObj(selectedTags) {
      selectedTags = selectedTags == undefined ? this.selectedTags : selectedTags;
      let newObj = {};
      for (let key in selectedTags) {
        newObj[key] = {};
        newObj[key].text = selectedTags[key].text;
        let len = selectedTags[key].value.length;
        let value = [];
        for (let i = 0; i < len; i++) {
          value.push(selectedTags[key].value[i]);
        }
        newObj[key].value = value;
      }
      return newObj;
    },
    handleFilterChange(selectedTags) {
      this.selectedTags = selectedTags;
      this.updatedTags = this.selectedTags;
      if (this.showDocSearch) {
        this.filterDocuments();
      }
    },
    filterDocuments() {
      let selectedTags = this.selectedTags;
      let newdoclist = this.$store.state.doc.data.documentList.filter(function(doc) {
        for (let key in selectedTags) {
          if (!doc.tags.hasOwnProperty(key)) return false;

          let logic = selectedTags[key].logic;
          let selectedTagValues = selectedTags[key].value;

          let docTagValues = doc.tags[key].value;

          let selen = selectedTagValues.length;

          if (logic === "Or") {
            let satCriteria = false;
            for (let i = 0; i < selen; i++) {
              if (docTagValues.indexOf(selectedTagValues[i]) >= 0) {
                satCriteria = true;
                break;
              }
            }
            if (!satCriteria) return false;
          } else {
            let satCriteria = false;
            for (let i = 0; i < selen; i++) {
              if (docTagValues.indexOf(selectedTagValues[i]) < 0) {
                return false;
              }
            }
          }
        }
        return true;
      });
      this.tableData = newdoclist;
    },
    filterLogicChange(selectedTags) {
      this.selectedTags = selectedTags;
      this.filterDocuments();
    },
    showLoading() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    closeLoading() {
      this.loading.close();
    }
  },
  beforeMount() {
    this.orinavagators = this.$store.state.doc.data.navagators;
    this.tableData = this.$store.state.doc.data.documentList;
  }
};
</script>

