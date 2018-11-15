<template>
    <div class="elementContainer">
         <el-carousel height="calc(100vh - 380px)">
             <el-carousel-item v-for="(item,index) in items" :key="index">
                <div :class="item.class">
                    {{item.text}}
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="homePageMiddle">
            <div class="contentItem">
                <img src="../assets/images/icons/icon1.png" class="homeimg">
                <p class="contentText"><span class="importantText">36</span>个订单入库</p>
                <p class="contentText">在途订单<span class="importantText">48</span></p>
            </div>
            <div class="contentItem">
                <img src="../assets/images/icons/icon2.png" class="homeimg">
                <p class="contentText">最近7天来料质检</p>
                <p class="contentText">合格率 <span class="importantText">100%</span></p>
            </div>
            <div class="contentItem">
                <img src="../assets/images/icons/icon3.png" class="homeimg">
                <p class="contentText">新注册供应商<span class="importantText">36</span>家</p>
                <p class="contentText">供应商通报<span class="importantText">13家</span></p>
            </div>
            <div class="contentItem">
                <img src="../assets/images/icons/icon4.png" class="homeimg">
                <p class="contentText">季度需求计划上报率</p>
                <p class="contentText"><span class="importantText">100%</span></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          class: "slide slide1",
          text: "认知供应链解决方案领导者"
        },
        {
          class: "slide slide2",
          text: "轻量、快速、增效益，减成本"
        },
        {
          class: "slide slide3",
          text: "系统稳定，功能完善"
        },
        {
          class: "slide slide4",
          text: "帮助企业成长"
        }
      ]
    };
  }
};
</script>
<style scoped>
.homeimg {
  margin-bottom: 30px;
}
.importantText {
  color: #09f;
  font-size: 24px;
  line-height: 30px;
  margin: 0;
  padding: 0;
  font-weight: 500;
}
.contentText {
  color: #666;
  font-size: 18px;
  line-height: 30px;
  margin: 0;
  padding: 0;
}
.contentItem {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}
.homePageMiddle {
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 50px;
  justify-content: space-evenly;
  align-items: flex-start;
}
.slide {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 48px;
}
.slide1 {
  background-image: url(../assets/images/C007.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.slide2 {
  background-image: url(../assets/images/C004.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.slide3 {
  background-image: url(../assets/images/C006.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.slide4 {
  background-image: url(../assets/images/home_bg.jpg);

  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
</style>


