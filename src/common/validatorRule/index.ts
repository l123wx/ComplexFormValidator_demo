import { FieldRule } from '@arco-design/web-vue'
import BigNumber from 'bignumber.js'
import { isWeakInteger, isWeakNumber } from '@/helpers/is'

type Callback = (error?: string) => void

// 是否是数字
function isNumber (value: any, callback: Callback) {
    if (value && !isWeakNumber(value)) {
        return callback('must_number')
    }
    callback()
}
// 是否是正整形
function isInteger (value: any, callback: Callback) {
    if (value && !isWeakInteger(value)) {
        return callback('must_integer')
    }
    callback()
}
// 是否 > 0
function bigNumberIsGreaterThanZero (value: any, callback: Callback) {
    if (value && new BigNumber(value).isGreaterThan(0)) {
        return callback()
    }
    callback('must_greaterThan_zero')
}
// 是否 >= 0
function bigNumberIsGreaterThanOrEqualToZero (value: any, callback: Callback) {
    if (value && new BigNumber(value).isGreaterThanOrEqualTo(0)) {
        return callback()
    }
    callback('not_lessThan_zero')
}

const commonRules: Record<string, FieldRule> = {
    required: { type: 'string', required: true, message: 'required' },
    number: { validator: isNumber },
    integer: { validator: isInteger },
    bigNumberIsGreaterThanZero: { validator: bigNumberIsGreaterThanZero },
    isGreaterThanOrEqualToZero: { type: 'number', min: 0, message: 'not_lessThan_zero' },
    bigNumberIsGreaterThanOrEqualToZero: { validator: bigNumberIsGreaterThanOrEqualToZero }
}
export default commonRules
