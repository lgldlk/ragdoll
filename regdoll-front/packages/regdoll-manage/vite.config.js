/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-04 18:35:16
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-13 18:42:52
 */
const path = require('path');
module.exports = {
    cssPreprocessOptions: {
        scss: {
            additionalData: "@import './src/index.scss';",
        },
    },
    alias: {
        // 键必须以斜线开始和结束
        '/@/': path.resolve(__dirname, './src'),
        // '/@components/': path.resolve(__dirname, './src/components')
    },
};