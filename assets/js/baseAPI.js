// 每次调用get或post或ajax前都会先获取url进行拼接
$.ajaxPrefilter(function( options ) { 
      options.url = "http://www.liulongbin.top:3007" + options.url ;
      console.log(options.url)   
  })