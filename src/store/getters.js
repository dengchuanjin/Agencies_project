/**
 * Created by leibo on 17/11/6.
 */
export default {
  //用户系统那边的用户
  users(state){
    return state.users;
  },
  //初始化动画
  transtionActive(state){
    return state.transtionActive
  },
  //用户登录信息
  userInfo(state){
    return state.userInfo;
  },
  //初始化景区用户
  scenicUsers(state){
    return state.scenicUsers
  },
  scenicUsersKeyWord(state){
    return state.scenicUsersKeyWord
  },
  //初始化修改商户数据
  updateBusinessUser(state){
    return state.updateBusinessUser
  },
  //初始化旅行社栏目
  managementUserKeyWord(state){
    return state.managementUserKeyWord
  },
  //初始化修改数据
  initUpdateManagement(state){
    return state.initManagement;
  },
  //产品信息
  initTravelAgencyProducts(state){
    return state.initTravelAgencyProducts;
  },
  //初始化修改产品数据
  UpdateTravelAgencyProducts(state){
    return state.updateInitAgencyProducts
  },
  //初始化订单信息
  initTravelAgencyOrder(state){
    return state.initTravelAgencyOrder;
  },
  //初始化修改订单
  initUpdateOrders(state){
    return state.initUpdateOrders;
  },
}
