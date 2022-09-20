<template>
    <div class="main d-flex justify-content-center">
        <div class="left">
            <ChooseCity 
                class="choose-city"
                :cities="selectedCity" 
                :selected-city="selectedCity"
                @change="city => selectedCity = city"
            />
            <WeatherTime 
                class="weather-time"
                :city="selectedCity"
            />
        </div>
        <WeatherNow 
            class="weather-now"
            :city="selectedCity"/>
    </div>
</template>
<script>
import ChooseCity from '../components/ChooseCity.vue';
import WeatherTime from '../components/WeatherTime.vue';
import WeatherNow from '../components/WeatherNow.vue';
import { followedCities, loadFollowedCities } from '../store/followedCities';
import {ref, onMounted} from 'vue'

const defaultCity = 
    {
        "id": 6695624,
        "name": "Warszawa",
        "state": "",
        "country": "PL",
        "coord": {
            "lon": 21.04191,
            "lat": 52.23547
        }
    }


export default {
    components: {ChooseCity, WeatherTime, WeatherNow},
    setup(){
        const selectedCity = ref(followedCities.value[0] ?? defaultCity)

        onMounted(loadFollowedCities)
        return{
            selectedCity,
            followedCities,
            loadFollowedCities
        }
    }
}
</script>

<style>
.main{
    margin-top: 50px;
}
.left{
    padding: 20px;
    max-width: 700px;
    max-height: 90vh;
    background-color: rgb(219, 233, 250);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}
.choose-city{

}
.weather-time{

}
.weather-now{
    min-width: 25%;
    max-height: 90vh;
    padding-top: 10%;
    background-color: rgb(24, 10, 99);
    color: white;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}
.search{
  min-width: 200px;
}
.font-size-20{
    font-size: 20px;
}
.font-size-30{
    font-size: 30px;
}
.font-size-40{
    font-size: 40px;
}
 /* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background:  rgb(24, 10, 99);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:  rgb(42, 22, 150); 
}
</style>