<template>
  <div>
    <img v-if="!filterTypeShow" src="../../../assets/images/docSearch.png" alt="" width="70px" height="70px" class="filterIcon" @click="handleFilterSwitch">
    <transition
      name="fadeDown"
    >
      <el-card v-if="filterTypeShow">
        <div slot="header" class="clearfix contentAlignLeft" style="padding-top:3px;padding-bottom:3px;">
          <el-button size="mini" style="padding: 3px" icon="el-icon-close" type="text" @click="handleDocSearch">文档搜索</el-button>
          <el-button size="mini" style="padding: 3px" icon="el-icon-menu" type="text" @click="handleTagsManagement">标记管理</el-button>
          <el-button size="mini" style="padding: 3px" icon="el-icon-menu" type="text" @click="handleDocumentUpdate">文档录入</el-button>
        </div>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item style="height: 20px;line-height: 20px;" v-for="navagator in navagators" :index="navagator.text" v-bind:key="navagator.text">{{navagator.text}}</el-menu-item>
        </el-menu>
        <div class="line"></div>
        <div v-if="showFilterTags" class="contentAlignLeft filterTagsDiv">
          <el-button @click="handleTagSelect" class="filterTag" v-for="(tag,index) in filterTags" :type="tagsType[index%5]" v-bind:key="tag" size="mini">{{tag}}</el-button>
        </div>
        <div style="padding-left:15px; margin-top: 10px;">
          <el-row v-for="criteria in selectedTags" v-bind:key="criteria.text">
            <el-col :span="2">
              <div class="contentAlignRight filterTagLabel">
                <el-button type="success" size="mini" plain @click="handleLogicChange">{{criteria.text}}({{criteria.logic}}):</el-button>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="contentAlignLeft">
                <el-tag size="mini" v-for="(tag,index) in criteria.value" closable @close="handleTagClose(criteria.text,tag)" :hit="tagborder" :disable-transitions="disableTransitions" class="filterTag"
                        :type="tagsType[index%5]"
                        v-bind:key="tag">{{tag}}
                </el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["filterShow", "criteriaTags", "orinavagators"],
  data() {
    return {
      filterTypeShow: this.filterShow,
      tagborder: true,
      disableTransitions: true,
      tagsSerial: 0,
      selectedTags: {},
      tagsType: ["primary", "success", "warning", "danger", "info", "text", ""],
      selectedCriteria: {},
      activeIndex: "0",
      navagators: this.orinavagators,
      showFilterTags: false,
      filterTags: [],
      activeCategory: ""
    };
  },
  watch: {
    criteriaTags: function(newTags, oldTags) {
      this.selectedTags = Object.assign({}, newTags);
    },
    orinavagators: function(newNavagators, oldNavagators) {
      this.navagators = newNavagators;
    }
  },
  name: "Navagator",
  methods: {
    handleDocSearch() {
      this.$router.push("/doccenter");
    },
    handleDocumentUpdate() {
      this.$router.push("/docinput");
    },
    handleTagsManagement() {
      this.$router.push({ path: "/tagsmanagement" });
    },
    distributeFilter(distributeName) {
      this.$emit(distributeName, this.selectedTags);
    },
    handleTagClose(type, value) {
      let selectedTags = Object.assign({}, this.selectedTags);
      let obj = selectedTags[type];
      let valueIndex = obj.value.indexOf(value);
      if (valueIndex >= 0) {
        let newValue = obj.value.slice(0, valueIndex).concat(obj.value.slice(valueIndex + 1));
        obj.value = newValue;
        if (newValue.length <= 0) {
          delete selectedTags[type];
        } else {
          selectedTags[type] = obj;
        }
        this.selectedTags = selectedTags;
        this.distributeFilter("filterChange");
      }
    },
    handleLogicChange(targetButton) {
      let tagText = targetButton.target.textContent;
      tagText = tagText.split("(");
      tagText = tagText[0];
      let selectedTags = Object.assign({}, this.selectedTags);
      selectedTags[tagText].logic = selectedTags[tagText].logic === "And" ? "Or" : "And";
      this.selectedTags = selectedTags;
      this.distributeFilter("filterLogicChange");
    },
    handleTagSelect(targetButton) {
      let tagText = targetButton.target.textContent;
      let selectedTags = Object.assign({}, this.selectedTags);
      if (selectedTags[this.activeCategory]) {
        let values = selectedTags[this.activeCategory].value;
        let needUpdate = true;
        for (let i = 0; i < values.length; i++) {
          if (values[i] === tagText) {
            needUpdate = false;
            break;
          }
        }
        if (needUpdate) {
          values.push(tagText);
          selectedTags[this.activeCategory].value = values;
          this.distributeFilter("filterChange");
        }
      } else {
        selectedTags[this.activeCategory] = {
          text: this.activeCategory,
          logic: "Or"
        };
        let values = [];
        values.push(tagText);
        selectedTags[this.activeCategory]["value"] = values;
        this.selectedTags = selectedTags;
        this.distributeFilter("filterChange");
      }
    },
    handleFilterSwitch() {
      this.filterTypeShow = !this.filterTypeShow;
      if (!this.filterTypeShow) this.showFilterTags = false;
      this.activeCategory = "";
    },
    handleSelect(itemText) {
      this.activeCategory = itemText;
      let filterTags = [];
      let navagators = this.navagators;
      for (let i = 0; i < navagators.length; i++) {
        if (navagators[i].text === itemText) {
          filterTags = navagators[i].value;
          break;
        }
      }
      this.showFilterTags = true;
      this.filterTags = filterTags;
    }
  }
};
</script>
<style>
.el-input__inner {
  font-size: 11px;
  padding: 3px;
  height: 20px;
}

.el-select__caret {
  font-size: 11px;
  padding: 3px;
  height: 20px;
}

.filterTagLabel {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 700;
  margin-right: 5px;
}

.filterTagsDiv {
  background-color: #f6f6f6;
  margin: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.filterTag {
  margin-left: 10px !important;
  margin-right: 10px !important;
  margin-top: 3px !important;
  margin-bottom: 3px !important;
  font-size: 11px !important;
}

.filterIcon {
  position: fixed;
  top: 80px;
  left: 20px;
  z-index: 999;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 50%;
  border: 1px solid burlywood;
}

.el-button--mini {
  padding: 3px 7px;
}

.el-card__header {
  padding-top: 3px !important;
  padding-bottom: 3px !important;
}

.el-card__body {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

.el-menu-item {
  height: 30px;
  line-height: 30px;
}

.el-menu--horizontal > .el-menu-item {
  height: 20px;
  line-height: 20px;
  font-weight: 500;
}
</style>
