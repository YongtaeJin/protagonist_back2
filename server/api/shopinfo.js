const router = require('express').Router();
const shopinfoModel = require('./_model/shopinfoModel');
const { modelCall } = require('../../util/lib');
const passport = require('passport');
const jwt = require('../plugins/jwt');


router.post('/checkShopinfo', async (req, res)=> {
    const result = await modelCall(shopinfoModel.checkShopinfo, req);
	res.json(result);
}),
router.get('/', async (req, res)=> {
	const result = await modelCall(shopinfoModel.checkShopinfo, req);
	res.json(result);
}),
router.patch('/', async (req, res)=> {
	const result = await modelCall(shopinfoModel.updateShopinfo, req);
	res.json(result);
}),


module.exports = router;