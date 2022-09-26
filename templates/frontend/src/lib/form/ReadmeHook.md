## Neat form

Form hook implementation used to easily build forms with Formik. Environment: mobile, frontend.

### Installation

```js
import { useForm } from '@neat/frontend'
```

### Usage

Neat form provides `useForm` hook that allows to control Formik form.

1. Basic usage:

```jsx
interface FormValues {
  name: string;
}

const { submitProps, field } = useForm({
  onSubmit, // function which will be call on submit
  validationSchema, // to validate use yup schema
  initialValues: { name: '' }, // initial values
})

return (
  <>
    <Input {...field('name', { allowSubmit: true })} /> // allow submit on enter
    <Button {...submitProps}>Submit</Button>
  </>
)
```

2. For additional customization of form, pass properties from FormikConfig to hook:

```js
const { submitProps, field } = useForm({
  ...
  enableReinitialize: true //reset the form when new initialValues change
})
```
