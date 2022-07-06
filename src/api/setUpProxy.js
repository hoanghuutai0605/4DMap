const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/", {
      target:
        "https://bts-gd2.vimap.vn/api/BTS/InforTruAnten/search-tru-anten?code=001053&chuSoHuu=&loaiTram=&loaiCot=&lat=0&lng=0&radius=0",
      changeOrigin: true,
    })
  );
};
