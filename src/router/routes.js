/**
 * Created by leibo on 17/11/6.
 */
//登录
import Login from '@/components/Login'
import Home from '@/components/Home'
import AgenciesUsers from '@/components/AgenciesUsers' //景区商户信息
import Management from '@/components/Management' //旅行社管理
import TravelAgencyProducts from '@/components/TravelAgencyProducts' //旅行社产品信息
import TravelAgencyOrder from '@/components/TravelAgencyOrder' //旅行社产品信息

export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/home',
    name:'Home',
    components:{
      default:Home
    },
    children:[
      {
        path: 'agencies',
        components: {
          default: Home,
          User: AgenciesUsers
          },
        name:'getUser'
      },
      {
        path: 'management',
        components: {
          default: Home,
          User: Management
        },
        name:'Management'
      },
      {
        path: 'travelAgencyProducts',
        components: {
          default: Home,
          User: TravelAgencyProducts
        },
        name:'travelAgencyProducts'
      },
      {
        path: 'travelAgencyOrder',
        components: {
          default: Home,
          User: TravelAgencyOrder
        },
        name:'travelAgencyOrder'
      }
    ],
  },
  { path: '*', redirect: { name: 'Login' }}
]
