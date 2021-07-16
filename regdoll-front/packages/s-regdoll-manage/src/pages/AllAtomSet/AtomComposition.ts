import { ElMessage, ElMessageBox } from 'element-plus';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-14 21:54:31
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-16 09:35:29
 */
import { ref, onMounted, onBeforeMount } from "vue";
import { AtomRequest } from '/@/api/AtomRequest'
const fresh = async () => {
  allAtomData.value = (await AtomRequest.reqAtomList()).data;
},
  addAtom = () => {
    nowAtomForm.value = {
      en_name: "",
      ch_name: '',
      quality: 0,
      ele_number: 0,
      radius: "",
      color: "",
      finder: "",
      meltingPoint: "",
      density: "",
      valence: "",
      location: "",
      matterState: "",
      IonicCharge: "",
      notice: ""
    };
    setType.value = 1
    showAtomSet()
  },
  inputNumberPrecision = 4,
  allAtomData = ref([]),
  atomEdit = (index: number, data: any) => {
    nowAtomForm.value = allAtomData.value[index];
    setType.value = 0
    showAtomSet()
  }, atomDelete = (index: number, data: any) => {
    ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      AtomRequest.deleteAtom(data.id).then(val => {
        if (val.code == "200") {
          ElMessage({
            type: "success",
            message: val.message
          })
        }
        fresh()
      }).catch(err => {
        ElMessage({
          type: "error",
          message: err.message
        })
      })
    })

  },

  showSetAtomDrawer = ref(false),
  nowAtomForm = ref({
    en_name: "",
    ch_name: '',
    quality: 0,
    ele_number: 0,
    radius: "",
    color: "",
    finder: "",
    meltingPoint: "",
    density: "",
    valence: "",
    location: "",
    matterState: "",
    IonicCharge: "",
    notice: ""
  }),
  showAtomSet = () => {
    showSetAtomDrawer.value = true;
  },
  hideAtomSet = () => {
    showSetAtomDrawer.value = false;
  },
  submitAtom = () => {
    if (setType.value) {
      AtomRequest.addAtom(nowAtomForm.value).then(val => {
        if (val.code == "200") {
          ElMessage({
            type: "success",
            message: val.message
          })
        }
        fresh()
        hideAtomSet()
      }).catch(err => {
        ElMessage({
          type: "error",
          message: err.message
        })
      })
    } else {
      AtomRequest.updateAtom(nowAtomForm.value).then(val => {
        if (val.code == "200") {
          ElMessage({
            type: "success",
            message: val.message
          })
          fresh()
          hideAtomSet()
        }
      }).catch(err => {
        ElMessage({
          type: "error",
          message: err.message
        })
      })
    }

  }
  , setType = ref(0)//0为修改,1为增加




export function allAtoms() {
  onBeforeMount(async () => {
    await fresh()
  })
  return {
    fresh,
    addAtom, inputNumberPrecision, setType,
    allAtomData, atomEdit, atomDelete, submitAtom,
    showSetAtomDrawer, nowAtomForm, showAtomSet
  };
}