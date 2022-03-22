import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Radio,
  Input,
  Spin,

} from "antd";
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Main from "../layout/Main";

const columns = [
  {
    title: "AUTHOR",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "BRAND",
    dataIndex: "brand",
    key: "brand",
  },

  {
    title: "MADE IN",
    key: "madein",
    dataIndex: "madein",
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => (
          <div>
          <div className="ant-employed ">
            <span></span>
            <div className="d-flex ">
              <EditOutlined className="Action_edit" />
              <DeleteOutlined className="Action_delete" />
            </div>
          </div>
        </div>
    )},

];





function Tables() {

  const [loading, setLoading]=useState(false)
  const [data, setData]=useState([

  ])
  useEffect(()=>{ 
    axios.get('https://app-crudmemlk.herokuapp.com/api/fullProdApi').then(response =>{
      // console.log('response==',response.data)
      setData(data.concat(response.data))
      data != null ? setLoading(true) : setLoading(false)
      console.log('data',data)
    }).catch(error =>{
        console.log(error)
    })
  },[])
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Main>
    <Button onClick={showModal} className="Floating " type="primary" shape="round" icon={<AppstoreAddOutlined />}/>
      <div className="tabled fs-3">
        <Row className="" gutter={[24, 0]}>
          <Col  xs="24" xl={24}>
            
            <Card
              bordered={false}
              className="criclebox tablespace mb-24" 
              title='Table'

              // {...(loading) ? extra=<Spin /> : extra=''}
              extra={(!loading) ? <Spin /> : ''}
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal title="Add" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
        // form={form}
        layout="vertical"
        // initialValues={{ requiredMarkValue: requiredMark }}
        // onValuesChange={onRequiredTypeChange}
        // requiredMark={requiredMark}
        >
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Field B"
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Field B"
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Field B"
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Modal>
    </Main>
  );
}

export default Tables;
