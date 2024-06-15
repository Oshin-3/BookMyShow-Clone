import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
        <main className='App-header'>
            <p className='text-color-red' style={{fontSize: '40px'}}>Login</p>
            <section className='mw-500 text-center px-3'>
                <Form layout='vertical'>
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
                    <p>Don't have an account ? <Link to='/register'> Register here</Link></p> 
                </div>
            </section>
        </main>  
    </>
  )
}

export default Login