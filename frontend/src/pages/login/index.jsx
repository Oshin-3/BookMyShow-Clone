import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../api/users'

function Login() {

    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values)
            if (response.success){
                message.success(response.message)
                localStorage.setItem("token", response.data)
                navigate('/')
            }
            else{
                message.error(response.message)
            }
        } catch (error) {
            
        }
    }
  return (
    <>
        <main className='App-header'>
        <h1 className='text-color-red-header'>Welcome Back</h1>
        <p style={{fontSize: 'small'}}>Enter your credentials to login</p>
            <div className='card'>
                <section className='mw-500 text-center px-3'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label="Email" htmlFor="Email" name="email" rules={[
                            {required: true, message: "Email is required"},
                            {type: 'email', message: "Enter a valid email address"}
                        ]}>
                        <Input type='text' placeholder='Enter your email address'></Input>
                        </Form.Item>
                        <Form.Item label="Password" htmlFor="Password" name="password" rules={[
                            {required: true, message: "Password is required"}
                        ]}>
                        <Input type='password' placeholder="Enter an password"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='mw-500' style={{ fontSize: "1rem", fontWeight: "600" }}>
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='mw-500' style={{textAlign: 'left', fontSize: "small", display: "inline"}}>
                        <p>Don't have an account ? <Link to='/register'> Sign up here</Link></p> 
                    </div>
                </section>
            </div>
        </main>  
    </>
  )
}

export default Login