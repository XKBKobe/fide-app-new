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

//个人信息的配置
export const PERSON_DATA = {
  name: {isShow: false, isRequire: false, requireText: '请输入姓名'}, //姓名
  idNumber: {isShow: false, isRequire: false, requireText: '请身份证号'}, //身份证号
  applyAmount: {isShow: false, isRequire: false, requireText: '请申请额度'}, //申请额度
  identityPic: {isShow: false, isRequire: false, requireText: '请上传身份证照片'}, //身份证照片
  cmCode: {isShow: false, isRequire: false, requireText: '请输入推荐码'}, //推荐码
  repaymentType: {isShow: false, isRequire: false, requireText: '请选择还款方式'}, //还款方式
  purpose: {isShow: false, isRequire: false, requireText: '请选择贷款用途'} // 贷款用途
};


//数据源的展示
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
