import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    course: [],
  },
  getters:{},
  mutations: {
    setCourse(state, data) {
      state.course = data
    },
  },
  actions: {
    // 查询所有信息
    async toLoadCourse(context,params){
        // console.log(params)
      let res = await get('/course/pageQuery',params);
      context.commit('setCourse',res.data.data)
      // console.log(res.data.data)
    },
    // 保存所有信息
    async saveCourse(context,params){
      // console.log(params)
      await post('/course/saveOrUpdate',params);
    },
	// 删除信息
    async deleteCourse(context,params){
      // console.log(params)
      await get('/course/deleteById?id='+params);
    },
  }
}