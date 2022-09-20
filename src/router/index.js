import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import WeatherView from '../views/WeatherView.vue'
import ListCity from '../views/ListCity.vue'

const routes = [
    {
        path: '/',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/WeatherView',
        name: 'WeatherView',
        component: WeatherView
    },
    {
        path: '/ListCity',
        name: 'ListCity',
        component: ListCity
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router