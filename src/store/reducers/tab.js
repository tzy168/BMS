import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页'
            }
        ],
        currentMenu: {}
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse;
        },
        selectMenuList: (state, { payload: val }) => {
            if (val.name !== 'home') {
                state.currentMenu = val;
                //如果重复数据
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabList.push(val);
                }
            } else {
                state.currentMenu = val;
            }
        },
        closeTap: (state, { payload: val }) => {
            let res = state.tabList.findIndex(item => item.name === val.name)
            // 删除
            state.tabList.splice(res, 1)

        },
        setCurrentMenu: (state, { payload: val }) => {
            if (val.name === 'home') {
                state.currentMenu = {}
            } else {
                state.currentMenu = val
            }

        }

    }
})

const TabReducer = tabSlice.reducer
export const { collapseMenu, selectMenuList, closeTap, setCurrentMenu } = tabSlice.actions;//
export default TabReducer