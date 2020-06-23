const getters = {
    listData: state => state.valueList.listData,
    center: state => state.lnglat.center,
    lngLat: state => state.lnglat.lngLat,
    openId: state => state.valueList.openId,
    yuyueSite: state => state.yuyue.yuyueSite,
    userID: state => state.yuyue.userID,
    item: state => state.yuyue.item,
    value: state => state.yuyue.value,
    phone: state => state.yuyue.phone,
  }
export default getters