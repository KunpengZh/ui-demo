<template>
<div class="elementContainer fullScreen">
    <div class="moduleSection">
        <div class="modelAction">
            <img src="../../assets/images/actionbar1.png" class="actionImg cursorhand">
            <span class="actionLabel cursorhand">供应商关系管理</span>
        </div>
        <div class="modelAction">
            <img src="../../assets/images/actionbar5.png" class="actionImg cursorhand">
            <span class="actionLabel cursorhand">采购管理</span>
        </div>
        <div class="modelAction">
            <img @click="handleClick" src="../../assets/images/actionbar6.png" class="actionImg cursorhand">
            <span @click="handleClick" class="actionLabel cursorhand">质检管理</span>
        </div>
        <div class="modelAction">
            <img src="../../assets/images/actionbar4.png" class="actionImg cursorhand">
            <span class="actionLabel cursorhand">需求计划</span>
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
                    @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
                <el-form-item label="内向交货单:" :label-width="formLabelWidth">
                  <el-autocomplete
                    class="inline-input inputField"
                    v-model="form.internalOrder"
                    :fetch-suggestions="queryInternalOrder"
                    placeholder="请输入订单编号"
                    @select="handleSelect"
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
    handleSelect(item) {
      console.log(item);
    },
    handleClick() {
      this.dialogFormVisible = true;
    },
    initialProcurementChart() {
      const procChart = this.echarts.init(document.getElementById("procurementChart"));
      procChart.setOption({
        title: {
          text: "2018年度与2017年度月度出货量分析",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["2017", "2018"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2017",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [{ type: "max", name: "最大值" }, { type: "min", name: "最小值" }]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "2018",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    initialQMSChart() {
      const qmsChart = this.echarts.init(document.getElementById("qmschart"));
      qmsChart.setOption({
        title: {
          text: "各供应商来料质检合格率分析",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["供应1", "供应2", "供应3", "供应4", "供应5", "供应6", "供应7", "供应8", "供应9", "供应10"]
        },
        series: [
          {
            name: "质检合格率",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "来料质检", selected: true },
              { value: 679, name: "退货" },
              { value: 1548, name: "换货" }
            ]
          },
          {
            name: "质检合格率",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "供应1" },
              { value: 310, name: "供应2" },
              { value: 234, name: "供应3" },
              { value: 135, name: "供应4" },
              { value: 1048, name: "供应5" },
              { value: 251, name: "供应6" },
              { value: 147, name: "供应7" },
              { value: 102, name: "供应8" }
            ]
          }
        ]
      });
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

