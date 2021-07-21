<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-14 20:14:36
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 15:21:50
-->
<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             unique-opened
             router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index"
                      :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs"
                          :index="subItem.index"
                          :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs"
                              :key="i"
                              :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else
                            :index="subItem.index"
                            :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index"
                        :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>

          </el-menu-item>
        </template>
      </template>
    </el-menu>

  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "",
  setup() {
    const items = [
        {
          icon: "el-icon-s-home",
          index: "baseHome",
          title: "系统首页",
        },
        {
          icon: "el-icon-data-line",
          index: "manageswiper",
          title: "管理走马灯",
        },
        {
          icon: "el-icon-ice-cream-round",
          index: "allAtomSet",
          title: "管理所有原子",
        },
        {
          icon: "el-icon-cherry",
          index: "4",
          title: "分子管理",
          subs: [
            {
              index: "../moleculeEditPage",
              title: "分子添加",
            },
            {
              index: "allMoleculeSet",
              title: "所有分子",
            },
          ],
        },
        {
          icon: "el-icon-chicken",
          index: "chemicalReactionManage",
          title: "化学方程式管理",
        },
        {
          icon: "el-icon-camera",
          index: "2",
          title: "新闻中心",
          subs: [
            {
              index: "addnew",
              title: "添加新闻",
            },
            {
              index: "managenew",
              title: "管理新闻",
            },
          ],
        },
        {
          icon: "el-icon-folder-opened",
          index: "hvintro",
          title: "项目介绍管理",
        },
        {
          icon: "el-icon-bell",
          index: "hvmessage",
          title: "疑问咨询",
        },
        {
          icon: "el-icon-chat-round",
          index: "hvallfaq",
          title: "常见问题管理",
        },
      ],
      route = useRoute(),
      onRoutes = computed(() => {
        return route.path.replace("/", "");
      });
    return {
      items,
      onRoutes,
    };
  },
});
</script>
<style scoped lang="scss">
@import "./SideBar.scss";
</style>
