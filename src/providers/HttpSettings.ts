export const HTTP_URL_JSON = {
  login: {   //登录
    server: 'fideUserServer',
    url: '/user/login'
  },

  queryProductList: {  //查询产品列表
    server: 'fideCheifServer',
    url: '/product/queryProductList'
  },

  queryProductInfo: {  //查询产品信息
    server: 'fideCheifServer',
    url: '/product/queryProductInfo'
  },

  queryOrg: {  //查询附近银行机构
    server: 'fideUserServer',
    url: '/org/queryOrg'
  },

  getPersonalLoanStatus: { //查询我的资料状态
    server: 'fideUserServer',
    url: '/user/getPersonalLoanStatus'
  },

  queryPersonalMaterial: { //查询个人资料
    server: 'fideUserServer',
    url: '/user/queryPersonalMaterial'
  },

  isDataFill: {  //判断是否填写信贷资料
    "server": "fideUserServer",
    "url": "/user/isDataFill"
  }


};
