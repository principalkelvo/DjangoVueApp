<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Add member</h1>
            </div>
            <div class="column is-12">
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
                            <input type="password" name="password1" class="input" v-model="password1">
                        </div>
                    </div>
                    <div class="field">
                        <label >Repeate Password</label>
                        <div class="control">
                            <input type="password" name="password2" class="input" v-model="password2">
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
import {toast} from 'bulma-toast'

export default {
    name: 'AddMember',
    data(){
        return{
            username:'',
            password1:'',
            password2:'',
            errors:[]
        }
    },
    methods: {
        async submitForm(){
            this.errors=[]
            if(this.username===''){
                this.errors.push('The username is missing')
            }
            if(this.password1===''){
                this.errors.push('the password is too short')
            }
            if(this.password1 !== this.password2){
                this.errors.push('the passwords are not matching')
            }if(!this.errors.length){
                //loading bar
                this.$store.commit('setIsLoading',true)

                //send data to server
                const formData ={
                    username: this.username,
                    password: this.password1
                }

                await axios
                    .post('api/v1/users/', formData)
                    .then(response=> {
                        //push a toast message on the bottom of the page
                        toast({
                            message:'The member was added',
                            type:'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                        
                        console.log("response")
                        
                    })
                     //catch errors 
                    .catch(error => {
                        if(error.response){
                            for(const property in error.response.data){
                                this.errors.push(`${property}: ${error.response.data[property]}`) //do not use quotes this are backslash
                            }
                        }
                        else if(error.message){
                            this.errors.push('Something went wrong. Please try again')
                        }
                    })

                    const emailData={'email':this.username}

                    await axios
                    .post('api/v1/teams/add_member/', emailData)
                    .then(response=> {
                        

                        this.$router.push({'name':'Team'})
                        console.log("response")
                        
                    })

                    this.$store.commit('setIsLoading', false)
            }
        }
    }
}
</script>