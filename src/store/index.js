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
        state.user.username= localStorage.getItem('username')
        state.user.id= localStorage.getItem('userid')

      }//if not logged in
      else{
        state.token= ''
        state.isAuthenticated = false
        state.user.id= 0
        state.user.username= ''
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
    },
    setUser(state,user){
      state.user= user
    }
  },
  actions: {
  },
  modules: {
  }
})
