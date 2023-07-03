<template>
  <div class="manage">
    <el-dialog title="新增用户"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form ref="form"
               :inline="true"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="form.name"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄"
                      prop="age">
          <el-input v-model="form.age"
                    placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <el-select v-model="form.sex"
                     placeholder="请选择">
            <el-option label="男"
                       :value="1"></el-option>
            <el-option label="女"
                       :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期"
                      prop="birth">
          <el-date-picker v-model="form.birth"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址"
                      prop="addr">
          <el-input v-model="form.addr"
                    placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary"
                 @click="handleAdd">+新增</el-button>
      <el-form :inline="true"
               :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称"
                    v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="name"
                         label="姓名"
                         width="200">
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         width="150">
          <template slot-scope="scope">
            <span>{{scope.row.sex === 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age"
                         label="年龄"
                         width="100">
        </el-table-column>
        <el-table-column prop="birth"
                         label="出生日期"
                         width="200">
        </el-table-column>
        <el-table-column prop="addr"
                         label="地址"
                         width="360">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next"
                       :total="total"
                       @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        age: [
          { required: true, message: '请输入年龄' }
        ],
        sex: [
          { required: true, message: '请选择性别' }
        ],
        birth: [
          { required: true, message: '请选择日期' }
        ],
        addr: [
          { required: true, message: '请输入地址' }
        ],
      },
      tableData: [],
      modalType: 0, //0表示编辑用户，1表示新增用户
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ''
      }
    }
  },
  methods: {
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (this.modalType === 1) { //新增用户
          addUser(this.form).then(() => {
            //刷新用户列表
            this.getList()
          })
        } else { //编辑用户
          editUser(this.form).then(() => {
            this.getList()
          })
        }
        if (valid) {
          //清空表单的数据
          this.$refs.form.resetFields()
          //关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    getList() {
      //获取的列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    //对话框要关闭的时候和点击取消按钮的时候
    handleClose() {
      //清空表单的数据
      this.$refs.form.resetFields()
      //关闭弹窗
      this.dialogVisible = false
    },
    handleAdd() {
      this.dialogVisible = true
      this.modalType = 1
    },
    //编辑用户
    handleEdit(row) {
      this.modalType = 0
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    //删除用户
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    .pager {
      position: absolute;
      bottom: -100;
      right: 20px;
    }
  }
}
</style>