<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="书名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getBooks">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<!--<el-table-column prop="id" label="id" width="120" v-if="show" sortable>-->
			<!--</el-table-column>-->
			<el-table-column prop="name" label="书名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="ctg" label="类别" width="100" :formatter="formatCtg" sortable>
			</el-table-column>
			<!--</el-table-column>-->
			<!--<el-table-column prop="ctg" label="类别" width="100" sortable>-->
			<!--</el-table-column>-->
			<el-table-column prop="resNum" label="剩余数量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="inLibDate" label="入管时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="出版地" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="书名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="类别">
					<el-radio-group v-model="editForm.ctg">
						<el-radio class="radio" :label="0">哲学、宗教</el-radio>
						<el-radio class="radio" :label="1">社会科学总论</el-radio>
						<el-radio class="radio" :label="2">政治、法律</el-radio>
						<el-radio class="radio" :label="3">军事</el-radio>
						<el-radio class="radio" :label="4">文化、科学、教育、体育</el-radio>

					</el-radio-group>
				</el-form-item>
				<el-form-item label="剩余数量">
					<el-input-number v-model="editForm.resNum" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="入馆时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.inLibDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="出版地">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			 <el-button @click.native="dialogFormVisible=false">取消</el-button>
			  <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";

export default {
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      page: 1,
     // listLoading: false,v-loading="listLoading"
      sels: [], //列表选中列

      //editFormVisible: false, //编辑界面是否显示
      //editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: "0",
        name: "",
        ctg: -1,
        resNum: 0,
	    inLibDate: "",
        addr: ""
      },

      addFormVisible: false, //新增界面是否显示
      //addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }]
      }
    };
  },
  methods: {
    //性别显示转换
    formatCtg: function(row, column) {
      // return row.ctg == 1 ? "男" : row.sex == 0 ? "女" : "未知";
	  var cat='未知';
      switch (row.ctg){
		  case 0:
			  cat = "哲学、宗教";
			  break;
		  case 1:
			  cat = "社会科学总论";
			  break;
		  case 2:
			  cat = "政治、法律";
			  break;
		  case 3:
			  cat = "军事";
			  break;
		  case 4:
			  cat = "文化、科学、教育、体育";
			  break;
		  default:
			  cat = "未知";
	  }
	  return cat;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getBooks();
    },
    //获取用户列表
    getBooks() {
      let para = {
        page: this.page,
        book_name: this.filters.name
      };
      //this.listLoading = true;
      //NProgress.start();
		console.info('111', para);
      getUserListPage(para).then(res => {
      	console.info(res);
        this.total = res.data.data.total;
        this.users = res.data.data.users;
        //this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          //this.listLoading = true;
          //NProgress.start();
          let para = { book_name: row.name };
          console.info('222', para);
          removeUser(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getBooks();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      //this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create";
      //this.addFormVisible = true;
      this.dialogFormVisible = true;
      this.editForm = {
        id: "0",
        name: "",
        ctg: -1,
        resNum: 0,
	    inLibDate: "",
        addr: ""
			}
    },
    //编辑
    updateData:function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              //this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.inLibDate =
                !para.inLibDate || para.inLibDate == ""
                  ? ""
                  : util.formatDate.format(new Date(para.inLibDate), "yyyy-MM-dd");
              console.info('修改页面', para);
              editUser(para).then(res => {
                //this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                //this.editFormVisible = false;
                 this.dialogFormVisible = false;
                this.getBooks();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //新增
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              //this.editLoading = true;
              //NProgress.start();
              // this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
              let para = Object.assign({}, this.editForm);
              console.log(para);

              para.inLibDate =
                !para.inLibDate || para.inLibDate == ""
                  ? ""
                  : util.formatDate.format(new Date(para.inLibDate), "yyyy-MM-dd");
              addUser(para).then(res => {
                //this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                //this.addFormVisible = false;
                this.getBooks();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //全选单选多选
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
         // this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getBooks();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getBooks();
  }
};
</script>

<style scoped>

</style>
