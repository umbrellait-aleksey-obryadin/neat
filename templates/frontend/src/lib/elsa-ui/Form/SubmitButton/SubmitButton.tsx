import { useFormikContext } from 'formik'
import React from 'react'

import { ButtonProps, Button } from '../../Button'

export const SubmitButton = (props: Omit<ButtonProps, 'onClick'>) => {
  const formik = useFormikContext()

  return (
    <Button
      type="submit"
      {...props}
      disabled={formik.isSubmitting}
      loading={formik.isSubmitting || props.loading}
      onClick={formik.handleSubmit}
    >
      {props.children}
    </Button>
  )
}
