import axios from "axios";
import { message } from 'antd';


export const getToken = () => {
  return localStorage.getItem("token");
};

const urls = {
  login: "login",
  register: "register",
  info: "info",
  articles: "articles",
};

function makePostRequest(url, params) {
  const token = getToken();
  return axios.post(`/api/v1/${url}`, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).catch(err => {
    message.error(err.message)
  });
}

function makeGetRequest(url, id) {
  const token = getToken();
  return axios.get(`/api/v1/${url}${id ? `/${id}` : ``}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).catch(err => {
    message.error(err.message)
  });
}

function makeDeleteRequest(url, id) {
  const token = getToken();
  return axios.delete(`/api/v1/${url}/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).catch(err => {
    message.error(err.message)
  });
}

function makePatchRequest(url, params, id) {
  const token = getToken();
  return axios.patch(`/api/v1/${url}/${id}`, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).catch(err => {
    console.log(err.message)
  });
}

function makePutRequest(url, params, id) {
  const token = getToken();
  return axios.put(`/api/v1/${url}/${id}`, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).catch(err => {
    message.error(err.message)
  });
}

class Api {
  async login(params) {
    return makePostRequest(urls.login, params);
  }
  async register(params) {
    return makePostRequest(urls.register, params);
  }
  async createArticle(params) {
    return makePostRequest(urls.articles, params);
  }
  async updateArticleByPut(id, params) {
    return makePutRequest(urls.articles, params, id);
  }
  async updateArticleByPatch(id, params) {
    return makePatchRequest(urls.articles, params, id);
  }
  async getArticles() {
    return makeGetRequest(urls.articles);
  }
  async getArticle(id) {
    return makeGetRequest(urls.articles, id)
  }
  async deleteArticle(id) {
    return makeDeleteRequest(urls.articles, id)
  }
  async getUserInfo() {
    return makeGetRequest(urls.info);
  }
}

export default new Api();
