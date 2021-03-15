import { ref, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.7/vue.esm-browser.js'
const _val = ref(0)
export function valSetup() {
    onMounted(() => {
        window.addEventListener('click', () => {
            _val.value++
        })
    })
}
export const val = _val