<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 09:21:00
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-16 16:34:46
-->
<template>
  <div class="moleculeEditPage">
    <div id="container"></div>
    <div>
      <router-link class="goHome"  to="/">
        <i class="el-icon-s-home"></i>
      </router-link>
      <!-- <popWindow 
    :showWindow="saveToMoleculeVis"
             windowTitle="保存分子"
             @forkClick="closeSaveMoleculeWindow">
    <div>
      <div class="">
    <div class="">
      <div id="wangEditor"></div>
    </div>
      </div>
    </div>
    <template #footer>
      <span class="popWindow_footer">
        <el-button size="mini"
                   :round="true"
                   @click="closeSaveMoleculeWindow">取 消</el-button>
        <el-button size="mini"
                   type="primary"
                   round="round"
                   @click="">确 定</el-button>
      </span> 
    </template>
  </popWindow> -->
      <el-drawer title="保存分子" v-model="saveToMoleculeVis" direction="rtl">
        <div class="moleculeCon drawer-inside">
          <span>分子名：</span>
          <el-input
            v-model="moleculeForm.name"
            clearable
            placeholder="请输入分子名"
          ></el-input>
          <span>分子表达式</span>
          <el-input
            v-model="moleculeForm.expression"
            clearable
            placeholder="请输入分子表达式"
            @input="expressionInput"
          ></el-input>
          <span>物态（常温）:</span>
          <el-input
            v-model="moleculeForm.matterState"
            clearable
            placeholder="请输入物态（常温）"
          ></el-input>
          <span>熔点：</span>
          <el-input
            v-model="moleculeForm.meltingPoint"
            clearable
            placeholder="请输入熔点"
          ></el-input>
          <span>密度：</span>
          <el-input
            v-model="moleculeForm.density"
            clearable
            placeholder="请输入密度"
          ></el-input>
          <div v-for="item in valenceList" :key="item.uuid">
            {{ item.en_name }}：<el-input-number
              size="mini"
              v-model="item.valence"
              @change="
                (current, old) => {
                  saveValenceChange(current, old, item);
                }
              "
            ></el-input-number>
          </div>
          <span>水溶性：</span>
             <el-input
            v-model="moleculeForm.reactivity"
            clearable
            placeholder="请输入水溶性"></el-input>
          <div>知识点：</div>
          <div id="wangEditor"></div>
          <div class="">
            <el-button type="primary" plain @click="saveMolecule">保存</el-button>
          </div>
        </div>
      </el-drawer>
    </div>

    <div
      class="show_atom_name"
      v-show="nowSelectObj != undefined"
      @clisk="openAtomChangeName"
    >
      {{ nowSelectObj?.atom.en_name }}&nbsp;&nbsp;{{
        nowSelectObj?.valence
      }}&nbsp;&nbsp;&nbsp;{{
        selectAtomPosition.x + "," + selectAtomPosition.y + "," + selectAtomPosition.z
      }}
    </div>
    <!-- <popWindow
      v-if="atomChangeNameVisible"
      windowTitle="原子名输入"
      @forkClick="closeAtomChangeName"
    >
      <div>
        <div class="">
          <el-input
            v-model="atomNameInput"
            clearable
            placeholder="请输入元素符号"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeAtomChangeName"
            >取 消</el-button
          >
          <el-button
            size="mini"
            type="primary"
            round="round"
            @click="changeSelectAtomName"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow> -->
    <!-- <popWindow
      v-if="radiusInputVib"
      windowTitle="原子半径输入"
      @forkClick="closeRadiusInput"
    >
      <div>
        <div class="">
          <el-input
            v-model="radiusInput"
            clearable
            placeholder="请输入原子半径"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeRadiusInput">取 消</el-button>
          <el-button
            size="mini"
            type="primary"
            round="round"
            @click="changeSelectAtomRadius"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow> -->
    <!-- <popWindow
      v-if="atomColorSetVib"
      windowTitle="原子颜色输入"
      @forkClick="closeAtomColorWindow"
    >
      <div>
        <div class="">
          原子颜色设定：
          <el-color-picker
            v-model="atomColorSet"
            color-format="rgb"
            size="mini"
          ></el-color-picker>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeAtomColorWindow"
            >取 消</el-button
          >
          <el-button size="mini" type="primary" round="round" @click="setSelectAtomColor"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow> -->

    <popWindow
      v-if="valenceInputVis"
      windowTitle="原子化合价输入"
      @forkClick="closeValence"
    >
      <div>
        <div class="">
          化合价： <el-input-number size="mini" v-model="valenceInput"></el-input-number>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeValence">取 消</el-button>
          <el-button
            size="mini"
            type="primary"
            round="round"
            @click="setSelectAtomValence"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow>

    <!-- <popWindow v-if="addAtomFormVib" windowTitle="添加原子" @forkClick="closeAtomWindow">
      <div>
        <div class="">
          元素名输入：
          <el-input
            v-model="addAtomForm.atomName"
            clearable
            placeholder="请输入原子名称"
          ></el-input>
          原子半径输入：
          <el-input
            v-model="addAtomForm.radius"
            clearable
            placeholder="请输入原子半径"
          ></el-input>
          元素颜色选择：

          <el-color-picker
            v-model="addAtomForm.color"
            color-format="rgb"
            size="mini"
          ></el-color-picker>
          <div></div>
          化合价：  <el-input-number  size="mini" v-model="addAtomForm.valence" ></el-input-number>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeAtomWindow">取 消</el-button>
          <el-button size="mini" type="primary" round="round" @click="addPoint"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow> -->
    <popWindow
      v-if="atomPositionWindow"
      windowTitle="坐标输入"
      @forkClick="closeAtomPositionWindow"
    >
      <div>
        <div class="">
          X:
          <el-input v-model="selectAtomPosition.x" placeholder="请输入x轴坐标"></el-input>

          Y:
          <el-input v-model="selectAtomPosition.y" placeholder="请输入y轴坐标"></el-input>
          Z:
          <el-input v-model="selectAtomPosition.z" placeholder="请输入z轴坐标"></el-input>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeAtomPositionWindow"
            >取 消</el-button
          >
          <el-button
            size="mini"
            type="primary"
            round="round"
            @click="changeSelectAtomPosition"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow>
    <popWindow
      v-if="showAtomChooseWindow"
      windowTitle="原子选择"
      @forkClick="closeAtomChooseWindow"
    >
      <div>
        原子选择：<el-select v-model="chooseAtomEnName" placeholder="请选择要添加的原子">
          <el-option
            v-for="item in atomArray"
            :key="item.ch_name"
            :label="item.ch_name"
            :value="item.en_name"
          >
          </el-option>
        </el-select>
     <el-divider></el-divider>
        <div>
          化合价： <el-input-number size="mini" v-model="valenceInput"></el-input-number>
        </div>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini" :round="true" @click="closeAtomChooseWindow"
            >取 消</el-button
          >
          <el-button size="mini" type="primary" round="round" @click="affirmChooseAtom"
            >确 定</el-button
          >
        </span>
      </template>
    </popWindow>
  </div>
</template>
<script lang="js">
import { defineComponent ,onMounted} from "vue";
import {initMoleculeEditScene} from './Composition/moleculeEidt.js'
import popWindow from '/@/components/popUpwindow/index.vue'
export default defineComponent({
  components:{
    popWindow
  },
  name: "",
  setup() {
   const initMoleculeMod= initMoleculeEditScene();
  return {
    ...initMoleculeMod
  }
  },
});
</script>
<style scoped lang="scss">
@import "./MoleculePage.scss";
</style>
