<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item" :class="pageNumber == 1 ? 'disabled' : ''">
                <button  @click="updatePageNumber(pageNumber - 1)" class="page-link">Previus</button>
            </li>
            <li class="page-item" v-for="index in pageAll" :key="index" :style="[ pageNumber == index ? {'opacity': '40%', 'border': '2px solid grey'} : '']">
                <button @click="updatePageNumber(index)" class="page-link">{{index}}</button>
            </li>
            <li class="page-item" :class="pageNumber == pageAll ? 'disabled' : ''">
                <button @click="updatePageNumber(pageNumber + 1)" class="page-link">Next</button>
            </li>
        </ul>
    </nav>
</template>

<script>
    import {ref, computed} from 'vue'
export default {
    props: {
        count: Number,
        pageSize: Number,
    },
    emits:[
        'pageChange'
    ],
    setup(props,{emit}){
        let pageNumber = ref(1)

        const classObject = computed(() => ({
            disable: pageNumber.value != 1    
        }))

        const pageAll = computed(() => 10)

        
        const updatePageNumber = (number) => {
            pageNumber.value = number
            emit("pageChange", number)
        }

        return{
            pageNumber,
            classObject,
            pageAll,
            updatePageNumber,
        }
    }
}
</script>

<style>

</style>