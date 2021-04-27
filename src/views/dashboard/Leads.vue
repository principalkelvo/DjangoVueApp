<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Leads</h1>
            </div>
        </div>
    </div>
</template>        
<script>
//creating a function of getting the leads from the backend we will use axios
import axios from 'axios' 

export default {
    name: 'Leads',
    data(){
        return{
            Leads:[]
        }
    },
    mounted(){
        this.getLeads()
    },
    methods:{
        async getLeads(){
            this.$store.commit('setIsLoading', true)

            axios
        }
    }
}
</script>