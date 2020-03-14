module.exports = app => {
    const express = require('express')
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


    app.use('/admin/api/rest/:resource', async (req, res, next) =>{
        const modelName = require('inflection').classify(req.params.resource)
        // return res.send ({ modelName })
        req.Model = require(`../../models/${modelName}`)
        next()
    } , router)
}

