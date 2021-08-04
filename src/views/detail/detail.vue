<template>
  <div id="detail">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="../../assets/img/common/back.svg" alt="">
        </div>

      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(i,index) in titles"
               class="title-item" :class="{active:index===currentIndex}" @click="titleClick(index)">
            {{i}}
          </div>
        </div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper ref="base" :top-imags="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" ref="scroll1" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="showBackTop"/>
    <toast :message="message" :show="show"></toast>
  </div>



</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "../../components/content/backTop/BackTop";


  import {BACKTOP_DISTANCE} from "../../common/const"

  import {getRecommend,getDetail, Goods, Shop, GoodsParam} from "../../network/detail";
  import toast from "../../components/common/toast/toast";

  export default {
    name: "detail",
    components: {
      NavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      BackTop,
      toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo:{},
        themeTops: [0,1000,2000,3000],
        message:'添加购物车成功',
        show:false,
        showBackTop:false


      }
    },

    created() {
      this.iid=this.$route.params.id
      this._getDetailData()
      this._getRecommend()
    },

    methods: {
      imageLoad() {
        // console.log('+++');
        // /this.$refs.scroll1.refresh()
      },
      _getOffsetTops() {
        this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
        console.log(this.themeTops);
      },
      contentScroll(position) {
        // console.log(position);
        // 1.监听backTop的显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE

        // 2.监听滚动到哪一个主题
        this._listenScrollTheme(-position.y)
      },
      _listenScrollTheme(position) {
        let length = this.themeTops.length;
        for (let i = 0; i < length-1; i++) {
          let iPos = this.themeTops[i];
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      },
      titleClick(index) {
        this.currentIndex = index
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      backClick() {
        this.$router.go(-1)
      },
      backTop(){
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      addToCart(){

        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.newPrice;
        product.iid=this.iid
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)

        this.show=true;
        setTimeout(()=>{
          this.show=false;
        },1500)
      },

      _getDetailData() {
        // 1.获取iid
        const iid = this.$route.params.id
        this.iid = iid

        // 2.请求数据
        getDetail(iid).then(res => {
          sessionStorage.setItem('Detail',JSON.stringify(res))
          // 2.1.获取结果
          const data = res.result;

          // 2.2.获取顶部信息
          this.topImages = data.itemInfo.topImages;

          // 2.3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 2.4.获取店铺信息
          this.shop = new Shop(data.shopInfo);

          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo

          // 2.6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 2.7.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }

          this.$nextTick(()=>{
            this.themeTops = []
            this.themeTops.push(0)
            this.themeTops.push(this.$refs.param.$el.offsetTop)
            this.themeTops.push(this.$refs.comment.$el.offsetTop)
            // this.themeTops.push(this.$refs.recommend.$el.offsetTop)
            this.themeTops.push(Number.MAX_VALUE)
            console.log(this.themeTops);
            // _getDetailData()
          })
        })
      },
      _getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendInfo = res.data.list
        })
      },


    },
    mounted() {
      // console.log(this.themeTops);
      // this._getOffsetTops()

    },
    updated() {
      // 获取需要的四个offsetTop
      this._getOffsetTops()
    },

  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .back {
    margin-top: 6px;

  }

  .active {
    color: var(--color-high-text)
  }

  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    /*height: calc(100% - 44px);*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*#detail{*/
  /*  position: relative;*/
  /*  z-index: 9;*/

  /*}*/



</style>
