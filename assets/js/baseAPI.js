// 每次调用get或post或ajax前都会先获取url进行拼接
$.ajaxPrefilter(function( options ) { 
    // 拼接url
      options.url = "http://www.liulongbin.top:3007" + options.url ;
    // 配置headers
      if (options.url.indexOf('/my/') !== -1) {
          options.headers = {
              authorization: localStorage.getItem('token') || ''
          }
      } 
      // 全局统一挂载complete回调函数
      options.complete = function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
          // 清空token
          localStorage.removeItem('token')
          // 跳转到index
          location.href = './login.html'
        }
      }
  })