import { ElMessage, ElMessageBox } from 'element-plus';
import { MoleculeRequest } from '/@/api/MoleculeRequest';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-20 15:25:50
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 21:25:37
 */

import { inject, ref, onMounted } from 'vue'
import { ChemicalReactionRequest } from '/@/api/ChemicalReactionRequest'
import E from 'wangeditor'
import { CLOSE_LOADING_WINDOW, OPEN_LOADING_WINDOW } from '/@/PROVIDE_KEY';

export function chemicalReactionManageModule() {
  let addType = 0, reactionContentEditor: E, reactionPhenomenaEditor: E//0左边,1右边
  const openLoadingWindow = inject<Function>(OPEN_LOADING_WINDOW),
    closeLoadingWindow = inject<Function>(CLOSE_LOADING_WINDOW)
  const
    allMolecule = ref<any[]>([]),
    initAllMolecule = async () => {
      if (allMolecule.value.length == 0) {
        allMolecule.value = (await MoleculeRequest.moleculeNameAndId()).data

      }
    },
    initReactionEditor = () => {
      if (!reactionContentEditor) {
        setTimeout(() => {
          reactionContentEditor = new E('#reactionContent')
          reactionContentEditor.config.uploadImgShowBase64 = true
          reactionContentEditor.config.height = 600
          reactionContentEditor.config.onchange = function () {
            chemicalForm.value.reactionContent = reactionContentEditor.txt.html() || ""
          }
          reactionContentEditor.create()


          reactionPhenomenaEditor = new E('#reactionPhenomena')
          reactionPhenomenaEditor.config.uploadImgShowBase64 = true
          reactionPhenomenaEditor.config.height = 600
          reactionPhenomenaEditor.config.onchange = function () {
            chemicalForm.value.reactionPhenomena = reactionPhenomenaEditor.txt.html() || ""
          }
          reactionPhenomenaEditor.create()
          // reactionContentEditor.txt.html(moleculeForm.value.knowledgePoint)
        }, 1000)
      }
    },
    refresh = async () => {

      initChemical()
    },
    addChemicalReactionWindowVis = ref(false),
    openAddChemicalReactionWindow = () => {
      addChemicalReactionWindowVis.value = true;
      initReactionEditor()
      chemicalForm.value.id = undefined
    },
    closeAddChemicalReactionWindow = () => {
      addChemicalReactionWindowVis.value = false
    },
    leftChemical = ref<any[]>([]),
    rightChemical = ref<any[]>([]),

    chooseMoleculeWindowVis = ref(false),
    openChooseMoleculeWindow = () => {
      chooseMoleculeWindowVis.value = true;
    },
    closeChooseMoleculeWindow = () => {
      chooseMoleculeWindowVis.value = false;
    },
    chooseMoleculeId = ref(undefined),
    leftChemicalAdd = () => {
      addType = 0;
      initAllMolecule()
      openChooseMoleculeWindow()
    },
    rightChemicalAdd = () => {
      addType = 1;
      initAllMolecule()
      openChooseMoleculeWindow()
    },

    leftChemicalRemove = (i: number) => {
      leftChemical.value.splice(i, 1)
    },
    rightChemicalRemove = (i: number) => {
      rightChemical.value.splice(i, 1)
    },
    affirmMoleculeChoose = () => {
      allMolecule.value.map((item: any) => {
        if (item.id == chooseMoleculeId.value) {
          if (addType) {
            rightChemical.value.push(item)
          } else {
            leftChemical.value.push(item)
          }
        }
      })
      closeChooseMoleculeWindow()
    },
    chemicalForm = ref({
      id: undefined,
      reactionContent: "",
      reactionPhenomena: "",
      reactionType: "",
      reactionCondition: ""
    }),
    upChemical = async () => {
      openLoadingWindow && openLoadingWindow()
      let leftMolecule: any[] = []
      leftChemical.value.map((item: any) => {
        leftMolecule.push(item.id)
      })
      let rightMolecule: any[] = []
      rightChemical.value.map((item: any) => {
        rightMolecule.push(item.id)
      })
      let saveRes = await ChemicalReactionRequest.saveChemical(
        {
          id: chemicalForm.value.id,
          leftMolecule, rightMolecule,
          reactionType: chemicalForm.value.reactionType,
          reactionContent: chemicalForm.value.reactionContent,
          reactionPhenomena: chemicalForm.value.reactionPhenomena,
          reactionCondition: chemicalForm.value.reactionCondition
        }
      )
      if (saveRes.code == "200") {
        ElMessage({ type: "success", message: "添加成功" })
        closeAddChemicalReactionWindow()
      }
      refresh()
      closeLoadingWindow && closeLoadingWindow()
    },
    getMoleculeExpById = (id: string) => {
      for (let item of allMolecule.value) {
        if (item.id.toString() == id) {
          return item.expression
        }
      }
    }
  const
    chemicalArray = ref<any[]>([])
    , initChemical = async () => {
      chemicalArray.value = (await ChemicalReactionRequest.allChemicalWithoutEditor()).data
      chemicalArray.value.map((item) => {
        item.leftExpression = []
        item.leftMolecule.map((id: string) => {
          item.leftExpression.push(getMoleculeExpById(id))
        })
        item.rightExpression = []
        item.rightMolecule.map((id: string) => {
          item.rightExpression.push(getMoleculeExpById(id))
        })
      })
    },
    chemicalEdit = async (index: any, row: any) => {
      openLoadingWindow && openLoadingWindow()
      console.log(row);
      openAddChemicalReactionWindow()

      chemicalForm.value.id = row.id
      let chemicalData = (await ChemicalReactionRequest.chemicalById(row.id)).data
      console.log(chemicalData);
      leftChemical.value = []
      for (let i = 0; i < row.leftExpression.length; i++) {
        leftChemical.value.push({
          expression: row.leftExpression[i],
          id: row.leftMolecule[i]
        })
      }
      rightChemical.value = []
      for (let i = 0; i < row.rightExpression.length; i++) {
        rightChemical.value.push({
          expression: row.rightExpression[i],
          id: row.rightMolecule[i]
        })
      }
      chemicalForm.value.reactionCondition = chemicalData.reactionCondition
      chemicalForm.value.reactionType = chemicalData.reactionType
      chemicalForm.value.reactionContent = chemicalData.reactionContent
      chemicalForm.value.reactionPhenomena = chemicalData.reactionPhenomena
      if (!reactionContentEditor) {
        setTimeout(() => {
          reactionContentEditor.txt.html(chemicalData.reactionContent)
          reactionPhenomenaEditor.txt.html(chemicalData.reactionPhenomena)
        }, 1000)

      } else {
        reactionContentEditor.txt.html(chemicalData.reactionContent)
        reactionPhenomenaEditor.txt.html(chemicalData.reactionPhenomena)
      }
      closeLoadingWindow && closeLoadingWindow()
      refresh();
    },
    chemicalDelete = (index: any, row: any) => {
      ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ChemicalReactionRequest.deleteChemical(row.id).then(val => {
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
    }, addChemical = () => {
      chemicalForm.value = {
        id: undefined,
        reactionContent: "",
        reactionPhenomena: "",
        reactionType: "",
        reactionCondition: ""
      }
      leftChemical.value = []
      rightChemical.value = []
      openAddChemicalReactionWindow()
    }
  onMounted(async () => {
    await initAllMolecule(),
      await initChemical()
  })
  return {
    chemicalArray, chemicalEdit, chemicalDelete,
    leftChemical, chemicalForm,
    rightChemical,
    leftChemicalRemove, addChemical,
    rightChemicalRemove,
    leftChemicalAdd,
    chooseMoleculeId, rightChemicalAdd,
    addChemicalReactionWindowVis,
    chooseMoleculeWindowVis,
    openChooseMoleculeWindow,
    closeChooseMoleculeWindow,
    openAddChemicalReactionWindow,
    upChemical,
    closeAddChemicalReactionWindow,
    refresh,
    allMolecule,
    affirmMoleculeChoose
  }
}