import React from "react";
import { Form, Input, Button, message } from "antd";
import { getMenu } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import './index.css'


const Login = () => {
    const navigate = useNavigate();
    //在登录状态下，需要跳转到home页面
    if (localStorage.getItem('token')) {
        return <Navigate to='/home' />
    }
    const handleSubmit = (val) => {
        if (!val.password || !val.username) {
            return message.open({
                type: 'warning',
                content: '账号或密码不能为空'
            })
        }
        getMenu(val).then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.data.token)
            navigate('/home')
        })


    }
    return (
        <div className="login-wrapper">
            <Form className="login-container" onFinish={handleSubmit}>
                <div className='login_title'>登录</div>
                <Form.Item
                    label='账号'
                    name='username'
                >
                    <Input placeholder="请输入账号" />
                </Form.Item>

                <Form.Item
                    label='密码'
                    name='password'
                >
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item className="login-button">
                    <Button type='default' htmlType="submit" >登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;