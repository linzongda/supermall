import { createStore } from 'vuex'
import getters from "./getters";

export default createStore({
  state: {
    cartList:[]
  },
  getters,
  mutations: {
    addCounter(state,payload){
     payload.count++
    },
    addToCart(state,payload){
      payload.checked=true
      state.cartList.push(payload)
    }

  },
  actions: {
    addCart(context,payload){
      // state.cartList.push(payload)
      //payload新添加的商品
      //   let oldProduct =null;
      //   for(let item of state.cartList){
      //     if(item.iid===payload.iid){
      //       oldProduct=item
      //     }
      //   }
      let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
      //2.判断oldPoduct
      if(oldProduct){
        // oldProduct.count+=1
        context.commit('addCounter',oldProduct)
      }else{
        payload.count=1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
      }

    }
  },
  modules: {
  }
})
