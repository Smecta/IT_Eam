module.exports = app => {
    const express = require('express')
    const router = express.Router()  //express 的子路由
    const DeviceCategory = require('../../models/DeviceCategory')
    //创建设备分类
    router.post('/deviceCategories', async(req, res) => {
        const model = await DeviceCategory.create(req.body)
        res.send(model)
    })
    //更新设备
    router.put('/deviceCategories/:id', async(req, res) => {
        const model = await DeviceCategory.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除设备
    router.delete('/deviceCategories/:id', async(req, res) => {
        await DeviceCategory.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //设备分类列表
    router.get('/deviceCategories', async(req, res) => {
        const items = await DeviceCategory.find().limit(100)
        // const items = await DeviceCategory.find().populate('parent')limit(100)
        res.send(items)
    })
    //获取某个详情页的接口
    router.get('/deviceCategories/:id', async(req, res) => {
        const model = await DeviceCategory.findById(req.params.id)
        res.send(model)
    })


    app.use('/admin/api', router)
}

