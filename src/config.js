export const API_KEY = '0acda646c7eab12bee41d8347498ad9e'

export const API_URL = 'https://api.openweathermap.org/data/2.5/'

export const iconLinkStart = 'http://openweathermap.org/img/wn/' 

export const iconLinkEnd = '@2x.png'

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export const kelvinToCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15)

}