<template>
  <div class="my_checklist">
    <div :class="'checkbox ' + (item.checked ? 'checked' : '')" v-for="(item, index) in check_list" :key="index">
      <div :class="'box mint-toast-icon mintui mintui-success ' + (item.checked ? 'checked' : '')" @click="change(index)"></div>
      <div class="content">{{item.name}}</div>
      <slot :item="item"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      require: true
    },
    value: {
      require: true
    },
    multiple: {
      default: true
    }
  },
  data () {
    return {
      check_list: []
    }
  },
  watch: {
      'options': function (n, o) {
        this.updata()
    }
  },
  methods: {
    change (index) {
      let item = this.check_list[index]
      if (this.multiple || item.checked) {
        item.checked = !item.checked
        this.$set(this.check_list, index, item)
      } else {
        this.check_list.forEach(val => {
          val.checked = false
        })
        item.checked = !item.checked
        this.$set(this.check_list, index, item)
      }
      let value = []
      // 同步到value上
      this.check_list.forEach(val => {
        if (val.checked) {
          value.push(val)
        }
      })
      this.$emit('input', value)
    },
    // 全选方法
    checkAll (flag) {
      let value = []
      this.check_list.forEach((item, index) => {
        item.checked = flag
        this.$set(this.check_list, index, item)
        if (flag) {
          value.push(item)
        }
      })
      this.$emit('input', value)
    },
    updata () {
        this.check_list = this.options
    }
  },
  mounted () {
    this.check_list = [...this.options]
    this.check_list.forEach(item => {
      item.checked = false
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../common/style/variable.less";
  .my_checklist{
    // margin-top: 10px;
    padding: 0 30px;
    background: @back-color-white;
    .checkbox{
      display: flex;
      justify-content: space-between;
      height: 100px;
      line-height: 100px;
      background: @back-color-white;
      border-bottom: 1px solid @line-color-light;/*no*/
      // margin-bottom: 8px;
      // padding: 0 20px;
      .box{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #ccc;/*no*/
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        &.checked{
          background-color: @text-font-color;
          border: 1px solid transparent;/*no*/
          &::before{
             transform: rotate(0deg) scale(1);
          }
        }
        &::before{
          color: @back-color-white;
          font-size: 18px;/*px*/
          width: 40px;
          height: 40px;
          // position: absolute;
          // left: 0;
          // top: 0;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(45deg) scale(0);
          transition: transform .2s;
        }
      }
      .content{
        width: 70%;
        margin-left: 28px;
        font-family: @font-family-R;
        font-size: @font-size-twentyE;/*px*/
        color: @font-color-333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .checked + .content{
        // color: @text-font-color;
      }
    }
  }
</style>
