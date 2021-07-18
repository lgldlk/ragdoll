/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-15 17:45:22
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-16 16:44:32
 */



import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue'
import { MoleculeRequest } from '/@/api/MoleculeRequest'
import E from 'wangeditor'

let knowledgePointEditor: E;
const allMolecule = ref<any>([]),
  refresh = async () => {
    allMolecule.value = (await MoleculeRequest.allMolecule()).data;
  },
  showMoleculeSet = () => {
    saveToMoleculeVis.value = true;
    initSaveToMoleculeFrom();
    if (!knowledgePointEditor) {
      setTimeout(() => {
        knowledgePointEditor = new E('#wangEditor')
        knowledgePointEditor.config.uploadImgShowBase64 = true
        knowledgePointEditor.config.height = 600
        knowledgePointEditor.config.onchange = function () {
          moleculeForm.value.knowledgePoint = knowledgePointEditor.txt.html() || ""
        }
        knowledgePointEditor.create()
        knowledgePointEditor.txt.html(moleculeForm.value.knowledgePoint)
      }, 500)
    } else {
      knowledgePointEditor.txt.html(moleculeForm.value.knowledgePoint)
    }
  },
  moleculeEdit = (index: number, data: any) => {
    moleculeForm.value = allMolecule.value[index];
    showMoleculeSet()
  }, moleculeDelete = (index: number, data: any) => {
    ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      MoleculeRequest.deleteMolecule(data.id).then(val => {
        if (val.code == "200") {
          ElMessage({
            type: "success",
            message: val.message
          })
        }
        refresh()
      }).catch((err: { message: any; }) => {
        ElMessage({
          type: "error",
          message: err.message
        })
      })
    })

  },
  saveToMoleculeVis = ref(false),
  moleculeForm = ref<any>({
    name: '', //分子名
    expression: '', //分子表达式
    knowledgePoint: '', //知识点
    matterState: '', //物态（常温）
    meltingPoint: '', //熔点
    density: '', //密度
    reactivity: '' //水溶性
  }),
  valenceList = ref<any>([]),

  numberSubscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
  expressionInput = (value: string) => {
    let matchRes;
    while ((matchRes = value.match(/[\d]/))) {
      value = value.replace(matchRes[0], numberSubscript[parseInt(matchRes[0])]);
    }
    moleculeForm.value.expression = value;
  },
  updateMolecule = async () => {
    let atomDatas = []
    for (let tmpAtom of moleculeForm.value.atomDatas) {
      // tmpAtom

      atomDatas.push({
        id: tmpAtom.id,
        valence: tmpAtom.valence
      })
    }
    moleculeForm.value.atomDatas = atomDatas
    let saveRes = await MoleculeRequest.updateMoleculeValence(moleculeForm.value)
    if (saveRes.code == "200") {
      ElMessage({ type: "success", message: "保存成功" })
      refresh()
    }
    saveToMoleculeVis.value = false;
  }








function initSaveToMoleculeFrom() {
  // inSceneAtoms.value = new Map();
  valenceList.value = [];

  for (let tmpAtom of moleculeForm.value.atomDatas) {
    valenceList.value.push({
      en_name: tmpAtom.en_name,
      valence: tmpAtom.valence,
      id: tmpAtom.id
    })
  }
}
function saveValenceChange(current: any, old: any, item: { id: any; }) {
  for (let tmpAtom of moleculeForm.value.atomDatas) {
    if (tmpAtom.id == item.id) {
      tmpAtom.valence = current
    }
  }
}

import { Router, useRouter } from 'vue-router'
let router: Router;
async function gotoEditTheMolecule() {
  await updateMolecule();
  if (router) {
    router.push(
      {
        path: "moleculeEditPage",
        query: {
          changeMoleculeId: moleculeForm.value.id
        }
      }
    )
  }
}


export function moleculeComposition() {
  refresh()
  router = useRouter();
  return {
    saveValenceChange,
    allMolecule, valenceList, moleculeEdit, moleculeDelete,
    saveToMoleculeVis, moleculeForm,
    updateMolecule, gotoEditTheMolecule,
    expressionInput, refresh
  }
}