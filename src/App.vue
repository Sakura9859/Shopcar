<template>
  <div>
    <MyHeader title="购物车案例" background="" color=""></MyHeader>
    <div class="main">
      <MyGoods
        v-for="obj in list"
        :key="obj.id"
        :gObj="obj"
        :checked="obj.goods_state"
        @state="zFn"
      ></MyGoods>
    </div>

    <MyFooter
      :isfull="fullstate"
      @allFn="newFn"
      :sum="sumFn"
      :nub="number"
    ></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyGoods from "./components/MyGoods.vue";
import MyFooter from "./components/MyFooter.vue";
import eventBus from "./EventBus";
export default {
  components: {
    MyHeader,
    MyGoods,
    MyFooter,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.$axios({
      url: "/api/cart",
    }).then((res) => {
      console.log(res);
      this.list = res.data.list;
    });
    eventBus.$on("add", (id, nub) => {
      this.list.some((item) => {
        if (item.id == id) {
          item.goods_count = nub;
          return true;
        }
      });
    });
    eventBus.$on("off", (id, nub) => {
      this.list.some((item) => {
        if (item.id == id) {
          item.goods_count = nub;
          return true;
        }
      });
    });
  },
  mounted() {},

  methods: {
    zFn(id, state) {
      this.list.some((obj) => {
        if (obj.id == id) {
          obj.goods_state = state;
          return true;
        }
      });
    },
    newFn(val) {
      this.list.forEach((obj) => {
        obj.goods_state = val;
      });
    },
  },
  computed: {
    fullstate() {
      return this.list.every((obj) => obj.goods_state == true);
    },
    sumFn() {
      return this.list
        .filter((obj) => obj.goods_state == true)
        .reduce((sum, obj) => {
          return (sum += obj.goods_price * obj.goods_count);
        }, 0);
    },
    number() {
      return this.list
        .filter((obj) => obj.goods_state == true)
        .reduce((sum, obj) => {
          return (sum += obj.goods_count);
        }, 0);
    },
  },
};
</script>

<style scoped>
.main {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
