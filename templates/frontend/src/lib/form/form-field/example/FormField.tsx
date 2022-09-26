import React from 'react'
import { object, string, mixed } from 'yup'

import { SubmitButton, Radio, RadioGroupField, InputField, SelectField } from '~/lib/elsa-ui'

import { Form, createTypedFields as createFields } from '../Form'

import styles from './FormField.module.scss'

const availableFields = {
  Input: InputField,
  RadioGroup: RadioGroupField,
  Select: SelectField,
}
type FieldsType = typeof availableFields
const createTypedFields = <T extends object>() => createFields<T, FieldsType>(availableFields)

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

interface FormValues {
  name: string
  position: string
  gender: Gender
}

const Fields = createTypedFields<FormValues>()

export const ExampleFormField = () => {
  const validationSchema = object<FormValues>({
    name: string().required(),
    position: string().required(),
    gender: mixed().oneOf([Gender.Female, Gender.Male, Gender.Other]).required(),
  }).required()

  const onSubmit = (values: FormValues) => {
    console.log(values)
  }

  const positions = [
    { label: 'Frontend developer', value: 'frontend' },
    { label: 'Backend developer', value: 'backend' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>Form with FormField</div>
      <Form
        initialValues={{ name: '', position: '', gender: Gender.Other }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Fields.Input allowSubmit label="Name" name="name" />
        <Fields.Select label="Position" name="position" options={positions} />

        <Fields.RadioGroup label="Gender" name="gender">
          <Radio label="Female" value={Gender.Female} />
          <Radio label="Male" value={Gender.Male} />
          <Radio label="Other" value={Gender.Other} />
        </Fields.RadioGroup>
        <div className={styles.button}>
          <SubmitButton>Submit</SubmitButton>
        </div>
      </Form>
    </div>
  )
}
