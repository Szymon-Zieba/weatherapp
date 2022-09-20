<template>
    <div v-if="!cityDetails"> BRAK DANYCH </div>
    <div class="text-center" v-else>
        <div class="d-flex p-2 justify-content-center align-items-center mb-5">
            <img :src='iconLinkStart + cityDetails.weather[0].icon + iconLinkEnd'>
            <div class="">
                <div> Today </div>
                <div> {{days[date.getDay()] + ' ' + date.getDate() + ' ' +  months[date.getMonth()]}} </div>
            </div>
        </div>
        <div class="temp font-weight-bold mb-2">
            {{kelvinToCelcius(cityDetails.main.temp)}}&deg;C
        </div>
        <div class="city-name mb-5">
            {{cityDetails.name}}
        </div>
    
        <div class="feels-humidity d-block ">
            <span class="">Feels {{kelvinToCelcius(cityDetails.main.feels_like)}}&deg;C</span>
            <div class="mt-3">
                <img src="../assets/icon-humidity.png" height="30" style="filter: invert(100%) sepia(0%);">
                {{cityDetails.main.humidity}}%
            </div>
        </div>

    </div>
</template>

<script>
import {toRef, ref, watch, onMounted} from 'vue'
import { getCurrentCityInfo } from "../api/getCityInfo.js"
import { iconLinkStart, iconLinkEnd, months, kelvinToCelcius, days } from "../config.js"
export default {
    props: {
    city: {
      type: Object,
      required: true
    }
  },
    setup(props){
        const city = toRef(props, 'city')
        const cityDetails = ref(null)


        let nIntervId
        const updateDetails = () => {
            getCurrentCityInfo(city.value.coord.lat, city.value.coord.lon).then(data =>cityDetails.value = data)
            if (!nIntervId) {
                nIntervId = setInterval(() => {getCurrentCityInfo(city.value.coord.lat, city.value.coord.lon).then(data =>cityDetails.value = data)}, 60 * 1000);
            }
        }

        watch(city, () => {
            updateDetails()
        })

        onMounted(updateDetails)

        const date = new Date()

        return{
            cityDetails,
            iconLinkStart,
            iconLinkEnd,
            date,
            months,
            kelvinToCelcius,
            days
        }
    }
}
</script>

<style scoped>
    .temp{
        font-size: 45px;  
    }
</style>