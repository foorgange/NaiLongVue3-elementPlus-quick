<script setup>
import Dragon from './assets/icons/Dragon.vue'
import { List } from '@element-plus/icons-vue'
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical"
      >
        <el-menu-item index="/dragons">
          <el-icon><Dragon /></el-icon>
          <span>奶龙管理</span>
        </el-menu-item>
        <el-menu-item index="/dragon-types">
          <el-icon><List /></el-icon>
          <span>奶龙类型管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style>
.el-container {
  height: 100vh;
  background-image: url('./assets/abc/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.el-aside {
  background-color: rgba(48, 65, 86, 0.8);
}

.el-menu {
  border-right: none;
}

.el-menu-vertical {
  height: 100%;
}

.el-main {
  background-color: rgba(240, 242, 245, 0.8);
  padding: 0;
}
</style>
