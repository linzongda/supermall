<template>
    <div>
      <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">
        <img src="../../../assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		 checked: {
		    type: Boolean,
        default: true
      }
    },

	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 50px 0;
    /*width: 18px;*/
    /*height: 18px;*/
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #479AC9;
    border-color: #479AC3;
  }
</style>
