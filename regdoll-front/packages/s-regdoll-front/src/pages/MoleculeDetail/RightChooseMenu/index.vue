<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 17:11:25
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 08:34:30
-->
<template>
  <div class="choose_menu">
    <el-card class="choose_menu_container">
      <template #header>
        <div class="container_header">
          <span>
            <span class="atom_ch_name">{{ selectObj?.moleculeModuleData?.name }}</span>
          </span>
          <!-- <span class="atom_en_name">{{ selectObj?.moleculeModuleData?.en_name }}</span> -->
        </div>
      </template>
      <div class="container_body">
        <div class="describe_body">
          <div class="atom_ele_number" v-show="selectObj?.moleculeModuleData?.expression">
            分子表达式：{{ selectObj?.moleculeModuleData?.expression }}
          </div>
          <div class="atom_quality" v-show="selectObj?.moleculeModuleData?.matterState">
            物态（常温）：{{ selectObj?.moleculeModuleData?.matterState }}
          </div>
          <div class="" v-show="selectObj?.moleculeModuleData?.meltingPoint">
            熔点：{{ selectObj?.moleculeModuleData?.meltingPoint }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.density">
            密度：{{ selectObj?.moleculeModuleData?.density }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.meltingPoint">
            熔点：{{ selectObj?.moleculeModuleData?.meltingPoint }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.reactivity">
            水溶性：{{ selectObj?.moleculeModuleData?.reactivity }}
          </div>
        </div>
        <div class="into_nucleus">
          <el-button class="展开" @click="openMoleculeWindow">详情展开</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      :title="selectObj?.moleculeModuleData?.name"
      v-model="moleculeWindowVis"
      width="50%"
      center
    >
      <div class="showMoleculeBody">
        <div class="molecule-rough">
          <div id="smallAtom"></div>
          <div v-show="selectObj?.moleculeModuleData?.expression">
            分子表达式：{{ selectObj?.moleculeModuleData?.expression }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.matterState">
            物态（常温）：{{ selectObj?.moleculeModuleData?.matterState }}
          </div>
          <div class="" v-show="selectObj?.moleculeModuleData?.meltingPoint">
            熔点：{{ selectObj?.moleculeModuleData?.meltingPoint }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.density">
            密度：{{ selectObj?.moleculeModuleData?.density }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.meltingPoint">
            熔点：{{ selectObj?.moleculeModuleData?.meltingPoint }}
          </div>
          <div v-show="selectObj?.moleculeModuleData?.reactivity">
            水溶性：{{ selectObj?.moleculeModuleData?.reactivity }}
          </div>
          <div>组成原子：</div>
          <div class="atom_datas" v-show="selectObj?.moleculeModuleData?.atomDatas">
            <div
              v-for="(item, i) in selectObj?.moleculeModuleData?.atomDatas"
              :key="item.en_name"
              class="atom_data"
            >
              <div class="atom_name" @click="atomNameClick(item)"  title="展现原子">{{ item.en_name }}：</div>
              <div class="atom_valence">
                {{ item.valence > 0 ? "+" + item.valence : item.valence }}
              </div>
            </div>
            <div></div>
          </div>
          <div class="molecule_knowledgePoint">
            知识点 ：
            <div v-html="knowledgePoint"></div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer"> </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { chooseMoleculeModule } from "./ChooseMoleculeModule";

import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "",
  setup() {
    const store = useStore(),
      router = useRouter();
    return {
      ...chooseMoleculeModule(store, router),
    };
  },
});
</script>
<style scoped lang="scss">
@import "./RightChooseMenu.scss";
</style>
