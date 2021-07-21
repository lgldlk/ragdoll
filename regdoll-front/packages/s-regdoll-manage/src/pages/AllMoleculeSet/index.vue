<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-15 14:45:08
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 20:35:54
-->
<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-lx-cascades"></i> 所有原子管理
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="container">
    <div>
      <el-button type="primary"
                 icon="el-icon-refresh-left"
                 @click="refresh()">刷新</el-button>

    </div>
    <el-table :data="allMolecule"
              border
              class="table"
              header-cell-class-name="table-header">
      <el-table-column prop="name"
                       label="分子名"
                       align="center"></el-table-column>
      <el-table-column prop="expression"
                       label="分子表达式"></el-table-column>
      <el-table-column prop="matterState"
                       label="物态（常温）"></el-table-column>
      <el-table-column prop="meltingPoint"
                       label="熔点"
                       width="60"></el-table-column>

      <el-table-column prop="density"
                       label="密度"></el-table-column>
      <el-table-column prop="reactivity"
                       label="水溶性"
                       width="60"></el-table-column>

      <!-- <el-table-column prop="time" label="时间"></el-table-column> -->
      <el-table-column label="操作"
                       width="140"
                       align="center">
        <template #default="scope">
          <el-button type="text"
                     icon="el-icon-edit"
                     @click="moleculeEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     icon="el-icon-delete"
                     class="text_red"
                     @click="moleculeDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-drawer title="保存分子"
             v-model="saveToMoleculeVis"
             direction="rtl">
    <div class="moleculeCon drawer-inside">
      <span>分子名：</span>
      <el-input v-model="moleculeForm.name"
                clearable
                placeholder="请输入分子名"></el-input>
      <span>分子表达式</span>
      <el-input v-model="moleculeForm.expression"
                clearable
                placeholder="请输入分子表达式"
                @input="expressionInput"></el-input>
      <span>物态（常温）:</span>
      <el-input v-model="moleculeForm.matterState"
                clearable
                placeholder="请输入物态（常温）"></el-input>
      <span>熔点：</span>
      <el-input v-model="moleculeForm.meltingPoint"
                clearable
                placeholder="请输入熔点"></el-input>
      <span>密度：</span>
      <el-input v-model="moleculeForm.density"
                clearable
                placeholder="请输入密度"></el-input>
      <div v-for="item in valenceList"
           :key="item.id">
        {{ item.en_name }}：
        <el-input-number size="mini"
                         v-model="item.valence"
                         @change="
                (current, old) => {
                  saveValenceChange(current, old, item);
                }
              "></el-input-number>
      </div>
      <span>水溶性：</span>
      <el-input v-model="moleculeForm.reactivity"
                clearable
                placeholder="请输入水溶性"></el-input>
      <div>知识点：</div>
      <div id="wangEditor"></div>
      <div class="">
        <el-button type="primary"
                   plain
                   @click="updateMolecule">保存</el-button>

        <el-button type="primary"
                   plain
                   @click="gotoEditTheMolecule">保存并编辑位置</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import { moleculeComposition } from "./MoleculeComposition";
export default defineComponent({
  name: "",
  setup() {
    return {
      ...moleculeComposition(),
    };
  },
});
</script>
<style scoped>
</style>