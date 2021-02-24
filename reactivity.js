const targetMap = new WeakMap()

let product = { price: 5, quantity: 2 }
let total = 0
const effect = () => { total = product.price * product.quantity }

function track(target, key) {
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if(!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}

function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if(!depsMap) return
    let dep = depsMap.get(key)
    if(dep) {
        dep.forEach(effect => effect())
    }
}

track(product, 'quantity')
trigger(product, 'quantity')