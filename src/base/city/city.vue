<template>
  <div class="city">
    <mt-popup
      v-model="showPopup"
      position="bottom"
      popup-transition="popup-fade"
      lockScroll="true"

    >

      <mt-picker
        :slots="myAddressSlots"
        ref="picker"
        @change="onMyAddressChange"
        show-toolbar
      >
        <mt-button @click="handleConfirm" class="confirm_picker">确定</mt-button>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import {Picker, Popup, Button} from 'mint-ui'
  import myAddress from '@/service/api/address.json'

  export default {
    name: 'city',
    props: ['showPopup'],
    components: {
      'mt-picker': Picker,
      'mt-popup': Popup,
      'mt-button': Button
    },
    data () {
      return {
//        popupVisible: this.showPopup,
        myAddressProvince: '省',
        myAddressCity: '市',
        myAddresscounty: '区/县',
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myAddress),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ]
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.myAddressSlots[0].defaultIndex = 0
      })
    },
    methods: {
      onMyAddressChange (picker, values) {
        if (myAddress[values[0]]) {
          picker.setSlotValues(1, Object.keys(myAddress[values[0]]))
          this.myAddressProvince = values[0]
          this.myAddressCity = values[1]
        }
        if (myAddress[values[0]][values[1]]) {
          picker.setSlotValues(2, Object.keys(myAddress[values[0]][values[1]]))
          this.myAddresscounty = values[2]
        }
      },
      handleConfirm () {
        let data = {
          popupVisible: false,
          myAddressProvince: this.myAddressProvince,
          myAddressCity: this.myAddressCity,
          myAddresscounty: this.myAddresscounty
        }
        this.$emit('hidePopup', data)
//        console.log(this.$refs.picker.getValues())
      }
    }
  }
</script>
<style scoped lang="less">
  .mint-popup {
    width: 100%;
  }

  .confirm_picker {
    height: 40px;
    line-height: 40px;
    width: 80px;
    font-size: 24px;
    border: none;
  }
</style>
