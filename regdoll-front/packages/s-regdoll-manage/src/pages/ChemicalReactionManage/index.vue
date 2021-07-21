<!--
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-20 15:16:52
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 21:32:58
-->
<template>
  <div class="chemicalReactionPage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-chicken"></i> 所有化学方程式管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button type="primary"
                 icon="el-icon-refresh-left"
                 @click="refresh()">刷新</el-button>
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addChemical">添加</el-button>

      <div>

        <el-table :data="chemicalArray"
                  border
                  class="table"
                  header-cell-class-name="table-header">
          <el-table-column label="反应式"
                           align="center">
            <template #default="scope">
              {{scope.row.leftExpression.join("+")+" = "+ scope.row.rightExpression.join("+")}}
            </template>
          </el-table-column>
          <el-table-column prop="reactionCondition"
                           label="反应条件"></el-table-column>
          <el-table-column prop="reactionType"
                           label="反应类型"></el-table-column>

          <el-table-column label="操作"
                           width="140"
                           align="center">
            <template #default="scope">
              <el-button type="text"
                         icon="el-icon-edit"
                         @click="chemicalEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text"
                         icon="el-icon-delete"
                         class="text_red"
                         @click="chemicalDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <el-dialog title="增加化学表达式"
                 v-model="addChemicalReactionWindowVis"
                 width="60%">
        <div class="chemicalAddWindow">
          <div class="chemicalAllBox">
            <div class="leftChemical">
              <div v-for="(item,i) in leftChemical "
                   class="aChemical">
                <span class=" chemical_expression">{{item.expression}}</span>
                <span class="remove_chemical"
                      title="去除"
                      @click="leftChemicalRemove(i)">-</span>
              </div>
              <el-button @click=" leftChemicalAdd"
                         class="addButton">+</el-button>
            </div>
            <div class="cetnerEqual">
              <el-input placeholder="反应条件"
                        v-model="chemicalForm.reactionCondition"
                        clearable></el-input>
              <div class="equalSign"> =</div>
            </div>
            <div class="rightChemical">
              <div v-for="(item,i) in rightChemical "
                   class="aChemical">
                <span class=" chemical_expression">{{item.expression}}</span>
                <span class="remove_chemical"
                      title="去除"
                      @click="rightChemicalRemove(i)">-</span>
              </div>
              <el-button @click=" rightChemicalAdd">+</el-button>
            </div>
          </div>
          <div>反应类型:
            <el-input v-model="chemicalForm.reactionType"></el-input>
          </div>
          <div>
            反应内容：

            <div id="reactionContent"></div>
          </div>
          <div>反应现象：
            <div id="reactionPhenomena"></div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeAddChemicalReactionWindow">取 消</el-button>
            <el-button type="primary"
                       @click=" upChemical">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <popWindow windowTitle="分子选择"
               v-if="chooseMoleculeWindowVis"
               @forkClick="closeChooseMoleculeWindow">
      <div>
        <el-select v-model="chooseMoleculeId"
                   placeholder="请选择要添加的分子">
          <el-option v-for="item in allMolecule"
                     :key="item.id"
                     :label="item.expression"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="popWindow_footer">
          <el-button size="mini"
                     :round="true"
                     @click="closeChooseMoleculeWindow">取 消</el-button>
          <el-button size="mini"
                     type="primary"
                     round="round"
                     @click="affirmMoleculeChoose">确 定</el-button>
        </span>
      </template>
    </popWindow>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import popWindow from "/@/components/popUpWindow/index.vue";
import { chemicalReactionManageModule } from "./ChemicalReactionManage";
export default defineComponent({
  name: "",
  components: {
    popWindow,
  },
  setup() {
    return {
      ...chemicalReactionManageModule(),
    };
  },
});
</script>
<style scoped lang="scss">
@import "./ChemicalReactionManage.scss";
</style>