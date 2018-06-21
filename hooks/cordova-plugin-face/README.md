## 使用说明

#### 一.集成工作

在项目.meteor/cordova-plugins中增加cordova-plugin-face插件

例如：cordova-plugin-face@../../../cordova_plugins/cordova-plugin-face


#### 二.js调用说明

1.活体检测，获取活体检测 **delta** 和 **image_best**

    cordova.plugins.FacePlugin.startFaceDecetion(
        function (success) {//活体检测成功回调函数,success返回数据对象。
        
			// success结构：
        			{
        				delta:"xxx",
        				imgBase64:"xxx",
        				action1:"xxx",
        				action2:"xxx",
        				action3:"xxx"
        			}
        },
        function (error) {
        //活体检测失败回调函数，error为失败原因。
        }
    );
    
    
2.获取身份证照片，返回 **身份证照片(idCardImgBase64)** 和 **图像中头像照片(portraitImgBase64)**

	cordova.plugins.FacePlugin.checkIDCard(
            {
                cardSide: 1    //检测身份证参数：0正面，1反面
            },
            function (result) {//身份证检测成功回调函数,success返回数据对象。
            
			// success结构：
        			{
        				idCardImgBase64:"xxx",
        				portraitImgBase64:"xxx"
        			}
            },
            function (error) {
                logger.info("失败：" + error);
            }
	);


#### 三.注意事项

1.因安卓插件部分页面引用资源文件，所以需要修改import 引入的信息。

    src/android/src/update 中文件，需要将import com.yuanbaopu.bpapp.R修改import 项目包名.R;


2.因安卓插件部分xml中有自定义view,所以控件信息需要修改。

    src/android/layout/update 中文件，需要将com.yuanbaopu.databox修改为项目包名。