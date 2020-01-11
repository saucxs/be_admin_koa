const feedbackModel = require("../models/feedback");

interface IFeedBackList {
  ip: string;
  email: string;
}

/* 获取反馈留言列表 */
const getFeedbackList = async (ctx: any, next: any) => {
  let page = ctx.query.page || 1;
  let pageNum = ctx.query.pageNum || 3;
  let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
  const RowDataPacket = await feedbackModel.getFeedbackListModel(pageIndex, pageNum),
    feedbackList = JSON.parse(JSON.stringify(RowDataPacket));
  ctx.body = {
    success: true,
    data: {
      feedbackList: feedbackList
    }
  };
};

module.exports = {
  getFeedbackList,
}

