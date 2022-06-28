import { formTotalValidator } from './formTotalValidator'
import { createValidateMethod } from '@/helpers/validate'
import commonRules from '@/common/validatorRule'
import useFormData from './useFormData'
import { toRef } from 'vue'
import { SchemaRuleType } from 'b-validate/es'

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

function createValidateFormFieldMethod (fieldName: string, rulesList: SchemaRuleType[]) {
    const [errorFn, passFn] = formTotalValidator.createFieldController(fieldName)
    return createValidateMethod({
        target: toRef(formData, fieldName),
        rulesList,
        success () {
            setFormFieldSuccess(fieldName)
            passFn()
        },
        fail (message) {
            setFormFieldFail(fieldName, message)
            errorFn()
        }
    })
}

// 软顶
const sortHeadValidator = {
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
const sortHead = createValidateFormFieldMethod('sortHead', [
    commonRules.required,
    commonRules.number,
    commonRules.bigNumberIsGreaterThanZero,
    sortHeadValidator
])


// 硬顶
const hardHeadValidator = {
    validator: (value: any, callback: (error?: string) => void) => {
        const doubleOfSortHead = parseFloat(formData.sortHead || '0') * 2
        // eslint-disable-next-line
        if (formData.sortHead && value > doubleOfSortHead) {
            return callback('硬顶必须 <= 软顶的 2 倍')
            // eslint-disable-next-line
        } else if (value <= parseFloat(formData.sortHead)) {
            return callback('硬顶必须 > 软顶')
        }
    }
}
const hardHead = createValidateFormFieldMethod('hardHead', [
    commonRules.required,
    commonRules.number,
    commonRules.bigNumberIsGreaterThanZero,
    hardHeadValidator
])

// 预售Usdt
const preUsdt = createValidateFormFieldMethod('preUsdt', [
    commonRules.required,
    commonRules.integer
])

// 预售Bnb
const preBnb = createValidateFormFieldMethod('preBnb', [
    commonRules.required,
    commonRules.integer
])

// 可选值
const optionalValue = createValidateFormFieldMethod('optionalValue', [
    commonRules.required,
    commonRules.number
])

const validateMethods = {
    sortHead,
    hardHead,
    preUsdt,
    preBnb,
    optionalValue
}

export default validateMethods