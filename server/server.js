const fs = require('fs');
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');

// 앱 초기화
const app = express();
const port = process.env.VUE_APP_SERVER_PORT || 3000;
const webServer = http.createServer(app);

// 파서
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 정적 폴더
app.use(express.static(path.join(__dirname, "../dist")));

// api 라우터
const memberRouter = require('./api/member');
app.use('/api/member', memberRouter);
app.use('/api/*', (req, res)=> {
	res.json({err : "요청하신 API가 없습니다."});
});

// Vue SSR
const { createBundleRenderer } = require('vue-server-renderer');
const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf-8');
const serverBundle = require(path.join(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.join(__dirname, '../dist/vue-ssr-client-manifest.json'));

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext : false,
	template,
	clientManifest,
});

app.get('*', (req, res) => {	
	const ctx = {
		url : req.url,
		title : 'Vue SSR App',
		metas : `<!-- inject more metas -->`,
	};

	const stream = renderer.renderToStream(ctx);

	stream.on('end', ()=> {
		console.log('스트림 렌더 종료');
	}).pipe(res);
});

// 서버 리슨
webServer.listen(port, () => {
	console.log(`http://localhost:${port}`)
});