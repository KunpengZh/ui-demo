<style scoped>
.filterTag {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 11px;
}

.el-card__header {
  padding-top: 5px;
  padding-bottom: 5px;
}
.tagscontainer {
  padding: 10px;
}
</style>
<template>
    <div class="elementContainer tagscontainer">
    <div class="contentAlignLeft">
         <el-button-group >
            <el-button type="primary" icon="el-icon-search" @click="handleDocSearch">文档搜索</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleDocumentUpdate">文档录入</el-button>
        </el-button-group>
    </div>
    <el-card v-for="(navagator,navagatorIndex) in navagators" v-bind:key="navagator.text" style="margin-top:10px;margin-bottom:10px;">
      <div slot="header" class="clearfix contentAlignLeft">
        <span style="margin-right: 30px; font-size: 14px;">{{navagator.text}}</span>
        <el-button size="mini" style="padding: 3px" icon="el-icon-close" type="text" @click="handleDeleteAll(navagatorIndex)">Delet All</el-button>
        <el-button size="mini" style="padding: 3px" icon="el-icon-circle-plus" type="text" @click="handleAddNewTag(navagatorIndex)">Add New Tag</el-button>
      </div>

      <div class="contentAlignLeft filterTagsDiv">
        <el-tag size="mini" v-for="(tag,index) in navagator.value" closable @close="handleTagClose(navagator.text,index)" :hit="tagborder" :disable-transitions="disableTransitions" class="filterTag"
                :type="tagsType[index%5]"
                v-bind:key="tag">{{tag}}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "TagsManagement",
  data() {
    return {
      navagators: [],
      tagborder: true,
      disableTransitions: true,
      tagsType: ["primary", "success", "warning", "danger", "info", "text", ""]
    };
  },
  methods: {
    handleDocSearch() {
      this.$router.push("/doccenter");
    },
    handleDocumentUpdate() {
      this.$router.push("/docinput");
    },
    saveAndUpdateNavagators() {
      //to save data
      let that = this;
      this.$store.state.doc.data.navagators = this.navagators;
    },
    handleTagClose(type, tagIndex) {
      let navagators = Object.assign([], this.navagators);
      let tags = null;
      for (let index in navagators) {
        let navagator = navagators[index];
        if (navagator.text === type) {
          tags = navagator.value;
          let newTags = tags.slice(0, tagIndex).concat(tags.slice(tagIndex + 1));
          navagator.value = newTags;
          break;
        }
      }
      this.navagators = navagators;
      this.saveAndUpdateNavagators();
    },
    handleDeleteAll(navagatorIndex) {
      let navagators = Object.assign([], this.navagators);
      navagators = navagators.slice(0, navagatorIndex).concat(navagators.slice(navagatorIndex + 1));
      this.navagators = navagators;
      this.saveAndUpdateNavagators();
    },
    handleAddNewTag(navagatorIndex) {
      this.$prompt("Input new Tag", "Reminder", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          let navagators = Object.assign([], this.navagators);
          navagators[navagatorIndex].value.push(value);
          this.navagators = navagators;
          this.saveAndUpdateNavagators();
        })
        .catch(() => {});
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
  created() {
    this.navagators = this.$store.state.doc.data.navagators;
  }
};
</script>

