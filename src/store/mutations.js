/**
 * Created by leibo on 17/11/6.
 */
import getters from './getters';

const state = {
  users: [],//用户系统那边的数据
  userInfo: {},//用户登录信息
  scenicUsers: [],//景区用户
  scenicUsersKeyWord: [],
  updateBusinessUser: {},//初始化修改商户数据
  managementUser: [],//初始化旅行社栏目
  managementUserKeyWord: [],
  initManagement: {},//初始化修改旅行社栏目
  initTravelAgencyProducts: [],//初始化产品信息
  updateInitAgencyProducts: {updateAgencyVal: ''},//初始化产品修改数据
  initTravelAgencyOrder: [],//初始化订单信息
  //初始化动画
  transtionActive: {
    isActive: false,
    isRotateInDownRight: false
  },
  initUpdateOrders: {},//初始化修改订单
};
const mutations = {
  //用户系统用户
  setUsers(state, data){
    state.users = data;
  },
  //初始化动画
  setTranstionFalse(state){
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  oPTranstionFalse(){
    state.transtionActive = {
      isActive: !state.transtionActive.isActive,
      isRotateInDownRight: !state.transtionActive.isRotateInDownRight
    }
  },
  //初始化登录信息
  setUserInfo(state, user){
    state.userInfo = user;
  },
  //初始化景区用户信息
  initAgencies(state, data){
    state.scenicUsers = data;
  },
  initAgenciesKeyWord(state, data){
    state.scenicUsersKeyWord = data
  },
  //景区用户筛选
  searchKeyWord(state, userName){
    state.scenicUsersKeyWord = state.scenicUsers.filter(item => {
      var str = item.tb_Name;
      if (str.includes(userName)) {
        return true;
      }
      return false;
    })
  },
  //添加商户
  addAgencies(state, agencies){
    state.scenicUsersKeyWord.push(agencies)
    state.scenicUsers.push(agencies)
  },
  //初始化修改数据
  initUpdateBusiness(state, id){
    let data = state.scenicUsersKeyWord.filter(item => {
      if (item.tb_UserID == id) {
        return true
      }
      return false
    })[0]
    state.updateBusinessUser = getObj(data);
  },
  updateBusiness(state, data){
    state.scenicUsersKeyWord = state.scenicUsersKeyWord.map(item => {
      if (item.tb_UserID == data.tb_UserID) {
        return {
          tb_UserID: data.tb_UserID,
          tb_Name: data.tb_Name,
          tb_CertNo: data.tb_CertNo,
          tb_Phone: data.tb_Phone,
          tb_EndTime: data.tb_EndTime,
          tb_Remark: data.tb_Remark,
          tbImageURL: data.tbImageURL,
          tbBussinessLicenceURL: data.tbBussinessLicenceURL,
          tbCreateTime: data.tbCreateTime
        }
      }
      return item;
    })
  },
  //删除商户
  filterBusiness(state, id){
    state.scenicUsersKeyWord = newFilter(state.scenicUsersKeyWord, id, 'tb_UserID')
  },
  //初始化旅行社栏目
  initManagement(state, data){
    state.managementUser = data;
    state.managementUserKeyWord = data;
  },
  //旅行社栏目筛选
  searchManagementKeyWord(state, name){
    state.managementUserKeyWord = state.managementUser.filter(item => {
      var str = item.ii_ItemName;
      if (str.includes(name)) {
        return true;
      }
      return false;
    })
  },
  //旅行社栏目添加
  addManagementItem(state, data){
    for (var i = 0; i < state.scenicUsersKeyWord.length; i++) {
      if (state.scenicUsersKeyWord[i].tb_UserID == data.ii_TouristBussinessID) {
        data.tb_Name = state.scenicUsersKeyWord[i].tb_Name;
      }
    }
    state.managementUserKeyWord.push(data);
  },
  //旅行社栏目删除
  filterManagement(state, id){
    state.managementUserKeyWord = newFilter(state.managementUserKeyWord, id, 'ii_ID')
  },
  //初始化修改数据
  initDialogManagement(state, id){
    let data = state.managementUserKeyWord.filter(item => {
      if (item.ii_ID == id) {
        return true
      }
      return false
    })[0]
    state.initManagement = getObj(data);
  },
  //修改栏目
  updateManagementMutations(state, data){
    state.managementUserKeyWord = state.managementUserKeyWord.map(item => {
      if (item.ii_ID == data.ii_ID) {
        return {
          ii_ID: data.ii_ID,
          ii_ItemName: data.ii_ItemName,
          ii_Remark: data.ii_Remark,
          ii_TouristBussinessID: data.ii_TouristBussinessID,
          tb_Name: data.tb_Name
        }
      }
      return item;
    })
  },
  //初始化产品信息
  initTravelAgency(state, data){
    data.forEach((item, index) => {
      // if(item.gl_CanSell==0)
      item.availableName = getAvailable(item.gl_CanSell);
      item.updateAgencyVal = item.gl_CanSell;
      for (var i = 0; i < state.managementUserKeyWord.length; i++) {
        if (item.gl_TouristBussinessID == state.managementUserKeyWord[i].ii_TouristBussinessID) {
          item.typeName = state.managementUserKeyWord[i].tb_Name
        }
        if (item.gl_ItemInfoID == state.managementUserKeyWord[i].ii_ID) {
          data[index].ManagementName = state.managementUserKeyWord[i].ii_ItemName
        }
      }
    })

    state.initTravelAgencyProducts = data;
  },
  //数据没有清空数据
  clearTravelAgency(state){
    state.initTravelAgencyProducts = [];
  },
  //初始化修改产品数据
  updateInitTravelAgency(state, id){

    let data = state.initTravelAgencyProducts.filter(item => {

      if (item.gl_ID == id) {
        return true
      }
      return false
    })[0]
    data.TravelAgencyVal = data.gl_ItemInfoID;
    data.scenicUsersKeyWordVal = data.gl_TouristBussinessID
    state.updateInitAgencyProducts = getObj(data);
  },
  //修改产品
  updateNewTravelAgency(state, data){
    for (var i = 0; i < state.managementUserKeyWord.length; i++) {
      if (data.TravelAgencyVal == state.managementUserKeyWord[i].ii_ID) {
        data.ManagementName = state.managementUserKeyWord[i].ii_ItemName
      }
    }
    for (var i = 0; i < state.managementUserKeyWord.length; i++) {
      if (data.scenicUsersKeyWordVal == state.managementUserKeyWord[i].ii_TouristBussinessID) {
        data.typeName = state.managementUserKeyWord[i].tb_Name
      }
    }
    console.log(data)
    state.initTravelAgencyProducts = state.initTravelAgencyProducts.map(item => {
      if (item.gl_ID == data.gl_ID) {
        return {
          ManagementName: data.ManagementName,
          gl_ID: data.gl_ID,
          gl_Title: data.gl_Title,
          gl_Price: data.gl_Price,
          gl_ExpireTime: data.gl_ExpireTime,
          gl_Remark: data.gl_Remark,
          gl_CanSell: data.updateAgencyVal,
          gl_Content: data.gl_Content,
          gl_TouristBussinessID: data.scenicUsersKeyWordVal,
          gl_ItemInfoID: data.TravelAgencyVal,
          glShowImage1URL: '',
          glShowImage2URL: '',
          glShowImage3URL: '',
          typeName: data.typeName,
          availableName: getAvailable(data.updateAgencyVal)
        }
      }
      return item;
    })
  },
  //删除产品
  filterTravelAgency(state, id){
    state.initTravelAgencyProducts = newFilter(state.initTravelAgencyProducts, id, 'gl_ID')
  },
  //添加产品
  addAgencyProducts(state, data){
    data.availableName = getAvailable(data.glCanSell);
    data.updateAgencyVal = data.glCanSell;
    for (var i = 0; i < state.managementUserKeyWord.length; i++) {
      if (data.glTouristBussinessID == state.managementUserKeyWord[i].ii_TouristBussinessID) {
        data.typeName = state.managementUserKeyWord[i].tb_Name
      }
    }
    state.initTravelAgencyProducts.push({
      updateAgencyVal: data.updateAgencyVal,
      gl_ID: data.glID,
      gl_Title: data.glTitle,
      gl_Price: data.glPrice,
      gl_ExpireTime: data.glExpireTime,
      gl_Remark: data.glRemark,
      gl_CanSell: data.updateAgencyVal,
      gl_Content: data.glContent,
      gl_TouristBussinessID: data.glTouristBussinessID,
      gl_ItemInfoID: data.glItemInfoID,
      gl_ShowImage1URL: '',
      gl_ShowImage2URL: '',
      gl_ShowImage3URL: '',
      typeName: data.typeName,
      availableName: data.availableName
    })
  },
  //订单获取失败清空数组
  clearTravelAgencyOrder(state){
    state.initTravelAgencyOrder = [];
  },
  //初始化订单信息
  setInitTravelAgencyOrder(state, data){
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < state.scenicUsersKeyWord.length; j++) {
        if (Number(data[i].to_TouristBussinessID) == Number(state.scenicUsersKeyWord[j].tb_UserID)) {
          data[i].userName = state.scenicUsersKeyWord[j].name;
        }
      }
    }
    state.initTravelAgencyOrder = data;
  },
  //初始化修改订单
  initOrderUpdateObj(orderId){

  },
  //注销订单
  filterOrder(state, orderId){
    console.log(orderId)
    state.initTravelAgencyOrder = newFilter(state.initTravelAgencyOrder, orderId, 'to_OrderID')
  }
};

//获取是否可售
function getAvailable(id) {
  return id == 0 ? '否' : '是';
}
//获取栏目名字
function getManagementName(obj, data) {
  obj.forEach(item => {
    if (item.ii_ID == data.ii_ID || item.ii_ID == data.ii_ID) {
      data.typeName = item.tb_Name
    }
  })
  return data;
}
//浅拷贝
function getObj(obj) {
  var dst = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      dst[prop] = obj[prop];
    }
  }
  return dst;
}
//删除newFilter
function newFilter(arr, id, type) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][type] !== id) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}
export default {
  getters,
  state,
  mutations
}
