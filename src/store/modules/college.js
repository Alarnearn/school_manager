import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    college: [],
  },
  getters:{},
  mutations: {
    setCollege(state, data) {
      state.college = data
    },
  },
  actions: {
    // 查询所有信息
    async toLoadCollege(context,params){
        // console.log(params)
      let res = await get('/college/queryCollegeClazzTree');
      context.commit('setCollege',res.data.data)
     // console.log(res.data.data)
    },
    // 保存所有信息
    async saveCollege(context,params){
      // console.log(params)
      await post('/college/saveOrUpdate',params);
    },
	// 删除信息
    async deleteCollege(context,params){
      // console.log(params)
      await get('/college/deleteById?id='+params);
    },
  }
}