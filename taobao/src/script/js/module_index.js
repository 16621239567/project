define(['config'], function () {
    require(['jquery'], function () {


        /**加载头部部分 以及 top 的二级 导航栏效果 */
        require(['jqcookie'], function () {
                ! function ($) {
                    $.ajax({
                        type: 'get',
                        url: 'http://127.0.0.1/workPHP/taobao/src/top.html',
                        dataType: 'html',
                    }).done(function (data) {
                        $('#top').append(data);
                        var $top_sec_nav = $('.top_sec_nav');
                        var $top_sn_list = $('.top_sn_list');
                        $top_sec_nav.each(function (index, value) {
                            $(this).hover(function () {
                                $(this).css({
                                    background: '#fff',
                                });
                                $top_sn_list.eq(index).css({
                                    display: 'block',
                                })
                            }, function () {
                                $(this).css({
                                    background: '#F5F5F5',
                                });
                                $top_sn_list.eq(index).css({
                                    display: 'none',
                                })
                            });
                        });

                        $('.web_nav').hover(function () {
                            $(this).css({
                                background: '#fff',
                            });
                            $('.top_nav').show();
                        }, function () {
                            $(this).css({
                                background: '#F5F5F5',
                            });
                            $('.top_nav').hide();
                        });

                        $('.top_nav').hover(function () {
                            $('.top_nav').show();

                        }, function () {
                            $('.top_nav').hide();
                        });

                        var $index_to_cart = $('.index_to_cart');
                        /** cookie 加载部分 */
                        if ($.cookie('username')) {
                            var $uservalue = ($.cookie('username'));
                            var $user = $('.top_left .user');
                            $user.html($uservalue);
                            $user.css({
                                padding: '0 10px',
                            })
                            var $user_manage = $('.top_left .user_manage');
                            var $user_quit = $('.user_manage  .user_quit')
                            $user.hover(function () {
                                $(this).css({
                                    background: '#fff',
                                });
                                $user_manage.show();
                            }, function () {
                                $(this).css({
                                    background: '#F5F5F5',
                                });
                                $user_manage.hide();
                            })
                            $user_manage.hover(function () {
                                $user_manage.show();
                                $user.css({
                                    background: '#fff',
                                });
                            }, function () {
                                $user_manage.hide();
                                $user.css({
                                    background: '#F5F5F5',
                                });
                            })
                            $user_quit.on('click', function () {
                                if (window.confirm('你确定要退出账号吗？')) {
                                    $.cookie('username', $uservalue, {
                                        expires: -1
                                    });
                                    window.location.reload(true);
                                }
                            })
                            $index_to_cart.on('click', function () {
                                location.href = 'http://127.0.0.1/workPHP/taobao/src/cart.html';
                            })
                        } else {
                            $index_to_cart.on('click', function () {
                                if (window.confirm('你还尚未登录，请先登录账号')) {
                                    location.href = 'http://127.0.0.1/workPHP/taobao/src/login.html';
                                } else {
                                    return false;
                                }
                            })
                        }


                    })
                }(jQuery);
            })



            ! function ($) {
                $.ajax({
                    type: 'get',
                    url: 'http://127.0.0.1/workPHP/taobao/src/footer.html',
                    dataType: 'html',
                }).done(function (data) {
                    $('#footer').append(data);
                })
            }(jQuery);

        /* 给index中的div加类  */
        ! function ($) {
            $('.section').each(function (index) {
                $(this).addClass('section_' + index);
            })
        }(jQuery);


        /*  header 的搜索框 search tab 切换部分  */
        ! function ($) {
            var $st_btns = $('.search_tab ul li');
            var $st_input = $('.search_input input');
            var $search_tj = $('.search_tj');
            var $search_button = $('.search_button button');
            $st_btns.on('click', function () {
                $(this).addClass('search_active').siblings('li').removeClass('search_active');
                if ($(this).index() == 1 || $(this).index() == 2) {
                    $st_input.attr('placeholder', '');
                    $('.search_input .saoma_ifont').css({
                        display: 'none',
                    });
                } else {
                    $st_input.attr('placeholder', '请输入你想要查找的商品');
                    $('.search_input .saoma_ifont').css({
                        display: 'block',
                    });
                }
                if ($(this).index() == 1) {
                    $search_tj.css({
                        display: 'none',
                    });
                    $search_button.css({
                        background: '#FF4200',
                    })

                } else {
                    $search_tj.css({
                        display: 'block',
                    })
                    $search_button.css({
                        background: 'linear-gradient(to right, #ff9000 0, #ff5000 100%)',
                        backgroundRepeat: 'repeat-x',
                    })
                }

            })
        }(jQuery);


        /*  图片轮播图部分   */
        ! function ($) {
            var obj_selector = {
                box: '.slideshow',
                ul: '.pic_list',
                li: '.pic_list li',
                btns: '.btn_list a',
                left: '.slideshow .btn_left',
                right: '.slideshow .btn_right',
            }            		
            		slideshow(obj_selector);               
        }(jQuery);


        /** 天猫轮播图部分  */
        ! function ($) {
            var obj_selector = {
                box: '.tm_lb',
                ul: '.tm_lb ul',
                li: '.tm_lb ul li',
                left: '.tm_lb .btn_left',
                right: '.tm_lb .btn_right',
            }
            setTimeout(function () {
                slideshow(obj_selector);
            }, 1000)
        }(jQuery);


        /**在选取a的下标时有问题 */

        /**bulltin 部分的tab切换  */
        ! function ($) {
            var $tab_li = $('.bulletin .bl_list li');
            var $tab_con = $('.bulletin .gg');
            var $timer=null;
            $tab_li.hover(function () {
                $timer=setTimeout(()=>{
                    $(this).addClass('selected').siblings('li').removeClass('selected');
                    $tab_con.eq($(this).index()).show().siblings('.gg').hide();
                }, 1000)
            },function(){
                clearTimeout($timer);
            })

        }(jQuery);


        /**应用分类部分的tab切换 */
        ! function ($) {
            var $sv_btns = $('.sv_list .sv_btn');
            var $sv_con_box = $('.sv_con_box');
            var $sv_con = $('.sv_con_box .sv_con');
            var $sv_close = $('.sv_con_box .close');
            $sv_close.on('click', function () {
                $sv_con_box.hide();
                $sv_btns.removeClass('sv_active');
            })
            $sv_btns.on('mouseover', function () {
                $(this).addClass('sv_active').siblings('li').removeClass('sv_active');
                $sv_con_box.eq($(this).index()).show();
            })


            var $sv_sort_btns = $('.sv_sort a');
            var $sv_sort_con = $('.sv_sort_con');
            var $sort_con_box = $('.sort_con_box');
            var $sort_con_width = $sv_sort_con.eq(0).outerWidth();
            $sort_con_box.css({
                width: $sv_sort_con.length * $sort_con_width + 'px',
                left: 0,
            });
            $sv_sort_btns.on('mouseover', function () {
                $(this).addClass('sv_sort_active').siblings('a').removeClass('sv_sort_active');
                $sort_con_box.stop(true, true).animate({
                    left: -$(this).index() * $sort_con_width + 'px',
                })
            });

        }(jQuery);



        /**主题市场部分的tab 切换  */
        ! function ($) {
            var $category_li = $('.category_list li');
            var $category_con = $('.category .category_con');
            $category_li.hover(function () {
                $(this).addClass('category_li_on').siblings('li').removeClass('category_li_on');
                var $li_a = $(this).find('a');
                $li_a.css({
                    color: '#f40',
                })
                $category_con.eq($(this).index()).show().siblings('div').hide();
            }, function () {
                $(this).removeClass('category_li_on');
                var $li_a = $(this).find('a');
                $li_a.css({
                    color: '#6c6c6c',
                })
                $category_con.eq($(this).index()).hide();
            })
        }(jQuery);



        /*  淘宝头条 的效果  */
        ! function ($) {
            var $main_bot_con = $('.main_bot_con a');
            var $img = $main_bot_con.find('img');
            var $h4 = $main_bot_con.find('h4');
            $main_bot_con.hover(function () {
                $img.stop(true, true).animate({
                    opacity: 0.8,
                })
                $h4.css({
                    color: '#f40',
                })
            }, function () {
                $img.stop(true, true).animate({
                    opacity: 1,
                })
                $h4.css({
                    color: '#333',
                })
            });

        }(jQuery);

        /**  app 二维码效果  */
        ! function ($) {
            var $app_li = $('.apps_list li');
            var $app_qrcode = $('.apps_list .app_qrcode');
            $app_li.hover(function () {
                $app_qrcode.eq($(this).index()).show();
            }, function () {
                $app_qrcode.eq($(this).index()).hide();
            })


        }(jQuery);


        /**生活研究会所部分 */

        ! function ($) {
            var $img_list = $('.life_list li');
            var $img_box = $('.life_list .img_box');
            $img_list.hover(function () {
                $img_box.eq($(this).index()).css({
                    borderColor: '#f40',
                })
            }, function () {
                $img_box.eq($(this).index()).css({
                    borderColor: '#13d0a1',
                })
            });

        }(jQuery);


        /**每日好店 和 淘宝直播 部分 */
        ! function ($) {
            var $main_bot_con = $('.mt .goods_list a');
            var $h4 = $main_bot_con.find('h4');
            $main_bot_con.hover(function () {
                $(this).find('h4').css({
                    color: '#f40',
                })
            }, function () {
                $(this).find('h4').css({
                    color: '#333',
                })
            });

        }(jQuery);




        /**顶部 固定搜索框部分  */
        ! function ($) {
            var $fixed_search = $('.fixed_search');
            var $fixed_input_tab = $('.fixed_search .input_tab');
            var $fixed_ul = $fixed_input_tab.find('ul');
            var $fixed_btns = $($fixed_ul).find('li');
            $(window).scroll(function () {
                var $scrollTop = $(window).scrollTop();
                if ($scrollTop >= 300) {
                    $fixed_search.show();
                } else {
                    $fixed_search.hide();
                }
            })
            $scrollTop = $(window).scrollTop();
            if ($scrollTop >= 300) {
                $fixed_search.show();
            };


            $fixed_input_tab.hover(function () {
                $(this).css({
                    overflow: 'visible',
                })
            }, function () {
                $(this).css({
                    overflow: 'hidden',
                })
            })

        }(jQuery);

        /** 固定楼梯部分  */
        ! function ($) {
            var $fixed_lt_btns = $('.fixed_lt .lt_btn');
            var $back_top = $('.fixed_lt .back_top');
            var $fixed_lt_box = $('.fixed_lt');
            $fixed_lt_btns.hover(function () {
                $(this).addClass('active').siblings('a').not($fixed_lt_btns.eq(0)).removeClass('active');
            }, function () {
                $(this).removeClass('active');
            });

            $(window).scroll(function () {
                var $scrollTop = $(window).scrollTop();
                if ($scrollTop >= 600) {
                    $fixed_lt_box.css({
                        top: $scrollTop + 76 + 'px',
                    })
                    $back_top.show();
                } else {
                    $back_top.hide();
                }
            });

            $back_top.on('click', function () {
                $('html,body').animate({
                    scrollTop: 0,
                });
            });

            /** 滑动滚轮时时判断 楼梯的层数 */

            var $lt_section = $('.lt_section');
            $(window).scroll(function () {
                $scrollTop = $(window).scrollTop();
                $lt_section.each(function (index) {
                    $top = $lt_section.eq(index).offset().top;
                    if ($scrollTop + 70 >= $top) {
                        $fixed_lt_btns.eq(index).addClass('active').siblings('a').removeClass('active');
                    } else if ($scrollTop <= $lt_section.eq(0).offset().top) {
                        $fixed_lt_btns.eq(0).addClass('active').siblings('a').removeClass('active');
                    }
                })
            });
            /** 刷新页面时判断 楼梯的层数 */
            $lt_section.each(function (index) {
                var $scrollTop = $(window).scrollTop();
                $top = $lt_section.eq(index).offset().top;
                if ($scrollTop + 70 >= $top) {
                    $fixed_lt_btns.eq(index).addClass('active').siblings('a').removeClass('active');
                } else if ($scrollTop <= $lt_section.eq(0).offset().top) {
                    $fixed_lt_btns.eq(0).addClass('active').siblings('a').removeClass('active');
                }
            })
            if ($scrollTop >= 600) {
                $fixed_lt_box.css({
                    top: $scrollTop + 76 + 'px',
                })
                $back_top.show();
            }
            $fixed_lt_btns.on('click', function () {
                $('html,body').animate({
                    scrollTop: $lt_section.eq($(this).index() - 1).offset().top - 56 + 'px',
                })
            })



        }(jQuery);



        /** 热卖单品 和猜你喜欢 数据拼接部分 */ //实现了图片的懒加载
        require(['jqlzload'], function () {
            ! function ($) {
                /**热卖单品部分 */
                var $rmdp_list = $('.rmdp_list'); //这是我要拼接的父元素 
                $rmdp_list.attr('data_nums', 10);
                $.ajax({
                    type: 'post',
                    url: 'http://127.0.0.1/workPHP/taobao/php/get.php',
                    data: {
                        nums: $rmdp_list.attr('data_nums'),
                    },
                    dataType: 'json',
                }).done(function (data) {
                    var $data = data;
                    var $html = '<ul>';
                    $.each($data, function (index) {
                        $html += '<li><a href="http://127.0.0.1/workPHP/taobao/src/details.html?sid=' + $data[index].sid + '" class="img_box"><img class="lazy" data-original="' + $data[index].url + '"alt="" width="197" height="197"></a><a href="#" class="title"><p><img src="https://img.alicdn.com/tfs/TB1APkObOIRMeJjy0FbXXbnqXXa-56-32.png" alt="">"' + $data[index].title + '</p></a><div class="ps"><a href="#" class="pj">评价<span>' + $data[index].comment + '</span></a><a href="#" class="sc">收藏<span>' + $data[index].collect + '</span></a></div><div class="sales"><a href="#" class="price">￥<span>' + $data[index].discount_price + '</span></a><a href="#" class="price_pre">￥<span>' + $data[index].price + '</span></a><a href="#" class="yx">月销<span>' + $data[index].sales + '</span>笔</a></div></li>'
                    });
                    $html += '</ul>';
                    $rmdp_list.append($html);

                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                })


                /**猜你喜欢部分 */
                var $cnxh_list = $('.cnxh_list'); //这是我要拼接的父元素 
                $cnxh_list.attr('data_nums', 55);
                $.ajax({
                    type: 'post',
                    url: 'http://127.0.0.1/workPHP/taobao/php/get.php',
                    data: {
                        nums: $cnxh_list.attr('data_nums'),
                    },
                    dataType: 'json',
                }).done(function (data) {
                    var $data = data;
                    var $html = '<ul>';
                    $.each($data, function (index) {
                        $html += '<li><a href="http://127.0.0.1/workPHP/taobao/src/details.html?sid=' + $data[index].sid + '" class="img_box"><img class="lazy" data-original="' + $data[index].url + '"alt="" width="197" height="197"></a><a href="#" class="title"><p><img src="https://img.alicdn.com/tfs/TB1aGAHngHqK1RjSZFPXXcwapXa-41-16.png" alt="">' + $data[index].title + '</p></a><div class="sales"><a href="#" class="price">￥<span>' + $data[index].discount_price + '</span></a><a href="#" class="yx">销量：<span>' + $data[index].sales + '</span></a></div><a href="#" class="similar"><p class="similar_con"><i class="tb-ifont love"></i>找相似</p><p>发现更多相似宝贝<span class="tb-ifont"></span></p></a></li>'
                    });
                    $html += '</ul>';
                    $cnxh_list.append($html);
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });

                    var $goods_list = $('.cnxh_list ul li');
                    var $similar = $('.cnxh_list .similar');
                    $goods_list.hover(function () {
                        $similar.eq($(this).index()).show();
                    }, function () {
                        $similar.eq($(this).index()).hide();
                    });
                })
            }(jQuery);
        })




        /**  懒加载
         *  1.将图片路径写入data-original属性
			2.给lazyload的图片增加一个名为lazy的class
			3.选择所有要lazyload的图片（img.lazy），执行lazyload();
			4.图片的尺寸需要约定。
         */

        /** 轮播图函数    */
        function slideshow(obj_selector) {
        	
            var $lb_box = $(obj_selector.box); //obj.box
            var $picUl = $(obj_selector.ul); //obj.ul
           	var $picLi = $(obj_selector.li); //obj.li
            var $left = $(obj_selector.left); //obj.left
            var $right = $(obj_selector.right); //obj.right
            var $num = 0;
            obj_selector.timer = null;
            var $firstpic = $picLi.eq(0).clone(true);
            var $lastpic = $picLi.last().clone(true);
            $picUl.prepend($lastpic);
            $picUl.append($firstpic);
            var $liwidth = $picLi.eq(0).outerWidth();
            if (obj_selector.btns) {
                var $btns = $(obj_selector.btns); //obj.btns
                $btns.on('click', function () {
                    $num = $(this).index();
                    lb_switch();
                })
            }
            $picUl.css({
                width: $(obj_selector.li).length * $liwidth + 'px',
                left: -$liwidth + 'px',
            })
            $right.on('click', function () {
                $num++;
                lb_switch();

            })
            $left.on('click', function () {
                $num--;
                lb_switch();
            })
            $lb_box.hover(function () {
                $left.show();
                $right.show();
                clearInterval(obj_selector.timer);
            }, function () {
                $left.hide();
                $right.hide();
                obj_selector.timer = setInterval(function () {
                    $right.click();
                }, 2000)
            });
            obj_selector.timer = setInterval(function () {
                $right.click();
            }, 2000)

            /**轮播图tab切换 */
            function lb_switch() {
                if ($num >= 0 && $num <= $picLi.length - 1) {
                    $picUl.stop(true, true).animate({
                        left: -$liwidth * ($num + 1) + 'px',
                    });
                } else if ($num > $picLi.length - 1) {
                    $picUl.stop(true, true).animate({
                        left: -$liwidth * ($num + 1) + 'px',
                    }, function () {
                        $picUl.css({
                            left: -$liwidth + 'px',
                        })
                    });
                    $num = 0;
                } else if ($num < 0) {
                    $picUl.stop(true, true).animate({
                        left: -$liwidth * ($num + 1) + 'px',
                    }, function () {
                        $picUl.css({
                            left: -$liwidth * $picLi.length + 'px',
                        })
                    });
                    $num = $picLi.length - 1;
                }
                if (obj_selector.btns) {
                    $btns.eq($num).addClass('lb_active').siblings('a').removeClass('lb_active');

                }

            }
        }


    });
});