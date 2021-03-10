import {effect, ref, reactive} from '@vue/reactivity'
import { createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from '@vue/runtime-core'

window.msg = ref('hello')
window.check = ref(true)

effect(() => {
    if(check.value) {
        console.log(msg.value)
    }
    console.log('track')
})

check.value = false

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _createVNode("div", null, "Hello World!"),
    _createVNode("div", null, "dwadwad")
  ], 64 /* STABLE_FRAGMENT */))
}

console.log(render())

var b = reactive([])
b.push('a')