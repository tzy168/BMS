
import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import CommonTag from '../components/commonTag';
import { useSelector } from "react-redux"
import { RouterAuth } from '../router/routerAuth'

const { Content } = Layout;

const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //获取展开收起的状态
  const collapse = useSelector(state => state.tab.isCollapse)

  return (
    <RouterAuth>
      <Layout className='main-container'>

        <CommonAside collapsed={collapse} />

        <Layout>
          <CommonHeader collapsed={collapse} />
          <CommonTag />
          <Content
            style={{
              margin: '8px 16px',
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>

      </Layout>
    </RouterAuth>
  );
}

export default Main