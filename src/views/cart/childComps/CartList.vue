<template>
    <div class="cart-list">
      <scroll class="content">
        <cart-list-item v-for="(i,index) in cartList"
                        :key="index"
                        :product="i"></cart-list-item>
      </scroll>

    </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'
    export default {
        name: "CartList",
      components:{
          Scroll,
        CartListItem
      },
      computed:{
          ...mapGetters(['cartList'])
      }
    }
</script>

<style scoped>
  .cart-list{
    height: 100vh;
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
