const fs = require('fs');
const path = require('path');

const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');
const sendMailer = require('../../plugins/sendMailer');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { LV } = require('../../../util/level');
const moment = require('../../../util/moment');
const { getIp, deepCopy } = require('../../../util/lib');

const shopinfoModel = {
    // 공방신청 내용 조회
    async checkShopinfo(req) {       
		const sql1 = "select i_shop from tb_shopmag where  now() between d_date1 and d_date2";
    	const [[row]] = await db.execute(sql1);
    	
		const sql2 = "select a.i_shop, i_no, ifnull(i_userid, '" + req.user.mb_id + "') i_userid, f_persioninfo, d_persioninfo, i_regno, n_company, n_person, t_tel1, t_tel2,  i_presno,  i_post, t_addr1, t_addr2, f_saugup,  f_run, f_dart,  t_enarainfo " +
  					 "	from tb_shopmag a " +
       				 "       left outer join tb_shopinput b on a.i_shop = b.i_shop and b.i_userid = '" + req.user.mb_id +"'" +
 					 " where a.i_shop = '" + row.i_shop + "'"
    	const [[data]] = await db.execute(sql2);
       return data;
    },

	async getShopinputNo(as_shop, as_userid) {
		sql = "select  ifnull(max(case i_userid when '" + as_userid + "' then i_no end), ifnull(max(i_no),0) + 1) i_no" +
			  "  from tb_shopinput " +
			  "	where i_shop = '" + as_shop + "' " ;
		const [[data]] = await db.execute(sql);
		
		return data;
	}, 

	async updateShopinfo(req) {	
		const at = moment().format('LT');	
		const payload = {
			... req.body,
		};
		const i_userid = payload.i_userid;
		const i_shop = payload.i_shop;
		const i_no = payload.i_no;
		
		if ( !i_no ) {
			const i_no_new = await shopinfoModel.getShopinputNo(i_shop, i_userid);
			payload.i_no = i_no_new.i_no;
			payload.d_persioninfo = at;
		} else {
			delete payload.d_persioninfo;
		}
		sql = sqlHelper.InsertOrUpdate('tb_shopinput', payload, {i_shop, i_no});
		
		const [row] = await db.execute(sql.query, sql.values);
		return row;
	},

	async attfiles(req) {
		const token = req.cookies.token;
		const { mb_id } = jwt.vetify(req.cookies.token);
		const i_shop = req.cookies.i_shop;
		const i_no = req.cookies.i_no;	
		const { f_gubun } = req.query;
		
		sql = "select a.i_shop, a.i_ser, a.f_yn, a.n_file n_filename, " +
			  "			c.i_no, null n_file, b.n_file n_file2, b.t_att " +
			  "  from tb_shopmag_file a " +
			  "       left outer join tb_shopinput c on a.i_shop = c.i_shop and c.i_userid = '" + mb_id + "' " +
			  "	      left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and c.i_no = b.i_no " +
			  "	where a.i_shop = '" + i_shop + "' " +
			  "   and a.f_gubun = '" + f_gubun + "'" +
			  "	order by a.i_shop, a.i_ser ";		
		const [row] = await db.execute(sql);
		return row;
	},


	// 첨부파일 Upload
	async attfilesupload(req) {
		const token = req.cookies.token;
		const { mb_id } = jwt.vetify(req.cookies.token);
		const payload = {
			...req.body,
		};
		delete payload.f_yn;

		// console.log(payload);
		
		const { i_shop, i_ser, f_yn, n_filename, i_no, t_att } = payload;		
		const makeFolder = (dir) => {
			if( !fs.existsSync(dir) )  { 				
				fs.mkdirSync(dir, { recursive: true }, err => {});				
			} ;
		}
		if ( !i_shop )  { return ; }

		const { n_file } = req.files;
		// UPLOAD 폴더 생성 (신청번호: 첫번재 i_shop)		
		let fPath = "";   // 서버 파일 저장 위치 Full Path  (Root 폴더 위치 부터)
		let tPath = "";   // DB 저장 칼럼 상태 위치 
		//req.files.mb_image.mv(`${MEMBER_PHOTO_PATH}/${fileName}.jpg`, (err) => {
		if (Array.isArray(i_shop)) {  
			fPath = `${UPLOAD_PATH}/shopsigned/${i_shop[0]}/${mb_id}` ;
			tPath = `/upload/shopsigned/${i_shop[0]}/${mb_id}` ;
		} else { 
			fPath = `${UPLOAD_PATH}/shopsigned/${i_shop}/${mb_id}` 
			tPath = `/upload/shopsigned/${i_shop}/${mb_id}` ;
		} ;
		makeFolder(fPath);

		if (Array.isArray(i_shop)) {			
			i_shop.forEach(async function(item, index) {
				const fileName = `${i_ser[index]}_` + jwt.getRandToken(16);
				const newFile = `${fPath}/${fileName}${path.extname(n_file[index].name)}`;
				const tPathFile = `${tPath}/${fileName}${path.extname(n_file[index].name)}`;
				n_file[index].mv(newFile, (err)=>{
					if ( err ) {
						console.log('업로드 실패', err);
						return;
					}
				});
				sql = "select count(*) cnt  from tb_shopinput_file where i_shop = '" + i_shop[index] + "' and i_no = "  + i_no[index] + " and i_ser = " + i_ser[index];
				const [[data]] = await  db.execute(sql);
				if ( !data.cnt ) {
					sql = "insert into tb_shopinput_file (i_shop, i_no, i_ser, n_file, t_att) " +
						  " values ('" + i_shop[index] + "'," + i_no[index] + "," + i_ser[index] + ", '" + t_att[index] + "', '" + tPathFile + "')";
				} else {
					sql = "update tb_shopinput_file set n_file = '" + t_att[index] + "', t_att = '" + tPathFile + "'" +
						  " where i_shop = '" + i_shop[index] + "' and i_no = " + i_no[index] + " and i_ser = " + i_ser[index] ;
				}
				const [row] = await db.execute(sql);
			});
		} else {
			//const fileName = jwt.getRandToken(16);
			const fileName = `${i_ser}_` + jwt.getRandToken(16);
			const newFile = `${fPath}/${fileName}${path.extname(n_file.name)}`;
			const tPathFile = `${tPath}/${fileName}${path.extname(n_file.name)}`;
			n_file.mv(newFile, (err)=>{
				if ( err ) {
					console.log('업로드 실패', err);
					return;
				}
			});			

			sql = "select count(*) cnt  from tb_shopinput_file where i_shop = '" + i_shop + "' and i_no = "  + i_no + " and i_ser = " + i_ser;
			const [[data]] = await db.execute(sql);
			if ( !data.cnt ) {
				sql = "insert into tb_shopinput_file (i_shop, i_no, i_ser, n_file, t_att) " +
				      " values ('" + i_shop + "'," + i_no + "," + i_ser + ", '" + t_att + "', '" + tPathFile + "')";
			} else {
				sql = "update tb_shopinput_file set n_file = '" + t_att + "', t_att = '" + tPathFile + "'" +
				      " where i_shop = '" + i_shop + "' and i_no = " + i_no + " and i_ser = " + i_ser ;
			}
			const [row] = await db.execute(sql);
			
			return row;
		}
	},
	
}
module.exports = shopinfoModel;