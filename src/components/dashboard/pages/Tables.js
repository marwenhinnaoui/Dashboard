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
  Tooltip,

} from "antd";
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Main from "../layout/Main";





function Tables() {
  const [posts,setPosts]=useState([])
  const [loading, setLoading]=useState(false)
  
  function fetchData(){

    axios.get('http://localhost:8052/api/fullProdApi').then(res=>{
        console.log(res.data)
        setPosts(res.data)
        posts != null ? setLoading(true) : setLoading(false)
    })
    .catch(err=>{
        console.log(err)
    })
  }
  
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(()=>{
    fetchData()
},[])


  

  const [form] = Form.useForm();

  const [conditionButton, setConditionButton] = useState("");
  const [titleModal, setTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleInsert, setIsModalVisibleInsert] = useState(false);
  const showModal = (record,mode) => {
    
    
    //setEditingStudent({ ...record });
    if (mode=="edit"){
      setConditionButton("handleOk");
      setIsModalVisible(true);
    form.setFieldsValue(record);
  //  var title=form.getFieldValue("name")
    setTitle("Modifier Un produit :"+form.getFieldValue("name"))
  }

  if (mode=="add"){
    setConditionButton("handleInsert");
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setTitle("Ajouter Un Produit")
  }
    // console.log(id);
  };


  const ConditionMode =(r,type)=>{

    if (type=="handleInsert"){

      handleInsert(r);

    }

    if (type=="handleOk"){
      handleOk(r);

    }

  }


  const ModalOn = () => {
    setIsModalVisibleInsert(true);
  };

  const handleInsert=(r)=>{
    //console.log(r);
    axios.post('http://localhost:8052/api/addprod', r)
    .then(response=>{
      setPosts(posts.concat(response.data))
     
    })
    setIsModalVisible(false);
   
  

  }
  //////////////////whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
  const handleOk = (r) => {
   
    axios.put("http://localhost:8052/api/UpdateProd",r).then(res=>{
      
      fetchData()
        setIsModalVisible(false);
      

    }
    
    
    
    
    ).catch(err=>console.error(err))

  
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };


  const handleCancelInsert = () => {
    setIsModalVisibleInsert(false);
    setEditingStudent(null);
  };

  const deleteProduct=(Id)=>{
    Modal.confirm({
      title: "CONFIRMATION",
      icon: <ExclamationCircleOutlined />,
      content: "Confirmation de la supprission",
      okType: "danger",
      okText: "OUI",
      cancelText: "annuler",
      onOk: () => {
    axios.delete("http://localhost:8052/api/deleteprod/"+Id).then((response)=>
    {
      setPosts(posts.filter(post=>post.id!==Id));
    })

    }});
}

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
               <Tooltip title="Mettre a jour">
                <EditOutlined className="Action_edit" onClick={() => showModal(record,"edit")}/>
                </Tooltip>
                  <Tooltip title="Supprimer">
                  <DeleteOutlined onClick={() => deleteProduct(record.id)} />
                </Tooltip>
              </div>
            </div>
          </div>
      )},
  
  ];

  

  return (
    <Main>
    <Button onClick={() => showModal(null,"add")} className="Floating " type="primary" shape="round" icon={<AppstoreAddOutlined />}/>
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
                  dataSource={posts}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
          </Row>
      </div>
      <Modal 
      title={titleModal}
      visible={isModalVisible}
      
      onOk={() => ConditionMode(form.getFieldsValue(true),conditionButton)}
      onCancel={handleCancel}
      
      >
        <Form
        form={form}
        layout="vertical"
        >
          <Form.Item
          
          label="Id"
          name="id"
          >
            <Input 
            readOnly/>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            >
            <Input 
            />
          </Form.Item>
          <Form.Item
            label="Brand"
          name="brand">
            <Input 
            />
          </Form.Item>
          <Form.Item
          label="Price"
          name="price"
          >
            <Input 
            />
          </Form.Item>
          <Form.Item
          label="Made in"
          name="madein">
            <Input 
            />
          </Form.Item>
        </Form>
      </Modal>
    </Main>
  );
}

export default Tables;
