import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    article: [],
  },
  getters:{},
  mutations: {
    setArticle(state, data) {
      state.article = data
    },
  },
  actions: {
    // 查询所有信息
    async toLoadArticle(context,params){
        // console.log(params)
      let res = await get('/article/pageQuery',params);
      context.commit('setArticle',res.data.data)
      // console.log(res.data.data)
    },
    // 保存所有信息
    async saveArticle(context,params){
      // console.log(params)
      await post('/article/saveOrUpdate',params);
    },
	// 删除信息
    async deleteArticle(context,params){
      // console.log(params)
      await get('/article/deleteById?id='+params);
    },
    //查询公告内容
    async findById(context,params){
      await get('/article/findById?id='+params);
    }
  }
}