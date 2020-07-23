import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import article from './modules/article'
import classes from './modules/classes'
import classroom from './modules/classroom'
import college from './modules/college'
import course from './modules/course'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    article,
    classes,
    classroom,
    college,
    course
  },
  getters
})

export default store
