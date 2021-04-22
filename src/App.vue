<template>
<div>
  <Navbar/>
  <section class="section">
  <router-view/>
  </section>
</div>
</template>


<script>
//import axios to run before create function
import axios from 'axios'
import Navbar from '../src/components/layout/Navbar'

export default {
  name:'App',
  components:{
    Navbar
  },

  //this is one of vue lifecycle, runs store when we open our website
  beforeCreate(){
    this.$store.commit('initializeStore')

    //check if token exists
    if (this.$store.state.token){
    axios.defaults.headers.common['Authorization']="Token" + this.$store.state.token
    }
    //if you are not authenticated
  else{
    axios.defaults.headers.common['Authorization']= ""
  }
  }

}
</script>
<style lang="scss">
@import '../node_modules/bulma';
</style>
