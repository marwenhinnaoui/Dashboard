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
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Main from "../layout/Main";





function Tables() {
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
      render: (item, record) => (
            <div>
            <div className="ant-employed ">
              <span></span>
              <div className="d-flex ">
                <EditOutlined className="Action_edit" onClick={() => showModal(record)}/>
                <DeleteOutlined className="Action_delete" onClick={() => deleteProduct(record.id)}/>
              </div>
            </div>
          </div>
      )},
  
  ];

  //Delete
  const deleteProduct=(Id)=>{
    Modal.confirm({
      title: "CONFIRMATION",
      icon: <ExclamationCircleOutlined />,
      content: "Confirmation de la supprission",
      okType: "danger",
      okText: "OUI",
      cancelText: "annuler",
      onOk: () => {
    axios.delete("https://app-crudmemlk.herokuapp.com/api/deleteprod/"+Id).then((response)=>
    {
      setData(data.filter(item=>item.id!==Id));
    })

    }});
}


  const [loading, setLoading]=useState(false)
  const [data, setData]=useState([

  ])

  //Fetch data
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



  //Update
  const handleOk = (r) => {
   
    axios.put("https://app-crudmemlk.herokuapp.com/api/UpdateProd",r).then(res=>{
      
       var newData=data;
    
       newData.map(
        post=>{
          if(r.id===post.id){
           //post.id=r.id;
            post.name=r.name;
            
            post.brand=r.brand;
            post.madein=r.madein;
            post.price=r.price;
          }
        }
      )     
      
      console.log(newData)
      setData(newData)
      console.log(data)
        setIsModalVisible(false);

    }

    ).catch(err=>console.error(err))
  };
  
  //Insert
  const ModalOn = () => {
    setIsModalVisibleInsert(true);
  };
  const handleCancelInsert = () => {
    setIsModalVisibleInsert(false);
    setEditingStudent(null);
  };

  const [isModalVisibleInsert, setIsModalVisibleInsert] = useState(false);
  const handleInsert=(r)=>{
    //console.log(r);
    axios.post('https://app-crudmemlk.herokuapp.com/api/addprod', r)
    .then(response=>{
      setData(data.concat(response.data))
    })
    setIsModalVisibleInsert(false);
  }




  //Modal
  //Update
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  const [form] = Form.useForm();
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setIsModalVisible(true);
    setEditingStudent({ ...record });
    form.setFieldsValue(record);
  };



  return (
    <Main>
    <Button onClick={ModalOn} className="Floating " type="primary" shape="round" icon={<AppstoreAddOutlined />}/>
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
      <Modal title="Add" visible={isModalVisible ? isModalVisible : isModalVisibleInsert} onOk={()=>isModalVisible ?handleOk(editingStudent) : handleInsert(editingStudent)} onCancel={isModalVisible ? handleCancel: handleCancelInsert}>
        <Form
        form={form}
        layout="vertical"
        >
          <Form.Item
          readOnly
          label="Id"
          >
            <Input placeholder="Id"

            value={
              isModalVisible ? editingStudent?.id :'Auto'
            }
            />
          </Form.Item>
          <Form.Item
            label="Name"
            >
            <Input placeholder="Name" 
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
            value={editingStudent?.name}
            />
          </Form.Item>
          <Form.Item
            label="Brand"
          >
            <Input placeholder="Brand" 
            value={editingStudent?.brand}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, brand: e.target.value };
              });
            }}
            />
          </Form.Item>
          <Form.Item
          label="Price"
          >
            <Input placeholder="Price" 
              value={editingStudent?.price}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, price: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
          label="Made in"
          >
            <Input placeholder="Made in"
            value={editingStudent?.madein}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, madein: e.target.value };
              });
            }} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </Main>
  );
}

export default Tables;
