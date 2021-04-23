<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Sign Up</h1>

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
// talk to the background on errors
import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
    name: 'SignUp',
    data(){
        return{
            username:'',
            password1:'',
            password2:'',
            errors:[]
        }
    },

    methods: {
        submitForm(){
            console.log('hello')
        }
    }
}
</script>