import axios from "axios";
import qs from "querystring";

class RequestApi {
  init() {
    this.source = axios.CancelToken.source();
    const config = {
      timeout: 60000,
      cancelToken: this.source.token,
      responseType: "json",
      headers: {
        // 如果需要为form-data数据，则需要改这里
        "Content-type": "application/json;charset=utf-8"
      },
      withCredentials: true
    };
    this.$http = axios.create(config);
    // 请求拦截
    this.$http.interceptors.request.use(
      config => {
        if (config.method.toLowerCase() === "get") {
          // 参数需要序列化
          config.data = qs.stringify(config.data);
        }
        config.headers[
          "Authorization"
        ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJfaWQiOjEsImlhdCI6MTYwMDk5Njc2NSwiZXhwIjoxNjA5NjM2NzY1fQ._Jyfm-JeYQH9KLcUW4_RiwiWun7u-9ryupyKPV8jm1U`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  /**
   * 发起请求方法
   */
  request({
    url,
    data = {},
    type = "get",
    headers = {},
    beforeSend,
    completed
  }) {
    return new Promise((resolve, reject) => {
      if (type.toLowerCase() === "get") {
        // 所有get接口添加一个nowtime作为当前请求的时间
        data = {
          params: data
        };
        data.params.nowtime = new Date().getTime();
      }
      beforeSend && beforeSend();
      this.$http[type](url, data, {
        ...data,
        headers: headers
      }).then(
        response => {
          completed && completed();
          resolve(response.data.data);
        },
        error => {
          completed && completed();
          if (axios.isCancel(error)) {
            return;
          }
          if (error && error.message === "Network Error") {
            reject("网络错误");
          }
          reject(error.response || error);
        }
      );
    });
  }
}
export default new RequestApi();
