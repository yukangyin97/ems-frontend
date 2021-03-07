<template>
  <div class="header">
    <div class="logo">Employee Management System</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- user-avator -->
        <div class="user-avator">
          <img src="@/assets/img/img.jpg"/>
        </div>
        <!-- user drop-down menu -->
        <el-dropdown class="user-name" trigger="click" @command="handleDropdownCommand">
                    <span class="el-dropdown-link">
                      {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      message: 0,
    };
  },
  computed: {
    username() {
      const username = this.$store.state.user.username;
      return username !== ''? username : 'mockUsername';
    }
  },
  methods: {
    handleDropdownCommand(command) {
      console.log(command)
      if (command === 'logout') {
        this.$message({
          showClose: true,
          message: 'Logout Success!',
          type: 'success',
        });
        this.$store.commit('logout');
        this.$router.push('/login');
      }
    },
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.header .logo {
  float: left;
  width: 500px;
  margin-left: 20px;
  text-align: left;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
