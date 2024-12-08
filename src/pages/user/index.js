import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm, Modal, Select, InputNumber, DatePicker } from "antd"
import "./user.css"
import { getUser, addUser, updateUser, deleteUser } from "../../api"
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'

const User = () => {
    const [listData, setListData] = useState({
        name: ''
    });
    const [tableData, setTableData] = useState([])
    const [modalType, setModalType] = useState(0);
    const [isModalOpen, setISModalOpen] = useState(false);

    const getTableData = () => {
        getUser(listData).then(({ data }) => {
            setTableData(data.list); // 获取到的数据更新到tableData中，并重新渲染表格
            //console.log(data,'res');
        });
    };

    useEffect(() => {
        getTableData();
    }, []); // Add 'getTableData' to the dependency array

    //创建form实例s
    const [form] = useForm()

    //新增
    const handleClick = (type, rowData) => {
        //新增/编辑
        setISModalOpen(!isModalOpen)
        if (type === 'add') {
            setModalType(0)
        } else {
            setModalType(1)
            //console.log(rowData)
            const cloneData = JSON.parse(JSON.stringify(rowData));//深拷贝

            cloneData.birth = dayjs(cloneData.birth)
            //表单数据回调
            form.setFieldsValue(cloneData);
        }
    }
    //提交
    const handleFinish = (e) => {
        try {
            setListData({
                name: e.keyword
            });
        } catch (error) {
            alert('错误的输入')
        }
    };
    useEffect(() => {
        getTableData();
    }, [listData])

    //弹窗取消
    const handleDelete = ({ id }) => {
        deleteUser({ id }).then(() => {
            getTableData()
        })
    }
    const handleCancel = () => {
        setISModalOpen(false);
        form.resetFields();
    }
    //弹窗确定
    const handleOk = () => {
        form.validateFields().then((val) => {
            //日期参数
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            console.log(val)
            //后端接口
            if (modalType) {//编辑
                updateUser(val).then(() => {
                    handleCancel();
                    getTableData();
                    //alert('修改成功')
                })
            } else {
                addUser(val).then(() => {
                    handleCancel();
                    getTableData();
                    //alert('添加成功')
                })
            }
        }).catch((info) => {
            // Handle form validation errors
            console.log('Validation failed:', info);
        });
    };

    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
        },
        {
            title: 'AGE',
            dataIndex: 'age',
        },
        {
            title: 'SEX',
            dataIndex: 'sex',
            render: (val) => {
                return val === 0 ? '男' : '女';
            }
        },
        {
            title: 'BIRTH',
            dataIndex: 'birth',

        },
        {
            title: 'ADDR',
            dataIndex: 'addr',
        },
        {
            title: 'ACTION',
            render: (rowData) => {// rowData为当前行的数据
                return (
                    <div className="flex-box">
                        <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
                        <Popconfirm title="确定删除吗？" okText='YES' cancelText='NO' onConfirm={() => handleDelete(rowData)}>
                            <Button type="primary" danger>删除</Button>

                        </Popconfirm>
                    </div>
                )
            }
        }

    ]

    return (
        <div className="user" >
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>新增</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>

            </div>
            <Table columns={columns} dataSource={tableData} rowKey={'id'} />
            <Modal
                open={isModalOpen}
                title={modalType ? '编辑' : '新增'}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='确定'
                cancelText='取消'
            >
                <Form form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left">
                    {
                        modalType === 1 &&
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                    }
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名',
                            }
                        ]}
                    >
                        <Input placeholder="请输入姓名" />
                    </Form.Item>

                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: '请输入年龄',
                            }, {
                                type: 'number',
                                message: '年龄必须为数字!',
                            }
                        ]}
                    >
                        <InputNumber placeholder="请输入年龄" />
                    </Form.Item>

                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: '请选择性别',
                            }
                        ]}
                    >
                        <Select placeholder="请选择性别...">
                            <Select.Option value={0}>男</Select.Option>
                            <Select.Option value={1}>女</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: '请选择出生日期',
                            }
                        ]}
                    >
                        <DatePicker placeholder="请选择" format={'YYYY/MM/DD'} />
                    </Form.Item>

                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[
                            {
                                required: true,
                                message: '请输入地址',
                            }
                        ]}
                    >
                        <Input placeholder="请输入地址" />
                    </Form.Item>

                </Form>

            </Modal>
        </div>
    );
}
export default User;