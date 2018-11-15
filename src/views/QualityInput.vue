<style scoped>
.formContainer {
  padding-top: 20px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  text-align: left;
}
.tableContainer {
  height: calc(100vh - 200px);
  padding-left: 20px;
  padding-right: 20px;
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
                    
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="内向交货单:">
                <el-autocomplete
                    class="inline-input inputField"
                    v-model="form.internalOrder"
                    :fetch-suggestions="queryInternalOrder"
                    placeholder="请输入订单编号"
                   
                ></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" plain icon="el-icon-refresh" @click="query">查询</el-button>
                    <el-button type="primary" icon="el-icon-circle-check-outline" plain  @click="saveData">保存</el-button>
                    <el-button type="primary" @click="addNew" icon="el-icon-circle-plus-outline" plain >新增</el-button>
                    <el-button type="primary" icon="el-icon-delete" plain  @click="handleDelete">删除</el-button>
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
             rowSelection="multiple"
             :cellValueChanged="cellValueChanged"
            >
        </ag-grid-vue>
    </div>
</div>    
</template>
<script>
import { AgGridVue } from "ag-grid-vue";
export default {
  components: {
    AgGridVue
  },
  data() {
    return {
      params: {},
      rowData: Object.assign([], this.$store.state.qualityData),
      updatedRowData: [],
      formDuty: true,
      form: {
        procOrder: "",
        internalOrder: "",
        plant: ""
      },
      colDefs: [
        {
          headerName: "工厂",
          field: "plant",
          width: 100,
          editable: false,
          checkboxSelection: true
        },
        {
          headerName: "采购订单",
          field: "procOrder",
          width: 150,
          editable: false
        },
        {
          headerName: "内向交货单",
          field: "internalOrder",
          width: 150,
          editable: false
        },
        {
          headerName: "检验批",
          field: "QC_No",
          width: 200,
          editable: true
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
          editable: true
        },
        {
          headerName: "支持文件",
          field: "Supportings",
          width: 200,
          editable: true
        }
      ],
      gridOptions: {},
      procOrders: this.$store.state.procOrders,
      internalOrders: this.$store.state.internalOrders
    };
  },
  methods: {
    query() {},
    handleDelete() {
      const selectedRows = this.getSelectedRows();
      if (null == selectedRows || selectedRows.length <= 0) {
        this.$message.error("错了哦，没有选中的数据");
        return;
      }
      let newRowData = [];
      selectedRows.forEach(element => {
        newRowData = this.rowData.filter(row => {
          return row.id !== element.id;
        });
      });
      this.rowData = newRowData;
    },
    saveData() {
      this.$store.commit("updateStore", {
        key: "qualityData",
        value: this.rowData
      });
      this.formDuty = true;
    },
    addNew() {
      this.rowData.push({
        id: new Date().getTime(),
        plant: this.params.plant,
        procOrder: this.params.procOrder,
        internalOrder: this.params.internalOrder,
        QC_No: "",
        MaterialPN: "",
        QC_PN: "",
        QC_Desc: "",
        QC_Result: "",
        Result: "",
        Group_Code: "",
        Mani_Group: "",
        Defect_Num: "",
        Supportings: ""
      });
      this.formDuty = false;
    },
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
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    cellValueChanged(param) {
      let existAlready = false;
      for (let i = 0; i < this.updatedRowData.length; i++) {
        if (this.updatedRowData[i].id === param.data.id) {
          this.updatedRowData[i] = param.data;
          existAlready = true;
          break;
        }
      }
      if (!existAlready) {
        this.updatedRowData.push(param.data);
      }
    },
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      return selectedData;
    }
  },
  beforeMount() {
    const params = this.$route.params;
    this.form.plant = params.plant;
    this.form.internalOrder = params.internalOrder;
    this.form.procOrder = params.procOrder;
    this.params = params;
  }
};
</script>


