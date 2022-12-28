const router = require('express').Router();
const configModel = require('./_model/configModel');
const { modelCall } = require('../../util/lib');

router.get('/duplicateCheck', async(req, res) => {
    const result = await modelCall(configModel.duplicateCheck, req.query);
    res.json(result);
});

router.post('/', async(req, res) => {
    const result = await modelCall(configModel.post, req);
    res.json(result);
});

module.exports = router;