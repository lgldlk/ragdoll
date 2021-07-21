import { MoleculeRequest } from '/@/api/MoleculeRequest';

/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 16:22:11
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 14:09:22
 */
import { ElMessage } from 'element-plus';
import { REMOVE_OBJECT, RENDER_SCENE, SET_LOCK_CHOICE, SET_LOCK_SCENE } from '/@/store/Scene/mutation-types';
import AtomModel from '/@/threeScene/atomModule/AtomModule';
import { RootState, SCENE_MODULE_COMMIT_PREFIX } from '/@/store';
import { Store } from 'vuex';
import { Ref, ref } from 'vue';
import { ADD_OBJECT } from '/@/store/Scene/mutation-types';
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-05 22:30:42
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 08:00:40
 */


import { inject } from 'vue'
import { saveThreeCanvasFile } from '/@/util/ImageSave';
import { SceneBackgroundRequest } from '/@/api/SceneBackground';
import { changeSceneBackground } from '/@/util';
import { CLOSE_LOADING_WINDOW, OPEN_LOADING_WINDOW } from '/@/PROVIDE_KEY';
import MoleculeModule from '/@/threeScene/atomModule/MoleculeModule';
export default function rightToolModule(store: Store<RootState>) {
  const showAtomChooseWindow = ref<boolean>(false),
    moleculeArray = ref<Array<any>>([]),
    chooseAtomEnName = ref<string>("");
  let nowAtom: number = -1;
  const openLoadingWindow = inject<Function>(OPEN_LOADING_WINDOW),
    closeLoadingWindow = inject<Function>(CLOSE_LOADING_WINDOW)
  const closeAtomChooseWindow = () => {
    setTimeout(() => {
      showAtomChooseWindow.value = false;
    }, 200);
  },
    initMoleculeArray = async () => {
      if (moleculeArray.value.length == 0) {
        let moleculeListResult = await MoleculeRequest.allMolecule();
        if (moleculeListResult.code == "200") {
          moleculeArray.value = moleculeListResult.data;
          console.log(moleculeArray.value);

        }
      }
    },
    openAtomChooseWindow = async () => {
      openLoadingWindow && openLoadingWindow();
      await initMoleculeArray()
      closeLoadingWindow && closeLoadingWindow();
      showAtomChooseWindow.value = true;
    },
    affirmChooseAtom = () => {
      closeAtomChooseWindow();
      openLoadingWindow && openLoadingWindow();
      if (chooseAtomEnName.value.length > 0) {
        moleculeArray.value.map((item, i) => {
          if (item.expression == chooseAtomEnName.value) {
            nowAtom = i;
            // window.history.pushState(null, item.ch_name + "元素", "/atomDetail?element_number=" + item.ele_number);
            store?.commit(SCENE_MODULE_COMMIT_PREFIX + REMOVE_OBJECT,
              store.state.scene.nowSelectObj
            )
            store?.commit(
              SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT,
              [new MoleculeModule(item)],
            );
          }
        });
      }
      closeLoadingWindow && closeLoadingWindow();
    },
    initNowAtom = async () => {
      await initMoleculeArray()
      moleculeArray.value.map((item, i) => {
        if (item.expression === (store.state.scene.nowSelectObj as MoleculeModule).moleculeModuleData.expression) {
          nowAtom = i;
        }
      })
    },
    sceneBackgroundVis = ref(false),
    allSceneBackground = ref([]),
    chooseSceneBackground = ref(""),
    openSceneBackgroundChoose = async () => {
      if (allSceneBackground.value.length == 0) {
        allSceneBackground.value = (await SceneBackgroundRequest.allSceneBackground()).data;
      }
      chooseSceneBackground.value = ""
      sceneBackgroundVis.value = true;
    },
    closeSceneBackground = () => {
      sceneBackgroundVis.value = false;
    },
    affirmChooseSceneBackground = () => {

      changeSceneBackground(chooseSceneBackground.value)
      closeSceneBackground()
    }

  type toolType = {
    image: string | Ref<string>;
    title: string | Ref<string>;
    clickFunc: Function;
    flag?: boolean
  }
  const toolsLIst: Array<toolType> = [

    {
      image: `<svg t="1625530340711" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3902" ><path d="M918.372101 734.697681a109.791385 109.791385 0 0 0-56.388047 15.520488l-121.225117-107.770966a181.424409 181.424409 0 0 0-4.591861-194.603048L831.126752 357.338585a110.204652 110.204652 0 1 0-52.806396-51.199245l-94.546408 90.18414A180.460118 180.460118 0 0 0 585.462214 367.34884a182.434618 182.434618 0 0 0-50.510465 7.209221L464.283016 249.797212a144.092583 144.092583 0 1 0-64.286047 35.265488l70.025872 123.980234a182.434618 182.434618 0 0 0-53.219663 73.469768l-197.450002-25.392989a110.204652 110.204652 0 1 0-14.326604 72.229966L404.083725 554.926342a180.322362 180.322362 0 0 0 32.602209 97.668873l-109.332199 104.372989a144.643606 144.643606 0 1 0 50.189036 53.67885l112.776094-107.495455a181.332571 181.332571 0 0 0 200.480629-6.795953l123.980234 110.204652A110.204652 110.204652 0 1 0 918.372101 734.697681z" fill="#BFE9E9" p-id="3903"></path></svg>`,
      title: `切换分子`,
      clickFunc: () => {
        openAtomChooseWindow()
      }
    },
    {
      image: ref(`  <svg t="1625557793024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23507" ><path d="M421.083429 674.816l138.752 147.748571s58.002286 15.798857 61.513142-28.086857l-3.510857-149.577143 205.531429-237.348571 89.6-5.12s70.290286-14.262857 19.382857-75.702857L680.96 73.581714s-68.461714-8.777143-63.195429 54.418286v68.608L384.146286 395.410286l-144.091429 8.777143s-52.662857 17.481143-33.353143 63.268571l135.314286 133.632L73.142857 950.857143l347.940572-276.041143z" fill="#BFE9E9" p-id="23508"></path></svg>`),
      title: ref(`场景锁定`),
      flag: false,
      clickFunc: (item: toolType) => {
        if (item.flag == false) {
          item.flag = !item.flag;
          (item.image as Ref<string>).value = `<svg t="1625558405741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23741" ><path d="M1024 253.698302q0 45.010989-14.321678 85.418581t-40.407592 73.142857-61.378621 55.752248-76.211788 33.246753q3.068931 23.528472 3.068931 45.010989 0 72.631369-27.62038 137.078921t-75.7003 112.015984-112.527473 75.188811-137.078921 27.62038q-55.240759 0-105.366633-15.856144t-93.090909-45.522478l-282.341658 187.204795 188.227772-283.364635q-28.643357-42.965035-43.476523-91.556444t-14.833167-102.809191q0-72.631369 27.62038-137.078921t75.188811-112.015984 111.504496-75.188811 136.567433-27.62038q11.252747 0 20.45954 0.511489t19.436563 1.534466q10.22977-41.942058 33.246753-78.257742t55.752248-62.401598 73.142857-40.919081 86.441558-14.833167q52.171828 0 98.717283 19.948052t80.815185 54.217782 54.217782 80.815185 19.948052 98.717283zM480.799201 769.278721q47.056943 0 87.976024-17.902098t71.096903-48.591409 47.568432-71.608392 17.390609-86.953047q0-24.551449-4.091908-45.010989-8.183816-2.045954-15.344655-4.603397t-15.344655-5.626374l-88.999001 87.976024q-14.321678 14.321678-31.712288 20.971029t-35.804196 6.649351-36.315684-6.649351-31.200799-20.971029q-14.321678-14.321678-20.971029-31.712288t-6.649351-35.804196 6.649351-35.804196 20.971029-31.712288l88.999001-88.999001q-3.068931-8.183816-5.626374-14.833167t-4.603397-13.81019q-19.436563-4.091908-43.988012-4.091908-46.033966 0-86.953047 17.390609t-71.608392 48.07992-48.07992 71.608392-17.390609 86.953047 17.390609 86.953047 48.07992 71.608392 71.608392 48.591409 86.953047 17.902098zM770.301698 386.685315q26.597403 0 50.125874-10.22977t41.430569-27.62038 28.131868-41.430569 10.22977-50.637363-10.22977-50.125874-28.131868-40.919081-41.430569-27.62038-50.125874-10.22977-50.637363 10.22977-41.430569 27.62038-27.62038 40.919081-10.22977 50.125874 10.22977 50.637363 27.62038 41.430569 41.430569 27.62038 50.637363 10.22977z" p-id="23742" fill="#BFE9E9"></path></svg>`
            ; (item.title as Ref<string>).value = '已锁定'
          store?.commit(
            SCENE_MODULE_COMMIT_PREFIX + SET_LOCK_SCENE,
            item.flag
          );
        } else {
          item.flag = !item.flag;
          (item.image as Ref<string>).value = ` <svg t="1625557793024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23507" ><path d="M421.083429 674.816l138.752 147.748571s58.002286 15.798857 61.513142-28.086857l-3.510857-149.577143 205.531429-237.348571 89.6-5.12s70.290286-14.262857 19.382857-75.702857L680.96 73.581714s-68.461714-8.777143-63.195429 54.418286v68.608L384.146286 395.410286l-144.091429 8.777143s-52.662857 17.481143-33.353143 63.268571l135.314286 133.632L73.142857 950.857143l347.940572-276.041143z" fill="#BFE9E9" p-id="23508"></path></svg>`
            ; (item.title as Ref<string>).value = '场景锁定'
          store?.commit(
            SCENE_MODULE_COMMIT_PREFIX + SET_LOCK_SCENE,
            item.flag
          );
        }

      }
    },
    {
      image: `<svg t="1625530122928" class="icon" viewBox="0 0 1066 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3714" ><path d="M564.096 287.061333c79.573333-4.608 149.888 32 175.914667 109.909334l-45.312 7.168 90.197333 96.256 56.234667-119.381334-50.56 8.021334c-30.421333-105.642667-124.032-162.688-229.76-156.16-14.549333 1.152-26.026667 15.530667-23.594667 31.146666 3.072 13.184 14.293333 23.850667 26.88 23.04zM804.522667 554.666667c26.965333 0 48.810667 18.773333 48.810666 41.813333v172.373333c0 23.04-21.845333 41.813333-48.810666 41.813334h-201.045334c-26.965333 0-48.810667-18.773333-48.810666-41.813334v-172.373333c0-23.04 21.845333-41.813333 48.810666-41.813333z m-567.893334-35.498667l95.104 91.392-48 10.24c23.210667 93.866667 96.938667 132.010667 162.005334 122.922667a27.008 27.008 0 0 1 28.117333 21.674666c3.285333 15.445333-7.466667 30.378667-21.973333 32.298667-99.072 2.688-189.098667-44.885333-217.088-166.656l-48 10.197333 49.834666-122.069333zM802.261333 597.333333h-196.522666c-4.650667 0-8.405333 2.986667-8.405334 6.741334v157.184c0 3.712 3.754667 6.741333 8.405334 6.741333h196.522666c4.650667 0 8.405333-2.986667 8.405334-6.741333v-157.184c0-3.712-3.754667-6.741333-8.405334-6.741334zM420.522667 213.333333c26.965333 0 48.810667 18.773333 48.810666 41.813334v172.373333c0 23.04-21.845333 41.813333-48.810666 41.813333H219.477333C192.512 469.333333 170.666667 450.56 170.666667 427.52V255.146667C170.666667 232.106667 192.512 213.333333 219.477333 213.333333z m-2.261334 42.666667H221.738667C217.088 256 213.333333 258.986667 213.333333 262.741333v157.184c0 3.712 3.754667 6.741333 8.405334 6.741334h196.522666c4.650667 0 8.405333-2.986667 8.405334-6.741334V262.741333C426.666667 258.986667 422.912 256 418.261333 256z" fill="#BFE9E9" p-id="3715"></path></svg>`,
      title: `更换背景`,
      clickFunc: () => {

        openSceneBackgroundChoose();
      }
    },
    {
      image: `<svg t="1625728667198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" ><path d="M512 12.8C787.712 12.8 1011.2 236.288 1011.2 512S787.712 1011.2 512 1011.2 12.8 787.712 12.8 512 236.288 12.8 512 12.8z m0 25.6C250.4448 38.4 38.4 250.4448 38.4 512S250.4448 985.6 512 985.6 985.6 773.5552 985.6 512 773.5552 38.4 512 38.4z m67.9936 524.9024v153.4464h-136.3968v-153.4464h136.3968z m-4.0704-255.744c13.6704 0 26.752 5.4528 36.352 15.1808l89.344 90.2656c9.472 9.5744 14.7712 22.5024 14.7712 35.968v235.8016c0 17.664-14.3104 31.9744-31.9488 31.9744h-70.3488v-171.5712a15.9744 15.9744 0 0 0-15.9744-15.9744h-172.6208a15.9744 15.9744 0 0 0-16 15.9744v171.5712H339.2c-17.664 0-31.9744-14.3104-31.9744-31.9744V339.5072c0-17.664 14.336-31.9488 31.9744-31.9488h236.7488z m-131.2512 92.6976h-57.5488a3.2 3.2 0 0 0-3.2 3.2v25.5744c0 1.7664 1.4336 3.2 3.2 3.2h57.5488a3.2 3.2 0 0 0 3.2-3.2v-25.5744a3.2 3.2 0 0 0-3.2-3.2z" fill="#BFE9E9" p-id="2187"></path></svg>`,
      title: `截图并保存`,
      clickFunc: () => {
        openLoadingWindow && openLoadingWindow();
        store.commit(SCENE_MODULE_COMMIT_PREFIX + RENDER_SCENE);
        saveThreeCanvasFile(store.state.scene.mainScene?.getRendererDomElement(), (store.state.scene.nowSelectObj as MoleculeModule).moleculeModuleData.name + '.jpeg');
        setTimeout(() => { closeLoadingWindow && closeLoadingWindow() }, 2000)
      }
    },
    {
      image: `<svg t="1625789015119" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3049" ><path d="M716.8 0l102.4 102.4-409.6 409.6 409.6 409.6-102.4 102.4-512-512z" p-id="3050" fill="#BFE9E9"></path></svg>`,
      title: `上一个`,
      clickFunc: async () => {


        if (nowAtom == -1) {
          await initNowAtom()
        }
        await initMoleculeArray()
        if (nowAtom <= 0) {
          ElMessage({ type: "info", message: "您不能上一个了" })
          return;
        }

        openLoadingWindow && openLoadingWindow();
        let addAtomData = moleculeArray.value[--nowAtom];
        // window.history.pushState(null, addAtomData.ch_name + "元素", "/atomDetail?element_number=" + addAtomData.ele_number);
        if (addAtomData) {
          store?.commit(SCENE_MODULE_COMMIT_PREFIX + REMOVE_OBJECT,
            store.state.scene.nowSelectObj
          )
          store?.commit(
            SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT,
            [new MoleculeModule(addAtomData)],
          );
        }
        closeLoadingWindow && closeLoadingWindow();
        ElMessage({ type: "success", message: "切换成功" })
      }
    },
    {
      image: `<svg t="1625789079596" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4027" ><path d="M333.825 848.984L591.443 512 333.825 175.016c-24.123-31.554-15.866-75.12 18.442-97.306C365.057 69.439 380.31 65 395.945 65h16.093L768 512 412.038 959h-16.093c-41.94 0-75.939-31.27-75.939-69.844 0-14.38 4.826-28.409 13.82-40.172z" p-id="4028" fill="#BFE9E9"></path></svg>`,
      title: `下一个`,
      clickFunc: async () => {

        if (nowAtom == -1) {
          await initNowAtom()
        }

        await initMoleculeArray()
        if (nowAtom >= moleculeArray.value.length - 1) {
          closeLoadingWindow && closeLoadingWindow();
          ElMessage({ type: "info", message: "您不能下一个了" })
          return;
        }
        let addAtomData = moleculeArray.value[++nowAtom];
        // window.history.pushState(null, addAtomData.ch_name + "元素", "/atomDetail?element_number=" + addAtomData.ele_number);
        if (addAtomData) {
          store?.commit(SCENE_MODULE_COMMIT_PREFIX + REMOVE_OBJECT,
            store.state.scene.nowSelectObj
          )
          store?.commit(
            SCENE_MODULE_COMMIT_PREFIX + ADD_OBJECT,
            [new MoleculeModule(addAtomData)],
          );
        } else {
          ElMessage({ type: "info", message: "您好暂时没有收录这种元素的信息" })
        }
        closeLoadingWindow && closeLoadingWindow();
        ElMessage({ type: "success", message: "切换成功" })
      }
    }
  ]
  return {
    toolsLIst,
    showAtomChooseWindow,
    closeAtomChooseWindow,
    moleculeArray,
    chooseAtomEnName,
    affirmChooseAtom,
    sceneBackgroundVis,
    allSceneBackground,
    chooseSceneBackground,
    openSceneBackgroundChoose,
    closeSceneBackground,
    affirmChooseSceneBackground
  }
}