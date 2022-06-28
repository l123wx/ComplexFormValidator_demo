declare namespace Validate {
  type OptionCallback = () => void | Promise<any>

  export type FieldsMap = Record<string, boolean>

  interface FormValidatorCallback<T extends string> {
      validate: () => void
      addField: (field: T, value?: boolean) => void
      hasField: (field: T) => boolean
      updateField: (field: T, value: boolean) => void
      removeField: (field: T) => void
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
}