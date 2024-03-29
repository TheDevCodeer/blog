// Imports
import { object } from "yup"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"

import Container from "@/web/components/Container"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import SubmitButton from "@/web/components/SubmitButton"
import Button from "@/web/components/Button"
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  typeValidator
} from "@/utils/validators"
import apiClient from "@/web/services/apiClient"
import SuccessMessage from "@/web/components/AlertMessages/SuccessMessage"

// Form functions
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userType: ""
}
const validationSchema = object({
  firstName: nameValidator.label("First Name"),
  lastName: nameValidator.label("Last Name"),
  email: emailValidator.label("E-mail"),
  password: passwordValidator.label("Password"),
  userType: typeValidator.label("Account type")
})
// Internal components
const Success = () => (
  <Container className="w-[600px] ml-[30%] mt-[4%] border-none flex flex-col gap-7">
    <SuccessMessage>Account created successfully</SuccessMessage>
    <Link href="/sign-in">
      <Button btnLabel="Log in your account" />
    </Link>
  </Container>
)
const FullNameFormFields = () => (
  <>
    <FormField
      name="firstName"
      type="text"
      placeholder="John"
      label="First name"
    />
    <FormField
      name="lastName"
      type="text"
      placeholder="Doe"
      label="Last name"
    />
  </>
)
// Sign up page
const SignUpPage = () => {
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post("/users", values)
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)

    return true
  }

  if (isSuccess) {
    return <Success />
  }

  return (
    <Container className="w-[450px] h-[369px] ml-[35%] mt-[1%] border-b-0">
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        title="Sign Up">
        <FullNameFormFields />
        <FormField
          name="email"
          type="email"
          placeholder="johndoe@popoo.com"
          label="E-mail"
        />
        <FormField
          name="password"
          type="password"
          placeholder="C4gdv@03tw_"
          label="Password"
        />
        <FormField
          name="userType"
          type="text"
          placeholder="Reader / Creator "
          label="Account type (Reader or Creator)"
        />
        <SubmitButton btnLabel="Create account" onSubmit={handleSubmit} />
      </Form>
    </Container>
  )
}

export default SignUpPage
