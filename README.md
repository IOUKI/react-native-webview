# WebView Example

## 專案建置流程
1. 創建專案
```bat
npx react-native init ${project name}
```
2. 前往android/app/src/main/AndroidManifest.xml，添加以下資料
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.app">
    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:usesCleartextTraffic="true"  <!-- 允許 HTTP 請求 -->
        ...>
        <!-- 其他設定 -->
    </application>
</manifest>
```
3. 下載webview套件
```bat
npm install --save react-native-webview
```
4. 修改App.tsx
```tsx
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView originWhitelist={['*']} source={{ uri: 'your.url' }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
```

## Android build apk
1. 使用keytool生成私鑰，下完command後會填寫一些資料，填寫完後私鑰就會產生在當前路徑
```bat
keytool -genkey -v -keystore ${名稱}.keystore -alias ${別名} -keyalg RSA -keysize 2048 -validity 10000
```
my example
```bat
keytool -genkey -v -keystore lan.keystore -alias lankey -keyalg RSA -keysize 2048 -validity 10000
```
2. 前往android/app/創建gradle.properties檔案並加入以下內容
```text
MYAPP_RELEASE_STORE_FILE=my-release-key.jks
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=你的密鑰存儲密碼
MYAPP_RELEASE_KEY_PASSWORD=你的密鑰密碼
```
3. 前往android/app/build.gradle 中，找到 signingConfigs 部分，並進行如下修改
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```
4. 生成apk，apk檔案會產生在android/app/outputs/apk/release/app-release.apk
```bat
cd android
./gradlew assembleRelease
```