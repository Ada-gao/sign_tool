<template>
	<x-header class="header-top" :left-options="{showBack: false}">{{title}}
		<span slot="overwrite-left" @click="infoList" class="warn">
			<i class="iconfont mes">&#xe607;</i>
			<i class="text-center num" v-if="this.noCheckNum !== 0">{{this.noCheckNum}}</i>
		</span>
    <span slot="right" class="warn" @click="barcodescanner">
      <i class="iconfont mes">&#xe622;</i>
    </span>
		<!-- <i slot="right" class="iconfont mes" @click="barcodescanner">&#xe622;</i> -->
	</x-header>
</template>
<script>
import { XHeader } from 'vux'
import Vue from 'vue'
import Notifier from '@/common/js/Notifier'
import { qscan } from '@/service/api/activity'
import { toast } from '@/common/js/filter'
import { getInfoList } from '@/service/api/aboutMe'

export default {
	data () {
		return {
      noCheckNum: 0
		}
	},
	props: ['title', 'flag'],
	components: {
		XHeader
	},
	methods: {
		infoList () {
      this.$router.push({name: 'MyInfo'})
		},
    barcodescanner () {
      if (Vue.cordova.device.platform !== 'iOS' && Vue.cordova.device.platform !== 'Android') {
        Notifier.alert('请在移动设备上扫描二维码')
        return
      }
      if (Vue.cordova.device.isVirtual) {
        Notifier.alert('不支持虚拟设备扫描二维码')
        return
      }
      Vue.cordova.scanner.scan(
        {// 全部参数
          'baseColor': '#ffcd32',
          // (边框、按钮、导航栏等背景颜色，优先级最低，单独设置可覆盖)

          // bar
          'title': '扫一扫',
          // (标题文字)
          'barColor': '383636',
          // (导航栏颜色)
          'statusBarColor': 'white',
          // (状态栏字体颜色 white为白，不填为默认)

          // describe string
          'describe': '',
          // (提示用户文字，支持 \n 换行，多行文字需注意小屏幕设备适配问题)
          'describeFontSize': '15',
          // (字体大小)
          'describeLineSpacing': '8',
          // (行间距)
          'describeColor': 'ffffff',
          // (文字颜色)

          // scan border
          'borderColor': 'BD9D62',
          // (扫描框颜色)
          'borderScale': '0.6',
          // (边框大小，0.1 ~ 1)

          // choose photo button
          'choosePhotoEnable': 'true',
          // (支持相册选取, 默认false)
          'choosePhotoBtnTitle': '相册',
          // (选取按钮文字)
          'choosePhotoBtnColor': 'BD9D62',
          // (选取按钮颜色)

          // flashlight
          'flashlightEnable': 'true'
          // (支持手电筒, 默认false)
        },
        function (result) {
          console.log('scan', result)
          if (result && JSON.parse(result).result && JSON.parse(result).result.indexOf('/activity/') > 0) {
            let url = JSON.parse(result).result.split('activity/')[1]
            qscan(url).then(res => {
              console.log('res', res)
              if (res.data.code === 0) {
                toast('签到成功')
              }
            }).catch(err => {
              console.log('err', err)
            })
          } else {
            toast('换一张二维码哦')
          }
        },
        function (error) {
          toast('签到失败')
          console.log(error)
        }
      )
    }
	},
	mounted () {
    // window.JPush.getApplicationIconBadgeNumber(badgeNum => {
    //   console.log('badgeNum', badgeNum)
    //   this.noCheckNum = badgeNum
    //   window.localStorage.setItem('badgeNum', badgeNum)
    // })
    window.localStorage.setItem('infoFlag', this.flag)
		this.$nextTick(function () {
			getInfoList().then(res => {
				let noCheckInfo = res.data.filter(item => item.is_read === '0')
        this.noCheckNum = noCheckInfo.length
        window.localStorage.setItem('badgeNum', this.noCheckNum)
        window.JPush.setBadge(this.noCheckNum)
        window.JPush.setApplicationIconBadgeNumber(this.noCheckNum)
				// Vue.cordova.jPush && Vue.cordova.jPush.setBadge(this.noCheckNum)
			})
    })
	}
}
</script>
<style lang="less">
@import "../../common/style/variable.less";
.vux-header.header-top{
  .vux-header-left,
  .vux-header-right{
		left: 20px;
		.warn{
			display: inline-block;
			position: relative;
			width: 80px;
			height: 80px;
      line-height: 80px;
      text-align: center;
			.mes{
				font-size: 40px;/*px*/
				color: @font-color-000;
			}
			.num{
				display: inline-block;
				width: 24px;
				height: 24px;
				line-height: 24px;
				background: #EE5250;
				border-radius: 50%;
				position: absolute;
				top: 10px;
				right: 10px;
				font-family: @font-family-M;
				font-size: 12px;/*px*/
				color: #FFFFFF;
				// text-align: center;
			}
		}
	}
	.vux-header-right{
		// right: 20px;
		.mes{
			font-size: 40px;/*px*/
			color: @font-color-000;
		}
	}
}
</style>
