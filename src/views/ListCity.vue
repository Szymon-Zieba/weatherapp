<template>
    <div class="whole ">
        <div class="d-flex justify-content-center align-items-center">
            <div class=" clicked" @click="goToWeatherView()">
                <img src="../assets/back-arrow.png" height="50">
            </div>
            <div class="navbar navbar-light ">
                <input class="form-control mr-sm-2" type="search" placeholder="Add to favourites" aria-label="Search" v-model="search">
            </div>
        </div>
        <div class="container text-center">
            <div class="row m-md-3" v-for="(city, index) in pageView" :key="city.id" :value="index">
                <div class="col">
                    {{city.name}}
                </div>
                <div class="col">
                    <a 
                        @click="followCity(city)" 
                        type="button" 
                        :class="['btn btn-primary mr-2', 
                        checkIfFollowedCity(city.id) ? 'disabled' : ''
                        ]"
                        >Dodaj
                    </a>
                    <a 
                        @click="unfollowCity(city)" 
                        type="button" 
                        :class="['btn btn-danger ', 
                        !checkIfFollowedCity(city.id) ? 'disabled' : ''
                        ]"
                        >Usun
                    </a>
                </div>
            </div>
        </div>
        <Pagination class="d-flex justify-content-center" :count="pageNumber" :pageSize="20" @pageChange="number => pageNumber = number"></Pagination>
    </div>
</template>

<script>
    import Pagination from '../components/Pagination.vue';
    import {computed, ref} from 'vue'
    import cityList from '../city.list.json'
    import {followCity, unfollowCity, checkIfFollowedCity} from '../store/followedCities'
    import { useRouter } from 'vue-router'
export default {
    components:{
        Pagination,
    },
    setup() {
        const search = ref("");

        const pageNumber = ref(1);
        const pageView = computed(() => {
            const start = pageNumber.value * 20;
            const filteredCityList = cityList.filter((city) => (city.name)
                .toLowerCase()
                .includes(search.value.toLowerCase()))

            return filteredCityList.slice(start, start + 12) 
        })

        const router = useRouter()

        function goToWeatherView() {
            router.push({name: 'WeatherView'})
        }

        const changeButtonAfterFollow = (city) => {
            followCity(city)
        }
        return {
            followCity,
            checkIfFollowedCity,
            cityList,
            pageView,
            pageNumber,
            search,
            goToWeatherView,
            unfollowCity
        }
    },
}
</script>

<style scoped>
.whole{
    margin: 4% 20%;
    background-color: rgb(219, 233, 250);
    border-radius: 40px;
}
.clicked:hover{
    cursor: pointer;
    opacity: 70%
}
</style>