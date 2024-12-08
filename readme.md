技术栈：
    create-react-app脚手架
    react-router-dom路由
    react-redux和redux-toolkit:获取兄弟组件的数据
    axios的二次封装
    ant Design UI
    mock.js数据模拟
    echarts图标
功能：
    项目搭建/路由配置
    layout页面布局
    菜单权限配置
    用户列表页面
    面包屑和菜单功能
    系统用户鉴权
    组件封装和模块化

index.js是入口文件

###页面模块：
路由：
    browser/hash
重定向：
    <Navigate to='home' replace/>//import {createBrowserRouter,Navigate} from "react-router-dom"
ant design;

Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。(###兄弟组件传值)
可以帮助你开发出行为稳定可预测的、运行于不同的环境（客户端、服务器、原生应用）、易于测试的应用程序。

axios的二次封装：
1.封装axios，在main.js中引入，在main.js中配置axios的默认参数，例如：baseURL，timeout，headers等。
2.在utils/request.js中封装axios的请求拦截器，响应拦截器，错误拦截器。
3.在utils/request.js中封装axios的请求方法，例如：get，post，put，delete等。

mock.js:数据模拟，生成随机数据，拦截Ajax请求

自适应布局：栅格，flex

day.js