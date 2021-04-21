<template>
<div>
  <Navbar/>
  <router-view/>
</div>
</template>


<script>
import Navbar from '../src/components/layout/Navbar'

export default {
  name:'App',
  components:{
    Navbar
  }
}
</script>
<style lang="scss">
@import '../node_modules/bulma';
</style>
