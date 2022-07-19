$(function() {
    var form = layui.form
    var layer = layui.layer
    // 初始化文章类型
    initArtCateList()
    // 定义初始化文章类型
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败')
                }
                var htmlStr = template('tpl-table', res.data)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    // 点击添加文章类型
    $('#addClass').on('click', function() {
            indexAdd = layer.open({
            type: 1, 
            title :'添加文章分类',
            area: ['500px', '300px'],
            content: $('#dialog-add').html() //这里content是一个普通的String
          })
    })

    // 点击提交新增文章分类
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章类别失败！')
                }
                // 更新文章类别table
                initArtCateList()
                layer.msg('新增文章类别成功！')
                layer.close(indexAdd)
            }
        })
    })

    // 点击编辑文章分类
    var indexEdit = null
    $('tbody').on('click', '.edit-btn', function() {
        indexEdit = layer.open({
            type: 1, 
            title :'编辑文章分类',
            area: ['500px', '300px'],
            content: $('#dialog-edit').html() //这里content是一个普通的String
          })
        var id = $(this).attr('data-id')

        // 发出请求获取对应的文章类型信息
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('编辑请求错误！')
                }
                form.val('form-edit', res.data)
            }   
        })
    })

    // 通过代理形式提交修改后的文章类型
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if(res !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新分类成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 代理形式绑定删除
    $('tbody').on('click', '.del-btn', function() {
        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            var id = $(this).attr('data-id')
            // 发起ajax请求删除
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })      
            layer.close(index);
        })
    })
})