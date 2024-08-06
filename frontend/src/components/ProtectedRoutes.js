import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { json, useNavigate } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons'
import { GetCurrentUser } from '../api/users'
import { hideLoading, showLoading } from '../redux/loaderSlice'
import { setUsers } from '../redux/userSlice'
import { message, Layout, Menu } from 'antd'

function ProtectedRoutes({children}) {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { Header, Footer, Sider, Content } = Layout
  const getValidUser = async() => {
    try {
      dispatch(showLoading())
      const response = await GetCurrentUser()
      
      dispatch(setUsers(response.user))
      dispatch(hideLoading())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")){
      getValidUser()
      
      console.log('after setting ', users)
    }
    else{
      navigate('/login')
    }
  }, [])

  console.log("role=> ", users.user.role)
  const navigateItem = [
    {label: <span onClick={() => {
      navigate('/')
    }}>Home</span>, icon: <HomeOutlined/>},
    {label: `${users ? users.user.firstName : ""}`, icon: <UserOutlined/>,
    children: [
      {label: <span
        onClick={() => {
          if (users.user.role == "admin"){
            navigate('/admin')
          }
          else if (users.user.role == "partner"){
            navigate('/partner')
          }
          else{
            navigate('/profile')
          }
        }}>My Profile</span>, icon: <ProfileOutlined/>},
      {label: <span
       onClick={() => {
        localStorage.removeItem('token')
        navigate('/login')
       }}>Log Out</span>, icon: <LogoutOutlined />}
    ]}
  ]

  return (
    users && (
      <>
        <Layout>
          <Header className='d-flex justify-content-between'
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fcfcff'
          }}>
            <h1 className='text-color-red-header'>Book My Show</h1>
            <Menu mode='horizontal' style={{width: '15%'}} items={navigateItem}></Menu>
          </Header>
          <div style={{
            padding: 24,
            minHeight: 380,
          }}>{children}</div>
          
          
        </Layout>
      </>
    )
  )
}

export default ProtectedRoutes