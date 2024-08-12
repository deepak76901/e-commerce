import  { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function(app) {
  // Define allowed methods
  const allowedMethods = ['GET', 'POST', 'PUT','PATCH', 'DELETE']; // Modify this array to include the methods you want to allow

  app.use(
    '/',
    createProxyMiddleware({
      target: "https://e-commerce-api-12.vercel.app", // Backend server URL
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        if (!allowedMethods.includes(req.method)) {
          res.status(405).send('Method Not Allowed');
        }
      },
    })
  );
};
