import validateMethods from './validateMethods'
import useFormData from './useFormData'
import { formTotalValidator } from './formTotalValidator'

const { isOptionalValueShow } = useFormData()

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

export function onPreUsdtBlur () {
    validateMethods.preUsdt()
}

export function onPreBnbBlur () {
    validateMethods.preBnb()
}

export function onOptionalValueSwiperChange (newVal: any) {
    isOptionalValueShow.value = newVal as boolean
    if (newVal) {
        formTotalValidator.putField('optionalValue', false)
    } else {
        formTotalValidator.removeField('optionalValue')
    }
}

export function onOptionalValueBlur () {
    validateMethods.optionalValue()
}