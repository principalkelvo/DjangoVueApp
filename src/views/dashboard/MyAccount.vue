<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">MyAccount</h1>
            </div>
            <button @click="logout()" class="button is-danger">Log Out</button>
        </div>
    </div>
</template>        
<script>
import axios from 'axios'
export default {
    name: 'MyAccount',
    methods:{
        async logout(){
            await axios
                .post('/api/v1/token/logout/')
                .then(response=>{
                    console.log('logged out')
                })
                .catch(error=>{
                    console.log(JSON.stringify(error))
                })
                axios.defaults.headers.common['Authorization']=''
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('userid')
                localStorage.removeItem('team_name')
                localStorage.removeItem('team_id')
                this.$store.commit('removeToken')
                this.$router.push('/')
        }
    }
}
</script>