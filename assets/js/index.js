$(function() {
    // 1、获取用户基本信息
    getUserInfo()
    // 2、退出登录
    var layer = layui.layer
    $('#exitBtn').on('click',function() {
        layer.confirm('是否退出登录？', {icon: 3, title:'提示'}, function(index){
        // 清空本地中的token
        localStorage.removeItem('token')
        // 转到登陆页面
        location.href = './login.html'
        layer.close(index)
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // 调用渲染用户头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1、获取用户名称
    var name = user.nickname || user.username
    // 2、设置欢迎文本
    $('#welcome').html('欢迎:&nbsp;' + name)
    // 3、按需渲染用户头像
    if(user.user_pic !== null) {
        // 渲染图像头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
})
