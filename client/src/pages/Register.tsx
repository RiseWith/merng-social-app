import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client'

interface IRegisterUser{
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Register = () => {
  const [fields, setFields] = useState<IRegisterUser>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: fields
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addUser();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setFields(() => ({ ...fields, [name]: value}))
  }

  return (
    <div className="form-container">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} noValidate size="large" loading={loading}>
        <Form.Input 
          label="Username"
          placeholder="Username..."
          name="username"
          value={fields.username}
          onChange={handleChange}
        />
        <Form.Input 
          label="Email"
          placeholder="Email address"
          name="email"
          value={fields.email}
          type="email"
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={fields.password}
          type="password"
          onChange={handleChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Retype Password"
          name="confirmPassword"
          value={fields.confirmPassword}
          type="password"
          onChange={handleChange}
        />

        <Form.Button type="submit" primary 
          disabled={fields.username === "" || fields.email === "" || fields.password === "" || fields.confirmPassword === ""}
        >
          Register
        </Form.Button>
      </Form>
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id email username createdAt token
    }
  }
`

export default Register
