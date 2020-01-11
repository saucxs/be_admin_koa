const { query } = require('../utils/db');

// 留言反馈列表
const getFeedbackListModel = function(pageIndex: number, pageNum: number) {
  const data = [Number(pageIndex), Number(pageNum)];
  let _sql = `select * from feed_back where is_show = '1' order by date desc limit ?, ? `;
  return query(_sql, data)
}

module.exports = {
  getFeedbackListModel,
}
