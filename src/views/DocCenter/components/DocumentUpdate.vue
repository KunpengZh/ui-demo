<template>
  <div>
    <el-card style="margin-top: 20px; padding-top: 10px;">
      <div slot="header" class="clearfix contentAlignRight" style="padding-left: 60px;">
        <el-button-group>
          <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="confirmDocumentUpdate">Update</el-button>
          <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="confirmDocumentDelete">Delete</el-button>
          <el-button type="primary" icon="el-icon-remove" size="mini">Cancel</el-button>
        </el-button-group>
      </div>
      <el-form ref="docform" :model="documentFormModel" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="URL(*):">
              <el-input v-model="documentFormModel.url" clearable style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Document Name(*):">
              <el-input v-model="documentFormModel.docName" clearable style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Document Author(*):">
              <el-input v-model="documentFormModel.author" clearable style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Document Date(*):">
              <el-date-picker
                v-model="documentFormModel.date"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="document date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Navagator from "./Navagator";

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default {
  props: ["document", "updatedTags"],
  data() {
    return {
      orinavagators: [],
      tableHeight: "300px",
      documentFormModel: this.document,
      selectedTags: this.updatedTags
    };
  },
  watch: {
    updatedTags: function(newTags, oldTags) {
      console.log("update tags");
      this.selectedTags = Object.assign({}, newTags);
    }
  },
  name: "DocumentUpdate",
  components: {
    Navagator
  },
  methods: {
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
    },
    confirmDocumentDelete() {
      let that = this;
      let newDoc = this.documentFormModel;
      let doc = Object.assign({}, this.$store.state.doc);
      for (let i = 0; i < doc.data.documentList.length; i++) {
        if (doc.data.documentList[i].GUID === newDoc.GUID) {
          doc.data.documentList = doc.data.documentList.slice(0, i).concat(doc.data.documentList.slice(i + 1));
          break;
        }
      }
      this.showLoading();
      this.$http.post("/document/updatedocumentconfig", JSON.stringify(doc)).then(
        res => {
          res = res.body;
          if (res && res[0] && res[0]._id) {
            that.$store.state.doc = res[0];
            that.orinavagators = this.$store.state.doc.data.navagators;
            that.$store.state.docloaded = true;
            that.$message.success("Save document successed!!");
          } else {
            if (res[0]) {
              that.$message.error(res[0].errormsg);
            } else if (res.message) {
              that.$message.error(res.message);
            }
          }
          that.closeLoading();
        },
        error => {
          that.closeLoading();
          console.log(error);
          that.$message.error(error.body.message);
        }
      );
    },
    confirmDocumentUpdate() {
      if (!this.validateForCreateNew()) return false;
      let newDoc = this.documentFormModel;
      newDoc.tags = this.copyTagsToNewObj();
      if (typeof newDoc.date === "object") {
        let ndate = newDoc.date;
        let nmonth = ndate.getMonth() + 1;
        let mdate = ndate.getDate();
        ndate =
          ndate.getFullYear() + "-" + (nmonth < 10 ? "0" + nmonth : nmonth) + "-" + (mdate < 10 ? "0" + mdate : mdate);
        newDoc.date = ndate;
      }

      let that = this;

      let documents = Object.assign({}, this.$store.state.doc);
      for (let i = 0; i < documents.data.documentList.length; i++) {
        if (documents.data.documentList[i].GUID === newDoc.GUID) {
          documents.data.documentList[i] = newDoc;
          break;
        }
      }
      this.showLoading();
      this.$http.post("/document/updatedocumentconfig", JSON.stringify(documents)).then(
        res => {
          res = res.body;
          if (res && res[0] && res[0]._id) {
            that.$store.state.doc = res[0];
            that.orinavagators = this.$store.state.doc.data.navagators;
            that.$store.state.docloaded = true;
            that.$message.success("Save document successed!!");
          } else {
            if (res[0]) {
              that.$message.error(res[0].errormsg);
            } else if (res.message) {
              that.$message.error(res.message);
            }
          }
          that.closeLoading();
        },
        error => {
          that.closeLoading();
          console.log(error);
          that.$message.error(error.body.message);
        }
      );
    },
    validateForCreateNew() {
      if (
        this.documentFormModel.url === "" ||
        this.documentFormModel.docName === "" ||
        !Object.keys(this.selectedTags).length ||
        this.documentFormModel.author === ""
      ) {
        this.$message.error("Document URL, Name, Author and Tags can not be null, please double check");
        return false;
      }
      return true;
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
    generalGuID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    handleFilterChange(selectedTags) {
      this.selectedTags = selectedTags;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.newdocuments.length > 0) {
      this.$confirm(
        "You have new documents created but not submitted yet, if you leave this page, all of your new data will be lost for ever",
        "Would you like to continue and unsave you data? ",
        {
          confirmButtonText: "Cancel",
          cancelButtonText: "Confirm (Lost all new data)",
          type: "warning"
        }
      )
        .then(() => {
          next(false);
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  }
};
</script>
<style>
.el-form-item__content {
  text-align: left;
}

.exportExcel {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 999;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 50%;
  border: 1px solid burlywood;
}
</style>
