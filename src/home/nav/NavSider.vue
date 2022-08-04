<!--
 * @Author: LaMando
 * @LastEditors: LaMando
 * @Description: 左侧菜单
 * @Date: 202=2/02/26 11:11:11
 * @LastEditTime:
 -->

<template>
  <div class="containerClass">
    <section class="nav-wrap">
      <div>
        <el-menu class="menu-box" :default-active="activeIndex">
          <template v-for="(item) in menu">
            <el-submenu v-if="item.children && item.children.length" :key="item.name" :index="item.name">
              <template>
                <span slot="title" class="first-title">{{ item.title }}</span>
              </template>
              <el-menu-item v-for="(ele) in item.children" :key="ele.name" :index="ele.name" class="second-menu"
                @click="goto(ele)">
                <template>
                  <span>{{ ele.title }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="item.name" :index="item.name" @click="goto(item)">
              <template>
                <!-- <i :class="`iconfont ${item.icon}`"></i> -->
                <span class="first-title">{{ item.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </section>
  </div>
</template>

<script>
import { getRandomUuid } from '@/util/tool'
export default {
  name: 'sGrail',
  components: {},
  data () {
    return {
      isCollapse: true,
      activeIndex: '',
      administrator: [
        {
          id: 1,
          title: '客户端',
          icon: 'icon-my-home',
          name: 'menu_client',
          children: [
            {
              id: 11,
              title: '人才录入',
              path: '/client/customerEntry',
              name: 'menu_customerEntry',
              children: []
            },
            {
              id: 12,
              title: '保护期',
              path: '/client/protectPeriod',
              name: 'menu_protectPeriod',
              children: []
            },
            {
              id: 13,
              title: '证书库',
              path: '/client/SignedContract',
              name: 'menu_signedContract',
              children: []
            },
            {
              id: 14,
              title: '合作中的人才',
              path: '/client/cooperativeTalents',
              name: 'menu_cooperativeTalents',
              children: []
            },
            {
              id: 15,
              title: '合作中的企业',
              path: '/client/jointVenture',
              name: 'menu_jointVenture',
              children: []
            }
          ]
        },
        {
          id: 2,
          title: '业绩榜',
          path: '/performance/performanceList',
          name: 'menu_performanceList',
          children: []
        },
        {
          id: 3,
          title: '审核单',
          icon: 'icon-my-home',
          path: '/checklist',
          name: 'menu_checklist',
          children: []
        },
        {
          id: 4,
          title: '公海',
          icon: 'icon-my-home',
          path: '/highSeas',
          name: 'menu_highSeas',
          children: []
        },
        {
          id: 5,
          title: '人员管理',
          icon: 'icon-my-home',
          path: '/personnelManagement',
          name: 'menu_personnelManagement',
          children: []
        }
      ],
      ordinary: [
        {
          id: 1,
          title: '客户端',
          icon: 'icon-my-home',
          name: 'menu_client',
          children: [
            {
              id: 11,
              title: '人才录入',
              path: '/client/customerEntry',
              name: 'menu_customerEntry',
              children: []
            },
            {
              id: 12,
              title: '保护期',
              path: '/client/protectPeriod',
              name: 'menu_protectPeriod',
              children: []
            },
            {
              id: 13,
              title: '证书库',
              path: '/client/SignedContract',
              name: 'menu_signedContract',
              children: []
            },
            {
              id: 14,
              title: '合作中的人才',
              path: '/client/cooperativeTalents',
              name: 'menu_cooperativeTalents',
              children: []
            },
            {
              id: 15,
              title: '合作中的企业',
              path: '/client/jointVenture',
              name: 'menu_jointVenture',
              children: []
            }
          ]
        },
        {
          id: 2,
          title: '业绩榜',
          path: '/performance/performanceList',
          name: 'menu_performanceList',
          children: []
        },
        {
          id: 4,
          title: '公海',
          icon: 'icon-my-home',
          path: '/highSeas',
          name: 'menu_highSeas',
          children: []
        }
      ],
      menu: []
    }
  },
  created () {
    if (localStorage.getItem('admin') === 'true') {
      this.menu = this.administrator
    } else {
      this.menu = this.ordinary
    }
    this.activeIndex = this.$router.currentRoute.name // 刷新页面时选中当前路由菜单
    // 测试随机字符串
    let str = getRandomUuid()
    console.log(str)
  },
  beforeMount () { },
  watch: {
    $route: function (route) { // 从路由拿到当前选中菜单
      this.activeIndex = route.name
    }
  },
  computed: {},
  methods: {
    judge (val) {
      this.$router.push(val)
    },
    goto (item) {
      this.activeIndex = item.name
      this.$router.push(item.path)
    },
    client (val) {
      this.$router.push(val)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.nav-wrap {
  height: 100%;
  position: relative;
}
.nav-wrap .user-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto;
}
.nav-wrap .el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
}
.nav-wrap .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
.nav-wrap .el-menu-item-group__title {
  padding: 0 !important;
}
.nav-wrap .el-menu-item-group .el-menu-item {
  color: rgba(0, 0, 0, 0.45);
}
.nav-wrap .is-active .el-submenu__title {
  color: #409eff !important;
  /* background-image: linear-gradient(to right, #6ca9f4 0%, #5371de 100%); */
}
.nav-wrap .first-title {
  font-weight: 600;
}
.collase-menu {
  width: 16px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  color: #b7b6b7;
  border-radius: 25px 0 0 25px;
  background-color: #f2edef;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -100px;
}
.nav-wrap .menu-box .second-menu .el-submenu__icon-arrow {
  display: none;
}
</style>
