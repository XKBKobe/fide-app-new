export const APPSTATUS = {
  SUCCESS_TOKEN: "SUCCESS_TOKEN"
};


export const BASIC_SETTINGS_JSON = {
  //"https://fidebsz.yuanbaopu.com/api/"线上
  //"https://fidebszltest.yuanbaopu.com/api/"云测

  "fideServer": "https://fidebszltest.yuanbaopu.com/api/"
};


export const CONSTANTS = {
  orgCode: "400000", //机构编码
  defaultCode: "330100", //默认城市code
  defaultCity: "杭州市", //默认城市
};

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

  //住宅性质
  houseType: [{text: "亲属产权", value: "A"}, {text: "自购无按揭", value: "B"}, {text: "自购按揭", value: "C"}, {
    text: "租用",
    value: "D"
  }, {text: "自建房", value: "E"}],

  //婚姻状况
  marriage: [{text: "未婚", value: 2}, {text: "已婚", value: 3}, {text: "离异", value: 4}, {text: "丧偶", value: 5}],

  //配偶文化程度  最高学历
  education: [{text: "研究生及以上", value: "5"}, {text: "本科", value: "4"}, {text: "大专", value: "3"}, {
    text: "中专",
    value: "2"
  }, {text: "高中", value: "1"}, {text: "初中及以下", value: "0"}],

  //配偶单位性质 单位性质
  orgType: [{text: "国有", value: "A"}, {text: "外商独资", value: "B"}, {text: "合资、合作企业", value: "C"}, {
    text: "私营企业",
    value: "D"
  }, {text: "事业单位", value: "E"}, {text: "国有行政机 关", value: "F"}, {text: "股份制", value: "H"}, {
    text: "上市公司",
    value: "I"
  }, {text: "其他", value: "G"}],

  //有无子女
  children: [{text: "无子女", value: "0"}, {text: "有子女", value: "1"}],

  //是否购车
  carProperty: [{text: "没有汽车", value: "1"}, {text: "有1辆车，有车贷", value: "2"}, {
    text: "有1辆车，无车贷",
    value: "3"
  }, {text: "有1辆以上，有车贷", value: "4"}, {text: "有1辆以上，无车贷", value: "5"}],

  //月收入
  monthIncome: [{text: "3000以下", value: "0"}, {text: "3000-5000（不含）", value: "1"}, {
    text: "5000-10000（不含）",
    value: "2"
  }, {text: "10000以上", value: "3"}],

  //行业
  industry: [{text: "农/林/牧/渔业", value: "A"}, {text: "制造业", value: "C"}, {
    text: "批发和零售业",
    value: "F"
  }, {text: "交通运/仓储和邮政业", value: "G"}, {text: "住宿和餐饮业", value: "H"}, {
    text: "信息传输/软件和信息技术服务业",
    value: "I"
  }, {text: "居民服务/修理和其他服务业", value: "O"}, {text: "教育", value: "P"}, {text: "文化/体育和娱乐业", value: "R"}],

  //经营背景类型
  businessBackgroundType: [{text: "个体工商户", value: "010"}, {text: "承包挂靠协议、摊位证明", value: "020"}, {
    text: "小企业主",
    value: "030"
  }, {text: "其他", value: "040"}],
};


//个人资料的配置  数目 7
export const PERSON_DATA = {
  name: {isShow: false, isRequire: false, requireText: '请输入姓名'}, //姓名
  idNumber: {isShow: false, isRequire: false, requireText: '请身份证号'}, //身份证号
  applyAmount: {isShow: false, isRequire: false, requireText: '请申请额度'}, //申请额度
  identityPic: {isShow: false, isRequire: false, requireText: '请上传身份证照片'}, //身份证照片
  cmCode: {isShow: false, isRequire: false, requireText: '请输入推荐码'}, //推荐码
  repaymentType: {isShow: false, isRequire: false, requireText: '请选择还款方式'}, //还款方式
  purpose: {isShow: false, isRequire: false, requireText: '请选择贷款用途'} // 贷款用途
};


//基础资料配置  数目 63
export const BASICS_DATA = {
  merchant: {isShow: false, isRequire: false, requireText: '请选择受托支付商家'},
  email: {isShow: false, isRequire: false, requireText: '请输入电子邮箱'},
  qqNum: {isShow: false, isRequire: false, requireText: '请输入qq账号'},
  household: {isShow: false, isRequire: false, requireText: '请选择户籍'},
  primaryContact: {isShow: false, isRequire: false, requireText: '请填写家庭联系人信息'},
  secondaryContact: {isShow: false, isRequire: false, requireText: '请填写第二联系人信息'},
  bankCode: {isShow: false, isRequire: false, requireText: '请选择常用银行卡开户行'},
  cardNumber: {isShow: false, isRequire: false, requireText: '请输入常用银行卡卡号'},
  liveAddress: {isShow: false, isRequire: false, requireText: '请输入住址'},
  houseAddressZipCode: {isShow: false, isRequire: false, requireText: '请输入住宅地址邮编'}, //4.7新增
  houseProperty: {isShow: false, isRequire: false, requireText: '请输入房产地址'}, //5.1.0 todo
  houseAddress: {isShow: false, isRequire: false, requireText: '请选择住宅情况'},
  houseProprietaryCertificate: {isShow: false, isRequire: false, requireText: '请上传房产证明照片'},
  houseType: {isShow: false, isRequire: false, requireText: '请选择住宅性质'},
  electricityAccountName: {isShow: false, isRequire: false, requireText: '请输入电费用户名'}, //4.7新增
  liveProof: {isShow: false, isRequire: false, requireText: '请上传信用卡纸质账单或水电煤账单照片'},
  residenceBook: {isShow: false, isRequire: false, requireText: '请上传户口本照片'},
  financialAssetsProof: {isShow: false, isRequire: false, requireText: '请上传金融资产证明照片'},
  marriage: {isShow: false, isRequire: false, requireText: '请选择婚姻状况'},
  marriageLicense: {isShow: false, isRequire: false, requireText: '请上传结婚证照片'},
  spouse: {isShow: false, isRequire: false, requireText: '请填写配偶信息'},
  spouseIdentityPic: {isShow: false, isRequire: false, requireText: '请上传配偶身份证照片'},
  other: {isShow: false, isRequire: false, requireText: '请输入母亲姓氏'},
  children: {isShow: false, isRequire: false, requireText: '请选择有无子女'},
  carProperty: {isShow: false, isRequire: false, requireText: '请选择是否购车'},
  driverLicense: {isShow: false, isRequire: false, requireText: '请上传行驶证照片'},
  education: {isShow: false, isRequire: false, requireText: '请选择文化程度'}, //新增文化程度（4.6.0）
  diploma: {isShow: false, isRequire: false, requireText: '请上传学历学位证书照片'},
  orgName: {isShow: false, isRequire: false, requireText: '请输入单位名称'},
  workTelephone: {isShow: false, isRequire: false, requireText: '请输入单位电话'}, //4.2.0新增
  orgType: {isShow: false, isRequire: false, requireText: '请选择单位性质'},
  companyAddress: {isShow: false, isRequire: false, requireText: '请输入单位地址'}, //新增（4.6.0）
  companyAddressZipCode: {isShow: false, isRequire: false, requireText: '请输入单位地址邮编'}, //4.7.0
  occAge: {isShow: false, isRequire: false, requireText: '请输入在职单位工龄'},
  occupation: {isShow: false, isRequire: false, requireText: '请输入在职单位职位或岗位'},
  annualIncome: {isShow: false, isRequire: false, requireText: '请输入年收入'},
  monthIncome: {isShow: false, isRequire: false, requireText: '请选择现月收入'},
  industry: {isShow: false, isRequire: false, requireText: '请选择行业'},
  businessLicenseName: {isShow: false, isRequire: false, requireText: '请输入营业执照名称'},
  manageAddress: {isShow: false, isRequire: false, requireText: '请输入经营地址'},
  businessBackgroundType: {isShow: false, isRequire: false, requireText: '请选择经营背景类型'}, //4.7.0
  customerType: {isShow: false, isRequire: false, requireText: '请选择客户类型明细'}, //5.1.0  todo
  businessLicense: {isShow: false, isRequire: false, requireText: '请上传营业执照照片'},
  tobaccobusinessLicense: {isShow: false, isRequire: false, requireText: '请上传烟草营业执照照片'}, //5.1.0 todo
  shopFront: {isShow: false, isRequire: false, requireText: '请上传店铺门面照片'}, //5.1.0 todo
  loanSnapshop: {isShow: false, isRequire: false, requireText: '请上传淘宝/天猫贷款截图'},
  registerSnapshop: {isShow: false, isRequire: false, requireText: '请上传店铺注册截图'},
  sharesIdentityPic: {isShow: false, isRequire: false, requireText: '请上传股东身份证照片'},
  sharesCertificate: {isShow: false, isRequire: false, requireText: '请上传股权证明照片'},
  agentContractConsignation: {isShow: false, isRequire: false, requireText: '请上传授权代理合同照片'},
  taxRegistCertificate: {isShow: false, isRequire: false, requireText: '请上传税务登记证照片'},
  orgCodeCertificate: {isShow: false, isRequire: false, requireText: '请上传机构代码证照片'},
  capitalVerificationReport: {isShow: false, isRequire: false, requireText: '请上传验资报告照片'},
  franchiseContract: {isShow: false, isRequire: false, requireText: '请上传加盟合同照片'}, //4.2.0新增
  leaseAgreement: {isShow: false, isRequire: false, requireText: '请上传租赁合同照片'},  //4.2.0新增
  orgCredit: {isShow: false, isRequire: false, requireText: '请上传企业征信照片'}, //佐力
  juridicalPersonsIdentityPic: {isShow: false, isRequire: false, requireText: '请上传法人身份证照片'}, //佐力
  threePartyPaymentContract: {isShow: false, isRequire: false, requireText: '请上传三方回款任务合同照片'}, //佐力
  userCredit: {isShow: false, isRequire: false, requireText: '请上传个人征信照片'}, //佐力
  juridicalPersonsCredit: {isShow: false, isRequire: false, requireText: '请上传法人征信照片'}, //佐力
  juridicalPersonsSpouseIdentityPic: {isShow: false, isRequire: false, requireText: '请上传法人配偶身份证照片'}, //佐力
  successivePaymentContract: {isShow: false, isRequire: false, requireText: '请上传连续三年回款合同照片'}, //佐力
  userOtherMaterial: {isShow: false, isRequire: false, requireText: '请上传其他凭证资料'}
};

//数据源的展示 数目 9
export const CREDIT_DATA_SETTING = {
  ALIPAY: {isShow: false, isRequire: false, requireText: '请绑定支付宝账户', num: 0},
  OTO: {isShow: false, isRequire: false, requireText: '请绑定外卖团购', num: 0},
  POS: {isShow: false, isRequire: false, requireText: '请绑定POS账户', num: 0},
  TOBACCO: {isShow: false, isRequire: false, requireText: '请绑定烟草账户', num: 0},
  BANK_CARD: {isShow: false, isRequire: false, requireText: '请绑定银行账户', num: 0},
  ACCUMULATIONFUND: {isShow: false, isRequire: false, requireText: '请绑定公积金账户', num: 0},
  YHZX: {isShow: false, isRequire: false, requireText: '请绑定个人简版征信', num: 0},
  PERSONAL_CREDIT: {isShow: false, isRequire: false, requireText: '请签约个人征信授权', num: 0},
  HUIMIN_CREDIT: {isShow: false, isRequire: false, requireText: '请签约惠民征信', num: 0}
};


export const CREDIT_DATA = [
  {name: '支付宝', img: './assets/imgs/myData/creditData/alipay.png', type: 'alipay'}, //支付宝
  {name: '银行卡', img: './assets/imgs/myData/creditData/bank.png', type: 'bank'}, //银行卡
  {name: '烟草账户', img: './assets/imgs/myData/creditData/tobacco.png', type: 'yc'}, //烟草账户
  {name: '公积金', img: './assets/imgs/myData/creditData/fund.png', type: 'gjj'}, //公积金
  {name: 'POS', img: './assets/imgs/myData/creditData/pos.png', type: 'pos'}, //POS
  {name: '外卖团购', img: './assets/imgs/myData/creditData/takeout.png', type: 'takeout'}, //外卖团购
  {name: '个人简版征信', img: './assets/imgs/myData/creditData/yhzx.png', type: 'yhzx'}, //个人简版征信
  {name: '个人征信授权', img: './assets/imgs/myData/creditData/perCredit.png', type: 'perCredit'}, //个人征信授权
  {name: '惠民征信授权', img: './assets/imgs/myData/creditData/huimin.png', type: 'huimin'}, //惠民征信授权
];



