<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">

        <img :src="item.image" alt="">
        <div>{{item.title}}</div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "recommendView",
      props: {
        recommends: {
          type: Array,
          default() {
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
