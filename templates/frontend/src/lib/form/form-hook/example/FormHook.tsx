import React from 'react'
import { object, string, mixed } from 'yup'

import { Button, Input, Select, RadioGroup, Radio } from '~/lib/elsa-ui'

import { useForm } from '../useForm'

import styles from './FormHook.module.scss'

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

export const ExampleFormHook: React.FC = () => {
  const validationSchema = object<FormValues>({
    name: string().required(),
    position: string().required(),
    gender: mixed().oneOf([Gender.Female, Gender.Male, Gender.Other]).required(),
  }).required()

  const onSubmit = (values: FormValues) => {
    alert(`name: ${values.name}\nposition: ${values.position}\ngender: ${values.gender}\n`)
  }

  const { submitProps, field } = useForm({
    onSubmit,
    validationSchema,
    initialValues: { name: '', position: '', gender: Gender.Other },
  })

  const positions = [
    { label: 'Frontend developer', value: 'frontend' },
    { label: 'Backend developer', value: 'backend' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>Form with FormHook</div>
      <Input label="Name" {...field('name', { allowSubmit: true })} />
      <Select label="Position" options={positions} {...field('position', { allowSubmit: true })} />
      <RadioGroup {...field('gender')}>
        <Radio label="Female" value={Gender.Female} />
        <Radio label="Male" value={Gender.Male} />
        <Radio label="Other" value={Gender.Other} />
      </RadioGroup>
      <div className={styles.button}>
        <Button {...submitProps}>Submit</Button>
      </div>
    </div>
  )
}
