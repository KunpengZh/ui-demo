import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false
    },
    doc: {
      data: {
        navagators: [
          {
            text: "业务模块",
            value: [
              "采购/供应链战略",
              "业务模式",
              "组织/岗位职责/人员能力评估",
              "绩效设计",
              "品类分类/主数据分类/物料编码",
              "采购需求管理/物资标准化",
              "品类采购策略",
              "成本工程管理",
              "市场情报分析",
              "供应商选择管理（招投标,竞谈等）",
              "合同管理",
              "供应商管理",
              "质量管理",
              "采购执行管理",
              "业务控制/审计管理",
              "需求计划管理/S&OP",
              "库存/仓储规划与管理",
              "物流规划与管理",
              "生产管理/工程管理/精益制造",
              "智慧供应链",
              "智能工厂",
              "其他",
              "Newtag"
            ]
          },
          {
            text: "项目类型",
            value: [
              "现状诊断",
              "高阶规划设计",
              "详细业务方案设计/优化",
              "流程/作业指导/表单设计",
              "业务落地实施",
              "系统项目(规划/实施)",
              "外包管理",
              "其他"
            ]
          },
          {
            text: "材料类型",
            value: [
              "training/knowledge",
              "IBM相关能力介绍",
              "方案建议书",
              "启动会材料",
              "过程文件",
              "交付件",
              "汇报材料",
              "Client Visit",
              "Event",
              "其他"
            ]
          },
          {
            text: "方法论",
            value: ["BLM", "Maturity Assessment", "TOM", "CBM", "APQC/EPF", "Design Thinking", "Benchmarking", "其他"]
          },
          {
            text: "行业",
            value: [
              "Telecommunications（COMMS）",
              "Energy & Utility（E&U）",
              "Media & Entertainment（M&E）",
              "Public（Pub）",
              "Retail & CPG",
              "Travel & Transportation（T&T)",
              "Electronics （E&E）",
              "Industrial Product（IP）",
              "Automotive（Auto)",
              "Real Estate(RESO)",
              "Huawei",
              "CRC（华润）",
              "Financial & Stock Service (FSS)",
              "其他"
            ]
          }
        ],
        documentList: [
          {
            date: "2018-06-26",
            docName: "SGM_间接采购业务交流_20141121v1.1 .ppt",
            author: "Joyce Wu",
            GUID: "711fa2bf-304c-4829-9567-84538dc0d92b",
            url:
              "https://w3-connections.ibm.com/wikis/form/anonymous/api/wiki/2d83c793-25b4-467b-9784-60067dc207b8/page/a1e06986-366c-4762-80d1-375b73442cd8/attachment/e6be9d54-caaf-4c18-a8be-51512888d141/media/SGM_间接采购业务交流_20141121v1.1%20.ppt",
            tags: {
              业务模块: {
                text: "业务模块",
                value: ["采购/供应链战略", "业务模式"]
              }
            }
          },
          {
            date: "2018-06-12",
            docName: "SGM_间接采购业务交流_20141121v1.1 .ppt",
            author: "kpzhang@cn.ibm.com",
            GUID: "af55a5d8-690c-4318-9c76-b5c7b09c8508",
            url:
              "https://w3-connections.ibm.com/wikis/form/anonymous/api/wiki/2d83c793-25b4-467b-9784-60067dc207b8/page/a1e06986-366c-4762-80d1-375b73442cd8/attachment/e6be9d54-caaf-4c18-a8be-51512888d141/media/SGM_间接采购业务交流_20141121v1.1%20.ppt",
            tags: {
              项目类型: {
                text: "项目类型",
                value: ["高阶规划设计", "详细业务方案设计/优化"]
              }
            }
          }
        ]
      }
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
    },
    updateDocList(state, docList) {
      console.log(docList);
      state.doc.data.documentList.push(...docList);
      console.log(state.doc);
    }
  },
  actions: {}
});
