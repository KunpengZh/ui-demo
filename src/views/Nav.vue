<template>
<div class="navContainer">
    <div class="logoContainer">
        <img src="../assets/images/cognitive.png" height="60px">
        <div><p class="logoTitle">智能供应链</p></div>
    </div>
    <div class="menu">
        <ul>
            <li class="cursorhand">采购管理</li>
            <li class="cursorhand" >质量管理</li>
            <li class="cursorhand" >供应商管理</li>
            <li class="cursorhand" >需求计划管理</li>
            <li class="cursorhand"  @click="showLogin">用户登陆</li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
  methods: {
    data() {
      return {
        showLoginWindow: false
      };
    },
    showLogin() {
      let fullScreenLoading = document.getElementById("fullScreenLoading");
      fullScreenLoading.style.display = "";
      this.$emit("showLoginWindow");
    }
  }
};
</script>
<style scoped>
.navContainer {
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.8);

  z-index: 999;
  justify-content: flex-start;
  display: flex;
}
.logoContainer {
  margin-left: 50px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.logoTitle {
  padding-left: 10px;
  color: white;
  font-size: 22px;
}
div.menu ul {
  list-style: none;
  width: auto;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  margin-right: 50px;
  margin-left: 50px;
}
div.menu ul li {
  margin-left: 20px;
  margin-right: 20px;
}
</style>


