<template>
<div class="elementContainer fullScreen">
    <div class="moduleSection">
        <div class="modelAction">
            <img src="../../assets/images/actionbar1-black.png" class="actionImg ">
            <span class="actionLabelGray ">供应商关系管理</span>
        </div>
        <div class="modelAction">
            <img src="../../assets/images/actionbar5-black.png" class="actionImg ">
            <span class="actionLabelGray ">采购管理</span>
        </div>
        <div class="modelAction">
            <img @click="handleClick" src="../../assets/images/actionbar6.png" class="actionImg cursorhand">
            <span @click="handleClick" class="actionLabel cursorhand">质检管理</span>
        </div>
        <div class="modelAction">
            <img src="../../assets/images/actionbar6-black.png" class="actionImg ">
            <span class="actionLabelGray ">需求计划</span>
        </div>
    </div>
    <div class="dashboardSection">
        <div class="halfScreen">
            <div class="chartContainer">
                <div class="chartInstance" id="procurementChart"></div>
            </div>
        </div>
        <div class="halfScreen">
            <div class="chartContainer">
                <div class="chartInstance" id="qmschart"></div>
            </div>
        </div>
    </div>
    <el-dialog title="采购订单录入" :visible.sync="dialogFormVisible">
        <el-form :model="form">
           <el-form-item label="工厂:" :label-width="formLabelWidth">
                 <el-input v-model="form.plant" autocomplete="off" disabled="" class="inputField"></el-input>
            </el-form-item>
                <el-form-item label="采购订单:" :label-width="formLabelWidth">
                <el-autocomplete
                    class="inline-input inputField"
                    v-model="form.procOrder"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入订单编号"
                    
                ></el-autocomplete>
            </el-form-item>
                <el-form-item label="内向交货单:" :label-width="formLabelWidth">
                  <el-autocomplete
                    class="inline-input inputField"
                    v-model="form.internalOrder"
                    :fetch-suggestions="queryInternalOrder"
                    placeholder="请输入订单编号"
                    
                ></el-autocomplete>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleInputConfirm">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        procOrder: "",
        internalOrder: "",
        plant: "1100"
      },
      procOrders: this.$store.state.procOrders,
      internalOrders: this.$store.state.internalOrders
    };
  },
  methods: {
    handleInputConfirm() {
      if (this.form.procOrder === "") {
        this.$message.error("错了哦，采购订单不能为空");
        return;
      }
      if (this.form.internalOrder === "") {
        this.$message.error("错了哦，内向交货单不能为空");
        return;
      }
      if (this.form.plant === "") {
        this.$message.error("错了哦，工厂不能为空");
        return;
      }
      this.dialogFormVisible = false;
      this.$router.push({
        name: "QualityInput",
        params: {
          plant: this.form.plant,
          procOrder: this.form.procOrder,
          internalOrder: this.form.internalOrder
        }
      });
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

    handleClick() {
      this.dialogFormVisible = true;
    },
    initialProcurementChart() {
      const procChart = this.echarts.init(document.getElementById("procurementChart"));
      procChart.setOption(this.$store.state.chart1);
    },
    initialQMSChart() {
      const qmsChart = this.echarts.init(document.getElementById("qmschart"));
      qmsChart.setOption(this.$store.state.chart2);
    }
  },
  mounted() {
    this.initialProcurementChart();
    this.initialQMSChart();
  }
};
</script>
<style scoped>
.inputField {
  width: 200px;
}
.actionLabel {
  color: #3498db;
  font-weight: 500;
}
.actionLabelGray {
  color: gray;
  font-weight: 500;
}
.modelAction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.actionImgwhide {
  padding: 2px;
  background-color: #3498db;
  width: 90px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.actionImg {
  padding: 2px;
  background-color: #3498db;
  width: 85px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.halfScreen {
  width: 45%;
  height: 100%;
  padding: 15px;
}
.chartContainer {
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  height: 100%;
  padding: 10px;
}
.chartInstance {
  height: 100%;
  width: 100%;
}
.moduleSection {
  height: 200px;
  width: 100%;
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: space-evenly;
  align-items: center;
}
.dashboardSection {
  display: flex;
  width: 100%;
  height: 450px;
  justify-content: center;
  align-items: center;
}
</style>

