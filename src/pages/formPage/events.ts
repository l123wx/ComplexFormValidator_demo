import validateMethods from './validateMethods'

export function onSortHeadBlur () {
  validateMethods.sortHead({
      successCallback: () => {
        validateMethods.hardHead()
      }
  })
}

export function onHardHeadBlur () {
  validateMethods.hardHead({
      successCallback: () => {
        validateMethods.sortHead()
      }
  })
}

export function onPreUsdtBlur() {
  validateMethods.preUsdt()
}

export function onPreBnbBlur() {
  validateMethods.preBnb()
}

export function onOptionalValueBlur() {
  validateMethods.optionalValue()
}