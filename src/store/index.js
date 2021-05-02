import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: '',
    user:{
      id: 0,
      username:''
    }
  },
  mutations: {
    initializeStore(state){
      //if you had logged in
      if(localStorage.getItem('token')){
        //if yes
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      }//if not logged in
      else{
        state.token= ''
        state.isAuthenticated = false
      }
    },
    //method for change of loading status 
    setIsLoading(state, status){
      state.isLoading = status
    },
    //method to set token
    setToken(state, token){
      state.token = token
      state.isAuthenticated= true
    },
    //removing token esspecially when someone signs out
    removeToken(state){
      state.token= ''
      state.isAuthenticated= false
    }
  },
  actions: {
  },
  modules: {
  }
})
