FROM nginx:alpine
LABEL maintainer="zhuangyinping@gmail.com"

EXPOSE 80
     
COPY ./platforms/android/app/build/outputs/apk/release/app-release.apk /usr/share/nginx/html/
ADD ./platforms/browser/www /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/
