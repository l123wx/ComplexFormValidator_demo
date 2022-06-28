import { formTotalValidator } from './formTotalValidator'
import { createValidateMethod } from '@/helpers/validate'
import commonRules from '@/common/validatorRule'
import useFormData from './useFormData'
import { toRef } from 'vue'

const {
    formData,
    form
} = useFormData()

// 设置表单字段 校验成功 状态
function setFormFieldSuccess (fieldName: string) {
    form.value.setFields({
        [fieldName]: {
            message: '',
            status: 'success'
        }
    })
}

// 设置表单字段 校验失败 状态
function setFormFieldFail (fieldName: string, message: string) {
    console.log(arguments)
    form.value.setFields({
        [fieldName]: {
            message,
            status: 'error'
        }
    })
}

// 软顶
const sortHead = (() => {
    const [errorFn, passFn] = formTotalValidator.createFieldController('sortHead')
    return createValidateMethod({
        target: toRef(formData, 'sortHead'),
        rulesList: [
            commonRules.required,
            commonRules.number,
            commonRules.bigNumberIsGreaterThanZero,
            {
                validator: (value: any, callback: (error?: string) => void) => {
                    const halfOfHardHead = parseFloat(formData.hardHead || '0') / 2
                    console.log(formData.hardHead)
                    if (value < halfOfHardHead) {
                        return callback('软顶必须 >= 硬顶的一半')
                        // eslint-disable-next-line
                    } else if (formData.hardHead && value >= parseFloat(formData.hardHead)) {
                        return callback('软顶必须 < 硬顶')
                    }
                }
            }
        ],
        successCb () {
            setFormFieldSuccess('sortHead')
            passFn()
        },
        failCb (message) {
            setFormFieldFail('sortHead', message)
            errorFn()
        }
    })
})()

// 硬顶
const hardHead = (() => {
    const [errorFn, passFn] = formTotalValidator.createFieldController('hardHead')
    return createValidateMethod({
        target: toRef(formData, 'hardHead'),
        rulesList: [
            commonRules.required,
            commonRules.number,
            commonRules.bigNumberIsGreaterThanZero,
            {
                validator: (value: any, callback: (error?: string) => void) => {
                    const doubleOfSortHead = parseFloat(formData.sortHead || '0') * 2
                    // eslint-disable-next-line
                    if (formData.sortHead && value > doubleOfSortHead) {
                        errorFn()
                        return callback('硬顶必须 <= 软顶的 2 倍')
                        // eslint-disable-next-line
                    } else if (value <= parseFloat(formData.sortHead)) {
                        errorFn()
                        return callback('硬顶必须 > 软顶')
                    }
                }
            }
        ],
        successCb () {
            setFormFieldSuccess('hardHead')
            passFn()
        },
        failCb (message) {
            setFormFieldFail('hardHead', message)
            errorFn()
        }
    })
})()

// 预售Usdt
const preUsdt = (() => {
    const [errorFn, passFn] = formTotalValidator.createFieldController('preUsdt')
    return createValidateMethod({
        target: toRef(formData, 'preUsdt'),
        rulesList: [
            commonRules.required,
            commonRules.integer
        ],
        successCb () {
            setFormFieldSuccess('preUsdt')
            passFn()
        },
        failCb (message) {
            setFormFieldFail('preUsdt', message)
            errorFn()
        }
    })
})()

// 预售Bnb
const preBnb = (() => {
    const [errorFn, passFn] = formTotalValidator.createFieldController('preBnb')
    return createValidateMethod({
        target: toRef(formData, 'preBnb'),
        rulesList: [
            commonRules.required,
            commonRules.integer
        ],
        successCb () {
            setFormFieldSuccess('preBnb')
            passFn()
        },
        failCb (message) {
            setFormFieldFail('preBnb', message)
            errorFn()
        }
    })
})()

// 可选值
const optionalValue = (() => {
    const [errorFn, passFn] = formTotalValidator.createFieldController('optionalValue')
    return createValidateMethod({
        target: toRef(formData, 'optionalValue'),
        rulesList: [
            commonRules.required,
            commonRules.number
        ],
        successCb () {
            setFormFieldSuccess('optionalValue')
            passFn()
        },
        failCb (message) {
            setFormFieldFail('optionalValue', message)
            errorFn()
        }
    })
})()

const validateMethods = {
    sortHead,
    hardHead,
    preUsdt,
    preBnb,
    optionalValue
}

export default validateMethods