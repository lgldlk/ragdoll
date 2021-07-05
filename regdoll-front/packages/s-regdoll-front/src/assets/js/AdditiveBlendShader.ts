/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-05 11:10:43
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-05 11:10:43
 */
export const AdditiveBlendShader = {

    uniforms: {

        "tDiffuse1": { type: "t", value: null },
        "tDiffuse2": { type: "t", value: null }
    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform sampler2D tDiffuse1;",
        "uniform sampler2D tDiffuse2;",

        "varying vec2 vUv;",

        "void main() {",

        "vec4 texel1 = texture2D( tDiffuse1, vUv );",
        "vec4 texel2 = texture2D( tDiffuse2, vUv );",
        "gl_FragColor = texel1 + texel2;",
        "}"

    ].join("\n")

};