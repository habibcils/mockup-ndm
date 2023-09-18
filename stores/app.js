import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useAppStore = defineStore('appStore', () => {
    const rail = ref(true)
    const checkRail = computed(() => rail)
    const changeRail = () => {
        rail.value = !rail.value
    }

    const darkmode = ref('dark')
    if(localStorage.getItem('darkmode')){
        darkmode.value = JSON.parse(localStorage.getItem('darkmode'))
    }else{
        localStorage.setItem('darkmode', JSON.stringify('dark'))
    }

    const checkTheme = computed(() => darkmode.value)

    const changeTheme = (value) => {
        darkmode.value = value
    }

    watch(
        darkmode, 
        (val) =>{
            localStorage.setItem('darkmode', JSON.stringify(val))
        },
        {deep: true}
    )

    return { 
        changeTheme, 
        darkmode, 
        checkTheme, 
        rail,
        changeRail,
        checkRail,
    }
})