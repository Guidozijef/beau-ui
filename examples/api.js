import requestApi from "./request";
requestApi.init();
const urlData = {
  getListDemoApi: `http://www.local.cc/basis/api/user/pagination`,
  getDetailData: `http://www.local.cc/basis/api/user/info`,
  getImageList: `http://www.local.cc/common/api/files`,
  // 根据角色ID获取菜单数据
  postPermissionRole: `http://localhost:8080/basis/api/permission/role`
};
export function postPermissionRole(data) {
  return requestApi.request({
    url: urlData.postPermissionRole,
    data,
    type: "post"
  });
}
// 获取详情信息
export function getDetailDataListMock() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          create_time: "2020-12-12 17:01:24",
          creator: "administrator",
          id: 1,
          is_delete: "N",
          is_enable: "Y",
          modify_time: "2020-12-12 17:01:24",
          nickname: "devilruiniu",
          phone: "15323487059",
          role_ids: "1",
          username: "administrator"
        },
        {
          create_time: "2020-12-12 17:09:09",
          creator: "administrator",
          id: 21,
          is_delete: "N",
          is_enable: "Y",
          modify_time: "2020-12-12 17:09:09",
          nickname: "测试账号20",
          phone: "15002899999",
          role_ids: null,
          username: "10000020"
        }
      ]);
    }, 1000);
  });
}
// 获取详情信息
export function getDetailDataMock() {
  return requestApi.request({
    url: `${urlData.getDetailData}/20`,
    type: "get"
  });
}
// 多级的children结构数据
export function multipleChildrenMock() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          fullPath: "01",
          name: "广东省",
          children: [
            {
              fullPath: "0101",
              name: "广州市",
              children: [
                { fullPath: "010101", name: "南沙区", children: [] },
                { fullPath: "010102", name: "越秀区", children: [] }
              ]
            },
            {
              fullPath: "0102",
              name: "深圳市",
              children: [
                { fullPath: "010201", name: "南山区", children: [] },
                { fullPath: "010202", name: "福田区", children: [] },
                { fullPath: "010203", name: "宝安区", children: [] },
                { fullPath: "010204", name: "龙华区", children: [] },
                { fullPath: "010205", name: "龙岗区", children: [] },
                { fullPath: "010206", name: "盐田区", children: [] },
                { fullPath: "010207", name: "光明新区", children: [] },
                { fullPath: "010208", name: "罗湖区", children: [] }
              ]
            }
          ]
        },
        {
          fullPath: "02",
          name: "江西省",
          children: [
            {
              fullPath: "0201",
              name: "南昌市",
              children: [{ fullPath: "020101", name: "南昌县", children: [] }]
            },
            {
              fullPath: "0202",
              name: "宜春市",
              children: [
                { fullPath: "020201", name: "铜鼓县", children: [] },
                { fullPath: "020202", name: "宜丰县", children: [] },
                { fullPath: "020203", name: "上高县", children: [] },
                { fullPath: "020204", name: "万载县", children: [] }
              ]
            }
          ]
        }
      ]);
    }, 1000);
  });
}
// 两级的结构数据
export function childrenMock() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "一级",
          children: [
            { id: 11, name: "一级1-1" },
            { id: 12, name: "一级1-2" }
          ]
        },
        {
          id: 2,
          name: "二级",
          children: [
            { id: 21, name: "二级2-1" },
            { id: 22, name: "二级2-2" }
          ]
        },
        {
          id: 3,
          name: "三级",
          children: [
            { id: 31, name: "三级3-1" },
            { id: 32, name: "三级3-2" }
          ]
        }
      ]);
    }, 1000);
  });
}
export function getListDemoApi(data) {
  return requestApi.request({
    url: urlData.getListDemoApi,
    data,
    type: "get"
  });
}
export function getImageList() {
  return requestApi.request({
    url: urlData.getImageList,
    type: "get"
  });
}
