import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import LoginForm from "../LoginForm/LoginForm";


const LogInModal = () => {
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
        <>
            <Button  className="login-button" type="primary" onClick={showModal}>
                Start creating
            </Button>
            <Modal footer={null} title="Create account" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <LoginForm />
            </Modal>
        </>
    )
}

export default LogInModal