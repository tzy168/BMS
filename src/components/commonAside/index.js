import React from 'react';
import MenuConfig from "../../config";
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMenuList } from '../../store/reducers/tab';
const { Sider } = Layout;

const iconToElement = (name) => React.createElement(Icon[name]);
//处理菜单数据
const items = MenuConfig.map((icon) => {
    //没有子菜单
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label,
    }
    //有子菜单
    if (icon.children) {
        child.children = icon.children.map((item) => {
            return {
                key: item.path,
                icon: iconToElement(item.icon),
                label: item.label,
            }
        })
    }
    return child;
})
//动态获取icon


const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //添加数据到store
    const setTabList = (val) => {
        dispatch(selectMenuList(val))
    }
    const selectMenu = (e) => {
        //console.log(e)
        let data
        MenuConfig.forEach(item => {
            //找到当前数据
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item
                //如果有二级菜单
                if (e.keyPath.length > 1) {
                    data = item.children.find(child => {
                        return child.path === e.key
                    })
                }
            }
            //      console.log(data,'data')

        })
        setTabList({
            path: data.path,
            name: data.name,
            label: data.label
        })
        navigate(e.key)
    }
    //console.log(collapsed,"commonAside")
    return (
        <Sider trigger={null} collapsed={collapsed} style={{ background: 'darkgrey' }}>
            <h3 className='app-name'
                style={{ background: 'darkgrey', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
                {collapsed ? '后台' : '通用后台管理系统'}
            </h3>
            <Menu
                theme='light'
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                style={{ height: '100px', background: "darkgrey" }}
                onClick={selectMenu}

            />

        </Sider>
    );
};

export default CommonAside;