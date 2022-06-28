<template>
    <Form ref="form" :model="presell" layout="vertical" style="margin-top:20px;align-items:center">
        <!-- 软顶/硬顶 -->
        <Space :size="[100, 0]" align="center">
            <Form.Item
                field="sortHead"
                label="最少筹款多少个 TBNB">
                <Input
                    v-model="presell.sortHead"
                    placeholder="输入TBNB数量"
                    size="large"
                    allow-clear
                    @blur="onSortHeadBlur"
                />
            </Form.Item>
            <Form.Item
                field="hardHead"
                label="最多筹款多少个 TBNB">
                <Input
                    v-model="presell.hardHead"
                    placeholder="输入TBNB数量"
                    size="large"
                    allow-clear
                    @blur="onHardHeadBlur"
                />
            </Form.Item>
        </Space>

        <!-- 预售价格 -->
        <Space :size="[100, 0]" align="center">
            <Form.Item
                field="preUsdt"
                label="一个代币的价格(USDT 计算)">
                <Input
                    v-model="presell.preUsdt"
                    placeholder="请输入价格"
                    size="large"
                    allow-clear
                    @blur="onPreUsdtBlur"
                />
            </Form.Item>
            <Form.Item
                field="preBnb"
                label="一个 TBNB 可以获得多少个币">
                <Input
                    v-model="presell.preBnb"
                    placeholder="请输入价格"
                    size="large"
                    allow-clear
                    @blur="onPreBnbBlur"
                />
            </Form.Item>
        </Space>

        <div style="text-align:center">
            <Switch @change="val => (isTheOptionalFormOpened = val as boolean)" />

            <p v-show="isTheOptionalFormOpened" class="release-message-tip">
                {{ ('presale_release_tip') }}
            </p>

            <Collapse :active-key="[isTheOptionalFormOpened ? 'optionalValue' : '']" :bordered="false">
                <Collapse.Item key="optionalValue" :show-expand-icon="false">
                    <Space :size="[100, 0]" align="start">
                        <Form.Item
                            field="optionalValue"
                            label=""
                            allow-clear
                            validate-trigger="blur">
                            <Input
                                v-model="presell.optionalValue"
                                placeholder="请输入值"
                                size="large"
                                @blur="onOptionalValueBlur"
                            />
                        </Form.Item>
                    </Space>
                </Collapse.Item>
            </Collapse> 
        </div>

        <Space class="button-space" size="large" align="start">
            <Button
                :disabled="!(formValidateStatus)"
                type="primary"
                size="large">
                {{ 'next_step' }}
            </Button>
        </Space>
    </Form>
</template>

<script setup lang="ts">
    import { Space, Form, Input, Button, Switch, Collapse } from '@arco-design/web-vue'
    import {
        validateSortHead,
        validateHardHead,
        validatePreUsdt,
        validatePreBnb,
        validateOptionalValue
    } from './validateMethods'
    import useFormData from './useFormData'
    import { formTotalValidator, formValidateStatus } from './formTotalValidator'
    import { computed, ref } from 'vue'

    const {
        formData: presell,
        form
    } = useFormData()

    function onSortHeadBlur () {
        validateSortHead({
            successCallback: () => {
                validateHardHead()
            }
        })
    }

    function onHardHeadBlur () {
        validateHardHead({
            successCallback: () => {
                validateSortHead()
            }
        })
    }

    function onPreUsdtBlur() {
        validatePreUsdt()
    }

    function onPreBnbBlur() {
        validatePreBnb()
    }

    function onOptionalValueBlur() {
        validateOptionalValue()
    }

    const _isTheOptionalFormOpened = ref<boolean>(false)
    const isTheOptionalFormOpened = computed({
        get: () => _isTheOptionalFormOpened.value,
        set(bool) {
            _isTheOptionalFormOpened.value = bool
            if (bool) {
                formTotalValidator.addField('optionalValue', false)
            } else {
                formTotalValidator.removeField('optionalValue')
            }
        }
    })
</script>

<style>

</style>
