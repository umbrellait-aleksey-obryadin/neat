## Neat form

Form context implementation used to easily build forms with Formik. Environment: mobile, frontend.

### Installation

```js
import { Form } from '@neat/frontend'
```

### Usage

Neat form provides `Form` component that allows to control Formik form.

1. Basic usage:

```jsx
return (
  <Form
    initialValues={/* initial values */}
    validationSchema={/* schema with yup library */}
    onSubmit={/* handling form submission */}
  >
    {/* Fields */}
    <SubmitButton>Submit</SubmitButton>
  </Form>
)
```

2. Configure types of fields (if developer passes wrong name, an error will appear):

```ts
const availableFields = {
  // create object with available fields
  Input: InputField,
}

type FieldsType = typeof availableFields
// to create typed fields, pass types of available fields and these fields themselves
const createTyped = <T extends object>() => createTypedFields<T, FieldsType>(availableFields)
```

```jsx
const Fields = createTyped<FormValues>() // generation of types according to form values
```

3. For additional customization of form, pass properties from FormikConfig to Form:

```jsx
<Form enableReinitialize={true}>{/* Fields */}</Form> //reset the form when new initialValues change
```
