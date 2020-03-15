let store = {}
module.exports={
  put(name,value){
    store[name] = value
  },
  get(name){
    let data = store[name]
    store[name] = null
    return data
  }
}