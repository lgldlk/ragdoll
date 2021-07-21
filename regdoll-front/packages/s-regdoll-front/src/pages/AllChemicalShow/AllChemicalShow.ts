import { useRouter } from 'vue-router';
import { MoleculeRequest } from '/@/api/MoleculeRequest';
import { onMounted, ref } from 'vue';
import { ChemicalReactionRequest } from '/@/api/ChemicalReactionRequest';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-21 07:55:18
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-21 09:23:25
 */





export function allChemicalShows() {
  let allMolecule: any,
    allChemicalShow: any;

  const showChemical = ref<{
    left: string,
    right: string, id: number, reactionCondition: string,
    reactionType: string
  }[]>([]),
    getMoleculeExpById = (id: string) => {
      for (let item of allMolecule) {
        if (item.id.toString() == id) {
          return item.expression
        }
      }
    },
    initShowChemicalShow = () => {
      const leftMap = new Map(),
        rightMap = new Map();
      allChemicalShow.map((item: any) => {
        item.leftMolecule.map((item2: string) => {
          if (leftMap.has(item2)) {
            leftMap.set(item2, leftMap.get(item2) + 1)
          } else {
            leftMap.set(item2, 1)
          }
        })
        item.rightMolecule.map((item2: string) => {
          if (rightMap.has(item2)) {
            rightMap.set(item2, rightMap.get(item2) + 1)
          } else {
            rightMap.set(item2, 1)
          }
        })
        let leftExp = ""
        leftMap.forEach(function (value, key) {
          let moleExp = getMoleculeExpById(key);
          if (value > 1) {
            leftExp += value + moleExp
          }
          else {
            leftExp += moleExp
          }
          leftExp += "+"
        })
        let rightExp = ""
        rightMap.forEach(function (value, key) {
          let moleExp = getMoleculeExpById(key);
          if (value > 1) {
            rightExp += " " + value + " " + moleExp
          }
          else {
            rightExp += " " + moleExp
          }
          rightExp += "  +"
        })
        showChemical.value.push({
          left: leftExp.substr(0, leftExp.length - 1),
          right: rightExp.substr(0, rightExp.length - 1),
          id: item.id,
          reactionCondition: item.reactionCondition,
          reactionType: item.reactionType
        })

        leftMap.clear()
        rightMap.clear()
      })
      console.log("showChemical:", showChemical.value);

    }
  onMounted(async () => {
    allMolecule = (await MoleculeRequest.moleculeNameAndId()).data
      ;
    allChemicalShow = (await ChemicalReactionRequest.allChemicalWithoutEditor()).data

    initShowChemicalShow()

  })
  const router = useRouter()
  const goToChemicalDetail = (item: any) => {
    router.push({
      path: "chemicalReactionShow",
      query: {
        chemical_Id: item.id
      }
    })
  }
  return {
    showChemical,
    goToChemicalDetail
  }
}