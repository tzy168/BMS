import React from 'react';
import { Button, Layout, Avatar, Dropdown } from 'antd';
import "./index.css"
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined } from "@ant-design/icons"
import { collapseMenu } from '../../store/reducers/tab'
import { useDispatch } from "react-redux"

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate();
  const logout = () => {
    // 清除token
    localStorage.removeItem("token");
    navigate('/login');
  };
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer" >
          退出
        </a>
      ),
    },
  ];

  //创建dispatch
  const dispatch = useDispatch();
  //点击展开收起
  const setCollapsed = () => {
    //console.log(collapsed)
    dispatch(collapseMenu())
  }

  return (
    <Header className='header-container'>
      <Button className='button-menu'
        type="text"
        icon={<MenuFoldOutlined />}
        style={{
          fontSize: '16px',
          width: 48,
          height: 32,
          background: 'white'
        }}
        onClick={() => setCollapsed()}
      />
      <Dropdown menu={{ items }}>

        <Avatar size={36} src={<img src={require("../../assets/images/user.png")} />} alt=" " />
      </Dropdown>

    </Header>

  )
}

export default CommonHeader;