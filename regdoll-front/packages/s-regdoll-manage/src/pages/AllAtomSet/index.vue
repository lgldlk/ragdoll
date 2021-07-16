<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-14 20:49:52
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-15 09:12:18
-->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 所有原子管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div>
        <el-button type="primary" icon="el-icon-refresh-left" @click="fresh()"
          >刷新</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="addAtom()">新增</el-button>
      </div>
      <el-table
        :data="allAtomData"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="en_name"
          label="元素符号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="ch_name" label="中文名" width="60"></el-table-column>
        <el-table-column prop="quality" label="原子质量"></el-table-column>
        <el-table-column prop="ele_number" label="电子数" width="60"></el-table-column>

        <el-table-column prop="color" label="原子颜色"></el-table-column
        ><el-table-column prop="radius" label="半径" width="60"></el-table-column
        ><el-table-column prop="finder" label="发现者">
          <template #default="scope">
            {{ scope.row.finder.substr(0, 10) + "......" }}
          </template></el-table-column
        ><el-table-column prop="meltingPoint" label="熔点"></el-table-column
        ><el-table-column prop="density" label="密度"></el-table-column
        ><el-table-column prop="valence" label="化合价"></el-table-column>
        <el-table-column prop="location" label="位置"></el-table-column>
        <el-table-column prop="matterState" label="物态（常温）"></el-table-column>
        <el-table-column prop="IonicCharge" label="离子电荷量"></el-table-column>
        <el-table-column prop="notice" label="知识点">
          <template #default="scope">
            {{ scope.row.notice.substr(0, 15) + "......" }}
          </template>
        </el-table-column>

        <!-- <el-table-column prop="time" label="时间"></el-table-column> -->
        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="atomEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="text_red"
              @click="atomDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer :title="setType?'原子添加':'原子修改'" v-model="showSetAtomDrawer" direction="rtl">
      <div class="drawer-inside">
        <span>元素符号：</span>
        <el-input
          v-model="nowAtomForm.en_name"
          clearable
          placeholder="元素符号"
        ></el-input>
        <span>元素中文名：</span>
        <el-input
          v-model="nowAtomForm.ch_name"
          clearable
          placeholder="元素中文名"
        ></el-input>
        <div>
          <span>原子质量：</span>
          <el-input-number
            :precision="inputNumberPrecision"
            v-model="nowAtomForm.quality"
          ></el-input-number>
        </div>
        <div>
        <span>原子电子数：</span>
        <el-input-number
          v-model="nowAtomForm.ele_number"
        ></el-input-number>
        </div>
        <span>原子颜色：</span>
        <el-color-picker
          v-model="nowAtomForm.color"
          color-format="rgb"
          size="mini"
        ></el-color-picker>
        <div>
          <span>原子半径：</span>
          <el-input-number
            :precision="inputNumberPrecision"
            v-model="nowAtomForm.radius"
            size="mini"

          ></el-input-number>
        </div>
        <span>发现者：</span>
        <el-input v-model="nowAtomForm.finder" clearable placeholder="发现者"></el-input>
        <span>熔点：</span>
        <el-input
          v-model="nowAtomForm.meltingPoint"
          clearable
          placeholder="熔点"
        ></el-input>
        <span>密度：</span>
        <el-input v-model="nowAtomForm.density" clearable placeholder="密度"></el-input>
        <span>化合价：</span>
        <el-input v-model="nowAtomForm.valence" clearable placeholder="化合价"></el-input>
        <span>位置：</span>
        <el-input v-model="nowAtomForm.location" clearable placeholder="位置"></el-input>
        <span>物态（常温）：</span>
        <el-input
          v-model="nowAtomForm.matterState"
          clearable
          placeholder="物态（常温）"
        ></el-input>
        <span>离子电荷量：</span>
        <el-input
          v-model="nowAtomForm.IonicCharge"
          clearable
          placeholder="离子电荷量"
        ></el-input>
        <span>知识点：</span>
        <el-input  type="textarea"  v-model="nowAtomForm.notice" clearable placeholder="知识点"></el-input>
        <div>
          <el-button type="primary" plain @click="submitAtom">提交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { allAtoms } from "./AtomComposition";
export default defineComponent({
  name: "",
  setup() {
    return {
      ...allAtoms(),
    };
  },
});
</script>
<style scoped></style>
