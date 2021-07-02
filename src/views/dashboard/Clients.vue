<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Clients</h1>

                <router-link to="/dashboard/clients/add" v-if="$store.state.team.max_clients>num_clients">Add client</router-link>

                <div 
                class="notification is-danger"
                v-else
                >
                    You have reached the top of your limitations. Please upgrade!
                </div>

                <!--search for leads button-->
                <hr>

                <form @submit.prevent="getClients">
                    <div class="field has-addons">
                        <div class="control">
                            <input type="text" class="input" v-model="query">
                        </div>
                        <div class="control">
                            <button class="button is-success">Search</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="column is-12 ">
                <template v-if="clients.length">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Person</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="client in clients" v-bind:key="client.id">
                            <td>{{client.name}}</td>
                            <td>{{client.contact_person}}</td>
                           
                            <td><router-link :to="{name: 'Client', params:{id:client.id}}">Details</router-link></td>
                        </tr>
                    </tbody>
                </table>
                <div class="buttons">
                    <button class="button is-light" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
                    <button class="button is-light" @click="goToNextPage()" v-if="showNextButton">Next</button>
                </div>
                </template>
                <template v-else>
                    <p>You dont have any clients yet</p>
                </template>
            </div>

        </div>
    </div>
</template>        
<script>
//creating a function of getting the clients from the backend we will use axios
import axios from 'axios' 

export default {
    name: 'Clients',
    data(){
        return{
            clients:[],
            //add next and previous button
            showNextButton:false,
            showPreviousButton:false,
            currentPage:1,
            query:'',
            num_clients:0
        }
    },
    mounted(){
        this.getClients()
    },
    methods:{
        goToPreviousPage(){
            this.currentPage -= 1
            this.getClients()
        },
        goToNextPage(){
            this.currentPage += 1
            this.getClients()
        },
        async getClients(){
            this.$store.commit('setIsLoading', true)

            this.showNextButton=false
            this.showPreviousButton=false

            await axios
                .get(`/api/v1/clients/`)
                .then(response=>{
                    console.log(response.data)
                    this.num_clients= response.data.count
                })
                .catch(error=>{
                    console.log(error)
                })

            await axios
                .get(`/api/v1/clients/?page=${this.currentPage}&search=${this.query}`)
                .then(response=>{
                    this.clients= response.data.results

                    //make next button respond
                    if(response.data.next){
                        this.showNextButton=true
                    }
                    //make previous button respond
                    if(response.data.previous){
                        this.showPreviousButton=true
                    }
                })
                .catch(error=>{
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>