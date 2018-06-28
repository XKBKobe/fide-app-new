# 使用说明

一.集成工作

1).项目mobile-config.js，需添加如下代码，xxxxxx处引入百度定位API_KEY。
```
App.configurePlugin('baidulocation', {
    API_KEY: 'xxxxxx'
});
```
`API_KEY自行去百度开放平台申请`http://alading.baidu.com/
<br>
<br>
<br>
二.js调用说明
```
cordova.plugins.BaiduLocation.getLocation(function (addrInfo) {
    //因插件有时获取不到地点信息，所以根据经纬度逆地址解析获取位置地点信息。
    function getAddInfoProcess() {
        var point = new BMap.Point(addrInfo.lontitude, addrInfo.latitude);
        var geo = new BMap.Geocoder();
        geo.getLocation(point, function (rs) {
            //rs返回内容如下格式
            //rs.point.lat = '30.314791'
            //rs.point.lng = '120.265183'
            //rs.address = '浙江省杭州市江干区九和路'
            //rs.addressComponents.streetNumber = ''
            //rs.addressComponents.street = '九和路'
            //rs.addressComponents.district = '江干区'
            //rs.addressComponents.city = '杭州市'
            //rs.addressComponents.province = '浙江省'

        };
    };
})
```