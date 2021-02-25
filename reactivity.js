const targetMap = new WeakMap()

let activeEffect = null
let product = reactive({ price: 5, quantity: 2 })
let salePrice = ref(0)
let total = 0

function effect(eff) { 
    activeEffect = eff
    eff()
    activeEffect = null
}

function track(target, key) {
    if (activeEffect) { // 只在effect运行下，调用track
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        dep.add(activeEffect)
    }
}

function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => effect())
    }
}

function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (result && oldValue != result) {
                trigger(target, key)
            }
            return result
        }
    }
    return new Proxy(target, handler)
}

function ref(raw) {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            raw = newVal
            trigger(r, 'value')
        }
    }
    return r
}

effect(() => { salePrice.value = product.price * 0.9 })
effect(() => { total = salePrice.value * product.quantity })

console.log(total)
console.log(salePrice.value)
product.quantity = 3
product.price = 10
console.log(total)
console.log(salePrice.value)