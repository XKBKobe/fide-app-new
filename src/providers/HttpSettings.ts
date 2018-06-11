export const HTTP_URL_JSON = {
  login: { //登录
    server: 'fideUserServer',
    url: '/user/login'
  },
  getPerson: { //获取用户信息
    server: "fideUserServer",
    url: "/user/getPerson"
  },
  queryProductList: { //查询产品列表
    server: 'fideCheifServer',
    url: '/product/queryProductList'
  },
  queryProductInfo: { //查询产品信息
    server: 'fideCheifServer',
    url: '/product/queryProductInfo'
  },
  queryOrg: { //查询附近银行机构
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
  isDataFill: { //判断是否填写信贷资料
    "server": "fideUserServer",
    "url": "/user/isDataFill"
  },
  editPersonalMaterial: { //编辑个人信息基础信息
    server: "fideUserServer",
    url: "/user/editPersonalMaterial"
  },
  queryOrgByProduct: { //查查询产品的银行
    server: "fideUserServer",
    url: "/org/queryOrgByProduct"
  },
  applyLoan: { //个人资料提交贷款
    server: "fideCheifServer",
    url: "/loan/applyLoan"
  },
  myLoans: {  //我的贷款
    server: "fideCheifServer",
    url: "/loan/myLoans"
  },
  queryPersonalMaterialSetting: { //查询个人信息配置项
    server: "fideUserServer",
    url: "/user/queryPersonalMaterialSetting"
  },
  queryLoanLog: { //我的贷款日志
    server: "fideCheifServer",
    url: "/loan/queryLoanLog"
  },
  updatepwd: { //修改密码
    server: "fideUserServer",
    url: "/user/updatepwd"
  },
  queryAccountByType: { //查询数据源列表
    server: "fideDataGServer",
    url: "/account/queryAccountByType"
  },
  getOrgBankInfo4App: { //数据源银行卡
    server: "fideCheifServer",
    url: "/bankcard/getOrgBankInfo4App"
  },
  perCredit: { //percredit个人征信
    server: "fideCreditServer",
    url: "/loan/percredit"
  },
  getDatagUrl: { //DatagUrl
    server: "fideDataGServer",
    url: "/dataG/getDataBindLoginPage"
  },
  signPersonalCreditForWx: {  //个人征信授权
    server: "fideThirdServer",
    url: "/sign/signPersonalCreditForWx"
  }

};
