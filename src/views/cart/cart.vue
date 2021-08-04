<template>
<div class="cart">
  <nav-bar>
    <template v-slot:center>
      <div class="nav-bar">购物车({{cartLength}})</div>
    </template>
  </nav-bar>
  <cart-list></cart-list>
  <cart-bottom-bar @buy="buyClick"></cart-bottom-bar>
  <toast message="结算功能暂时还没实现" :show="show"></toast>
</div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import toast from "../../components/common/toast/toast";
  import {mapGetters} from 'vuex'
  export default {
        name: "cart",
    data(){
          return{
            show:null
          }
    },
      components:{
        NavBar,
        CartList,
        CartBottomBar,
        toast
      },
      computed:{
          // cartLength(){
          //   return this.$store.state.cartList.length
          // }
        ...mapGetters(['cartLength','cartList'])
      },
    methods:{
          buyClick(data){
            // console.log(data);
            this.show=data;
            setTimeout(()=>{
              this.show=false;
            },1500)
          }
    }
    }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }

</style>
