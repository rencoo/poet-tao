// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    poetInfo: {
      nickName: '陶老师',
      resume: '哲学家、豆瓣诗人'
    },
    poemList: [
      {
        title: '', // 默认为无名
        content: '在那样潦原浸天的北方癸地，我曾遇上一双恶鬼的眼睛。\n本以为他獠牙青面、凶恶狰狞，抬眼却簪星曳月、华服美衣。\n此后北国碎琼乱玉，心中戛玉敲冰，道袍袖口撕扯出难愈的疾。\n真的，我曾试图千万次定住自己的心，没用，他们说吗，这叫天命', //
        author: '陶老师',
        created_at: '2021-05-20', // 今年的日期格式:05-20, 昨天的格式: 昨天
        updated_at: ''
      },
      {
        title: '', // 默认为无名
        content: '在那样潦原浸天的北方', //
        author: '陶老师',
        created_at: '2021-05-20', // 今年的日期格式:05-20, 昨天的格式: 昨天
        updated_at: ''
      }
    ],
    // 展示 profile
    isShowProfile: false
  },
  onLoad() {},
  onShowProfile() {
    var that = this;
    that.setData({
      isShowProfile: true
    });
  },
  onHideProfile() {
    var that = this;
    that.setData({
      isShowProfile: false
    });
  }
});
