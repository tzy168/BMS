import React from 'antd'
import { Tag, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { closeTap, setCurrentMenu } from '../../store/reducers/tab'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    // console.log(tabList)
    const handleClose = (tag, index) => {
        let length = tabList.length - 1
        dispatch(closeTap(tag))
        //关闭的不是当前的tag
        if (tag.path !== action.pathname) {
            return
        }
        if (index === length) {
            const curData = tabList[length - 1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        } else {
            // 当前tag不是最后一个
            if (tabList.length > 1) {
                //next tag
                const nextData = tabList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }

    }
    //点击tag
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    //处理tag显示的逻辑
    const setTag = (flag, item, index) => {
        return (
            flag ?
                <Tag color='blue' closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
                :
                <Tag key={item.name} onClick={() => handleChange(item)}>{item.label}</Tag>
        )
    }
    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            {/* <Tag>
                首页
            </Tag>
            <Tag color='blue' closeIcon onClose={() => handleClose()}>
                用户列表
            </Tag> */}
            {
                currentMenu.name && tabList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag