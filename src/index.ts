const Koa = require('koa');
const koaBody = require('koa-body');
const config = require('../config/config').default;
const router = require('./routers/index');                // 路由模块，后面有说
const stateInfo = require('./modules/state');        // 自定义的请求返回格式
const session = require('./modules/sessions');       // 自定义的 session 模块
import './api/apiTest';                         // 基础测试模块

const App = new Koa();

// 先统一设置请求头
App.use(router.routes()).use(router.allowedMethods());

// App.use(async (ctx: any, next: any) => {
//   // 请求路径
//   const path = ctx.request.path;
//   // 设置请求头
//   ctx.set({
//     'Access-Control-Allow-Origin': '*', // 打开跨域
//     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept Authorization',
//   });
//   if (ctx.request.method === 'OPTIONS') {
//     ctx.response.status = 200;
//   } else {
//     // 请求路由过滤
//     const rule = /\/register|\/login|\/uploadImg|\/getData|\/postData|\/home|\/favicon.ico/;
//     if (!rule.test(path) && path != '/') {
//       const token: string = ctx.header.authorization;
//       if (!token) {
//         return ctx.body = stateInfo.getFailData('缺少token');
//       }
//       if (token.length != config.token_size) {
//         return ctx.body = stateInfo.getFailData(config.token_tip);
//       }
//       const state = session.updateRecord(token);
//       if (!state.success) {
//         return ctx.body = stateInfo.getFailData(state.message);
//       }
//       // 设置 token 信息到上下文中给接口模块里面调用
//       ctx['the_state'] = state;
//     }
//   }
//
//   try {
//     await next();
//   } catch (err) {
//     ctx.response.status = err.statusCode || err.status || 500;
//     ctx.response.body = {
//       message: err.message
//     }
//   }
// });

// 使用中间件处理 post 传参 和上传图片
App.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: config.upload_img_size
  }
}));
// 开始使用路由
App.use(router.routes())

App.on('error', (err: any, ctx: any) => {
  console.error('server error !!!!!!!!!!!!!', err, ctx);
})

App.listen(config.port, () => {
  console.log(`server is running at http://localhost:${ config.port }`);
})
