import {effect, ref, reactive} from '@vue/reactivity'

window.msg = ref('hello')
window.check = ref(true)

effect(() => {
    if(check.value) {
        console.log(msg.value)
    }
    console.log('track')
})

debugger
check.value = false