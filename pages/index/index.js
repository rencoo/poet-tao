// index.js
// 获取应用实例
const app = getApp();
const { getPoemList } = require('../../utils/api');

Page({
  // 页面或组件的 data 字段，应用来存放和页面或组件渲染相关的数据（即直接在 wxml 中出现的字段）
  data: {
    // systemInfo
    windowHeight: 0,
    profileScrollTop: 0,
    aboutOriginTop: 0,
    poetInfo: {
      nickName: '奥莉芙',
      resume: '哲学家、豆瓣诗人'
    },
    // scrollTop: 0,
    tabList: [
      {
        value: 'home',
        label: '主页'
      },
      {
        value: 'poem',
        label: '诗集'
      }
    ],
    activeTab: 'home',
    poemList: [],
    total: 0,
    // 展示 profile
    isShowProfile: false,
    // 正在加载列表
    isLoadingList: false,
    // 是否是最后一页
    isLastPage: false
  },
  // 生命周期钩子
  onLoad(params = {}) {
    const that = this;
    /*获取屏幕高度*/
    that.setData({
        windowHeight: wx.getSystemInfoSync().windowHeight
    });
    that._loadMore();
  },
  // 页面事件
  // 监听用户下拉动作
  onPullDownRefresh() {},
  // 页面上拉触底事件
  onReachBottom() {
    console.log('===上拉触底===');
    const that = this;
    that._loadMore();
  },
  onPageScroll(e) {
    const that = this;
    wx.createSelectorQuery().select('#viewPortfolioBody').boundingClientRect(function(rect) {
      if (rect.top <= 0) {
        that.setData({
          activeTab: 'poem'
        });
      } else {
        that.setData({
          activeTab: 'home'
        });
      }
    }).exec();
  },
  // 事件
  onShowProfile() {
    var that = this;
    that.setData({
      isShowProfile: true
    });

    const query = wx.createSelectorQuery();
    query.select('#viewAboutBody').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      // res[0].top       // 节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      that.setData({
        aboutOriginTop: res[0].top
      });
    });
  },
  onHideProfile() {
    var that = this;
    that.setData({
      isShowProfile: false
    });
  },
  onSelectTab(e) {
    const that = this;
    const { value } = e.currentTarget.dataset;
    if (value === that.data.activeTab) {
      return;
    }

    that.setData({
      activeTab: value
    });

    if (value === 'home') {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 100 // 滑动速度
      });
    } else { //value === 'poem'
      that._scrollPortfolioBody2Top();
    }
  },
  onPopupScroll(e) {
    const that = this;
    const deltaY = e.detail.deltaY;
    const scrollTop = e.detail.scrollTop;
  },

  // private
  // 页面或组件渲染无关的数据，应挂在非 data 的字段下，如 this.userData = {userId: 'xxx'}；
  _logicData: {
    page: 0,
    page_size: 9
  },
  // 内部函数
  _loadMore() {
    const that = this;
    if (that.isLoadingList || that.data.isLastPage) {
      // setData后立马生效
      return;
    }

    that.setData({
      isLoadingList: true
    });

    return getPoemList(++that._logicData.page, that._logicData.page_size).then(
      (res) => {
        if (res.code / 1 === 0 && res.data) {
          const { page, page_size, count, items } = res.data;
          if (page * page_size >= count) {
            that.setData({ isLastPage: true });
          }

          that.setData({
            poemList: that.data.poemList.concat(items),
            isLoadingList: false,
            total: count
          });

          // 更新page和page_size
          that._logicData.page = page;
          that._logicData.page_size = page_size;
        }
      }
    );
  },
  _scrollPortfolioBody2Top() {
    const that = this;
    /**
     * @See https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html、https://developers.weixin.qq.com/community/develop/doc/000aeec87c4d2811dc1ae8bd154c00
     */
    const query = wx.createSelectorQuery();
    query.select('#viewPortfolioBody').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      // res[0].top       // 节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      wx.pageScrollTo({
        scrollTop: res[0].top,
        duration: 100 // 滑动速度
      });
    });
    // 旧写法
    /** rect 对象属性
      bottom: 2045
      dataset: {}
      height: 1652
      id: "viewPortfolioBody"
      left: 0
      right: 390
      top: 393
      width: 390
      */
    // wx.createSelectorQuery().select('#viewPortfolioBody').boundingClientRect(function(rect) {
    //   wx.pageScrollTo({
    //     scrollTop: rect.top,
    //     duration: 100 // 滑动速度
    //   });
    // }).exec();
  }
});
