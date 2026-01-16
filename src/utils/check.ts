/**
 * @function 校验字符串是否为有效的 JSON 格式
 * @param {string} str
 * @returns {boolean} 如果有效返回true，否则返回false
 */
export function isJSON(str: string): boolean {
  if (typeof str !== 'string' || str.trim() === '') {
    return false // 不是字符串或空字符串
  }
  try {
    JSON.parse(str)
    return true
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e: unknown) {
    return false
  }
}
