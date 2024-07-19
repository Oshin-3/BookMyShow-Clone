import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from '../../api/users';

function Register() {

  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values)
      console.log(response) 
      if (response.success) {
        message.success(response.message)
        navigate('/login')
      }
      else{
        message.error(message.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main className='App-header'>
      <h1 className='text-color-red-header'>Sign Up</h1>
        <div className='card'>
          <section className='mw-500 text-center px-3'>
            <Form layout='vertical' onFinish={onFinish}>
              <Form.Item label="First Name" htmlFor="First Name" name="firstName" rules={[
                { required: true, message: "First Name is required" },
              ]}>
                <Input type='text' placeholder='Enter your First Name'></Input>
              </Form.Item>
              <Form.Item label="Last Name" htmlFor="Last Name" name="lastName" rules={[
                { required: true, message: "Last Name is required" },
              ]}>
                <Input type='text' placeholder='Enter your Last Name'></Input>
              </Form.Item>
              <Form.Item label="Email" htmlFor="Email" name="email" rules={[
                { required: true, message: "Email is required" },
                { type: 'email', message: "Enter a valid email address" }
              ]}>
                <Input type='text' placeholder='Enter your email address'></Input>
              </Form.Item>
              <Form.Item label="Password" htmlFor="Password" name="password" rules={[
                { required: true, message: "Password is required" }
              ]}>
                <Input type='password' placeholder="Enter an password"></Input>
              </Form.Item>
              <Form.Item label="Confirm Password" htmlFor="Confirm Password" name="confirmPassword" rules={[
                { required: true, message: "Confirm Password is required" }
              ]}>
                <Input type='password' placeholder="Confirm the password"></Input>
              </Form.Item>
              <Form.Item>
              <Button type='primary' htmlType='submit' className='mw-500' style={{ fontSize: "1rem", fontWeight: "600" }}>
                Sign Up
              </Button>
            </Form.Item>
            </Form>
            
            <div className='mw-500' style={{ textAlign: 'left', fontSize: "small", display: "inline" }}>
              <p>Already have an account? <Link to='/login'> Sign In here</Link></p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Register