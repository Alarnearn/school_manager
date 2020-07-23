<template>
    <div class="classroom">
        <div class="classroom_title">教室管理</div>
        <div class="classroom_button">
            <el-button class="classroom_button" size="small" type="primary" @click="toAdd()">新增教室</el-button>
        </div>
        <div class="classroom_table"> 
            <el-table
            size="small"
            :data="classroom.list"
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
                label="教室号">
            </el-table-column>
            <el-table-column
                prop="seats"
                align="center"
                label="座位总数">
            </el-table-column>
            <el-table-column
                prop="location"
                align="center"
                label="教室位置">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="{row}">
                    <el-button type="text" class="classroom_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="classroom_span" size="small" @click="toEdit(row)">修改</el-button>
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
                <el-form-item label="教室号">
                    <el-input v-model="form.name" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="座位总数">
                    <el-input v-model="form.seats" autocomplete="off" :required="true"></el-input>
                </el-form-item>
                <el-form-item label="教室位置">
                    <el-input v-model="form.location" autocomplete="off" :required="true"></el-input>
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
            page: 1,
            pageSize: 6,
            total: 100,
            dialogFormVisible: false,
            title:'',
            form:{},
        }
    },
    computed:{
        ...mapState('classroom', ['classroom'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('classroom',['toLoadClassroom','saveClassroom','deleteClassroom']),
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteClassroom(id).then(r=>{
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
            this.title = '修改教室信息'
            this.form = row
        },
        //保存整条信息
        toSave(){
            let temp = this.form
            this.saveClassroom(temp).then(r=>{
                this.load()
                this.dialogFormVisible = false
            })
        },
        // 新增信息
        toAdd(){
            this.form = {}
            this.dialogFormVisible = true
            this.title = '新增教室'
        },
        // 加载信息
    	load(){
            let obj1 = {
    			page:this.page,
    			pageSize:this.pageSize
    		}
			this.toLoadClassroom(obj1).then(r=>{
				this.total = this.classroom.total
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
.classroom{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.classroom_title{
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.classroom_table{
    max-height: 400px;
    overflow: auto;
    width: 99%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 85%;
}
/* // el-button按钮样式 */
.classroom_button >>> .el-input{
  display:inline-block;
  width: 200px !important;
}
.classroom_span{
   color:#57abff; 
}
</style>