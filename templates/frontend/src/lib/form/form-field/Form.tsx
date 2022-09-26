import { FormikConfig, FormikContext, useFormik } from 'formik'
import React from 'react'
import { Schema } from 'yup'

interface FormProps<Values extends object> extends Omit<FormikConfig<Values>, 'initialValues'> {
  initialValues?: Partial<Values>
  onSubmit: FormikConfig<Values>['onSubmit']
  validationSchema: Schema<Values>
}

export const Form = <Values extends object>(props: FormProps<Values>) => {
  const {
    initialValues,
    onSubmit,
    validateOnChange,
    validateOnBlur,
    children,
    validationSchema,
  } = props

  const formState = useFormik({
    ...props,
    validateOnChange: validateOnChange ?? false,
    validateOnBlur: validateOnBlur ?? false,
    initialValues: (initialValues || {}) as Values,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      const errors = await onSubmit(values, formikHelpers)
      if (errors) {
        for (const field in errors) {
          formikHelpers.setFieldError(field, errors[field])
        }
      }
    },
  })

  return <FormikContext.Provider value={formState}>{children}</FormikContext.Provider>
}

export const createTypedFields = <Value extends object, FieldsType extends object>(
  fields: FieldsType,
) => {
  const Field = fields as EnhancedFields<keyof Value>

  type EnhancedFields<Keys> = {
    [K in keyof FieldsType]: FieldsType[K] extends React.ComponentType<infer Props>
      ? React.ComponentType<Props & { name: Keys }>
      : FieldsType[K]
  }
  return Field
}
