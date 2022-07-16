$(function() {

    var form = layui.form
    var layer = layui.layer
    // 自定义表单校验规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须再6~8字符之间'
            }
        }
    })
    // 获取用户信息
    initUserInfo()
    // 定义获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户数据失败') 
                    }
                form.val('formData', res.data) 
                }
            })
        }

    // 重置表单信息
    $('#resetBtn').on('click', function(e) {
        // 阻止默认重置
        e.preventDefault()
        initUserInfo()
    })

    // 提交信息修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('用户信息更新失败')                    
                }
                layer.msg('用户信息更新成功')
                console.log(res)
                
                // 调用父页面方法重新渲染头像信息
                window.parent.getUserInfo()
            }
        })
    })
})