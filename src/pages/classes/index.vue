<template>
    <div class="classes">
        <div class="classes_title">班级管理</div>
        <div class="classes_table"> 
            <el-table
            size="small"
            :data="classes.list"
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
                label="班级名称">
            </el-table-column>
            <el-table-column
                prop="college.name"
                align="center"
                label="学院名称">
            </el-table-column>
            <el-table-column
                prop="college.description"
                align="center"
                label="学院描述"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                label="排课状态">
                <template slot-scope="{row}">
                    <span v-if="row.paikeStatus=='未排课'" style="boder:1px solid #d0f5e0;background:#FFEDED; color:#ff4949;cursor: pointer;" @click="toPaike(row)"> {{row.paikeStatus}} </span>
                    <span v-else style="boder:1px solid #13ce66;background:#E7FAF0; color:#13ce66;cursor: pointer;">{{row.paikeStatus}} </span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="{row}">
                    <el-button type="text" class="classes_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="classes_span" size="small" @click="toLook(row)">查看负责老师</el-button>
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
                <el-form-item label="课程日期">
                    <el-input v-model="form.courseDay" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="课程时间段">
                    <el-input v-model="form.courseTime" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="课程编号">
                    <el-input v-model="form.courseId" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="班级编号">
                    <el-input v-model="form.clazzId" autocomplete="off" :required="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" class="classes_button">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增信息模态框 -->
        <!-- 查看排课安排模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible2" width="100">
            <el-form :model="form2">
                    <el-form-item label="老师姓名">
                    <el-input v-model="form2.realname" autocomplete="off" :required="true"></el-input>
                </el-form-item> 
                 <el-form-item label="性别">
                    <el-input v-model="form2.gender" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form2.telephone" autocomplete="off" :required="true"></el-input>
                </el-form-item>        
            </el-form>
            <div>
            <el-button type="primary" @click="dialogFormVisible2 = false">关 闭</el-button>
            </div>
        </el-dialog>
        <!-- 模态框 -->
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
            dialogFormVisible2: false,
            title:'',
            form:{},
            form2:{},
        }
    },
    computed:{
        ...mapState('classes', ['classes'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('classes',['toLoadClasses','saveClasses','deleteClasses','findById']),
        //排课
        toPaike(row){
            this.dialogFormVisible = true
            this.title = '添加排课信息'
            this.form = row
        },
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteClasses(id).then(r=>{
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
        // 查看负责老师
        toLook(row){
            this.dialogFormVisible2 = true
            this.title = '查看负责老师'
            this.form2 = row.charge
        },
        //保存整条信息
        toSave(){
            let temp = this.form
            this.saveClasses(temp).then(r=>{
                this.load()
                this.dialogFormVisible = false
            })
        },
        // 新增信息
        toAdd(){
            this.form = {}
            this.dialogFormVisible = true
            this.title = '新增排课安排'
        },
        // 加载信息
    	load(){
            let obj1 = {
    			page:this.page,
    			pageSize:this.pageSize
    		}
			this.toLoadClasses(obj1).then(r=>{
				this.total = this.classes.total
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
.classes{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.classes_title{
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.classes_table{
    max-height: 400px;
    overflow: auto;
    width: 99%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 85%;
}
/* // el-button按钮样式 */
.classes_button >>> .el-input{
  display:inline-block;
  width: 200px !important;
}
.classes_span{
   color:#57abff; 
}
</style>