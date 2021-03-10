<template>
  <el-drawer
      title="Add an Employee"
      :with-header="addEmployeeDrawerProp.withHeader"
      size="30%"
      :append-to-body="addEmployeeDrawerProp.appendToBody"
      :visible.sync="visible"
      :direction="addEmployeeDrawerProp.direction"
      :modal="addEmployeeDrawerProp.model"
      :before-close="cancelForm">
    <div class="demo-drawer__content">

      <el-card shadow="hover" style="height:1000px;">
        <div slot="header" class="clearfix" style="text-align: left">
          <a style="font-size: large;color: #20a0ff">Add an Employee</a>
          <el-button-group style="float: right">
            <el-button type="danger" @click.native="$emit('cancelForm')" style="width: 80px">Cancel
            </el-button>
            <el-button type="primary" @click="handleSubmit()" :loading="loading"
                       style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
            </el-button>
          </el-button-group>
        </div>

        <el-form ref="employeeDetail" :model="employeeDetail" :rules="employeeDetailRules"
                 style="margin-top: 5%;" label-width="auto" :label-position="labelPosition">
          <el-form-item label="Employee Id :" prop="empId" style="margin-top: 5%;width: 85%">
            <el-input v-model="employeeDetail.empId"></el-input>
          </el-form-item>

          <el-form-item label="Employee Name :" prop="name" style="margin-top: 5%;width: 85%">
            <el-input v-model="employeeDetail.name"></el-input>
          </el-form-item>

          <el-form-item label="Employee Surname :" prop="surname" style="margin-top: 5%;width: 85%">
            <el-input v-model="employeeDetail.surname"></el-input>
          </el-form-item>

          <el-form-item label="Employee Phone Number :" prop="phoneNumber" style="margin-top: 5%;width: 85%">
            <el-input v-model="employeeDetail.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item label="Employee Address :" prop="address" style="margin-top: 5%;width: 85%">
            <el-input v-model="employeeDetail.address"></el-input>
          </el-form-item>

          <el-form-item label="Employee Title :" prop="title" style="margin-top: 5%;width: 85%">
            <el-input v-model="employeeDetail.title"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </el-drawer>
</template>


<script>
import axios from "axios";

export default {
  inject: ['reload'],
  name: 'EmployeeDetail',
  props: {
    visible: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      addEmployeeDrawerProp: {
        direction: 'rtl',
        withHeader: false,
        appendToBody: true,
        model: false
      },
      employeeDetail: {
        empId: '',
        name: '',
        surname: '',
        phoneNumber: '',
        address: '',
        title: '',
      },
      labelPosition: 'right',
      loading: false,
      employeeDetailRules: {
        empId: [
          {required: true, message: 'Please input employee Id', trigger: 'blur'},
        ],
        name: [
          {required: true, message: 'Please input employee name', trigger: 'blur'},
        ],
        surname: [
          {required: true, message: 'Please input employee surname', trigger: 'blur'},
        ],
        phoneNumber: [
          {required: true, message: 'Please input employee phone number', trigger: 'blur'},
        ],
        address: [
          {required: true, message: 'Please input employee address', trigger: 'blur'},
        ],
        title: [
          {required: true, message: 'Please input employee title', trigger: 'blur'},
        ],

      }
    };
  },
  methods: {
    cancelForm() {
      this.$emit('cancelForm')
      this.loading = false;
      this.visible = false;
      clearTimeout(this.timer);
    },
    handleSubmit() {
      if (this.loading) {
        return;
      }
      this.$confirm('Confirm Add？', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      })
          .then(_ => {
            console.log(this.employeeDetail)
            this.loading = true;
            this.timer = setTimeout(() => {
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);

            axios.post('http://localhost:8080/api/employees', this.employeeDetail, {
              headers: {'auth-token': this.$store.state.user.token}
            })
            .then(res => {
              console.log(res)
              this.loading = false;
              // this.addEmployeeDrawerProp.editDrawVisible = false;
              this.visible = false;
              this.reload()
              clearTimeout(this.timer);
              this.$message({
                message: 'Employee Add Success!',
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err.response)
              this.loading = false;
              // this.addEmployeeDrawerProp.editDrawVisible = false;
              this.visible = false;
              this.reload()
              clearTimeout(this.timer);
              this.$message({
                message: err.response.data.error,
                type: 'error'
              })
            });
          })
          .catch(_ => {
            this.$message({
              type: 'info',
              message: 'Adding Employee Canceled'
            });
          });
    },
  }
};
</script>