import React from 'react'
import { Modal, Form, Row, Col, Input, Select, Divider, Button, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { AddTheaters, UpdateTheaters } from '../../api/theater'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { useDispatch, useSelector } from 'react-redux'

function TheaterModal({
    isModalOpen,
    setIsModalOpen,
    selectedTheater,
    setSelectedTheater,
    formType,
    getTheatersByOwner
}) {

    const dispatch = useDispatch()

    const user = useSelector(state => state.users)

    const handleCancel = () => {
        setIsModalOpen(false)
        setSelectedTheater(null)
    }

    const handleFinish = async (values) => {
        
        try {
            dispatch(showLoading())
            let response = null

            if (formType == "add"){
                response = await AddTheaters({...values, owner: user.user._id})
            }
            else if (formType == "edit"){
                const theaterId = selectedTheater._id
                response = await UpdateTheaters({...values, theaterId: theaterId})
                
            }

            if (response.success){
                getTheatersByOwner()
                message.success(response.message)
                setIsModalOpen(false)
            }
            else {
                message.error(response.message)
            }

            setSelectedTheater(null)
            dispatch(hideLoading())
        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
            message.error(error.message)
        }
    }

  return (
    <>
        <Modal centered title={formType == "add" ? "Add Theater" : "Edit Theater"}
            open={isModalOpen}
            onCancel={handleCancel}
            width={'60%'}
            footer={null}>
            
            <Form layout='vertical' className='px-5' initialValues={selectedTheater} onFinish={handleFinish}>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={24}>
                        <Form.Item label="Theater Name" name="theaterName" rules={[
                            {required: true, message: "Theater Name is required"}
                        ]}>
                            <Input type='text' placeholder='Enter Theater Name'/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Address" name="address" rules={[
                            {required: true, message: "Theater Address is Required"}
                        ]}>
                            <TextArea rows={2} placeholder='Enter Address'/>

                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                        <Form.Item label="State" name="state" rules={[
                            {required: true, message: "Select the state"}
                        ]}>
                            <Select options={[
                                {value: "Maharashtra", label: "Maharashtra"},
                                {value: "Telangana", label: "Telangana"},
                                {value: "Madhya Pradesh", label: "Madhya Pradesh"}
                            ]}>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="City" name="city" rules={[
                            {required: true, message: "City Name is required"}
                        ]}>
                            <Input type='text' placeholder='Enter City Name'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Pin Code" name="pincode">
                            <Input type='text' placeholder='Enter Pin Code'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Form.Item label="Phone No." name="phone" rules={[
                            {required: true, message: "Phone number is required"}
                        ]}>
                            <Input type='text' placeholder='Enter Phone Number'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" name="email" rules={[
                            {required: true, message: "Email ID is required"}
                        ]}>
                            <Input type='email' placeholder='Enter email address'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider type='horizontal'/>
                <Row className='d-flex justify-content-end'>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                    <Divider type='vertical'/>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Modal>
    </>
  )
}

export default TheaterModal