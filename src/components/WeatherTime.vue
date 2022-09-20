<template>
    <div v-if="!cityDetails"> BRAK DANYCH </div>
    <div class="container mt-3 overflow-auto d-flex flex-column height overflow-auto" v-else>
        <div class="row justify-content-around font-size-20" >
            <div 
                :class="['clicked text-center', hour.id === selectedHoursId ? 'selected' : '']"
                v-for="hour in hoursList" 
                :key="hour.id"
                @click="changeHours(hour.id)"
                >
                <div v-if="hour.id==0">
                    {{hour.hour}} hour
                </div>
                <div v-else>
                    {{hour.day}} 
                    days
                </div>
                <div style="margin: -10px" class="" v-if="hour.id === selectedHoursId">
                    <span >&#x2022</span>
                </div>
            </div>
        </div>
        <div 
            class="row justify-content-around align-items-center" 
            v-for="detail in filteredData"
            :key="detail.dt">

            <div class="min-width">
                {{days[new Date(detail.dt_txt).getDay()] }}
                {{ new Date(detail.dt_txt).getHours() }}:00
            </div>
            <div class="min-width">
                <img src="../assets/icon-humidity.png" height="20">
                {{detail.main.humidity}}%
            </div>
            <div class="min-width">
                <img :src='iconLinkStart + detail.weather[0].icon + iconLinkEnd' height="50">
            </div>
            <div class="progress" style="width: 100px" >
                <div 
                    :class="['progress-bar', kelvinToCelcius(detail.main.temp) > 25 ? 'bg-danger' : kelvinToCelcius(detail.main.temp) > 15 ? 'bg-warning' : 'bg-info']" 
                    role="progressbar" 
                    :style="{width: kelvinToCelcius(detail.main.temp)*2.7 + '%'}" 
                    aria-valuenow="25" 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                </div>
            </div>
            <div class="">
                 {{ kelvinToCelcius(detail.main.temp) }}&deg;C
            </div>
            <div>

            </div>
        </div>

    </div>
</template>

<script>
import { onMounted, toRef, ref, watch, computed } from '@vue/runtime-core'
import { get5Days3HourCityInfo } from "../api/getCityInfo.js"
import { kelvinToCelcius, iconLinkStart, iconLinkEnd, days } from "../config.js"
export default {
    props: {
    city: {
      type: Object,
      required: true
    }
  },
  setup(props){
    const city = toRef(props, 'city')
    const hoursList = [
        {
        id: 0,
        hour: 24,
        day: 1
        },
        {
        id: 1,
        hour: 72,
        day: 3,
        },
        {
        id: 2,
        hour: 120,
        day: 5,
        }
    ]
    const cityDetails = ref(null)
    let nIntervId
    const updateDetails = () => {
        get5Days3HourCityInfo(city.value.coord.lat, city.value.coord.lon).then(data =>cityDetails.value = data)
        if (!nIntervId) {
            nIntervId = setInterval(() => {get5Days3HourCityInfo(city.value.coord.lat, city.value.coord.lon).then(data =>cityDetails.value = data)}, 60 * 1000);
        }
    }

    watch(city, () => {
        updateDetails()
    })
    onMounted(updateDetails)

    const selectedHoursId = ref(0)
    const changeHours = (id) => {
        selectedHoursId.value = id
    }

    const filteredData = computed(() => {
        return cityDetails.value.list.filter(forecast => forecast.dt < cityDetails.value.list[0].dt + 60 * 60 * 24 * hoursList[selectedHoursId.value].day)
    })


    return {
        cityDetails,
        kelvinToCelcius,
        iconLinkStart,
        iconLinkEnd,
        hoursList,
        selectedHoursId,
        changeHours,
        filteredData,
        days,
    }
  }
}
</script>

<style scoped>
.clicked{
    color: grey;
    opacity: 70%;
}
.clicked:hover{
    cursor: pointer;
    opacity: 70%;
}
.selected{
    color: black;
}
.height{
    max-height: 450px;
}
.min-width{
    min-width: 15%;
}
</style>