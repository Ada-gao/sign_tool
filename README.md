# Signtool

> 理财师端App

## Prerequisite

先安装cordova
``` bash
# install cordova
 sudo npm install -g cordova
 ```

如果需要在iOS设备上运行，需要安装Xcode;再安装ios-deploy

``` bash
 sudo npm install -g ios-deploy -unsafe-perm=true --allow-root
 ```

如果需要在Android设备上运行，需要先安装Android Studio


## Build Setup



#install platform
cordova platform add android ios browser

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# run on ios devices
npm run ios

# run on android devices, if error, try to run  chmod +x platforms/android/gradlew  to fix
npm run android
```
