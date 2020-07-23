<template>
    <div class="article">
        <div class="article_title">首页公告</div>
        <div class="article_button">
            <el-button class="article_button" size="small" type="primary" @click="toAdd()">新增公告</el-button>
        </div>
        <div class="article_table"> 
            <el-table
            size="small"
            :data="article.list"
            style="width: 100%">
            <el-table-column
                prop="id"
                align="center"
                label="序号"
                width="80"
                type=index>
            </el-table-column>
            <el-table-column
                prop="title"
                align="center"
                label="标题">
            </el-table-column>
            <el-table-column
                align="center"
                label="发布日期"
                width="180">
                <template slot-scope="{row}">
                {{row.publishTime | dateParse}}
                </template>
            </el-table-column>
            <el-table-column
                prop="readTimes"
                align="center"
                label="阅读次数"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="{row}">
                    <el-button type="text" class="article_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="article_span" size="small" @click="toEdit(row)">修改</el-button>
                    <el-button type="text" class="article_span" size="small" @click="toLook(row)">查看公告内容</el-button>
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
            <el-form-item label="标题">
                <el-input v-model="form.title" autocomplete="off" :required="true"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select size="small" v-model="form.categoryId" placeholder="请选择所属栏目" clearable>
                    <el-option
                    v-for="item in article.list"
                    :key="item.id"
                    :label="item.category.name"
                    :value="item.categoryId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="正文">
                <mavon-editor v-model="form.content" @save="saveContent" />
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" class="article_button">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增信息模态框 -->

         <!-- 查看公告信息模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible2" width="800px">
            <el-form :model="form2">
                <div v-html="form2.content" ></div>           
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
        ...mapState('article', ['article'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('article',['toLoadArticle','saveArticle','deleteArticle','findById']),
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteArticle(id).then(r=>{
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
            this.title = '修改公告信息'
            this.form = row
        },
        toLook(row){
            this.dialogFormVisible2 = true
            this.title =  '公告内容详情页'
            this.findById(row.id).then(r=>{
                this.form2.content = row.content
            }) 
        },
        //  保存富文本内容信息
        saveContent(value,render){
            // console.log('value',render)
            // console.log('value',render)
            this.form.content = render
        },
        //保存整条信息
        toSave(){
            let temp = this.form
            this.saveArticle(temp).then(r=>{
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
			this.toLoadArticle(obj1).then(r=>{
				this.total = this.article.total
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
.article{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.article_title{
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.article_table{
    max-height: 400px;
    overflow: auto;
    width: 99%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 90%;
}
.el-dialog .el-select{
    width: 85%;
}
/* // el-button按钮样式 */
.article_button >>> .el-input{
  display:inline-block;
  width: 200px !important;
}
.article_span{
   color:#57abff; 
}
</style>