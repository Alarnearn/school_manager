import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    classes: [],
  },
  getters:{},
  mutations: {
    setClasses(state, data) {
      state.classes = data
    },
  },
  actions: {
    // 查询所有信息
    async toLoadClasses(context,params){
        // console.log(params)
      let res = await get('/clazz/pageQuery',params);
      context.commit('setClasses',res.data.data)
      // console.log(res.data.data)
    },
    // 保存所有信息
    async saveClasses(context,params){
      // console.log(params)
      await post('/clazz/saveOrUpdate',params);
    },
	// 删除信息
    async deleteClasses(context,params){
      // console.log(params)
      await get('/clazz/deleteById?id='+params);
    },
    //搜索内容
    async findById(context,params){
      await get('/clazz/findById?id='+params);
    }
  }
}