<template>
    <div class="course">
        <div class="course_title">课程管理</div>
        <div class="course_button">
          <el-button size="small" type="primary" @click="toAdd()">新增课程信息</el-button>          
        </div>
        <div class="course_button">
          <el-input v-model="input" placeholder="请输入课程名称" size="small" clearable></el-input>            
        </div>
        <div class="course_button">
          <el-button style="color: #56c4bd;" size="small" @click="toSearch">搜索</el-button>           
        </div>
        <div class="course_table">
            <el-table
            size="small"
            :data="course.list"
            style="width: 100%">
            <el-table-column
                prop="id"
                align="center"
                label="序号"
                width="80"
                type=index>
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                label="课程名称">
            </el-table-column>
            <el-table-column
                prop="courseDay"
                align="center"
                label="课程日期"
                width="80">
            </el-table-column>
            <el-table-column
                prop="courseTime"
                align="center"
                label="课程时间段">
            </el-table-column>
            <el-table-column
                prop="type"
                align="center"
                label="课程类型"
                width="80">
            </el-table-column>
            <el-table-column
                prop="credit"
                align="center"
                label="课程学分"
                width="80">
            </el-table-column>
            <el-table-column
                prop="description"
                align="center"
                label="描述"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                align="center"
                label="排课状态">
                <template slot-scope="{row}">
                    <span style="boder:1px solid #d0f5e0;background:#FFEDED; color:#ff4949;cursor:pointer;" @click="toDetails(row)">查看老师信息</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="{row}">
                    <el-button type="text" class="course_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="course_span" size="small" @click="toEdit(row)">修改</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div>
            <el-pagination
            layout="total,prev, pager, next"
            :page-size="this.pageSize"
            :total="total"
            @current-change="handPage"
            />
        </div>
        <!-- 新增模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="100">
            <el-form :model="form">
                <el-form-item label="课程名称">
                    <el-input v-model="form.name" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                    <el-form-item label="课时">
                    <el-input v-model="form.hours" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                 <el-form-item label="课程类型">
                    <el-input v-model="form.type" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="学分">
                    <el-input v-model="form.credit" autocomplete="off" :required="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" type="primary" class="course_button">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增信息模态框 -->
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
            input:'',
            page: 1,
            pageSize: 6,
            total: 100,
            dialogFormVisible: false,
            title:'',
            form:{},
        }
    },
    computed:{
        ...mapState('course', ['course'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('course',['toLoadCourse','saveCourse','deleteCourse']),
        //搜索
        toSearch(){
            this.page = 1
    		let temp = {
    			page:this.page,
    			pageSize:this.pageSize,
    			name:this.input
    		}
    		if(temp.name == ''){
    			delete temp.name
    		}
    		this.toLoadCourse(temp).then(r=>{
                // console.log(grade)
                this.total = this.course.total
			})
        },
        //查看老师信息
        toDetails(row){
            this.$router.push({path:'details',query:{row:row}})
        }, 
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteCourse(id).then(r=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.load()
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                })
            }) 
        },
        // 修改信息
        toEdit(row){
            this.dialogFormVisible = true
            this.title = '修改课程信息'
            this.form = row
        },
        //保存整条信息
        toSave(){
            let temp = this.form
            this.saveCourse(temp).then(r=>{
                this.load()
                this.dialogFormVisible = false
            })
        },
        // 新增信息
        toAdd(){
            this.form = {}
            this.dialogFormVisible = true
            this.title = '新增公告信息'
        },
        // 加载信息
    	load(){
            let obj1 = {
    			page:this.page,
    			pageSize:this.pageSize
    		}
			this.toLoadCourse(obj1).then(r=>{
				this.total = this.course.total
            })
        },
    	// 分页触发事件
    	handPage(val){
    		this.page = val
    		this.load()
		},
    },
}
</script>
<style scoped>
.course{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.course_title{
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.course_button{
    width: 200px;
    float: left;
    margin-right: 10px;
}
.course_table{
    max-height: 400px;
    overflow: auto;
    width: 99%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 85%;
}
/* // el-button按钮样式 */
.course_button >>> .el-input{
  display:inline-block;
  width: 200px !important;
}
.course_span{
   color:#57abff; 
}
</style>