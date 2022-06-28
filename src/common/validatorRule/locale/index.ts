import { Locale } from '@/types/hooks'

export type LocaleKey =
    | 'required'
    | 'must_number'
    | 'must_integer'
    | 'must_greaterThan_zero'
    | 'not_lessThan_zero'

const i18n: Locale.Language<LocaleKey> = {
    'en-US': {
        required: '该项为必填项',
        must_number: '请输入正确的数值',
        must_integer: '请输入正确的整数',
        must_greaterThan_zero: '不得 <= 0',
        not_lessThan_zero: '不得 < 0'
    },
    'zh-CN': {
        required: '该项为必填项',
        must_number: '请输入正确的数值',
        must_integer: '请输入正确的整数',
        must_greaterThan_zero: '不得 <= 0',
        not_lessThan_zero: '不得 < 0'
    }
}

export default i18n
