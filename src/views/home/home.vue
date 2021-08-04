<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control class="tab-control" :title="['新款', '精选','流行']"
                 @tabClick="tabClick" ref="tabControl"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper class="img" :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['新款', '精选','流行']"
                   @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

  <router-view></router-view>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from './childComps/recommendView'
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "../../components/content/goods/GoodsList";
  import TabControl from "../../components/content/tabControl/TabControl";
  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";
  // import mitt from 'mitt';

  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        date() {
          return {
            scroll: null
          }
        },
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []}

        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        saveY:0,
        isTabFixed: false
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated () {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()

    },
    deactivated () {
      this.saveY=this.$refs.scroll.getScrollY()
    },
    created() {
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    mounted() {
      //获取tabControl的tabOffsetTop
      //所有组件都$el属性
      console.log(this.$refs.tabControl.$el.offsetTop);

    },
    methods: {
      tabClick(index) {
        // getHomeGoods().then(res=>{
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // })
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000

        this.isTabFixed = (-position.y) > 610
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabControl = this.$refs.tabControl.$el.offsetTop
      },

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // sessionStorage.setItem('banners',JSON.stringify(this.banners));
          sessionStorage.setItem('recommends',JSON.stringify(this.recommends))
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
.img{
  width: 100%;
  height: 100%;
}
  .home-nav {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #eeeeee;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /*position: -webkit-sticky;*/
    position: sticky;
    top: 44px;
    z-index: 9;
    background-color: white;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 9;
  }
</style>
