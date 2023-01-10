const router = require('express').Router();
const { modelCall } = require('../../util/lib');
const companyModel = require('./_model/companyModel');

// 사업장 전체 조회
router.get('/company', async (req, res) => {
	const result = await modelCall(companyModel.getCompany, req);
	res.json(result);
});

// 사업장 추가
router.post('/', async (req, res) => {	
	const result = await modelCall(companyModel.createCompany, req);
	res.json(result);
});

// 사업장 코드 중복 체크
router.get('/duplicateCheck', async (req, res) => {
	const result = await modelCall(companyModel.duplicateCheck, req.query);
	res.json(result);
});

// 사업장 수정
router.patch('/', async (req, res) => {
	const result = await modelCall(companyModel.updateCompany, req);
	res.json(result);
})

module.exports = router;