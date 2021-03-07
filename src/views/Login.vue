<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Employee Management System</div>
      <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="password"
              v-model="loginForm.password"
              @keyup.enter.native="login()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login()">Login</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
import {decodeUsername} from "@/utils/decode";

export default {
  data: function () {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      decodedUsername: '',
      rules: {
        username: [
          {required: true, message: 'Please input username', trigger: 'blur'},
        ],
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'},
        ],
      },
    };
  },
  methods: {
    login: function () {
      this.$refs.login.validate(valid => {
        if (valid) {
          axios.post('http://localhost:8080/api/login', qs.stringify(this.loginForm),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(resp => {
                const token = resp.data.token;
                const decodedUsername = decodeUsername(resp.data.token);

                this.$message({
                  showClose: true,
                  message: 'Login Success!',
                  type: 'success'
                });
                this.$store.commit('setToken', token);
                this.$store.commit('setUsername', decodedUsername);

                // redirect to employee list page
                this.$router.push('/employees');
              })
              .catch(err => {
                this.$message({
                  showClose: true,
                  message: err.response.data.error,
                  type: 'error'
                });
              })
        } else {
          this.$message({
            showClose: true,
            message: 'Please input valid username and password',
            type: 'warning'
          });
          return false;
        }
      });
    },

  },
};
</script>

<style scoped>
@import "../assets/css/main.css";
@import "../assets/css/color-dark.css";


.el-form >>> .el-form-item__error {
  color: black;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
