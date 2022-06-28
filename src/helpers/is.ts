/**
* @Author: luoob
* @Last Modified by: luoob
* @Introduction: 判断 isXXX 模块
*/

/**
 * 判断是否弱数字类型
 * @param {any} value:string|number
 * @returns {any}
 * @description 只要不符合数字范式的都返回 false
 */
export const isWeakNumber = (value: string | number) => {
    return /^-?[0-9]+\.?[0-9]*$/.test(String(value))
}

/**
 * 判断是否弱整数类型
 * @param {any} value:string|number
 * @returns {any}
 * @description 即参数为字符串，并非一个数字
 * lodash 中的 isInteger 传入字符串整数 return false
 */
export const isWeakInteger = (value: string | number) => {
    return /^[-0-9]\d*$/.test(String(value))
}

/**
 * 验证微信号
 * @param {string} content 待校验的字符串
 * @return {boolean} 是否正确
 */
export const isWechat = (str: string) => {
    const reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
    return reg.test(str)
}
