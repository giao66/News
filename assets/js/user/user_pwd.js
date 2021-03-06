$(function() {
    var form = layui.form
    var layer  = layui.layer

    // 定义密码验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samepwd: function(value) {
                    if(value === $('[name=oldPwd]').val()) {
                        return '新密码不能与原密码相同！'
                    }
                },
        confirmpwd: function(value) {
                        if (value !== $('[name=newPwd]').val()) {
                            return '两次输入不一致！'
                        }
                    }   
    })

    // 提交修改密码的请求
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')

                // 重置表单
                $('.layui-form')[0].reset()

                // 清除token，返回首页
                localStorage.removeItem('token')
                window.parent.location.href = '../index.html'
            }
        })
    })
})