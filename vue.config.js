module.exports = {
  devServer: {
    proxy: {
      '/springMVC-demo': {
        target: 'https://private-0e87b-perfectresume1.apiary-mock.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
