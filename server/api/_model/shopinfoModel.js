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
    	//const sql2 = "select * from tb_shopinput where i_shop = '" + row.i_shop + "' and i_userid = '" + req.user.mb_id + "'";
		const sql2 = "select a.i_shop, i_no, ifnull(i_userid, '" + req.user.mb_id + "') i_userid, f_persioninfo, d_persioninfo, i_regno, n_company, n_person, t_tel1, t_tel2,  i_presno,  i_post, t_addr1, t_addr2, f_saugup,  f_run, f_dart,  t_enarainfo " +
  					 "	from tb_shopmag a " +
       				 "       left outer join tb_shopinput b on a.i_shop = b.i_shop and b.i_userid = '" + req.user.mb_id +"'" +
 					 " where a.i_shop = '" + row.i_shop + "'"
    	const [[data]] = await db.execute(sql2);
       return data;
    },

	async getShopinputNo(as_shop, as_userid) {
		//sql = "select ifnull(max(i_no),) + 1 i_no from tb_shopinput where i_shop = '" + as_shop + "'";
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


		sql = "select a.i_shop, a.i_ser, a.f_yn, a.n_file n_filename, " +
			  "			b.i_no, b.n_file, b.t_att " +
			  "  from tb_shopmag_file a " +
			  "	      left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.i_no = " + i_no 
			  "	where a.i_shop = '" + i_shop + "' " +
			  "	order by a.i_shop, a.i_ser ";		
		const [row] = await db.execute(sql);		
		return row;
	},

    async updateMember(req) {
		// return {body : req.body, file:req.files};
		const at = moment().format('LT');
		const ip = getIp(req);

		const payload = {
			...req.body,
			mb_update_at : at,
			mb_update_ip : ip,
		};

		const admMode = payload.admMode;
		const mb_id = payload.mb_id;
		const deleteImage = payload.deleteImage;
		delete payload.admMode;
		delete payload.mb_id;
		delete payload.deleteImage;

		// 비밀번호가 변경 해야 한다
		if(payload.mb_password) {
			payload.mb_password = jwt.generatePassword(payload.mb_password);
		} else {
			delete payload.mb_password;
		}

		// 이미지 처리
		delete payload.mb_image;
		const mb_photo = payload.mb_photo || '';
		const photoPathInfo = path.parse(mb_photo);
		const oldName = photoPathInfo.name;
		const oldFile = `${MEMBER_PHOTO_PATH}/${oldName}.jpg`;
		const cachePath = `${MEMBER_PHOTO_PATH}/.cache`;

		// 기존 이미지 삭제
		if(deleteImage || (req.files && req.files.mb_image)) {
			payload.mb_photo = '';
			try {
				fs.unlinkSync(oldFile);
				const cacheDir = fs.readdirSync(cachePath);
				for(const p of cacheDir) {
					if(p.startsWith(oldName)) {
						try {
							fs.unlinkSync(`${cachePath}/${p}`);
						} catch(e) {}
					}
				}
			} catch(e) {}
		}

		// 이미지 업로드 되었으면 처리
		if(req.files && req.files.mb_image) {
			const newName = jwt.getRandToken(16);
			payload.mb_photo = `/upload/memberPhoto/${newName}.jpg`;
			const newFile = `${MEMBER_PHOTO_PATH}/${newName}.jpg`;
			req.files.mb_image.mv(newFile, (err)=>{
				if(err) {
					console.log('Member Photo 업로드 실패', err);
				}
			})
		}

		const sql = sqlHelper.Update(TABLE.MEMBER, payload, {mb_id});
		const [row] = await db.execute(sql.query, sql.values);
		return await memberModel.getMemberBy({mb_id});
	},
}
module.exports = shopinfoModel;