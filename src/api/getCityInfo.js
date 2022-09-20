import { API_KEY, API_URL } from "../config"


export const getCurrentCityInfo = async(lat, lon) => {
    try{
        const rest = await fetch(`${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        return rest.json()
    }
    catch(err){
        alert("Problem with getCurrentCityInfo from api  " + err)
    }
} 

export const get5Days3HourCityInfo = async(lat, lon) => {
    try{
        const rest = await fetch(`${API_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        return rest.json()
    }
    catch(err){
        alert("Problem with getHourly4DaysCityInfo from api  " + err)
    }
} 
