package com.yuanbaopu.databox;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.Manifest;

import com.megvii.idcardquality.IDCardQualityLicenseManager;
import com.megvii.licensemanager.Manager;
import com.megvii.livenessdetection.LivenessLicenseManager;

import java.lang.Thread.UncaughtExceptionHandler;


public class FacePlugin extends CordovaPlugin {
    private static final String TAG = "FacePlugin";

    private String initError = null;
    private Activity mActivity;
    public static CallbackContext mCallbackContext;
    private JSONArray mWatchArgs = null;
    private String mWatchAction = null;

    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    /**
     * FacePlugin for JS calls from Cordova
     */
    @Override
    public boolean execute(String action, JSONArray inputs, CallbackContext callbackContext) throws JSONException {
        mActivity = this.cordova.getActivity();
        mCallbackContext = callbackContext;
        mWatchArgs = inputs;
        mWatchAction = action;

        try {
            if (initError != null) {
                callbackContext.error(initError);
            } else if ("startFaceDecetion".equals(action)) {
                final CallbackContext cordovaContext = callbackContext;

                cordova.getThreadPool().execute(new Runnable() {
                    public void run() {
                        startFaceDecetion(cordovaContext);
                    }
                });

            } else if ("checkIDCard".equals(action)) {
                final int typeCode = inputs.getJSONObject(0).getInt("cardSide");
                final CallbackContext cordovaContext = callbackContext;

                cordova.getThreadPool().execute(new Runnable() {
                    public void run() {
                        checkIDCard(typeCode, cordovaContext);
                    }
                });

            } else {
                Log.w(TAG, "Invalid action passed: " + action);
                PluginResult result = new PluginResult(Status.INVALID_ACTION);
                callbackContext.sendPluginResult(result);
            }
        } catch (Exception e) {
            Log.w(TAG, "Caught exception during execution: " + e);
            String message = e.toString();
            callbackContext.error(message);
            return false;
        }

        return true;
    }

    /**
     * 活体检测
     */
    private void startFaceDecetion(final CallbackContext callbackContext) {
        Manager manager = new Manager(mActivity);
        LivenessLicenseManager licenseManager = new LivenessLicenseManager(mActivity);
        manager.registerLicenseManager(licenseManager);

        manager.takeLicenseFromNetwork(ConUtil.getUUIDString(mActivity));

        if (licenseManager.checkCachedLicense() > 0) {// 成功
            mActivity.startActivity(new Intent(mActivity, LivenessActivity.class));
        } else {// 失败
            mCallbackContext.success("联网授权失败！请检查网络或找服务商");
        }
    }


    /**
     * 身份证
     */
    private void checkIDCard(final int cardSide, final CallbackContext callbackContext) {
        Manager manager = new Manager(mActivity);
        IDCardQualityLicenseManager idCardLicenseManager = new IDCardQualityLicenseManager(mActivity);
        manager.registerLicenseManager(idCardLicenseManager);
        manager.takeLicenseFromNetwork(Util.getUUIDString(mActivity));

        if (idCardLicenseManager.checkCachedLicense() > 0) {
            Intent intent = new Intent(mActivity, IDCardScanActivity.class);
            intent.putExtra("side", cardSide);
            mActivity.startActivity(intent);
        } else {// 失败
            mCallbackContext.error("联网授权失败！请检查网络或找服务商");
        }
    }
}
