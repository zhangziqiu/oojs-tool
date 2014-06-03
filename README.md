#oojs-tool
oojs命令行工具, 可以用于js, css文件的 代码格式化, 代码压缩, gzip压缩等.

##安装
1. 安装node. 在官网 http://nodejs.org 根据自己的系统安装
2. npm install -g oojs-tool

##使用

js文件工具:
```js
oojs js a.js //进行js代码压缩, 输出 a.compress.js
oojs js a.js -o b.js //进行js代码压缩, 输出 b.js
oojs js a.js -format //进行js代码格式化, 输出 a.format.js
oojs js a.js -format -o b.js //进行js代码格式化, 输出 b.js
```   

css文件工具:
```js
oojs css a.css //进行css代码压缩, 输出 a.compress.css
oojs css a.css -o b.css //进行css代码压缩, 输出 b.css
oojs css a.css -format //进行css代码格式化, 输出 a.format.css
oojs css a.css -format -o b.css //进行css代码格式化, 输出 b.css
```  

gzip工具:
```js
oojs gzip a.js //进行gzip压缩, 输出 a.js.gz
oojs gzip a.js -o b.js //进行gzip压缩, 输出 b.js
oojs gzip a.js -c 5 //进行gzip压缩, 输出 a.js.gz, 压缩等级为5. 默认值为9(最高压缩率)
``` 
 
智能工具, 自动判断文件类型, 同时输出代码压缩文件, 代码格式化文件和gzip文件:
```js
oojs smart a.js //输出: a.compress.js, a.format.js, a.js.gz
oojs smart a.css //输出: a.compress.css, a.format.css, a.css.gz
```   
   