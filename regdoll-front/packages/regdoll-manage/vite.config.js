/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 18:35:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-02 21:10:39
 */

const path = require("path");

module.exports = {
      cssPreprocessOptions: {
            scss: {
                  additionalData: "@import './src/index.scss';",
            },
      },
      alias: {
            // 键必须以斜线开始和结束
            "/@/": path.resolve(__dirname, "./src"),
            // '/@components/': path.resolve(__dirname, './src/components')
      },
      // plugins: [
      //     vue(),
      //     styleImport({
      //         libs: [{
      //             libraryName: "element-plus",
      //             esModule: true,
      //             ensureStyleFile: true,
      //             resolveStyle: (name) => {
      //                 name = name.slice(3);
      //                 return `element-plus/packages/theme-chalk/src/${name}.scss`;
      //             },
      //             resolveComponent: (name) => {
      //                 return `element-plus/lib/${name}`;
      //             },
      //         }, ],
      //     }),
      // ],
};