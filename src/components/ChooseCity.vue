<template>
    <nav class="navbar navbar-light">
        <input class="search form-control mr-sm-2" type="search" placeholder="Search your city" aria-label="Search" v-model="search">
    </nav>
    <div class="">
        <span class="font-size-40">Weather</span>
        <span class="font-weight-bold font-size-40"> Forecast</span>
    </div>
    <div class="d-flex overflow-auto text-center align-items-center">
        
        <div 
            :class="['col', city.id === selectedCity?.id ? 'selected' : '']"
            v-for="city in filteredList" 
            :key="city.id" 
            @click="$emit('change', city)">
                <div class="card-body">
                    <h5 class="card-title"> 
                        {{city.name}} 
                    </h5>
                </div>
        </div>
        
        <div 
            class="col font-weight-bold position-sticky shadow m-3 bg-white rounded" 
            @click="goToListCity()">
            <div class="card-body">
                <h5 class="card-title"> 
                    Add New
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
import { followedCities } from '../store/followedCities'
import {ref, computed} from 'vue'
import { useRouter } from 'vue-router'

export default {
    emits: ['change'],
    props: {
        cities: {
            type: Object,
            required: true
        },
        selectedCity: {
            type: Object,
            default: null
        }
    },
    setup(){
        const search = ref('')
        const filteredList = computed(() => {
            return followedCities.value.filter((city) => (city.name)
                .toLowerCase()
                .includes(search.value.toLowerCase()))
        })

        const router = useRouter()

        function goToListCity() {
            router.push({name: 'ListCity'})
        }
        return {
            followedCities,
            filteredList,
            search,
            goToListCity
        }
    }
}
</script>

<style scoped>
.col{
    opacity:60%
}
 .col:hover{
    opacity: 100%;
    cursor: pointer;
 }
 .selected{
    opacity: 100%;
    background-color: rgb(210, 224, 241);
    border-radius: 5px;
 }
</style>