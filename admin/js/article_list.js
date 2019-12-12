$(function () {
    $.get({
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            if (res.code === 200) {
                let html = template('categoryId', res);
                $('#selCategory').html(html);
             }
        }
    });
    // 封装一个获取数据的方法
    function getData(pages, callback) {
        $.get({
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: pages,//当前页
                perpage: perpage,
            },
            success: function (res) {
                // console.log(res);           
                if (res.code === 200) {
                    let html = template('articleList', res);
                    $('tbody').html(html);
                }
                if (res.data.data.length != 0 && callback != null) {
                    $('#pagination-demo').show();
                    $('#tips').hide();
                    callback(res);
                } else if (res.data.data.length == 0 && res.data.totalPage != 0 && res.data.totalPage == mypage - 1) {
                    mypage -= 1;
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, mypage);
                } else {
                    $('#pagination-demo').hide();
                    $('#tips').show();
                 }
            }
        });
    };
    let mypage = 1;
    let perpage = 10;
    getData(mypage, function (res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                mypage = page;
                getData(mypage, function () { });
             }
        });
    });
    // 筛选按钮
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        getData(mypage, function (res) {
            // console.log(mypage);事件触发时的页面
            $('#pagination-demo').twbsPagination('changeTotalPages',res.data.totalPage,1)
            
         });
    })
    //删除按钮
    $('tbody').on('click', '.delete', function () {
        let artId = $(this).attr('data-id');
        if (confirm('您确定要删除吗？')) {
            $.post({
                url: BigNew.article_delete,
                data: {
                    id:artId
                },
                success: function (res) {
                    console.log(res);
                    
                    if (res.code==204) {
                        getData(mypage, function (res) {
                            $('#pagination-demo').twbsPagination('changeTotalPages',res.data.totalPage,mypage)
                         });
                    }
                }
            });
         }
     })
 });