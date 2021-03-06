declare namespace Validation {
    type SuccessCallback = (value: any) => void
    type FailureCallback = (errorMessage: string) => void

    type OptionCallback = () => void | Promise<any>
    
    export type FieldsMap = Record<string, boolean>

    interface FormValidatorCallback<T extends string> {
        validate: () => void
        hasField: (field: T) => boolean
        putField: (field: T, value?: boolean) => void
        putFields: (fields: FieldsMap) => void
        removeField: (field: T) => void
        removeFields: (fieldsList: T[]) => void
        createFieldController: (field: T) => [
            () => void,
            () => void
        ]
    }

    export interface FormValidator {
        <EE extends string = string>(
            initialValue: FieldsMap,
            option: { success: OptionCallback, fail: OptionCallback }
        ): FormValidatorCallback<EE>
    }

    interface ValidateMethodCreatorParams {
        target: Ref
        rulesList: SchemaRuleType[]
        success: SuccessCallback
        fail: FailureCallback
    }
}

