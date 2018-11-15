<template>
<div class="loginWindowContainer">
    <el-collapse-transition>
    <div class="loginWindow">
        <div class="loginWHeader">
            <img src="../assets/images/login.png" width="180px">
            <span class="loginTitle">智能供应链系统登陆</span>
        </div>
        <div class="loginForm">
            <el-input placeholder="手机号码或邮箱" v-model="userId" style="margin-bottom:10px;" clearable="true">
                <img slot="prepend" src="../assets/images/icons/user.png" height="30px">
                <!-- <el-button slot="prepend" icon="el-icon-search"></el-button> -->
            </el-input>
            <el-input placeholder="密码" type="password" v-model="password">
                <img slot="prepend" src="../assets/images/icons/password.png" height="30px">
                <!-- <el-button slot="prepend" icon="el-icon-search"></el-button> -->
            </el-input>
            <div class="rememberme">
                <el-checkbox v-model="rememberme">记住我</el-checkbox>
            </div>

            <div class="actionBar">
                <el-button type="primary" @click="handleLogin" class="loginButton">登 陆</el-button>
                <el-button type="primary" @click="handleCancel" class="loginButton">取 消</el-button>
            </div>

        </div>
    </div>
    </el-collapse-transition>
</div>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      password: "",
      rememberme: false
    };
  },
  methods: {
    handleLogin() {
      let fullScreenLoading = document.getElementById("fullScreenLoading");
      fullScreenLoading.style.display = "none";
      this.$emit("userLogin");
    },
    handleCancel() {
      let fullScreenLoading = document.getElementById("fullScreenLoading");
      fullScreenLoading.style.display = "none";
      this.$emit("cancelLogin");
    }
  }
};
</script>
<style scoped>
.loginButton {
  padding-left: 30px;
  padding-right: 30px;
}
.actionBar {
  width: 100%;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.rememberme {
  text-align: left;
  width: 100%;
  padding-top: 5px;
}
.loginForm {
  display: flex;
  height: 60%;
  width: 70%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
}
.loginTitle {
  font-size: 24px;
}
.loginWHeader {
  display: flex;

  width: 100%;
  justify-content: center;
  align-items: center;
}
.loginWindow {
  background-color: #f9f9f9;
  width: 600px;

  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.loginWindowContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9001;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


