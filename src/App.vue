<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created() {
    /**
     * retrieve "userInfo" from sessionStorage when a page is loaded, and assign "userInfo" in sessionStorage to this.$store.state
     *
     * Considering there is no "userInfo" in session Storage when the project is loaded for the first time
     * so an assertion sessionStorage.getItem("userInfo") is not null is essential
     */
    sessionStorage.getItem("userInfo") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("userInfo"))));

    /**
     * inject data in "this.$store.state" to sessionStorage before loading a new page
     */
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("userInfo", JSON.stringify(this.$store.state))
    })

  }
}
</script>

<style>
@import './assets/css/main.css';
@import "./assets/css/color-dark.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
