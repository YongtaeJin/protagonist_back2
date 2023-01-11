const db = require('../../plugins/mysql');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { LV, isGrant } = require('../../../util/level');

const companyModel = {
    async getCompany(req) {
        const { all } = req.query;
        
		let where = {};
        const sort = {
            i_com: true,
            n_com: true,
        };		
        const sql = sqlHelper.SelectSimple(TABLE.COMPANY, where, [], sort);
		const [rows] = await db.execute(sql.query, sql.values);
		return rows;
    },
    async createCompany(req) {
        const payload = {
			...req.body,
        };
        const i_com = payload.i_com;        
        const sql = sqlHelper.Insert(TABLE.COMPANY, payload);
		const [row] = await db.execute(sql.query, sql.values);  
        if(row.affectedRows == 1) {
            return await companyModel.getCompanyBy({ i_com });
        }
    },
    async updateCompany(req) {
        const payload = {
			...req.body,            
        };
        const i_com = payload.i_com;        
        const sql = sqlHelper.Update(TABLE.COMPANY, payload, {i_com});
		const [row] = await db.execute(sql.query, sql.values);
		return await companyModel.getCompanyBy( {i_com} );
    },
    async getCompanyBy(form, cols = []) {
        const sql = sqlHelper.SelectSimple(TABLE.COMPANY, form, cols);
		const [[row]] = await db.execute(sql.query, sql.values);
		if (!row) {
			throw new Error('존재하지 않는 사업장 입니다..');
		};
        return row;
    },
    async duplicateCheckCompany({ field, value }) {
		const sql = sqlHelper.SelectSimple(
			TABLE.COMPANY,
			{ [field]: value },
			['COUNT(*) as cnt']
		);
        const [[row]] = await db.execute(sql.query, sql.values);        
		return row;
	},
}
module.exports = companyModel;