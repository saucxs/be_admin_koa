const router = require('koa-router')();
const baseApi = require('../../config/config').baseApi;
const feedback = require('../controllers/feedback');
/** api路由模块 */
router.prefix(`/${baseApi}`)

router.get('/get_feedback', feedback.getFeedbackList)   // 留言反馈列表

module.exports = router
