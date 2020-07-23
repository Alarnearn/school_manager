<template>
    <div class="college">
        <div class="college_title">学院管理</div>
        <div class="college_button">
            <el-button class="college_button" size="small" type="primary" @click="toAdd()">新增学院信息</el-button>
        </div>
        <div class="college_table">
            <!-- {{college.clazzes[1].name}}  -->
            <el-table
            size="small"
            :data="college"
            style="width: 100%">
            <el-table-column
                prop="id"
                align="center"
                label="序号"
                type=index>
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                label="学院">
            </el-table-column>
            <el-table-column
                prop="description"
                align="center"
                label="学院描述">
            </el-table-column>
            <el-table-column
                prop="clazzes[0].name"
                align="center"
                label="班级">
            </el-table-column>
            <el-table-column
                align="center"
                label="排课状态"
                prop="clazzes[0].paikeStatus">
                <!-- <template slot-scope="{row}">
                    {{row.clazzes[0]}}

                   
                    <span v-if="row.clazzes[0].paikeStatus =='未排课'" style="boder:1px solid #d0f5e0;background:#FFEDED; color:#ff4949;"> {{row.clazzes[0].paikeStatus}} </span>
                    <span v-else style="boder:1px solid #13ce66;background:#E7FAF0; color:#13ce66;">{{row.clazzes[0].paikeStatus}} </span>
                
                </template> -->
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="{row}">
                    <el-button type="text" class="college_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="college_span" size="small" @click="toEdit(row)">修改</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        
        <!-- 新增模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="100">
            <el-form :model="form">
                <el-form-item label="所属学院">
                    <el-input v-model="form.name" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="学院描述">
                    <el-input v-model="form.description" autocomplete="off" :required="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" type="primary">确 定</el-button>
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
            dialogFormVisible: false,
            title:'',
            form:{},
        }
    },
    computed:{
        ...mapState('college', ['college'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('college',['toLoadCollege','saveCollege','deleteCollege']),
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteCollege(id).then(r=>{
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
            this.title = '修改学院信息'
            this.form = row
        },
        //保存整条信息
        toSave(){
            let temp = this.form
            this.saveCollege(temp).then(r=>{
                this.load()
                this.dialogFormVisible = false
            })
        },
        // 新增信息
        toAdd(){
            this.form = {}
            this.dialogFormVisible = true
            this.title = '新增学院信息'
        },
        // 加载信息
    	load(){
			this.toLoadCollege()
        },
    },
}
</script>
<style scoped>
.college{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.college_title{
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.college_table{
    max-height: 400px;
    overflow: auto;
    width: 99%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 85%;
}
/* // el-button按钮样式 */
.college_button >>> .el-input{
  display:inline-block;
  width: 200px !important;
}
.college_span{
   color:#57abff; 
}
</style>