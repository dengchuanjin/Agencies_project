<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">商户信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>商户名称筛选:</span>
        <input type="text" placeholder="商户名称" v-model="initUser">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="dialogAddFormVisibleUser">添加</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>商家编号</th>
          <th>商家名称</th>
          <th>商家身份证号码</th>
          <th>商家电话号码</th>
          <th>商家到期时间</th>
          <th>备注</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in scenicUsersKeyWord">
          <td>{{item.tb_UserID}}</td>
          <td>{{item.tb_Name}}</td>
          <td>{{item.tb_CertNo}}</td>
          <td>{{item.tb_Phone}}</td>
          <td class="time">{{item.tb_EndTime}}</td>
          <td>{{item.tb_Remark?item.tb_Remark:'暂无备注'}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;"  @click="dialogUpdateFormVisible(item.tb_UserID)"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;" @click="updatePasswordBusiness(item.tb_UserID)"><i class="icon-pencil7"></i> 密码修改</a></li>
                  <li><a href="javascript:;" @click="dialogDeleteFormVisible(item.tb_UserID)"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--商户添加-->
    <el-dialog title="商户添加" :visible.sync="dialogAddFormVisible">
      <el-form :model="BusinessUser">
        <el-form-item label="商家编号" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_UserID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="BusinessUser.tb_Password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码确认" :label-width="formLabelWidth">
          <el-input type="password" v-model="BusinessUser.tb_confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家身份证号码" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_CertNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Phone" auto-complete="off"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">选择商家到期日期</span>
          <el-date-picker
            v-model="BusinessUser.dateVal"
            type="date"
            placeholder="商家到期日期"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </div>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="BusinessUser.tb_Remark" auto-complete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :plain="true">提交</el-button>
      </div>
    </el-dialog>
    <!--商户修改-->
    <el-dialog title="商户修改" :visible.sync="dialogUpdateForm">
      <el-form :model="updateBusinessUser">
        <el-form-item label="商家编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_UserID" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家身份证号码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_CertNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateBusinessUser.tb_Phone" auto-complete="off"></el-input>
        </el-form-item>
        <div class="block" >
          <span class="demonstration">选择商家到期日期</span>
          <el-date-picker
            v-model="updateBusinessUser.tb_EndTime"
            type="date"
            placeholder="商家到期日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <el-form-item label="备注" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="updateBusinessUser.tb_Remark" auto-complete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateForm = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit" :plain="true">提交</el-button>
      </div>
    </el-dialog>
    <!--密码修改-->
    <el-dialog title="修改密码" :visible.sync="dialogFormUpdatePassword">
      <el-form :model="formPassword">
        <el-form-item label="商家编号" :label-width="formLabelWidth">
          <el-input v-model="formPassword.userCode" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="formPassword.oldPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="formPassword.newPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdatePassword = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdatePassword">确 定</el-button>
      </div>
    </el-dialog>
    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  //景区商户信息
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  import dateFormat from '../assets/js/dateFormat'
  import {IdentityCodeValid} from '../assets/js/date'//身份证验证
  import {checkPhone} from '../assets/js/date'//电话号码验证
  import {getObj} from '../assets/js/date'//电话号码验证
  import {POST} from '../assets/js/universal'

  export default{
    name: '',
    data(){
      return {
        isOff:true,
        total:0,
        currentPage1:1,
        initUser:'',//初始化搜索
        dialogAddFormVisible:false,//初始化景区用户添加
        BusinessUser:{
          tb_UserID:'',
          tb_Name:'',
          tb_Password:'',
          tb_CertNo:'',
          tb_Phone:'',
          tb_Remark:'',
          dateVal:'',
          tb_confirmPassword:''
        },
        formPassword:{
          userCode:'',
          oldPassword:'',
          newPassword:''
        },
        dialogUpdateForm:false,
        dialogFormUpdatePassword:false,
        formLabelWidth:'120px'
      }
    },
    computed:mapGetters([
       'scenicUsersKeyWord',
       'updateBusinessUser'
    ]),
    methods:{
      handleCurrentChange(num){
        this.initData(num);
      },
      //添加
      dialogAddFormVisibleUser(){
        this.$store.commit('setTranstionFalse')
        this.dialogAddFormVisible = true;

      },
      initData(num,name){
        var GetSceneryList = {
          loginUserID:'huileyou',
          loginUserPass:123,
          userID:'',
          name:name?name:'',
          isDelete:0,
          createFrom:'',
          createTo:'',
          page:num,
          rows:5,
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetSceneryList',{
          paramJson: JSON.stringify(GetSceneryList)
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data = data.data;
            this.total = Number(data.total);
            if(data.backCode ==200){
              this.$store.commit('initAgencies',data.touristBussinessList)
              this.$store.commit('initAgenciesKeyWord',data.touristBussinessList)
            }
          })
      },
      //筛选
      search(){
        this.initData(1,this.initUser.trim())
      },
      //初始化修改数据
      dialogUpdateFormVisible(id){
        this.$store.commit('setTranstionFalse')
        this.dialogUpdateForm = true;
        this.$store.commit('initUpdateBusiness',id);
      },
      //添加商户提交
      addSubmit(){
        if(this.BusinessUser.tb_CertNo.trim()==''
          ||this.BusinessUser.tb_Phone.trim()==''
          ||this.BusinessUser.tb_UserID.trim()==''
          ||this.BusinessUser.tb_Name.trim()==''
          ||this.BusinessUser.tb_Password.trim()==''
          ||this.BusinessUser.tb_confirmPassword.trim()==''){
          this.$message({
            showClose: true,
            message: '不能输入空',
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }
        if(this.BusinessUser.tb_Password.trim()!==this.BusinessUser.tb_confirmPassword.trim()){
          this.$message({
            showClose: true,
            message: '两次输入密码不一致',
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }

        if(!checkPhone(this.BusinessUser.tb_Phone)){
          this.$message({
            showClose: true,
            message: '电话号码格式不对',
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }

        if(IdentityCodeValid(this.BusinessUser.tb_CertNo).code!=200){
          this.$message({
            showClose: true,
            message: IdentityCodeValid(this.BusinessUser.tb_CertNo).msg,
            type: 'error'
          });
          this.dialogAddFormVisible = false;
          return
        }else{
          var AddTouristBussiness = {
            loginUserID:'huileyou',
            loginUserPass:123,
            tbUserID:this.BusinessUser.tb_UserID,
            tbName:this.BusinessUser.tb_Name,
            tbPassword:this.BusinessUser.tb_Password,
            tbCertNo:this.BusinessUser.tb_CertNo,
            tbPhone:this.BusinessUser.tb_Phone,
            tbEndTime:this.BusinessUser.dateVal,
            tbRemark:this.BusinessUser.tb_Remark,
            tbImageURL:'',
            tbBussinessLicenceURL:''
          }
          this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/AddTouristBussiness',{
            paramJson: JSON.stringify(AddTouristBussiness)
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(data=>{
              var data = data.data;
              publicInit.isBackCode(data,this);
              if(Number(data.backCode)==200){
                this.$message({
                  showClose: true,
                  message: data.backResult,
                  type: 'success'
                });
                this.total = 0;
                this.initData(1)
              }
              this.dialogAddFormVisible = false;
            })
        }
      },
      //修改商户
      updateSubmit(){
        let newObj = getObj(this.updateBusinessUser);
        if(IdentityCodeValid(newObj.tb_CertNo).code!=200){
          this.$message({
            showClose: true,
            message: IdentityCodeValid(newObj.tb_CertNo).msg,
            type: 'error'
          });
          this.dialogUpdateForm = false;
          return
        }
        if(!checkPhone(newObj.tb_Phone)){
          this.$message({
            showClose: true,
            message: '电话号码格式不对',
            type: 'error'
          });
          this.dialogUpdateForm = false;
          return
        }
        var UpdateTouristBussiness = {
          loginUserID:'huileyou',
          loginUserPass:123,
          tbUserID:newObj.tb_UserID,
          tbName:newObj.tb_Name,
          tbCertNo:newObj.tb_CertNo,
          tbPhone:newObj.tb_Phone,
          tbEndTime:newObj.tb_EndTime,
          tbRemark:newObj.tb_Remark,
          tbImageURL:'',
          tbBussinessLicenceURL:'',
          tbCreateTime:''
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateTouristBussiness',{
          paramJson: JSON.stringify(UpdateTouristBussiness)
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data= data.data;
            publicInit.isBackCode(data,this);
            if(Number(data.backCode)==200){
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
            }
            this.dialogUpdateForm = false;
          })
      },
      //删除商户
      dialogDeleteFormVisible(id){
        var DeleteScenery = {
          loginUserID:'huileyou',
          loginUserPass:123,
          tbUserID:id
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteScenery',{
          paramJson: JSON.stringify(DeleteScenery)
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data= data.data;
            publicInit.isBackCode(data,this);
            if(Number(data.backCode)==200){
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
            }
          })
      },
      //密码修改
      updatePasswordBusiness(id){
        this.$store.commit('setTranstionFalse')
        this.dialogFormUpdatePassword = true;
        this.formPassword.userCode = id;
      },
      dialogUpdatePassword(){
        if(this.formPassword.oldPassword.trim()==''||this.formPassword.newPassword.trim()==''){
          this.$message({
            showClose: true,
            message: '密码不能为空',
            type: 'error'
          });
          this.dialogFormUpdatePassword = false;
          return;
        }
        var UpdateSceneryPassword = {
          loginUserID:'huileyou',
          loginUserPass:123,
          tbUserID:this.formPassword.userCode,
          oldPassword:this.formPassword.oldPassword,
          newPassword:this.formPassword.newPassword
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateSceneryPassword',{
          paramJson: JSON.stringify(UpdateSceneryPassword)
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data = data.data;
            publicInit.isBackCode(data,this);
            if(Number(data.backCode)==200){
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
            }
            this.dialogFormUpdatePassword = false;
          })
      }
    },
    created(){
    },
    mounted(){
    }
  }
</script>
<style scoped>
  .block{
    margin-bottom: 20px;
  }
</style>
