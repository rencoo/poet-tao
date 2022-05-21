const { getPoem } = require('../../utils/api');
Page({
  data: {
    poem: {}
  },
  // 生命周期
  onLoad(params = {}) {
    const that = this;
    // 获取路由参数
    const { id } = params;
    that._getPoem(id);
  },
  // 事件函数

  // 内部方法
  _getPoem(id) {
    const that = this;
    getPoem(id).then((res) => {
      that.setData({
        poem: res
      });
    });
  }
});
