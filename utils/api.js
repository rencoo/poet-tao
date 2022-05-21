const { poemList } = require('../data/poem.js');

const delay = 500;
/**
 * 获取诗歌列表
 * @param {string} page 当前页码
 * @param {string} page_size 每页展示数量
 * @returns {Promise<Poem[]>}
 */
function getPoemList(page, page_size) {
  page = page || 1;
  page_size = page_size || 9;
  const count = poemList.length;
  const items = poemList.slice((page - 1) * page_size, page * page_size);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          page: page,
          page_size: page_size,
          count: count,
          items: items
        },
        msg: 'success'
      });
    }, delay);
  });
}

/**
 * 获取诗歌详情
 * @param {string} id
 * @returns {Promise<Poem|undefined>}
 */
function getPoem(id) {
  const item = poemList.find((item) => item.id === id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(item);
    }, delay);
  });
}

module.exports = {
  getPoemList,
  getPoem
};
