<template>
  <div id="infoPage">
    <x-header class="header" :left-options="{backText: ''}">我的消息</x-header>
    <div class="wrapper">
        <div class="no-info text-center" v-if="this.infoList.length === 0">
          <div class="warn absolute-center-xy">
						<i class="iconfont">&#xe614;</i>
						<p>暂无消息</p>
					</div>
        </div>
        <div class="info-list">
          <div class="info" :data="infoList" v-for="(item, index) in infoList" :key="index" @click="checkDetail(item.notification_id)">
            <div class="left text-center vertical-align">
              <i class="iconfont">&#xe602;</i>
            </div>
            <div class="right vertical-align">
              <div class="up">
                {{item.notification_title}}
                <span class="noCheck" v-if="item.is_read === '0'"></span>
                <span class="time">{{item.send_time}}</span>
              </div>
              <div class="down">
                <span class="cont">{{item.notification_content}}</span>
                <span class="iconfont">&#xe8d5;</span>
              </div>
            </div>
          </div>
        </div>
      <!-- <group>
        <cell title="姓名：" :value="name"></cell>
        <cell title="手机号：" value=""></cell>
        <cell title="职位：" value=""></cell>
        <cell title="所属部门：" value=""></cell>
      </group> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox } from 'vux'
import { getInfoList } from '@/service/api/aboutMe'

export default {
  data () {
    return {
      name: '小小',
      infoList: [],
      isLink: true
      // value: ''
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox
  },
  methods: {
    checkDetail (data) {
      this.$router.push({name: 'WriteNotes', params: {id: data}})
    }
  },
  mounted () {
    getInfoList().then(res => {
      this.infoList = res.data
    })
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#infoPage{
  .vux-header.header{
    background: @header-bg;
    .vux-header-left{
      .left-arrow:before{
        border-color: @text-font-color;
      }
    }
    .vux-header-title{
      color: @back-color-white;
    }
  }
  .wrapper {
    font-family: @font-family-R;
    .no-info{
      .warn{
				i{
					font-size: 150px;/*px*/
					color: @back-color-E8;
				}
				p{
					font-family: @font-family-R;
					font-size: @font-size-twentyS;
					color: #ccc;
					margin-top: 25px;
				}
			}
    }
    .info-list{
      background: @back-color-white;
      padding: 0 40px;
    }
    .info{
      height: 148px;
      padding: 30px 0px;
      border-bottom: 1px solid #DADADA;
      .left, .right{
        display: inline-block;
        line-height: 42px;
      }
      .left{
        width: 78px;
        height: 78px;
        line-height: 78px;
        background: @text-font-color;
        border-radius: 50%;
        margin-right: 15px;
        i{
          font-size: 50px;/*px*/
          color: @back-color-white;
        }
      }
      .right{
        width: 569px;
        .up{
          font-family: @font-family-M;
          font-size: @font-size-thirty;/*px*/
          color: @font-color-4A;
          .noCheck{
          //   right: 70px;
          //   top: 50%;
          //   transform: translate(0, -50%);
          //   position: absolute;
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #F12C20;
          }
          .time{
            float: right;
            font-size: @font-size-twentyF;/*px*/
            color: @font-color-9B;
          }
        }
        .down{
          .cont{
            display: inline-block;
            font-size: @font-size-thirty;/*px*/
            color: @font-color-7E;
            width: 476px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .iconfont{
            float: right;
            font-size: 50px;/*px*/
            color: #DADADA;
            margin-right: -16px;
          }
        }
      }
    }
    // .info {
    //   position: relative;
    //   height: 90px;
    //   background: #fff;
    //   line-height: 90px;
    //   font-family: PingFangSC-Regular;
    //   font-size: 30px;
    //   color: #666666;
    //   border-top: 1px solid #CCCCCC;
    //   padding-left: 20px;
    //   .noCheck{
    //     right: 70px;
    //     top: 50%;
    //     transform: translate(0, -50%);
    //     position: absolute;
    //     display: inline-block;
    //     width: 20px;
    //     height: 20px;
    //     border-radius: 50%;
    //     background: #B68458;
    //   }
    //   .right{
    //     right: 20px;
    //     position: absolute;
    //     font-size: 45px;
    //     color: #999;
    //   }
    // }
  }
}

</style>
