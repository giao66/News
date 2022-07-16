$(function() {
    // 点击去注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证
    // 从layui中实例化form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次输入密码不一样'
            }
        } 
    })

    // 提交注册表单
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', 
        {username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()},
        function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link_login').click()
        })
    })

    // 提交登陆表单
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')

                // 将登录成功获得的token存储到localstora
                localStorage.setItem('token', res.token)
                // 跳转到首页
                location.href = '/index.html'
            }
        })
    })
})
