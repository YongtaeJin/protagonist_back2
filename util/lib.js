const lib = {
	deepCopy(obj) {
		if(obj === null || typeof obj !== 'object') {
			return obj;
		}
		const result = Array.isArray(obj) ? [] : {};
		for(const key of Object.keys(obj)) {
			result[key] = lib.deepCopy(obj[key]);
		}
		return result;
	},
	async modelCall(fn, ...args) {
		try {
			const result = await fn(...args);
			return result;
		} catch(e) {
			console.trace(e);
			return { err : e.message };
		}
	},
	getIp(req) {
		//return req.ip.replace('::ffff:', '');
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		
		if (ip.substr(0, 7) == "::ffff:") {
  			ip = ip.substr(7);
		} else {
			ip = ip.replace('::ffff:', '');
		}
		return ip;
	},
}

module.exports = lib;