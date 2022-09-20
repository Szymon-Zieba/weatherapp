import { ref, watch } from 'vue'

export const followedCities = ref([])

export const loadFollowedCities = () => {
    const data =  JSON.parse(localStorage.getItem("followedCities"))

    if(data){
        followedCities.value = data
    }
}

export const followCity = (newCity) => {
    const index = followedCities.value.findIndex(city => city.id == newCity.id)
    if(index == -1){
        followedCities.value.push(newCity)
    }
}

export const unfollowCity = (newCity) => {
    const id = followedCities.value.findIndex(city => city.id == newCity.id)
    followedCities.value = followedCities.value.filter((city, index) =>{ 
        return index != id;
    })
    localStorage.setItem("followedCities", JSON.stringify(followedCities.value))
}

export const checkIfFollowedCity = (id) => {
    const index = followedCities.value.findIndex(city => city.id == id)
    if(index == -1){
        return false
    }
    else{
        return true
    }
}

watch(followedCities.value, () => {
    localStorage.setItem("followedCities", JSON.stringify(followedCities.value))
})

loadFollowedCities()


