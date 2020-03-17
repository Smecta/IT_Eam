# IT_Eam
Enterprise Asset Management (EAM) for IT 

参照老师：全栈之巅 B站UP主

运用的技术栈 NodeJs + Element UI + Express + MongoDB

介绍：
设备资产管理系统(EAM, Enterprise Asset Management) 为了解决中小型企业IT运维人员登记公司固定资产统计使用，包含使用年限统计，录入，查询等功能

model字段：
it_device   it设备
device_number 设备编号   字符串
device_name 设备名称     字符串
device_categories 设备类别    分类选择 台式机 笔记本 打印机
device_detail 设备详细      字符串
device_unit 设备单位        选择 套 台 
device_count 设备数量       字符串
device_price 设备价格       字符串
record_date 登记日期        字符串
depreciable_life 折旧年限   字符串
device_user 设备使用人      字符串
device_department 部门
device_location 设备位置    字符串
remark 其他                 字符串





git 同步方法：
1. git add .
1. git commit -am "初始化"
1. git remote add it_eam git@github.com:Smecta/IT_Eam
1. git push -u it_eam master

初始化项目
在根目录
安装 vue  需要 npm i -g @vue/cli
vue create web 
vue create admin 
mkdir server
      所有nodejs 服务端项目，后台管理页面提供的接口，后台web页面提供的接口
初始化后端服务端 server 
    npm init -y  自动生成packgae.json
    新建入口文件，index.js
    使用 npm run serve 来进行启动服务端，在package.json 里面的脚本scripts标签下 添加
    "serve": "nodemon index.js",
    nodemon 安装需要 npm i -g nodemon 
    npm run serve 启动项目


后台搭建
  cd server
安装 npm i express@next mongoose cors 
一次安装 express 下一个版本，和mongoose 和解决跨域请求的cors

# 通用CRUD接口
npm i inflection 
单复数转换，下划线，单词格式转换...等等


# 更新日志
1. 更新设备列表分页器
2. 更新设备列表日期过滤器（年月日）
2. 更新条件模糊搜索（前端computed计算属性模糊搜索）
## 待更新
1. 修复年限为分类属性
3. 添加列表排序功能


# 部署
npm run build 
默认生成 dist

配置 vue.config.js
outputDir: __dirname + '/../server/admin',  
设置导出路径为server下根目录名字为admin文件夹


# 安装数据库及其他

ubuntu 19.10 live-server aliyun OS 

输入sudo passwd，会提示输入自己的密码、紧接着是设置root用户的密码、再次确认root用户的密码
需要登录时，输入su再输入root的密码即可切换到root用户

apt show mongodb-server
查看mongodb-server 的版本
apt install -y mongodb-server 

apt install nodejs

apt install npm 

配置淘宝镜像
npm config set registry https://registry.npm.taobao.org

npm i -g nrm
快速切换npm镜像的工具
nrm current
查看当前镜像源

nrm use npm 切换npm官方源

nrm use taobao 切换淘宝源

安装pm2
npm i -g pm2 全局安装pm2包

进入相关文件夹下
运行 pm2 start index.js --name 
--name 可加不可加，无所谓起个名字
查看logs
pm2 logs index 

查看列表
pm2 list


启动完毕后，可以使用curl 访问localhost3000
请求访问
curl http://localhost:3000


安装
初始化数据库
mongodump -d it_eam

恢复数据库
mongorestore