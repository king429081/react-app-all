import React from "react"
import { Table, Tag, Space, Button, Modal, Form, Input, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { API_GET_CATEGROY, API_ADD_LOGIN, API_UPDATA_LOGIN } from '../../../api/index'
import {Redirect,Link} from 'react-router-dom'
import { render } from "@testing-library/react";
export default class ShopIndex extends React.Component {
    state = {
        cartgroys: [],
        visible: false,
        key: null,
        editvisibility:false,
        records:0
    }
    componentDidMount() {
        this.getList("0")
    }
    cancle=()=>{
        this.setState({
        visible: false,
        editvisibility:false,
        })
    }
    //得到输入框内容
    onFinish = value => {
          console.log(value)
          this.setState({
              visible: false,
            });
            API_ADD_LOGIN(value.cart,"0").then(res=>{
                console.log(res)
            })
            this.getList("0")
    }
   //添加商品
    getList = (parentId) => {
        API_GET_CATEGROY(parentId).then((res) => {
            //console.log(res)
            if (res.data.status == 0) {
                let cartgroys = res.data.data
                this.setState({
                    cartgroys
                })
            }
            //console.log(this.state.cartgroys,"...")

        }).catch((err) => {
            console.log(err)
        })
    }
    //显示添加商品
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
      //编辑，拿到item
      edit_cart=(record)=>{
        console.log("...",record._id)
        let records = record._id
        this.setState({
            records
        })
        this.setState({
            editvisibility: true,
          });
        
    }
    //编辑
    onFinishEdit=(value)=>{
        console.log(this.state.records)
        API_UPDATA_LOGIN(this.state.records,value.edit).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    //二级分类
    
    render() {
        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
            }]
        const columns = [
            {
                width: "500px",
                title: '商品',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <Space size="middle">
                        <span onClick={()=>this.edit_cart(record)}><a >编辑分类</a></span>
                        <span><Link to={{pathname: "/admin/secondshop",query:{name:record}}}>查看二级分类</Link></span>
                    </Space>
                ),
            },
        ];
        
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{ left: "650px" }}> <PlusOutlined />添加分类</Button>
                <Table 
                bordered
                dataSource={this.state.cartgroys} 
                columns={columns}
                 />
                <Modal
                    visible={this.state.visible}
                    footer={null}
                >
                    <Card title="提交商品" bordered={false} style={{ width: "100%" }} visible={this.state.visible}>
                    <Form
                        name="normal_login"
                        onFinish={this.onFinish}>
                        <Form.Item name="cart">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                提交
                            </Button>、
                            <Button type="primary"  className="login-form-button" onClick={this.cancle}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                </Modal>
                <Modal
                    visible={this.state.editvisibility}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Card title="编辑商品" bordered={false} style={{ width: "100%" }} visible={this.state.editvisibility}>
                    <Form
                        name="normal_login"
                        onFinish={this.onFinishEdit}>
                        <Form.Item name="edit">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                修改
                                </Button>
                                <Button type="primary"  className="login-form-button" onClick={this.cancle}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                </Modal>
                
            </div>


        )
    }
}
