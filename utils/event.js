let events = {}
module.exports = {
  on(name, cb) {
    if (!name || !cb) {
      return
    }
    let cbs = events[name]
    if (!cbs) {
      cbs = []
    }
    if (cbs.indexOf(cb) > -1) {
      return
    }
    cbs.push(cb)
    events[name] = cbs
  },
  emit(name,payload){
    let cbs = events[name]
    if(cbs){
      cbs.forEach(it =>{
        it && it(payload)
      })
    }
  },
  remove(name,cb){
    let cbs = events[name]
    if(!cbs){
      return
    }
    let index = cbs.indexOf(cb)
    if(index > -1){
        cbs.splice(index,1)
        events[name] = cbs
    }
  }
}