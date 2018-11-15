<style scoped>
.formContainer {
  padding-top: 20px;
  padding-bottom: 5px;
  height: 60px;
  border: 1px solid red;
}
.tableContainer {
  height: calc(100vh - 200px);
  border: 1px solid blue;
}
</style>
<template>
<div class="elementContainer fullScreen">
    <div class="formContainer">
        <el-form :inline="true" :model="form">
            <el-form-item label="工厂">
                <el-input v-model="form.plant" placeholder="工厂" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="采购订单:">
                <el-autocomplete
                    class="inline-input inputField"
                    v-model="form.procOrder"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入订单编号"
                    @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="内向交货单:">
                <el-autocomplete
                    class="inline-input inputField"
                    v-model="form.internalOrder"
                    :fetch-suggestions="queryInternalOrder"
                    placeholder="请输入订单编号"
                    @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" plain icon="el-icon-refresh" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-circle-check-outline" plain >保存</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" plain >保存</el-button>
                    <el-button type="primary" icon="el-icon-delete" plain >删除</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
    </div>
    <div class="tableContainer">
        <ag-grid-vue style="width: 100%; height: 100%; text-align: left" class="ag-theme-balham"
             :gridOptions="gridOptions"
             :columnDefs="colDefs"
             :rowData="rowData"
             :enableSorting="true"
             :enableColResize="true"
             :gridReady="onGridReady"
            >
        </ag-grid-vue>
    </div>
</div>    
</template>
<script>
import { AgGridVue } from "ag-grid-vue";
export default {
  components: {
    "ag-grid-vue": AgGridVue
  },
  data() {
    return {
      rowData: [],
      form: {
        procOrder: "",
        internalOrder: "",
        plant: ""
      },
      colDefs: [
        {
          headerName: "检验批",
          field: "QC_No",
          width: 200,
          editable: true,
          checkboxSelection: false,
          parent: this,
          checkboxSelection: true
        },
        {
          headerName: "物料号",
          field: "MaterialPN",
          width: 150,
          editable: true
        },
        {
          headerName: "检验特性编码",
          field: "QC_PN",
          width: 150,
          editable: true
        },
        {
          headerName: "检验特性描述",
          field: "QC_Desc",
          width: 200,
          editable: true
        },
        {
          headerName: "结果记录",
          field: "QC_Result",
          width: 200,
          editable: true
        },
        {
          headerName: "单个项目结果判定",
          field: "Result",
          width: 200,
          editable: true
        },
        {
          headerName: "代码组",
          field: "Group_Code",
          width: 200,
          editable: true
        },
        {
          headerName: "维护代码组",
          field: "Mani_Group",
          width: 200,
          editable: true
        },
        {
          headerName: "缺陷数量",
          field: "Defect_Num",
          width: 200,
          editable: false
        },
        {
          headerName: "支持文件",
          field: "Supportings",
          width: 200,
          editable: true
        }
      ],
      gridOptions: {},
      procOrders: [
        { value: "proc0001", text: "proc0001" },
        { value: "proc0002", text: "proc0002" },
        { value: "proc0003", text: "proc0003" },
        { value: "proc0004", text: "proc0004" },
        { value: "proc0005", text: "proc0005" },
        { value: "proc0006", text: "proc0006" },
        { value: "proc0007", text: "proc0007" },
        { value: "proc0008", text: "proc0008" },
        { value: "proc0009", text: "proc0009" },
        { value: "proc00010", text: "proc00010" }
      ],
      internalOrders: [
        { value: "proc0001", text: "proc0001" },
        { value: "proc0002", text: "proc0002" },
        { value: "proc0003", text: "proc0003" },
        { value: "proc0004", text: "proc0004" },
        { value: "proc0005", text: "proc0005" },
        { value: "proc0006", text: "proc0006" },
        { value: "proc0007", text: "proc0007" },
        { value: "proc0008", text: "proc0008" },
        { value: "proc0009", text: "proc0009" },
        { value: "proc00010", text: "proc00010" }
      ]
    };
  },
  methods: {
    queryInternalOrder(queryString, cb) {
      var internalOrders = this.internalOrders;
      var results = queryString
        ? internalOrders.filter(internalOrder => {
            return internalOrder.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
          })
        : internalOrders;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch(queryString, cb) {
      var procOrders = this.procOrders;
      var results = queryString
        ? procOrders.filter(procOrder => {
            return procOrder.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
          })
        : procOrders;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      return selectedData;
    },
    onSubmit() {}
  },
  beforeMount() {
    const params = this.$route.params;
    this.form.plant = params.plant;
    this.form.internalOrder = params.internalOrder;
    this.form.procOrder = params.procOrder;
  }
};
</script>


