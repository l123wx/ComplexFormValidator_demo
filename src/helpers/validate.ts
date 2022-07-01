import { isFunction } from 'lodash-es'
import { Schema, SchemaType, SchemaRuleType } from 'b-validate/es'
import { unref } from 'vue'

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

// 创建一个表单的校验器
export const createFormValidator: Validation.FormValidator = (_fieldsMap, { success, fail }) => {
    const fieldsMap = _fieldsMap

    function validate () {
        const fieldValuesList = Object.values(fieldsMap)
        const isValidateSuccess = fieldValuesList.findIndex(fieldValue => !fieldValue) === -1
        const callback = isValidateSuccess ? success : fail
        if (callback && isFunction(callback)) {
            callback()
        }
    }

    return {
        validate,

        hasField (field: string) {
            return Reflect.has(fieldsMap, field)
        },

        putField (field, value = false) {
            Reflect.set(fieldsMap, field, value)
            validate()
        },

        putFields (_fieldsMap) {
            Object.keys(_fieldsMap).forEach(field => Reflect.set(fieldsMap, field, _fieldsMap[field]))
            validate()
        },

        removeField (field) {
            Reflect.deleteProperty(fieldsMap, field)
            validate()
        },

        removeFields (fieldsList) {
            fieldsList.forEach(field => Reflect.deleteProperty(fieldsMap, field))
            validate()
        },

        createFieldController (field) {
            const errorFn = () => this.putField(field, false)
            const passFn = () => this.putField(field, true)
            return [errorFn, passFn]
        }
    }
}

// 创建一个校验的函数
export function createValidateMethod ({
    target,
    rulesList,
    success,
    fail
}: Validation.ValidateMethodCreatorParams) {
    return async (options?: {
        successCallback?: Validation.SuccessCallback,
        failureCallback?: Validation.FailureCallback
    }) => {
        // 加上undefined是为了解决 空字符串无法经过某些规则校验 导致 非必填项触发错误校验的问题
        const value = unref(target) || undefined
        const validatedErrorMessage = await validate(value, rulesList)
        if (validatedErrorMessage) {
            fail(validatedErrorMessage as string)
            options?.failureCallback && options.failureCallback(validatedErrorMessage as string)
            return
        }
        success(value)
        options?.successCallback && options.successCallback(value)
    }
}