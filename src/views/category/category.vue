<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>

        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import TabMenu from './childComps/TabMenu'
  import TabControl from '../../components/content/tabControl/TabControl'
  import Scroll from "../../components/common/scroll/Scroll";
  import TabContentCategory from './childComps/TabContentCategory'

  import {getCategory, getSubcategory} from "../../network/category";


  export default {
    name: "category",
    components: {
      NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory
    },
    data() {
      return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1
      }
    },
    created() {
      // 1.请求分类数据
      this._getCategory()
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          sessionStorage.setItem('categories',JSON.stringify(this.categories))
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
