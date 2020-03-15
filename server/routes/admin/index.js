module.exports = app => {
    const express = require('express')
    const AdminUser = require('../../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const assert = require("http-assert")
    const router = express.Router({
        mergeParams: true
    })  //express 的子路由
    // const DeviceCategory = require('../../models/DeviceCategory')
    //创建设备分类
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //更新设备
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除设备
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //设备分类列表
    router.get('/', async(req, res) => {
        const items = await req.Model.find().limit(100)
        // let queryOptions = {}
        // if (req.Model.modelName === 'DeviceCategory'){
        //     queryOptions.populate = 'parent'
        // }
        // const items = await req.Model.find().setOPtion(queryOptions).limit(100)
        res.send(items)
    })
    //获取某个详情页的接口
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //登录校验中间件
    const authMiddleware = require('../../midddleware/auth')
    // 资源中间件
    const resourceMiddleware = require('../../midddleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    app.post('/admin/api/login', async(req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')
        // if (!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '用户不存在')
        // if(! isValid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        // 3.返回token

        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
    // 错误处理函数
    app.use(async(err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}

