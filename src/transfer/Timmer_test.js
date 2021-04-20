const fetch = require("node-fetch");

/**
 * 轮询请求
 * @param options
 * @param options.url 请求地址
 * @param [options.config] 请求配置
 * @param options.success 请求成功回调，允许返回一个 Promise
 * @param [options.error] 请求失败回调，不传则请求失败后不再继续继续轮询
 * @param [options.complete] 请求结束回调(不论成功失败)
 * @returns {function(): void} 调用该函数取消轮询
 */
const fetchLoop = (options) => {
  const {
    url,
    config,
    interval = 1000,
    success,
    error = (err) => {
      throw err;
    },
    complete = () => {},
  } = options;

  let timerId;

  const fetchAction = () => {
    return fetch(url, config)
      .then((res) => res.json())
      .then(success)
      .catch(error)
      .then(() => {
        timerId = setTimeout(fetchAction, interval);
      })
      .finally(complete);
  };

  fetchAction();

  return () => {
    clearTimeout(timerId);
  };
};

/**
 * 例子:
 * 请求百变怪数据
 */
const cancelFetch = fetchLoop({
  url: "https://pokeapi.co/api/v2/pokemon/ditto",
  success: (json) => {
    console.log(new Date().toLocaleTimeString());
  },
});

/**
 * 10s 后取消轮询
 */
setTimeout(() => {
  cancelFetch();
  console.log("cancel!");
}, 10000);
