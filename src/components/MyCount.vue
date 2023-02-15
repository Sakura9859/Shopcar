<template>
  <div class="my-counter">
    <button type="button" class="btn btn-light" @click="off">-</button>
    <input type="number" class="form-control inp" :value="nub" ref="nub" />
    <button type="button" class="btn btn-light" @click="add">+</button>
  </div>
</template>

<script>
import eventBus from "../EventBus";
export default {
  data() {
    return {
      nub: this.number,
    };
  },

  props: {
    number: {
      type: Number,
      default: 1,
    },
    id: {
      type: Number,
    },
  },
  methods: {
    add() {
      this.nub += 1;
      eventBus.$emit("add", this.id, this.nub);
    },
    off() {
      if (this.nub > 1) {
        this.nub--;
      }
      eventBus.$emit("off", this.id, this.nub);
    },
  },
};
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 70px;
    text-align: center;
    margin: 0 10px;
  }
  .btn,
  .inp {
    transform: scale(0.9);
  }
}
</style>
