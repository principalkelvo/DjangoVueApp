<template>
<!-- title-->
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log In</h1>


        <!--form-->
                <form @submit.prevent="submitForm"> 
                    <div class="field">
                        <label >Email</label>
                        <div class="control">
                            <input type="email" name="email" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label >Password</label>
                        <div class="control"> 
                            <input type="password" name="password" class="input" v-model="password">
                        </div>
                    </div>

                    <!--errors will be shown here-->
                    <div class="notification is-danger" v-if="errors.length">
                        <!--go through all errors-->
                        <p v-for="error in errors" v-bind:key="error">{{error}}</p>
                    </div>
                    
                    <div class="field">
                        <div class="control">
                            <button class="button-is-success">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'LogIn',
    data(){
        return{
            username:'',
            password:'',
            errors:[]
        }
    },
    methods:{
        submitForm(){
            axios.defaults.headers.common['Authorization']=''
            localStorage.removeItem('token')

            const formData={
                username: this.username,
                password: this.password
            }
            axios
                .post('/api/v1/token/login/', formData)
                then(response =>{

                    const token=response.data.auth_token

                    //save token to store in the vue
                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common['Authorization']= 'Token'+ token

                    //save token to localstorage
                    localStorage.setItem('token', token)

                    //redirect user to his account
                    this.$router.push('/dashboard/my-account')
                })
        }
    }
}
</script>