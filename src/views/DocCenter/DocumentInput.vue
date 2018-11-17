<style scoped>
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
.inputcontainer {
  padding: 10px;
}
</style>
<template>
    <div class="elementContainer inputcontainer">
    <img v-if="manualDocInput" src="../../assets/images/excelimport.png" alt="import from Excel" width="70px" height="70px" class="exportExcel" @click="handleExcelImport">
    <img v-else src="../../assets/images/manualinput.png" alt="manual document input" width="70px" height="70px" class="exportExcel" @click="handleExcelImport">
    <div v-if="manualDocInput">
      <Navagator :orinavagators="orinavagators" :criteriaTags="criteriaTags" :filterShow="true" v-on:filterChange="handleFilterChange"/>
      <el-card style="margin-top: 20px; padding-top: 10px;">
        <div slot="header" class="clearfix contentAlignRight" style="padding-left: 60px;">
          <el-button-group>
            <el-button v-if="formStatus==='Create'" type="primary" icon="el-icon-circle-plus" size="mini" @click="handleCreateNew">Create New</el-button>
            <el-button v-if="formStatus==='Update'" type="primary" icon="el-icon-circle-check" size="mini" @click="confirmDocumentUpdate">Update</el-button>
            <el-button v-if="newdocuments.length>0" type="primary" icon="el-icon-upload" size="mini" @click="handleSubmitChange">Submit Change</el-button>
            <el-button type="primary" icon="el-icon-remove" size="mini">Cancel</el-button>
          </el-button-group>
        </div>
        <el-form ref="docform" :model="documentFormModel" label-width="150px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="URL(*):">
                <el-input v-model="documentFormModel.url" @change="onhttpUrlChange" clearable style="width: 100%;"></el-input>
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
    <div v-if="!manualDocInput">
      <el-upload
        class="upload-demo"
        action=""
        :multiple="false"
        :show-file-list="false"
        accept=".xls,.xlsx"
        :auto-upload="true"
        :before-upload="handleFileChange"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <el-card style="margin-top: 20px; padding-top: 10px;">
      <DocumentTable :tableData="newdocuments" :tableHeight="tableHeight" v-on:documentUpdate="handleDocumentUpdate"/>
    </el-card>
  </div>
</template>
<script>
import Navagator from "./components/Navagator";
import DocumentTable from "./components/DocumentTable";
import XLSX from "xlsx";
export default {
  data() {
    return {
      orinavagators: [],
      formStatus: "Create",
      tableHeight: "300px",
      manualDocInput: true,
      newdocuments: [],
      documentFormModel: {
        GUID: "",
        url: "",
        docName: "",
        author: "",
        date: new Date(),
        tags: {}
      },
      selectedTags: {},
      criteriaTags: null
    };
  },
  name: "DocumentInput",
  components: {
    Navagator,
    DocumentTable
  },
  methods: {
    handleFileChange(file) {
      let that = this;
      let rABS = true;
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        let workbook = XLSX.read(data, { type: rABS ? "binary" : "array" });
        that.processExcelFileData(workbook);
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
      return false;
    },
    processExcelFileData(workbook) {},
    handleSubmitChange() {
      let that = this;
      if (!this.validateForSubmitChange()) return;
      if (this.documentFormModel.url !== "") {
        this.addNewDocToList();
      }

      this.$store.commit("updateDocList", this.newdocuments);
      //   let documents = Object.assign({}, this.$store.state.doc);
      //   documents.data.documentList = documents.data.documentList.concat(this.newdocuments);
      //   this.$store.state.doc = documents;
      //this.$store.state.doc.data.documentList = this.$store.state.doc.data.documentList.concat(this.newdocuments);

      that.$message.success("Save document successed!!");

      this.newdocuments = [];
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
    },
    onhttpUrlChange(url) {
      if (this.documentFormModel.docName != "") return;
      let decodedURL = decodeURI(url);
      if (decodedURL.indexOf("?") > 0 && decodedURL.indexOf("=" > 0)) {
        decodedURL = decodedURL.split("?");
        decodedURL = decodedURL[1];
        if (decodedURL.indexOf(".") < 0) return;
        let subStr = decodedURL.slice(
          0,
          decodedURL.lastIndexOf(".") > 0 ? decodedURL.lastIndexOf(".") : decodedURL.length
        );
        let lastStr = decodedURL.slice(decodedURL.lastIndexOf(".") > 0 ? decodedURL.lastIndexOf(".") : 0);
        let startIndex = subStr.lastIndexOf("=");
        let endIndex = lastStr.indexOf("&") > 0 ? lastStr.indexOf("&") : lastStr.length;
        let filename = decodedURL.slice(startIndex + 1, subStr.length + endIndex);
        if (filename.length > 0) this.documentFormModel.docName = filename;
      } else if (decodedURL.lastIndexOf("/") > 15) {
        decodedURL = decodedURL.substring(
          0,
          decodedURL.indexOf("#") == -1 ? decodedURL.length : decodedURL.indexOf("#")
        );
        decodedURL = decodedURL.substring(
          0,
          decodedURL.indexOf("?") == -1 ? decodedURL.length : decodedURL.indexOf("?")
        );
        decodedURL = decodedURL.substring(decodedURL.lastIndexOf("/") + 1, decodedURL.length);
        if (decodedURL.length > 0) this.documentFormModel.docName = decodedURL;
      }
    },
    handleDocumentUpdate(doc) {
      this.documentFormModel = Object.assign({}, doc);
      this.criteriaTags = this.copyTagsToNewObj(doc.tags);
      this.formStatus = "Update";
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
      let newdocuments = [];
      for (let i = 0; i < this.newdocuments.length; i++) {
        if (this.newdocuments[i].GUID === newDoc.GUID) {
          newdocuments.push(newDoc);
        } else {
          newdocuments.push(this.newdocuments[i]);
        }
      }
      this.newdocuments = newdocuments;
      this.documentFormModel = {};
      this.formStatus = "Create";
    },
    validateForSubmitChange() {
      if (this.documentFormModel.url === "" && this.documentFormModel.docName === "") {
        return true;
      }
      return this.handleCreateNew();
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
    handleCreateNew() {
      if (!this.validateForCreateNew()) return false;
      this.addNewDocToList();
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
    addNewDocToList() {
      // let newDoc = Object.assign({}, this.documentFormModel);
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
      newDoc.GUID = this.generalGuID();
      this.newdocuments.push(newDoc);
      this.documentFormModel = {
        GUID: "",
        url: "",
        docName: "",
        author: "",
        date: new Date(),
        tags: {}
      };
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
    },
    handleExcelImport() {
      this.manualDocInput = !this.manualDocInput;
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
  },
  created() {
    this.orinavagators = this.$store.state.doc.data.navagators;
  }
};
</script>

