import { createFormValidator } from '@/helpers/validate'
import { ref } from 'vue'

// 表单整体校验状态
export const formValidateStatus = ref(false)

const presell = {
    // 软顶
    sortHead: false,
    // 硬顶
    hardHead: false,
    // 预售Usdt
    preUsdt: false,
    // 预售Bnb
    preBnb: false,
}

// 初始化表单校验对象
export const formTotalValidator = createFormValidator(presell, {
        success: () => {
            formValidateStatus.value = true
        },
        fail: () => {
            formValidateStatus.value = false
        }
    }
)