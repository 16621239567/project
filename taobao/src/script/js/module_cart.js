define(['config'], function () {
    require(['jquery'], function () {
        /**购物车头部部分的下划线滑动效果 */
        ! function ($) {
            var $header_list = $('.cb_header ul li');
            var $header_list_w = $header_list.eq(0).width();
            var $a_line = $('.cb_header .a_line');
            $header_list.hover(function () {
                $a_line.stop(true).animate({
                    left: ($(this).index()) * $header_list_w + 'px',
                }, 300)
            }, function () {
                $a_line.stop(true).animate({
                    left: 0,
                }, 300)
            });
        }(jQuery);


        /**购物车信息拼接部分 */
        require(['jqcookie'], function () {
            ! function ($) {
                if ($.cookie('goods_id') && $.cookie('goods_nums')) {
                    var $items_sid = ($.cookie('goods_id')).split(',');
                    var $items_nums = ($.cookie('goods_nums')).split(',');
                    var $count_goods=$('.cb_header .count_goods');
                    $count_goods.html($items_sid.length);
                    $.ajax({
                        type: 'get',
                        url: 'http://127.0.0.1/workPHP/taobao/php/car_getAll.php',
                        dataType: 'json',
                    }).done(function (data) {
                        /** 数据拼接部分 */
                        var $data = data;
                        $.each($items_sid, function (i, v) {
                            var $cookie_sid = $items_sid[i];
                            var $outer_i = i;
                            $.each($data, function (i, v) {
                                var $data_sid = $data[i].sid;
                                if ($cookie_sid == $data_sid) {
                                    var $order_content = $('.order_content');
                                    var $clone_item = $('.order_items:hidden').clone(true, true);
                                    $clone_item.find('.item_imgbox').find('img').attr('src', $data[i].url).css('width', '80px');
                                    $clone_item.find('.item_info').find('.it_title').html($data[i].title);
                                    $clone_item.find('.it_price').find('.it_yprice').html($data[i].price);
                                    $clone_item.find('.it_price').find('.it_dcprice').html($data[i].discount_price);
                                    $clone_item.find('.it_count').find('.item_nums').val($items_nums[$outer_i]);
                                    $clone_item.find('.it_sum').find('span').html($items_nums[$outer_i] * $data[i].discount_price);
                                    $clone_item.css('display', 'block').attr('sid', $data[i].sid);
                                    $order_content.append($clone_item);
                                }
                            })
                        })

                        /**删除单个商商品操作 */
                        var $item_delete = $('.item_delete').not($('.item_delete').first());
                        $item_delete.on('click', function () {
                            if (window.confirm('你确定要删除该商品吗？')) {
                                var $item_index=$.inArray($(this).parents('.order_items').attr('sid'),$items_sid);
                                $(this).parents('.order_items').remove();
                                $items_sid.splice($item_index, 1);
                                $items_nums.splice($item_index, 1);
                                changeCookie();

                            };
                        })



                        /** 对商品数量进行加减  以及 输入后改变*/
                        var $item_reduce = $('.it_count .item_reduce').not($('.item_reduce').first());
                        var $item_add = $('.it_count .item_add').not($('.item_add').first());
                        var $item_nums = $('.it_count .item_nums').not($('.item_nums').first());
                        $item_reduce.on('click', function () {
                            var $count = $(this).parents('.item_amount').find('.item_nums').val();
                            $count--;
                            if ($count <= 0) {
                                $count = 0;
                            }
                            $(this).parents('.item_amount').find('.item_nums').val($count);
                            $(this).parentsUntil('.order_items').find('.it_sum').find('span').html($count * $(this).parentsUntil('.order_items').find('.it_price').find('.it_dcprice').html());
                            sumPrice();

                            var $item_index=$.inArray($(this).parents('.order_items').attr('sid'),$items_sid);
                            $items_nums[$item_index]=$count;
                            changeCookie();
                        })
                        $item_add.on('click', function () {
                            var $count = $(this).parents('.item_amount').find('.item_nums').val();
                            $count++;
                            if ($count >= 99) {
                                $count = 99;
                            }
                            $(this).parents('.item_amount').find('.item_nums').val($count);
                            $(this).parentsUntil('.order_items').find('.it_sum').find('span').html($count * $(this).parentsUntil('.order_items').find('.it_price').find('.it_dcprice').html());
                            sumPrice();
                            var $item_index=$.inArray($(this).parents('.order_items').attr('sid'),$items_sid);
                            $items_nums[$item_index]=$count;
                            changeCookie();
                        })
                        $item_nums.change(function () {
                            var $reg = /\d+/g;
                            if (!$reg.test($(this).val())) {
                                $(this).val(1);
                            } else if (parseInt($(this).val()) >= 99) {
                                $(this).val(99);
                            }
                            $(this).parentsUntil('.order_items').find('.it_sum').find('span').html($(this).val() * $(this).parentsUntil('.order_items').find('.it_price').find('.it_dcprice').html());
                            sumPrice();
                            var $item_index=$.inArray($(this).parents('.order_items').attr('sid'),$items_sid);
                            $items_nums[$item_index]=$(this).val();
                            changeCookie();
                        })

                        function changeCookie(){
                            $.cookie('goods_id', $items_sid.toString(), {
                                expires: 7
                            });
                            $.cookie('goods_nums', $items_nums.toString(), {
                                expires: 7
                            });
                        }

                        /* *    全选按钮操作 */
                        $('.item_checkall').on('change', function () {
                            $('.order_items:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                            $('.item_checkall').prop('checked', $(this).prop('checked'));
                            sumPrice();
                            if ($(this).prop('checked')) {
                                exist_items();
                            } else {
                                empty_items();
                            }
                        });

                        var $inputs = $('.order_items:visible').find(':checkbox');
                        $inputs.on('change', function () {
                            if ($('.order_items:visible').find('input:checkbox').length == $('.order_items:visible').find('input:checked').size()) {
                                $('.item_checkall').prop('checked', true);
                                exist_items();

                            } else {
                                $('.item_checkall').prop('checked', false);
                                empty_items();
                            }
                            sumPrice();

                            /** 对结算按钮进行判断 */
                            var $input_flag = false;
                            $.each($inputs, function (i, v) {
                                if ($(v).prop('checked')) {
                                    $input_flag = true;
                                }
                            })
                            if ($input_flag) {
                                exist_items();
                            } else {
                                empty_items();
                            }

                            /** 对勾选了按钮进行背景改变 */
                            if($(this).prop('checked')){
                                $(this).parents('.order_items').css('background','#fff8e1');
                            }else{
                                $(this).parents('.order_items').css('background','#fcfcfc');
                            }
                        });



                        /**当没有选中商品时的效果 */
                        function empty_items() {
                            $('.cf_countprice .cf_js').css({
                                cursor: 'not-allowed',
                                background: '#B0B0B0',
                            })
                            $('.cf_countprice .cf_js').on('click', function () {
                                alert('您还没有选择商品，请选择商品！');
                            })
                        }
                        /**当选中商品时的效果 */

                        function exist_items() {
                            $('.cf_countprice .cf_js').css({
                                cursor: 'pointer',
                                background: '#f40',
                            })
                        }

                        /**计算总的价钱 */
                        function sumPrice() {
                            var $sum = 0;
                            var $sun_price = 0;
                            $('.order_items:visible').each(function (i, v) {
                                if ($(v).find('.check_box input').prop('checked')) {
                                    $sum += parseInt($(v).find('.it_count').find('.item_nums').val());
                                    $sun_price += parseFloat($(v).find('.it_sum').find('span').html());
                                }
                            });
                            $('.cf_selectnums').find('em').html($sum);
                            $('.cf_sumprice').find('strong').html($sun_price);
                        }


                        /**删除选中的商品按钮 */
                        var $co_delete = $('.co_delete');
                        $co_delete.on('click', function () {
                            if (window.confirm('你确定要删除所选中的商品吗？')) {
                                $.each($('.order_items:visible'),function(i,v){
                                    if($(v).find('.it_check').find('input').prop('checked')){
                                        var $item_index=$.inArray($(v).attr('sid'),$items_sid);
                                        $items_sid.splice($item_index, 1);
                                        $items_nums.splice($item_index, 1);
                                        changeCookie();
                                        $(v).remove();
                                    }
                                })
                            };
                        })
                    })
                } else {
                    /** 如果  cookie 为空 则显示效果 */
                    var $empty_box = $('.c_layout .empty_box');
                    var $c_cart_box = $('.c_layout .c_cart_box');
                    $empty_box.show();
                    $c_cart_box.hide();
                }


            }(jQuery);


        })

            /** 购物车下方轮播图切换效果 */
            ! function ($) {
                var $cl_section = $('.cart_slideshow .cl_section');
                var $cs_btns = $('.btns_box .cs_btn');
                var $num = 0;
                var $timer=null;

                /** 轮播图切换效果的左右箭头 */
                var $cart_slideshow = $('.cart_slideshow');
                var $cs_left = $('.cs_left');
                var $cs_right = $('.cs_right');
                

                /**拼接数据部分 */
                $.ajax({
                    type: 'post',
                    url: 'http://127.0.0.1/workPHP/taobao/php/get.php',
                    data: {
                        nums: '25',
                    },
                    dataType: 'json',
                }).done(function (data) {
                    var $data = data;
                    var $count = 0;
                    $.each($cl_section, function (i, v) {
                        var $cl_section_html = '<ul>';
                        for (var i = 0; i < 5; i++) {
                            $cl_section_html += '<li><div class="line1"><a href="#"><img src="' + $data[$count].url + '"alt=""></a></div><div class="line2"><a href="#"><em class="ds_price">￥<span>' + $data[$count].discount_price + '</span></em><em class="y_price">￥<span>' + $data[$count].price + '</span></em><div class="postfree"></div></a></div><div class="line3"><a href="#">' + $data[$count].title + '</a></div><div class="line4"><a href="#" class="sales">销量<span>' + $data[$count].sales + '</span></a><a href="#" class="mail"></a></div></li>'
                            $count++;
                        }
                        $cl_section_html += '</ul>';
                        $(v).append($cl_section_html);
                    })
                })



                /** 轮播图按钮部分 */
                var $num = 0;
                $cs_btns.on('mouseover', function () {
                    $num = $(this).index();
                    $(this).addClass('active').siblings('span').removeClass('active');
                    $cl_section.eq($num).show().siblings('.cl_section').hide();
                })

                $cs_left.on('click', function () {
                    $num--;
                    if ($num < 0) {
                        $num = $cl_section.length - 1;
                    }
                    tabSwitch();
                })
                $cs_right.on('click', function () {
                    $num++;
                    if ($num > $cl_section.length - 1) {
                        $num = 0;
                    }
                    tabSwitch();
                })
                $timer=setInterval(() => {
                    $cs_right.click();

                }, 2000);
                $cart_slideshow.hover(function () {
                    $cs_left.animate({
                        left: 0,
                    });
                    $cs_right.animate({
                        right: '6px',
                    });
                    clearInterval($timer)
                }, function () {
                    $cs_left.animate({
                        left: '-50px',
                    });
                    $cs_right.animate({
                        right: '-50px',
                    });
                    $timer=setInterval(() => {
                        $cs_right.click();
                    }, 2000);
                });
                function tabSwitch() {
                    $cs_btns.eq($num).addClass('active').siblings('span').removeClass('active');
                    $cl_section.eq($num).show().siblings('.cl_section').hide();
                }
            }(jQuery);

    })
})