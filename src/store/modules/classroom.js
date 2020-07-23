import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    classroom: [],
  },
  getters:{},
  mutations: {
    setClassroom(state, data) {
      state.classroom = data
    },
  },
  actions: {
    // 查询所有信息
    async toLoadClassroom(context,params){
        // console.log(params)
      let res = await get('/clazzroom/pageQuery',params);
      context.commit('setClassroom',res.data.data)
      // console.log(res.data.data)
    },
    // 保存所有信息
    async saveClassroom(context,params){
      // console.log(params)
      await post('/clazzroom/saveOrUpdate',params);
    },
	// 删除信息
    async deleteClassroom(context,params){
      // console.log(params)
      await get('/clazzroom/deleteById?id='+params);
    },
  }
}