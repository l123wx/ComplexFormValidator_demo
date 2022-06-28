import { isFunction } from 'lodash-es'
import { Schema, SchemaType, SchemaRuleType } from 'b-validate/es'
import { Ref, unref } from 'vue'

/**
 * 使用 bv 校验器 进行规则校验
 * @param {string} value
 * @param {SchemaRuleType[]} rules
 * @returns {any}
 */
export const validate = (value: string, rules: SchemaRuleType[]): Promise<string | null> => {
    return new Promise((resolve) => {
        const schemaRule: SchemaType = {
            bv: rules
        }
        const schema = new Schema(schemaRule)

        schema.validate({ bv: value }, (errors: any) => {
            resolve(errors != null ? errors.bv.message : errors)
        })
    })
}

export const createFormValidator: Validate.FormValidator = (_fieldsMap, { success, fail }) => {
    const fieldsMap = _fieldsMap

    function validate () {
        const fieldValuesList = Object.values(fieldsMap)
        const isValidateSuccess = fieldValuesList.findIndex(fieldValue => !fieldValue) === -1
        const callback = isValidateSuccess ? success : fail
        callback && isFunction(callback) && callback()
    }

    return {
        validate,

        hasField (field: string) {
            return fieldsMap[field] !== undefined
        },

        addField (field, value = false) {
            Reflect.set(fieldsMap, field, value)
            validate()
        },

        updateField (field, value) {
            Reflect.set(fieldsMap, field, value)
            validate()
        },

        removeField (field) {
            delete fieldsMap[field]
            validate()
        },

        createFieldController (field) {
            const errorFn = () => this.updateField(field, false)
            const passFn = () => this.updateField(field, true)
            return [errorFn, passFn]
        }
    }
}

interface ValidatorOptions {
    target: Ref
    rulesList: SchemaRuleType[]
    successCb: SuccessCallback
    failCb: FailureCallback
}

type SuccessCallback = () => void
type FailureCallback = (errorMessage: string) => void

// 创建一个校验的函数
export function createValidateMethod ({
    target,
    rulesList,
    successCb,
    failCb
}: ValidatorOptions) {
    return async (options?: { successCallback?: SuccessCallback, failureCallback?: FailureCallback }) => {
        const validatedErrorMessage = await validate(unref(target), rulesList)
        if (validatedErrorMessage) {
            failCb(validatedErrorMessage as string)
            return options?.failureCallback && options.failureCallback(validatedErrorMessage as string)
        }
        successCb()
        options?.successCallback && options.successCallback()
    }
}