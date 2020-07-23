<template>
  <div>
      <div class="details_back" @click="toBack()">
        <div>返回</div>
      </div>
      <div class="details_form">
        <el-card class="details_left">
            <div class="details_info">
                <div>姓 名：&nbsp;&nbsp;<span>{{row.teacher.realname}}</span></div><br> 
                <div>手机号：&nbsp;&nbsp;<span>{{row.teacher.telephone}}</span></div><br> 
                <div>性 别：&nbsp;&nbsp;<span>{{row.teacher.gender}}</span></div><br> 
                <div>状态：&nbsp;&nbsp;<span>{{row.teacher.status}}</span></div><br> 
                <div>地 址：&nbsp;&nbsp;<span>{{row.teacher.address}}</span></div><br> 
                <div>民 族：&nbsp;&nbsp;<span>{{row.teacher.nation}}</span></div><br> 
                <div>政治身份：&nbsp;&nbsp;<span>{{row.teacher.politicsStatus}}</span></div><br> 
            </div>
            <div class="details_right">
            <img :src="row.teacher.userFace" alt="">
            </div>
        </el-card>
          
      </div>
  </div>    
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data() {
        return {
            row:{},
        }
    },
    created(){
      this.load()
      // console.log(this.$route.query.row)
    },
    computed:{
        ...mapState('course', ['course'])
    },
    methods:{
      ...mapActions('course',['toLoadCourse']),
        // 返回上一层
        toBack(){
            this.$router.push({path:'course'})
        },
        // 加载信息
    	load(){
            if(this.$route.query.row){
                this.row = this.$route.query.row;
            }
            else{
                teacher:{}
            }
      },
    }
}
</script>
<style>
.details_back{
  width: 100%;
  height: 30px;
}
.details_back>div:first-child{
  margin-top: 15px;
  margin-left: 15px;
  color:#57abff;
  cursor: pointer;
}
.details_form{
  margin-left: 15px;
}
.details_left{
    float: left;
    width: 500px;
}
.details_info{
    display: inline-block;
    width: 300px;
}
.details_info span{
    color: #999;
}
.details_right{
    display: inline-block;
    position: absolute;
}
.details_right img{
    margin-top: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
</style>