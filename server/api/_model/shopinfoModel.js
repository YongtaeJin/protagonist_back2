const fs = require('fs');
const path = require('path');

const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');
const sendMailer = require('../../plugins/sendMailer');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const moment = require('../../../util/moment');
const { getIp, deepCopy } = require('../../../util/lib');
const { LV, isGrant } = require('../../../util/level');
const { del } = require('vue');
const { CONFIG } = require('../../../util/TABLE');

const zip = require("node-zip");


function clearShopmagField(shopmag) {
	if (shopmag.d_date1) { shopmag.d_date1 = moment(shopmag.d_date1).format('L')};
	if (shopmag.d_date2) { shopmag.d_date2 = moment(shopmag.d_date2).format('L')};
}

const shopinfoModel = {
	// 사업LIST
	async getShopMag(req) {
		// 권한 확인
		if (!isGrant(req, LV.VIP)) {
			throw new Error('사용 권한이 없습니다.');
		}
		const sql = "select i_shop, n_shop, d_date1, d_date2, t_remark, t_remark2 from tb_shopmag order by i_shop desc";
		const [row] = await db.execute(sql);
		row.forEach((data) => {
			clearShopmagField(data);
		});

       	return row;		   
	},
	async getShopMagFile(req) {
		// 권한 확인
		//const sql = sqlHelper.SelectSimple("tb_shopmag_file", req.query, {i_shop, i_ser, f_gubun, f_yn, n_file, t_remark, t_sample});
		// console.log(req.query);
		const { i_shop, f_gubun } = req.query;
		const sql = "select i_shop, i_ser, f_gubun, f_yn, n_file, t_filenm, t_remark, t_sample, i_sort" +
		            "  from tb_shopmag_file where i_shop  = '" + i_shop + "' and f_gubun = '" + f_gubun + "'" +
					" order by f_gubun, i_sort, i_ser";
		
		const [row] = await db.execute(sql);
		
       	return row;
	},

    // 공방신청 내용 조회
    async checkShopinfo(req) {       
		const sql1 = "select i_shop from tb_shopmag where  now() between d_date1 and d_date2";
    	const [[row]] = await db.execute(sql1);
    	
		const sql2 = "select a.i_shop, a.t_remark, a.t_remark2, i_no, ifnull(i_userid, '" + req.user.mb_id + "') i_userid, f_persioninfo, d_persioninfo, i_regno, n_company, n_person, t_tel1, t_tel2,  i_presno, i_email, i_post, t_addr1, t_addr2, f_saugup, f_run, f_dart, t_enarainfo, t_enarainfopw " +
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
		delete payload.t_remark;
		delete payload.t_remark2;
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
			  "			c.i_no, null n_file, b.n_file n_file2, b.t_att, a.t_remark, a.t_sample, a.t_filenm t_samplefile" +
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
		
		const { i_shop, i_ser, f_yn, n_filename, i_no, t_att, f_del } = payload;		
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

	async attfilesdelete(req) {
		// 파일정보 삭제 처리 
		const { i_shop, i_no, i_ser } = req.params;
		
		const [[ {t_att } ]] = await db.execute("select t_att from tb_shopinput_file where i_shop = '" + i_shop + "' and i_no = " + i_no + " and i_ser = " + i_ser);
		
		const sql = sqlHelper.DeleteSimple('tb_shopinput_file', { i_shop, i_no, i_ser });
		const [row] = await db.execute(sql.query, sql.values);		
		if (row.affectedRows == 1) {
			// 실제 파일 삭제 처리 			
			let delFile = `${SERVER_PATH}${t_att}` ;
			try {				
				fs.unlinkSync(delFile);
			}  catch(e) {}
		}
		return row.affectedRows == 1;
	},
	async duplicgateCheckShop({ field, value }) {
		// SELECT COUNT(*) AS cnt FROM member WHERE mb_id=?;
		const sql = sqlHelper.SelectSimple(
			'tb_shopmag',
			{ [field]: value },
			['COUNT(*) AS cnt']
		);		
		const [[row]] = await db.execute(sql.query, sql.values);
		return row;
	},
	async shopInfoSave(req) {
		const data = req.body;
		const payload = {
			...req.body,
		};
		const { i_shop } = payload;
		sql = sqlHelper.InsertOrUpdate('tb_shopmag', payload, {i_shop});		
		const [row] = await db.execute(sql.query, sql.values);
		return row;

	},

	async shopAddFile(req) {
		const payload = {
			...req.body,
		};
		const {  i_shop,  i_ser,  f_gubun, f_yn,  n_file, t_filenm, t_remark,  t_sample,  i_sort,  isNew,  i_shop_select, f_del } = payload;
		let fPath = `${UPLOAD_PATH}/shopsigned/${i_shop}` ;
		let tPath = `/upload/shopsigned/${i_shop}` ;
		let tPathFile = "";
		let tFilenm = "";
		if ( req.files )  {
			const { t_image } = req.files;
			const fileName = `${i_ser}_` + jwt.getRandToken(16);
			const newFile = `${fPath}/${fileName}${path.extname(t_image.name)}`;
			tPathFile = `${tPath}/${fileName}${path.extname(t_image.name)}`;
			tFilenm = t_sample;

			t_image.mv(newFile, (err)=>{
				if ( err ) {
					console.log('업로드 실패', err);
					return;
				}
			});	
		} else {			
			if (!f_del) {
				tFilenm = t_filenm;
				tPathFile = t_sample;
			} else {
				let delFile = `${SERVER_PATH}${t_sample}` ;
				try {				
					fs.unlinkSync(delFile);
				}  catch(e) {}

			}
		} 
		
		if(isNew == "true") {
			const [[getser]] = await db.execute("select max(i_ser) ser from tb_shopmag_file where i_shop = '" + i_shop_select + "'");
			const { ser } = getser;
			if (!ser) { setser = 1  }  else { setser = ser + 1}
			
			sql = "insert into tb_shopmag_file " +
			      " (i_shop,  i_ser,  f_gubun, f_yn,  n_file, t_filenm, t_remark,  i_sort, t_sample) " +
				  " values ('" + i_shop_select + "' , " + setser + ", '" + f_gubun + "', '" + f_yn + "', '" + n_file + "', '" + tFilenm + "', '" + t_remark + "'," + i_sort + ", '" + tPathFile + "')";
			
		} else {
			sql = "update tb_shopmag_file  " +
			      "   set f_gubun = '" + f_gubun + "', " +
				  "       f_yn = '" + f_yn + "', " +
				  "       n_file = '" + n_file + "', " +
				  "       t_filenm = '" + tFilenm + "', " +
				  "       t_remark = '" + t_remark + "', " +
				  "       t_sample = '" + tPathFile + "', " +			
				  "       i_sort   = " + i_sort +
				  " where i_shop = '" + i_shop + "' and i_ser = " + i_ser 
		};
		
		const [row] = await db.execute(sql);
		return row;
	},
	async shopAddFileDelete(req) {
		const payload = {
			...req.body,
		};
		const {  i_shop,  i_ser,  f_gubun, f_yn,  n_file,  t_remark,  t_sample,  i_sort,  isNew,  i_shop_select } = payload;
		sql = "delete from tb_shopmag_file  " +
		      " where i_shop = '" + i_shop + "' and i_ser = " + i_ser ;

		const [row] = await db.execute(sql);
		return row;
	},

	async getShopInputMag(req) {
		// 권한 확인
		if (!isGrant(req, LV.VIP)) {
			throw new Error('사용 권한이 없습니다.');
		}
		const sql = "select a.i_shop, a.i_no, " +
					"		coalesce(n_company, a.i_userid) n_company, " +
					"		f_persioninfo, " +
					"		if(coalesce( " +
					"			length(trim(i_regno)) + length(trim(n_company)) + length(trim(n_person)) + length(trim(t_tel1)) + length(trim(t_tel2)) + length(trim(i_email)) + " +
					"			length(trim(i_presno)) + length(trim(i_post)) + length(trim(t_addr1)) + length(trim(t_addr2)) + length(trim(t_tel2)) + length(trim(f_saugup)) + " +
					"			length(trim(f_run)) + length(trim(f_dart)) + length(trim(t_enarainfo)) + length(trim(t_enarainfopw)) " +
					"			, 0) > 0, 'Y', 'N') chk1, " +
					"		if(b.f_f1y = c.f_u1y, 'Y', 'N') chk2, " +
					"		if(b.f_f2y = 0, '-', if(b.f_f2y = c.f_u2y, 'Y', 'N')) chk3, " +
					"		if(b.f_f3y = c.f_u3y, 'Y', 'N') chk4, " +
					"		f_dochk, " +
					"		f_enarachk	 " +				
					" from tb_shopinput a " +
					"		left outer join (select i_shop,  " +
					"								sum(case when f_gubun = '1' and f_yn = '1' then 1 else 0 end) f_f1y, " +
					"								sum(case when f_gubun = '1' and f_yn = '0' then 1 else 0 end) f_f1n, " +
					"								sum(case when f_gubun = '2' and f_yn = '1' then 1 else 0 end) f_f2y, " +
					"								sum(case when f_gubun = '2' and f_yn = '0' then 1 else 0 end) f_f2n, " +
					"								sum(case when f_gubun = '3' and f_yn = '1' then 1 else 0 end) f_f3y, " +
					"								sum(case when f_gubun = '3' and f_yn = '0' then 1 else 0 end) f_f3n " +
					"						from tb_shopmag_file  " +
					"						where i_shop = '23-001' " +
					"						group by i_shop) b on a.i_shop = b.i_shop " +
					"		left outer join (select c2.i_shop, c2.i_no, " +
					"								sum(case when f_gubun = '1' and f_yn = '1' then 1 else 0 end) f_u1y, " +
					"								sum(case when f_gubun = '1' and f_yn = '0' then 1 else 0 end) f_u1n, " +
					"								sum(case when f_gubun = '2' and f_yn = '1' then 1 else 0 end) f_u2y, " +
					"								sum(case when f_gubun = '2' and f_yn = '0' then 1 else 0 end) f_u2n, " +
					"								sum(case when f_gubun = '3' and f_yn = '1' then 1 else 0 end) f_u3y, " +
					"								sum(case when f_gubun = '3' and f_yn = '0' then 1 else 0 end) f_u3n " +
					"						from tb_shopmag_file c1 " +
					"								join tb_shopinput_file c2 on  c1.i_shop = c2.i_shop and c1.i_ser = c2.i_ser " +
					"						where c1.i_shop = '23-001' " + 
					"						group by c2.i_shop, c2.i_no) c on a.i_shop = b.i_shop and a.i_no = c.i_no " +
					" where a.i_shop = '23-001' ";
		const [row] = await db.execute(sql);
		
       	return row;		   
	},
	async getShopInputMag1(req) {		
		const { i_shop, i_no } = req.query;		
		const sql = "select * from tb_shopinput where i_shop = '" + i_shop + "' and i_no = " + i_no;
		const [[row]] = await db.execute(sql);				
       	return row;		   		
	},
	async getShopInputMag2(req) {
		const { i_shop, i_no, f_gubun } = req.query;	
		
		const sql = "select a.i_shop, a.i_ser, a.f_yn, a.n_file n_filename, " +
					"       c.i_no, b.n_file, b.t_att " +
					"  from tb_shopmag_file a " +
					"       left outer join tb_shopinput c on a.i_shop = c.i_shop and c.i_no = " + i_no +
					"       left outer join tb_shopinput_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and c.i_no = b.i_no " +
					" where a.i_shop = '" + i_shop + "' " +
					"   and a.f_gubun = '" + f_gubun + "'" +
					" order by a.i_shop, a.i_ser ";	
		const [row] = await db.execute(sql);				
       	return row;		   		
	
	},
	async getFileDown(req, res) {		
		let fPath = `${SERVER_PATH}` ;
		const { path } = req.query;		
		let filePath = fPath + path;
		
		const file = fs.readFileSync(filePath);	
		
		return file;
	},
	async getFileDownZip(req, res) {
		const { i_shop, i_no, f_gubun, f_filetype } = req.query;
		let fPath = `${SERVER_PATH}` ;
		var t_path = "";
		// D:/WEBAPP/protagonist/server/upload/shopsigned/23-001/freeview/2_afUOwFG3RaccbLph.xlsx
		let sql = "select a.n_file, a.t_att, b.n_file n_title " +
		          " from tb_shopinput_file  a " +
				  "      join tb_shopmag_file b on a.i_shop = b.i_shop and a.i_ser = b.i_ser and b.f_gubun = '" + f_gubun + "'" +
				  " where a.i_shop = '" + i_shop + "' "+
				  "   and a.i_no = " + i_no ;
		const [files] = await db.execute(sql); 

		//  console.log(files);
		var zip = new require('node-zip')();
		files.forEach((data) => {
			var tPath = fPath + data.t_att;
			if (fs.existsSync(tPath)) {
				t_path = tPath.split("/").slice(0, -1).join("/");
				// var t_file = tPath.substring(tPath.lastIndexOf('/') + 1);
				// var to_path = t_path + "/" + data.n_file;
				
				// fs.copyFileSync(tPath, to_path);   // 파일명 변경 작업
				// fs.unlinkSync(to_path);  // 압축후 파일 삭제
				var nfilename = "";
				if(f_filetype == "2") { 
					nfilename = data.n_title + tPath.substring(tPath.lastIndexOf('.')) ;					
				} else {
					nfilename = data.n_file;
				}
				zip.file(nfilename, fs.readFileSync(tPath));
			}

		});
		
		if (t_path) {
			var data = zip.generate({base64:false, compression:'DEFLATE'});
			fs.writeFileSync(`${t_path}/zip.zip`, data, 'binary');
			const file = fs.readFileSync(`${t_path}/zip.zip`);	
			return file;
		}

		return ;


		// row.forEach((data) => {
		// 	clearShopmagField(data);
		// });

		// fs.exists("D:/WEBAPP/protagonist/server/upload/shopsigned/23-001/freeview/2_afUOwFG3RaccbLph.xlsx",  function(exists){
		// 	if(exists){
		// 	  console.log("exixts! : ",exists);
		// 	} else {
		// 	  console.log("No exixts! : ",exists);
		// 	}
		//    });

		// try {fs.unlinkSync(delFile);}  catch(e) {}  // 파일삭제
		// return filePath;
		

	},

	async getFileDownRes(req, res) {	
		let fPath = `${SERVER_PATH}` ;
		const { path } = req.query;		
		let filePath = fPath + path;
		
		res.download(filePath);

	},
}
module.exports = shopinfoModel;