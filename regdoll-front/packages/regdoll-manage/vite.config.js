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