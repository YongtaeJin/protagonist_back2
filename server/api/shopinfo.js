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
	if ( result ) {
		res.cookie('i_shop', result.i_shop, { httpOnly: true });
		res.cookie('i_no', result.i_no, { httpOnly: true });
	}
	res.json(result);
}),
router.patch('/', async (req, res)=> {
	const result = await modelCall(shopinfoModel.updateShopinfo, req);
	res.json(result);
}),
router.patch('/attfiles/', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.attfiles, req);
	res.json(result);
}),

// 첨부파일 upload
router.patch('/attfiles/upload', async (req, res)=> {	
	const result = await modelCall(shopinfoModel.attfilesupload, req);
	res.json(result);
}),


module.exports = router;