import React, { Fragment } from "react";
import { Modal, Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import uuid from "react-uuid";
import api from "../../api";
import { useApplicationContext } from "../../application.context";
import "./ArticleModal.scss";

const ArticleModal = ({ className, article, isAdmin }) => {
  const { state, dispatch } = useApplicationContext();
  const [visible, setVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editValue, setEditValue] = React.useState({
    title: article.title,
    body: article.body,
  });

  return (
    <>
      <a
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setVisible(true);
        }}
      >
        View article
      </a>
      <Modal
        title={
          <Fragment>
            {!editMode ? (
              article.title
            ) : (
              <Input
                className="article-modal__title-input"
                defaultValue={article.title}
                onPressEnter={() => {
                  setEditMode(false);
                }}
                onChange={(event) => {
                  setEditValue({
                    title: event.target.value,
                    body: editValue.body,
                  });
                }}
              />
            )}
          </Fragment>
        }
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => {
          setVisible(false);
        }}
        afterClose={() => setEditMode(false)}
        footer={[
          <div key={uuid()} className="article-modal__footer">
            <div>
              <p className="article-author">
                {article.first_name} {article.last_name}
              </p>
            </div>
            {isAdmin && (
              <div className="article-modal__actions">
                {editMode ? (
                  <Fragment>
                    <Button
                      onClick={() => {
                          api.deleteArticle(article.id).then(data => {
                              if (data.status === 200) {
                                  api.getArticles().then((data) => {
                                      dispatch({
                                          type: "SET_ALL_ARTICLES",
                                          payload: data.data,
                                      });
                                  });
                              }
                          })
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    <Button>Cancel</Button>
                    <Button
                      onClick={() => {
                        setEditMode(false);
                        api
                          .updateArticleByPatch(article.id, {
                            title: editValue.title,
                            body: editValue.body,
                          })
                          .then((data) => {
                            if (data.status === 200) {
                              api.getArticles().then((data) => {
                                dispatch({
                                  type: "SET_ALL_ARTICLES",
                                  payload: data.data,
                                });
                              });
                            }
                          });
                      }}
                    >
                      Save
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>,
        ]}
        width={1000}
      >
        {!editMode && article.body}
        {editMode && (
          <Input.TextArea
            defaultValue={article.body}
            onChange={(event) => {
              setEditValue({
                title: editValue.title,
                body: event.target.value,
              });
            }}
            autoSize
            onPressEnter={() => {
              setEditMode(false);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default ArticleModal;
