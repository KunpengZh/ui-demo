<template>
<div class="navContainer">
    <div class="logoContainer">
        <img src="../assets/images/cognitive.png" height="60px">
        <div><p class="logoTitle">智能供应链</p></div>
    </div>
    <div class="menu">
        <ul>
            <li v-if="showMenu" class="colorGray"  >采购管理</li>
            <li v-if="showMenu" class="cursorhand" @click="toDashboard" >质量管理</li>
            <li v-if="showMenu" class="colorGray"  >供应商管理</li>
            <li v-if="showMenu" class="colorGray"  >需求计划</li>
            <li v-if="showMenu" class="cursorhand"  @click="docCenter" >文档中心</li>
            <li v-if="!showMenu" class="cursorhand"  @click="showLogin">用户登陆</li>
            <li v-if="showMenu" class="cursorhand" @click="logou" >退出</li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      showLoginWindow: false
    };
  },
  computed: {
    showMenu() {
      return this.$store.state.user.isLoggedIn;
    }
  },
  methods: {
    docCenter() {
      this.$router.push("/doccenter");
    },
    toDashboard() {
      this.$router.push("/dashboard");
    },
    showLogin() {
      let fullScreenLoading = document.getElementById("fullScreenLoading");
      fullScreenLoading.style.display = "";
      this.$emit("showLoginWindow");
    },
    logou() {
      this.$store.commit("updateStore", {
        key: "user",
        value: {
          isLoggedIn: false
        }
      });
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.colorGray {
  color: gray;
}
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
  margin-right: 20px;
  margin-left: 20px;
}
div.menu ul li {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
}
</style>


