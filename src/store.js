import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false
    },
    qualityData: [],
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
    ],
    chart1: {
      title: {
        text: "2018年度与2017年度月度出货量分析",
        subtext: "纯属虚构"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["2017", "2018"],
        show: false
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
    },
    chart2: {
      title: {
        text: "各供应商来料质检合格率分析",
        subtext: "纯属虚构"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: "vertical",
        itemMarginLeft: 100,
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
                  lineHeight: 15,
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
                  fontSize: 12,
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
    }
  },
  mutations: {
    updateStore(state, payload) {
      console.log(payload.key);
      state[payload.key] = payload.value;
    },
    updateStores(state, payload) {
      for (let obj of payload) {
        state[obj.key] = obj.value;
      }
    }
  },
  actions: {}
});
