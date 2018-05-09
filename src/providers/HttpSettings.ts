//常用数据
export const CommDatas = {
  //贷款用途
  purpose: [{text: "消费", value: 'A'}, {text: "生产经营", value: 'B'}, {text: "住房消费贷款", value: 'C'}, {
    text: "汽车消费贷款",
    value: 'D'
  }, {text: "其它消费贷款", value: 'E'}],

  //家庭联系人关系
  contactData: [{text: "父母", value: "PARENT_CHILD"}, {text: "夫妻", value: "SPOUSE"}, {text: "子女", value: "CHILD"}],

  //第二联系人关系
  secondContactData: [{text: "同事", value: "COLLEAGUE"}, {text: "朋友", value: "FRIEND"}, {
    text: "亲戚",
    value: "RELATIVES"
  }, {text: "其他", value: "OTHER"}],

  //常用开户银行
  commonBank: [{text: "中国工商银行", value: "icbc"}, {text: "中国农业银行", value: "abc"}, {
    text: "中国银行",
    value: "boc"
  }, {text: "中国建设银行", value: "ccb"}, {text: "中信银行", value: "citic"}, {text: "中国光大银行", value: "ceb"}, {
    text: "中国民生银行",
    value: "cmbc"
  }, {text: "兴业银行", value: "cib"}, {text: "广发银行", value: "cgb"}, {text: "平安银行", value: "pab"}, {
    text: "中国招商银行",
    value: "cmb"
  }, {text: "中国邮政储蓄银行", value: "psbc"}],

  //住宅情况
  houseProperty: [{text: "没有房产", value: 1}, {text: "有1套房，有房贷", value: 2}, {
    text: "有1套房，无房贷",
    value: 3
  }, {text: "有1套以上，有房贷", value: 4}, {text: "有1套以上，无房贷", value: 5}],

};


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
