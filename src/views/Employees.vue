<template>
  <div>
    <v-head></v-head>

    <div class="container">
      <div class="handle-box">
        <el-input v-model="queryBox.empId" placeholder="employee Id" class="handle-input mr10"></el-input>
        <el-input v-model="queryBox.name" placeholder="name" class="handle-input mr10"></el-input>
        <el-input v-model="queryBox.title" placeholder="title" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddNewEmployee" style="float: right"
                   round>
          Add
        </el-button>
      </div>
      <el-table
          :data="employeeData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
      >
        <el-table-column prop="empId" label="Employee Id" min-width="6" align="center"></el-table-column>
        <el-table-column prop="name" label="Name" min-width="6" align="center"></el-table-column>
        <el-table-column prop="surname" label="Surname" min-width="10" align="center"></el-table-column>
        <el-table-column prop="phoneNumber" label="Phone Number" min-width="10" align="center"></el-table-column>
        <el-table-column prop="address" label="Address" min-width="10" align="center"></el-table-column>
        <el-table-column prop="title" label="Title" min-width="10" align="center"></el-table-column>

        <el-table-column label="Operator" min-width="10" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
            >Edit
            </el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="currentPageNumber"
            :page-size="5"
            :total="totalEmployeeAmount"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vHead from '@/components/Header.vue';

export default {
  inject: ['reload'],
  name: "Employees",
  components: {
    vHead,
  },
  data() {
    return {
      currentPageNumber: 1,

      uri: {
        p: '',
        empId: '',
        name: '',
        title: '',
      },

      queryBox: {
        empId: '',
        name: '',
        title: '',
      },


      totalEmployeeAmount: 0,
      employeeData: [],
    };
  },
  created() {
    this.uri.p = this.$route.query.p;          // current page number (string)
    // if query param "p" is not in uri or "p" is less than 1, just making p = 1
    if (this.uri.p === undefined || parseInt(this.uri.p) < 1) {
      this.uri.p = 1;
    }
    this.currentPageNumber = parseInt(this.uri.p);  // update local variable currentPageNumber
    console.log('In create method, currentPageNumber=' + this.currentPageNumber)

    this.uri.empId = this.$route.query.empId;  // employee's Id
    this.uri.name = this.$route.query.name;    // employee's name
    this.uri.title = this.$route.query.title;  // employee's title
    console.log('p = ' + this.uri.p + ',empId = ' + this.uri.empId + ',' +
        'name = ' + this.uri.name + ', title = ' + this.uri.title + '.')

    // construct query string
    let queryStr = '?';
    const p = parseInt(this.uri.p) - 1;  // p minus 1 before sending p to backend
    queryStr += 'p=' + p;
    if (this.uri.empId !== undefined) {
      queryStr += '&empId=' + this.uri.empId;
    }
    if (this.uri.name !== undefined) {
      queryStr += '&name=' + this.uri.name;
    }
    if (this.uri.title !== undefined) {
      queryStr += '&title=' + this.uri.title;
    }
    console.log('Fetching data from http://localhost:8080/api/employees' + queryStr);

    // fetch data from backend
    axios.get('http://localhost:8080/api/employees' + queryStr,
        {headers: {'auth-token': this.$store.state.user.token}})
        .then(resp => {
          console.log(resp.data);
          this.employeeData = resp.data.content;
          this.totalEmployeeAmount = resp.data.totalElements;  // total employee amount (nothing to do with current page number)
        })
        .catch(err => {
          console.log(err.response)
          this.$message({
            showClose: true,
            message: err.response.data.error,
            type: 'error'
          });
        })
  },
  methods: {
    // search employee according to parameters in queryBox
    handleSearch() {
    },

    // delete an employee
    handleDelete(index, row) {
      console.log('index=' + index + ', employee Id for this guy is ' + row.empId);
      const employId = row.empId;
      const employName = row.name;
      this.$confirm('This will permanently delete employee ' + employName + '. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        axios.delete('http://localhost:8080/api/employees/' + employId, {
          headers: {'auth-token': this.$store.state.user.token}
        })
            .then(res => {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: 'Delete completed'
              });
              this.reload()
            })
            .catch(err => {
              console.log(err.response)
              this.$message({
                showClose: true,
                message: err.response.data.error,
                type: 'error'
              });
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    },

    // edit an employee
    handleEdit(index, row) {
    },

    // add a new employee
    handleAddNewEmployee() {

    },

    // Page Navigation
    handlePageChange(currentPage) {
      console.log('Clicking Next Page Button, param currentPage=' + currentPage + ", this.currentPageNumber=" + this.currentPageNumber)
      let queryStr = '?p=' + currentPage;
      if (this.uri.empId !== undefined) {
        queryStr += '&empId=' + this.uri.empId;
      }
      if (this.uri.name !== undefined) {
        queryStr += '&name=' + this.uri.name;
      }
      if (this.uri.title !== undefined) {
        queryStr += '&title=' + this.uri.title;
      }
      this.$router.push('/employees' + queryStr)
      this.reload();
    },
  }
}
</script>

<style scoped>
.container {
  text-align: left;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}
</style>
