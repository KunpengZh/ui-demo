<template>
  <div id="app" class="fullScreen">
    <NavBar v-on:showLoginWindow="showLoginWindow"></NavBar>
    <transition
        name="bounce"
        enter-active-class="bounceInDown"
        leave-active-class="bounceOutDown">
    <LoginWindow v-on:userLogin="handleUserLogin" v-on:cancelLogin="handleCancelLogin" v-if="showLogin"></LoginWindow>
     </transition>
     <transition
        name="bounce"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight">
        <router-view/>
    </transition>
  </div>
</template>
<script>
import NavBar from "./views/Nav";
import LoginWindow from "./views/LoginWindow";
export default {
  components: {
    NavBar,
    LoginWindow
  },
  data() {
    return {
      showLogin: false
    };
  },
  methods: {
    showLoginWindow() {
      this.showLogin = true;
    },
    handleUserLogin() {
      this.showLogin = false;
      this.$store.state.user.isLoggedIn = true;
      this.$store.commit("updateStore", {
        key: "user",
        value: {
          isLoggedIn: true
        }
      });
      this.$router.push("/dashboard");
    },
    handleCancelLogin() {
      this.showLogin = false;
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
