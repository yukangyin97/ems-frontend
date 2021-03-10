<template>
  <el-drawer
      title="Edit an Employee"
      :with-header="editEmployeeDrawerProp.withHeader"
      size="30%"
      :append-to-body="editEmployeeDrawerProp.appendToBody"
      :visible.sync="visible"
      :direction="editEmployeeDrawerProp.direction"
      :modal="editEmployeeDrawerProp.model"
      :before-close="cancelForm">
    <div class="demo-drawer__content">

      <el-card shadow="hover" style="height:1000px;">
        <div slot="header" class="clearfix" style="text-align: left">
          <a style="font-size: large;color: #20a0ff">Edit an Employee</a>
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
            <el-input v-model="employeeDetail.empId" readonly></el-input>
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
  name: 'EditEmployee',
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    employeeId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      editEmployeeDrawerProp: {
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
      this.$confirm('Confirm Edit？', {
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

            axios.put('http://localhost:8080/api/employees', this.employeeDetail, {
              headers: {'auth-token': this.$store.state.user.token}
            })
                .then(res => {
                  console.log(res)
                  this.loading = false;
                  this.visible = false;
                  this.reload()
                  clearTimeout(this.timer);
                  this.$message({
                    message: 'Employee Edit Success!',
                    type: 'success'
                  })
                })
                .catch(err => {
                  console.log(err.response)
                  this.loading = false;
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
              message: 'Editing Employee Canceled'
            });
          });
    },
  },
  created() {
    console.log('Employee Id=' + this.employeeId)
    axios.get('http://localhost:8080/api/employees/' + this.employeeId, {
      headers: {'auth-token': this.$store.state.user.token}
    })
    .then(res => {
      console.log(res.data)
      this.employeeDetail.empId = res.data.empId;
      this.employeeDetail.name = res.data.name;
      this.employeeDetail.surname = res.data.surname;
      this.employeeDetail.phoneNumber = res.data.phoneNumber;
      this.employeeDetail.title = res.data.title;
      this.employeeDetail.address = res.data.address;
    })
    .catch(err => {
      console.log(err.response.data.error)
    })
  }
};
</script>