<template>
  <div>
    <div class="navbar navbar-inverse">
      <div class="navbar-header">
        <a class="navbar-brand" href="javascript:;">旅行社后台管理系统</a>

        <ul class="nav navbar-nav visible-xs-block">
          <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
          <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
      </div>

      <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
          <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>

        </ul>


        <ul class="nav navbar-nav navbar-right">


          <li class="dropdown dropdown-user">
            <a class="dropdown-toggle" data-toggle="dropdown">
              <!--<img src="assets/images/placeholder.jpg" alt="">-->
              <span>管理员</span>
              <i class="caret"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-right">
              <li @click="getUser"><a href="javascript:;"><i class="icon-user-plus"></i>{{qiankeUser?qiankeUser:''}}</a></li>
              <li @click="Quit"><a href="javascript:;"><i class="icon-switch2"></i>退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- /main navbar -->


    <!-- Page container -->
    <div class="page-container">

      <!-- Page content -->
      <div class="page-content">

        <!-- Main sidebar 左边导航栏开始-->
        <div class="sidebar sidebar-main">
          <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
              <div class="category-content">
                <div class="media">
                  <a href="javascript:;" class="media-left">
                    <!--<img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">-->
                  </a>
                  <div class="media-body">
                    <span class="media-heading text-semibold">欢迎您:{{qiankeUser?qiankeUser:''}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- /user menu -->


            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
              <div class="category-content no-padding">
                <ul class="navigation navigation-main navigation-accordion">

                  <!-- Main -->
                  <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
                  <li>
                    <a href="javascript:;"><i class="icon-stack2"></i> <span>旅行社信息管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/agencies">旅行社商户管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/management">旅行社栏目管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/travelAgencyProducts">旅行社产品管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/travelAgencyOrder">旅行社订单管理</router-link>
                      </li>

                    </ul>
                  </li>
                  <!-- /main -->

                </ul>
              </div>
            </div>
            <!-- /main navigation-->

          </div>
        </div>
        <!-- /main sidebar  左边导航栏结束-->
        <!--右边内容-->
        <div class="content-wrapper">

          <div class="content" :class="{ 'animated': transtionActive.isActive, 'jackInTheBox': transtionActive.isRotateInDownRight }">
            <!-- Page length options -->
            <!-- /page length options -->
            <router-view name="User"></router-view>

            <!-- Footer -->
            <!--<div class="footer text-muted">-->
            <!--&copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>-->
            <!--</div>-->
            <!-- /footer -->
          </div>
        </div>
        <!--右边内容结束-->
        <!-- /dashboard content -->


        <!-- Footer -->
        <div class="footer text-muted">

        </div>
        <!-- /footer -->

      </div>
      <!-- /content area -->

    </div>
    <!-- /main content -->

  </div>
  <!-- /page content -->
</template>
<script>
  import {mapGetters} from 'vuex'
  import {POST} from '../assets/js/universal'
  export default{
    name: '',
    data(){
      return {
        qiankeUser:'',
      }
    },
    computed:mapGetters([
      'userInfo',
      'transtionActive'
    ]),
    mounted(){
      if(!JSON.parse(sessionStorage.getItem('isLogin'))){
        this.$router.push({name:'Login'})
      }
      var user = sessionStorage.getItem('admin');
      this.qiankeUser = user;
      var GetAgentItemList = {
        loginUserID: 'huileyou',
        loginUserPass: 123,
        iD: '',
        itemName: name ? name : '',
        userName: '',
        isDelete: 0,
        page: 1,
        rows: 5,
      }
      this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetAgentItemList', {
        paramJson: JSON.stringify(GetAgentItemList)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.backCode) == 200) {
            this.$store.commit('initManagement', data.itemInfoList)
          }
        })
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if(this.transtionActive.isActive&&this.transtionActive.isRotateInDownRight){
          this.$store.commit('setTranstionFalse')
        }
        setTimeout(()=>{
          this.$store.commit('oPTranstionFalse')
        },10)
      }
    },
    methods:{
      //退出
      Quit(){
        this.$router.push({ name: 'Login' })
      },
      //用户信息
      getUser(){
        this.$router.push({ name: 'getUser' })
      },

    }
  }
</script>
<style scoped>

</style>
