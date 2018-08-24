<template>
  <div class="activity_list activity_detail">
    <mt-popup v-model="show"
              position="bottom"
              class="camera_pop">
      <div>
        <div class='popup-item' @click="camera()">相机</div>
        <div class='popup-item' @click="photo()">从相册中选取</div>
        <div class='popup-item' @click="cancel()">取消</div>
      </div>
    </mt-popup>
    <mt-header fixed title="活动详情" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
      <mt-button slot="right">
        <div @click="handleShare">
          <mt-button class="right_btn"><span>分享</span><i class="iconfont">&#xea31;</i></mt-button>
        </div>
      </mt-button>
    </mt-header>
    <div class="detail">
      <div class="space"></div>
      <div class="tit">
        <div class="left">8号会员日</div>
        <div class="right">
          <span>编号：</span>
          <span>1203355</span>
        </div>
      </div>
      <main class="cont">
        <img :src="src" alt="">
        <section class="detail_item">
          <span>活动开始：</span>
          <span>2018.02.01 14:20</span>
        </section>
        <section class="detail_item">
          <span>活动结束：</span>
          <span>2018.02.01 14:20</span>
        </section>
        <section class="detail_item">
          <span>报名开始：</span>
          <span>2018.02.01 14:20</span>
        </section>
        <section class="detail_item">
          <span>报名结束：</span>
          <span>2018.02.01 14:20</span>
        </section>
        <section class="detail_item">
          <span>活动人数：</span>
          <span>100人</span>
        </section>
        <section class="detail_item">
          <span>活动负责人：</span>
          <span>小阿希</span>
        </section>
        <section class="detail_item">
          <span>活动所属部门：</span>
          <span>财富部</span>
        </section>
        <section class="detail_item def_item">
          <i class="iconfont">&#xe637;</i>
          <span>上海市浦东新区陆家嘴软件园</span>
        </section>
        <div class="space"></div>
        <section class="brief_info">
          <div>活动简介：</div>
          <div class="brief_cont">
            qwerqwerwerqwedsfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
          </div>
        </section>
        <div class="space"></div>
        <section class="activity_poster">
          <span class="left def_left">活动海报</span>
          <span class="right" @click="handleShare">查看</span>
        </section>
        <mt-cell
          title="代客户报名"
          class="def_mtcell"
          to="/"
          is-link>
        </mt-cell>
        <mt-cell
          title="查看报名列表"
          class="def_mtcell"
          to="/"
          is-link>
        </mt-cell>
      </main>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        src: 'static/img/banner.jpg',
        show: false
      }
    },
    methods: {
      handleShare () {
        console.log(111)
      }
    },
    mounted () {}
  }
</script>
<style lang="less" scoped>
  @import '../../common/style/variable.less';
  .activity_list {
    font-family: PingFangSC-Regular;
    .mint-header.header {
      height: 88px;
      background-color: @new-header-color;
      font-size: 36px;
      color: #333;
    }
    .detail {
      padding-top: 88px;
      background-color: #fff;
      .left, .right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .left {
        left: 20px;
        font-size: 30px;
        color: @new-font-color;
      }
      .right {
        right: 20px;
        font-size: 28px;
        color: #333;
      }
      .tit {
        position: relative;
        height: 75px;
        line-height: 75px;
      }
      .cont {
        font-size: 26px;
        color: #626161;
        img {
          display: block;
          width: 100%;
          height: 370px;
        }
        .detail_item {
          height: 37px;
          line-height: 37px;
          margin-bottom: 15px;
          padding-left: 20px;
        }
        .detail_item:nth-of-type(1) {
          margin-top: 15px;
        }
        .def_item {
          i, span {
            vertical-align: baseline;
          }
          i {
            font-size: 22px;
          }
        }
        .brief_info {
          padding: 12px 20px;
          .brief_cont {
            word-break: break-all;
          }
        }
        .activity_poster {
          height: 79px;
          line-height: 79px;
          position: relative;
          span {
            color: #626161;
          }
        }
        .def_mtcell:nth-of-type(1) {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>
