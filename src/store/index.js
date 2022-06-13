import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    inputValue:'aaa',
    nextId:5,
    viewKey:'all'
  },
  getters: {
     //統計未完成任務
    unDoneLength(state){
     return state.list.filter(x => x.done === false).length
    },

    //依據done狀態顯示對應數據
    infoList(state){
      if(state.viewKey === 'all'){return state.list}
      if(state.viewKey === 'undone'){return state.list.filter(x => !x.done )}
      if(state.viewKey === 'done'){return state.list.filter( x=> x.done)}
    }
  },
  mutations: {
    initList(state , list){
      state.list = list
    },

    //位store中的inputValue賦值
    setInputValue(state , val){
      state.inputValue = val
    },

    addItem(state){
      const obj = {
        id : state.nextId,
        info : state.inputValue.trim(),
        done : false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },

    removeItem(state , id){
      const i = state.list.find(x => x.id === id)
      state.list.splice(i , 1)
    },

    changeStatus(state , param){
      const i = state.list.find(x => x.id === param.id)
      i.done = param.status
    },

    cleanDone(state){
      state.list = state.list.filter( x => x.done === false)
    },

    changeViewKey(state ,key){
      state.viewKey = key
    }
  },
  actions: {
    async getList(context){
    const {data : res} =  await axios.get('/list.json')
    console.log(res);
    context.commit('initList' , res)
    }
  },
  modules: {
  }
})
