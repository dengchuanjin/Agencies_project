<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">旅行社栏目信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>栏目筛选:</span>
        <input type="text" placeholder="栏目名称" v-model="initManagement">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="addManagementUser">添加</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>商家名称</th>
          <th>栏目编码</th>
          <th>栏目名称</th>
          <th>备注</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in managementUserKeyWord">
          <td>{{item.userName}}</td>
          <td>{{item.ii_ID}}</td>
          <td>{{item.ii_ItemName}}</td>
          <td>{{item.ii_Remark}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="updateManagement(item.ii_ID)"><i class="icon-pencil"></i> 修改</a>
                  </li>
                  <li><a href="javascript:;" @click="deleteManagement(item.ii_ID)"><i class="icon-delicious"></i> 删除</a>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--添加旅行社栏目-->
    <el-dialog title="添加栏目" :visible.sync="addManagement">
      <el-form :model="AddManagement">
        <el-form-item label="栏目编码" :label-width="formLabelWidth">
          <el-input v-model="AddManagement.itemCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称" :label-width="formLabelWidth">
          <el-input v-model="AddManagement.itemName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家名称" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入商家"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="AddManagement.itemRemark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagement = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddManagement">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改旅行社栏目-->
    <el-dialog title="修改旅行社栏目" :visible.sync="updateManagementVal">
      <el-form :model="initUpdateManagement">
        <el-form-item label="栏目编码" :label-width="formLabelWidth">
          <el-input v-model="initUpdateManagement.ii_ID" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称" :label-width="formLabelWidth">
          <el-input v-model="initUpdateManagement.ii_ItemName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家名称" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="userName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入商家"
            @select="updateSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="initUpdateManagement.ii_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateManagementVal = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdateManagement">确 定</el-button>
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
  //旅行社包含栏目
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  import {JudgeInput} from '../assets/js/universal'
  import {POST} from '../assets/js/universal'

  export default {
    name: '',
    data() {
      return {
        restaurants: [],
        timeout: null,
        userName: "",
        updateName: '',
        total: 0,
        currentPage1: 1,
        initManagement: '',//初始化搜索
        addManagement: false,
        updateManagementVal: false,
        AddManagement: {
          itemCode: '',
          TouristBussinessID: '',
          itemName: '',
          itemRemark: ''
        },
        formLabelWidth: '120px'
      }
    },
    computed: mapGetters([
      'managementUserKeyWord',
      'scenicUsersKeyWord',
      'initUpdateManagement'
    ]),
    methods: {
      loadAll(num, name) {
        var _this = this;
        var GetSceneryList = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          userID: '',
          name: name ? name : '',
          isDelete: 0,
          createFrom: '',
          createTo: '',
          page: num,
          rows: 5
        }
        return new Promise( (relove, reject)=> {
          this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/GetSceneryList', {
            paramJson: JSON.stringify(GetSceneryList)
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(data => {
              var data = data.data;
              _this.total = Number(data.total);
              if (Number(data.backCode) == 200) {
                relove(data)
              }
            })
        })
      },
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          data.touristBussinessList = data.touristBussinessList.map(item => {
            return {
              id: item.tb_UserID,
              value: item.tb_Name
            }
          })
          this.restaurants = data.touristBussinessList;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })

      },
      handleSelect(item) {
        this.userName = item.value;
        this.AddManagement.TouristBussinessID = item.id;
      },
      updateSelect(item) {
        this.userName = item.value;
        this.initUpdateManagement.ii_ItemName = item.value;
      },
      handleCurrentChange(num) {
        this.initData(num);
      },
      //筛选
      search() {
        this.initData(1, this.initManagement.trim());
      },
      //添加
      addManagementUser() {
        this.addManagement = true;
        this.$store.commit('setTranstionFalse')
      },
      //添加提交
      dialogAddManagement() {
        //判断是否为空
        JudgeInput(this, {
          itemCode: this.AddManagement.itemCode,
          TouristBussinessID: this.AddManagement.TouristBussinessID,
          itemName: this.AddManagement.itemName,
        }, 'addManagement');
        var AddAgentItem = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          itemCode: this.AddManagement.itemCode,
          TouristBussinessID: this.AddManagement.TouristBussinessID,
          itemName: this.AddManagement.itemName,
          itemRemark: this.AddManagement.itemRemark
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/AddAgentItem', {
          paramJson: JSON.stringify(AddAgentItem)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            publicInit.isBackCode(data, this)
            if (Number(data.backCode) == 200) {
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
            }
            this.addManagement = false;
          })
      },
      //删除栏目
      deleteManagement(id) {
        var DeleteAgentItem = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          itemCode: id
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/DeleteAgentItem', {
          paramJson: JSON.stringify(DeleteAgentItem)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            publicInit.isBackCode(data, this)
            if (Number(data.backCode) == 200) {
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
      //初始化修改栏目
      updateManagement(id) {
        this.$store.commit('setTranstionFalse')
        this.updateManagementVal = true;
        this.$store.commit('initDialogManagement', id)
      },
      //修改栏目提交
      dialogUpdateManagement() {
        var UpdateAgentItem = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          itemCode: this.initUpdateManagement.ii_ID,
          itemName: this.initUpdateManagement.ii_ItemName,
          itemRemark: this.initUpdateManagement.ii_Remark
        }
        this.$http.post('http://114.55.248.116:1111/TravelAgentService.asmx/UpdateAgentItem', {
          paramJson: JSON.stringify(UpdateAgentItem)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            publicInit.isBackCode(data, this);
            if (Number(data.backCode) == 200) {
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.total = 0;
              this.initData(1)
            }
            this.updateManagementVal = false;
          })
      },
      initData(num, name) {
        var GetAgentItemList = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          iD: '',
          itemName: name ? name : '',
          userName: '',
          isDelete: 0,
          page: num,
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
            this.total = Number(data.total);
            if (Number(data.backCode) == 200) {
              this.$store.commit('initManagement', data.itemInfoList)
            }
          })
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>

</style>
