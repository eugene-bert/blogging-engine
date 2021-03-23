import React from "react";
import { Modal, Button } from 'antd';


const ArticleModal = ({className, article}) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <a className={className} onClick={(e) => {
                e.preventDefault()
                setVisible(true)
            }}>View article</a>
            <Modal
                title={article.title}
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={[]}
                width={1000}
            >
                {article.body}
            </Modal>
        </>
    );
}

export default ArticleModal;