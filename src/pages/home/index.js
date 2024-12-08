import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from 'antd';
import * as Icon from "@ant-design/icons"
import './home.css'
import { getData } from '../../api'
import MyEcharts from "../../components/Echarts"

//
const iconElement = (name) => React.createElement(Icon[name]);
const Home = () => {
  const userImg = require("../../assets/images/user.png");
  //创建echart响应数据    
  const [tableData, settableData] = useState([])
  const [echartData, setechartData] = useState({})
  //dom首次渲染完成
  useEffect(() => {
    getData().then(({ data }) => {
      //console.log(data)
      const { tableData, orderData, userData, videoData } = data.data

      settableData(tableData)

      const order = orderData

      const xData = order.date
      //console.log(xData)
      //series数据的组装
      const keyArray = Object.keys(order.data[0])
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
        })
      })

      setechartData({
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: [{
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }]
        },
        video: {
          series: [{
            data: videoData,
            type: 'pie'
          }],
        }
      })
    })
    // 对于echarts数据的组装
  }
    , []
  )

  //定义table数据
  const columns = [
    {
      title: '课程',
      dataIndex: 'name'
    },
    {
      title: '今日购买',
      dataIndex: 'todayBuy'
    },
    {
      title: '本月购买',
      dataIndex: 'monthBuy'
    },
    {
      title: '总购买',
      dataIndex: 'totalBuy'
    }
  ]
  //订单统计数据
  const countData = [
    {
      "name": "今日支付订单",
      "value": 1234,
      "icon": "CheckCircleOutlined",
      "color": "#2ec7c9"
    },
    {
      "name": "今日收藏订单",
      "value": 3421,
      "icon": "ClockCircleOutlined",
      "color": "#ffb980"
    },
    {
      "name": "今日未支付订单",
      "value": 1234,
      "icon": "CloseCircleOutlined",
      "color": "#5ab1ef"
    },
    {
      "name": "本月支付订单",
      "value": 1234,
      "icon": "CheckCircleOutlined",
      "color": "#2ec7c9"
    },
    {
      "name": "本月收藏订单",
      "value": 3421,
      "icon": "ClockCircleOutlined",
      "color": "#ffb980"
    },
    {
      "name": "本月未支付订单",
      "value": 1234,
      "icon": "CloseCircleOutlined",
      "color": "#5ab1ef"
    }
  ]
  //定义table数组

  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} alt=" " />
            <div className="user-info">
              <p className="name">黄雪梅</p>
              <p className="access">Super Management</p>
            </div>
          </div>
          <div className="login-info">
            <p>Time of last Login : <span>2021.7.6 12:21</span></p>
            <p>Place of last Login : <span>成都</span></p>
          </div>
        </Card>
        <Card>
          <Table rowKey={"name"} columns={columns} dataSource={tableData} pagination={true} />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {
            countData.map((item, index) => {
              return (
                <Card key={index}>
                  <div className="icon-box" style={{ background: item.color }}>
                    {iconElement(item.icon)}
                  </div>
                  <div className="detail">
                    <p className="name">{item.name}</p>
                    <p className="txt">￥{item.value}</p>
                  </div>
                </Card>
              )
            })
          }
        </div>
        {echartData.order && <MyEcharts chartData={echartData.order} style={{ height: '280px' }} />}
        <div className="graph">
          {echartData.user && <MyEcharts chartData={echartData.user} style={{ height: '240px', width: '50%' }} />}
          {echartData.video && <MyEcharts chartData={echartData.video} isAxisChart={false} style={{ height: '260px', width: '50%' }} />}
        </div>

      </Col>
    </Row>
  );
}
export default Home;