import Vue from 'vue'
import Vuex from 'vuex'
import Axios  from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    equipments:[]
  },
  getters: {
  },
  mutations: {
    set_user:(state,user)=>state.user = user,
    set_equipments:(state,equipments)=>state.equipments = equipments
  },
  actions: {
    get_data_user:({commit})=>Axios.get("api/users/profile").then(res => commit("set_user",res.data)),
    get_data_equipments:({commit})=>Axios.get("api/equipment?page=1").then(res => commit("set_equipments",res.data.result))
  },
  modules: {
  }
})
