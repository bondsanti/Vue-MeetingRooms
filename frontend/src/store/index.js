import Vue from 'vue'
import Vuex from 'vuex'
import Axios  from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  getters: {
  },
  mutations: {
    set_user:(state,user)=>state.user = user
  },
  actions: {
    get_data_user:({commit})=>Axios.get("api/users/profile").then(res => commit("set_user",res.data))
  },
  modules: {
  }
})
