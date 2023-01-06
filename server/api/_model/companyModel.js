const db = require('../../plugins/mysql');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { LV, isGrant } = require('../../../util/level');

const companyModel = {
    async getCompany(req) {
        const { all } = req.query;
		let where = {};
        const sort = {
            n_com: true,
            i_com: true,
        };		
        const sql = sqlHelper.SelectSimple(TABLE.COMPANY, where, [], sort);
		const [rows] = await db.execute(sql.query, sql.values);
		return rows;
    },
}
module.exports = companyModel;