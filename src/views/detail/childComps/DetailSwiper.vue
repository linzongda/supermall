<template>
<div >
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="i in topImags">
      <img :src="i" alt="" height="300">
    </swiper-item>
  </swiper>
</div>

<!--    <swiper>-->
<!--      <swiper-item v-for="(item, id) in topImags" :key="id">-->
<!--          <img :src="item" alt="" @load="imageLoad">-->
<!--      </swiper-item>-->
<!--    </swiper>-->


</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper'
    export default {
        name: "DetailSwiper",
       components:{
        Swiper,SwiperItem
      },
      props:{
        topImags:{
          type:Array,
          default(){
            return []
          }
        }
      },


    }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;

  }
  img{
    width: 100%;
    height: 100%;
  }

</style>
