// #记录表单数据
import { reactive, ref } from 'vue'

function useFormData () {
    const form = ref<any>()

    const isOptionalValueShow = ref<boolean>(false)

    const formData = reactive({
        // 软顶
        sortHead: '',
        // 硬顶
        hardHead: '',
        // 预售Usdt
        preUsdt: '',
        // 预售Bnb
        preBnb: '',
        // 可选表单值
        optionalValue: ''
    })

    return {
        form,
        formData,
        isOptionalValueShow
    }
}

let formData: any = null

export default () => {
    if (!formData) {
        formData = useFormData()
    }

    return formData
}