$(function() {
    // 挂载方法
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 定义一个查询参数对象
    var q = {
        pagenum: 1,     // 页码
        pagesize: 2,    // 每页新闻条数
        cate_id: '',    // 分类id
        state: ''       // 文章状态
    }
    initTable()
    // 定义列表初始化函数
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取文章列表失败!')
                }
                // 通过模板渲染引擎渲染表格
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 渲染分页
                renderPage(res.total)
            }
        })
    }
    // 定义美化时间过滤器
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Date(data)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' +
         hh + ':' + mm + ':' + ss
    }

    // 定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    initCate()
    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success : function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类可选项
                htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通知layui渲染
                form.render('select')
            }
        })
    }

    // 筛选文章列表
    $('#form-serach').on('submit', function(e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initTable()
    })

    // 定义渲染分页方法
    function renderPage(total) {
        laypage.render({
            elem: 'Page', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                
                //首次不执行
                if(!first){
                  initTable()
                }
              }  
        })
    }
})