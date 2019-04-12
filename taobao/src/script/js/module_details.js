define(['config'], function () {
    require(['jquery'], function () {

        /** 首页传送数据到详情页 */
        /** 放大镜效果 */
        ! function ($) {
            var $sid = location.search.substr(1).split('=')[1];
            $.ajax({
                type: 'post',
                url: 'http://127.0.0.1/workPHP/taobao/php/details_get.php',
                data: {
                    id: $sid,
                },
                dataType: 'json',
            }).done(function (data) {
                var $data = data[0];
                /**商品图片拼接部分 */
                var $picUrls = $data.urls.split(',');
                var $img_box = $('.detail_box .img_box a');
                var $img_box_html = '<img src="' + $picUrls[0] + '"alt="" class="scale_spic">';


                $img_box.append($img_box_html);
                var $img_list = $('.detail_box .img_list');
                var $img_list_html = '<ul class="img_list">';
                $.each($picUrls, function (index) {
                    $img_list_html += '<li><img src="' + $picUrls[index] + '"alt=""></li>';
                })
                $img_list_html += '</ul>';
                var $goods_scale = $('.detail_box .goods_scale');
                $goods_scale.append($img_list_html);

                var $img_list_btns = $('.img_list').find('li');
                $img_list_btns.on('mouseover', function () {
                    $img_box.find('img').attr('src', $picUrls[$(this).index()]);
                    $(this).addClass('img_on').siblings('li').removeClass('img_on');
                })
                /**商品信息拼接部分 */
                var $goods_title = $('.goods_info_con h3 span');
                $goods_title.html($data.title);
                var $price = $('.g_price .price_info span');
                $price.html($data.price);
                var $discount_price = $('.tb_price .pi_con span');
                $discount_price.html($data.discount_price);
                var $comment = $('.pl em');
                $comment.html($data.comment);
                var $collect = $('.jy em');
                $collect.html($data.collect);



                /**放大镜效果 */
                var $s_img = $('.goods_scale .scale_spic');
                var $spic_box = $('.goods_scale .img_box');
                var $sf = $('.goods_scale .scale_sf');
                var $bf = $('.goods_scale .scale_bf');
                var $b_img_html = '<img src="' + $picUrls[0] + '" class="scale_bpic">';
                $bf.html($b_img_html);
                $b_img = $('.goods_scale .scale_bpic');

                $spic_box.on('mouseover', function () {
                    $bf.css('visibility', 'visible');
                    $sf.css('visibility', 'visible');
                    $b_img.attr('src', $(this).attr('src'));
                    $sf.width($s_img.width() / $b_img.width() * $bf.width());
                    $sf.height($s_img.height() / $b_img.height() * $bf.height());
                    var $bili = $bf.width() / $sf.width();
                    $spic_box.on('mousemove', function (ev) {
                        var $l = ev.pageX - $(this).offset().left - $sf.width() / 2 + 20;
                        var $t = ev.pageY - $(this).offset().top - $sf.height() / 2 + 20;
                        if ($l >= $s_img.width() - $sf.width() + 20) {
                            $l = $s_img.width() - $sf.width() + 20;
                        } else if ($l <= 0) {
                            $l = 0;
                        }
                        if ($t >= $s_img.height() - $sf.height() + 20) {
                            $t = $s_img.height() - $sf.height() + 20;
                        } else if ($t <= 0) {
                            $t = 0;
                        }
                        $sf.css({
                            left: $l + 'px',
                            top: $t + 'px',
                        })
                        $b_img.css({
                            left: -$bili * $l + 'px',
                            top: -$bili * $t + 'px',
                        })
                    })
                })
                $spic_box.on('mouseout', function () {
                    $bf.css('visibility', 'hidden');
                    $sf.css('visibility', 'hidden');
                })
            })
        }(jQuery);



        /** 购物车部分  */
        ! function ($) {
            var $num_add = $('.sc_same .add_n');
            var $num_reduce = $('.sc_same .reduce_n');
            var $cart_nums = $('.sc_same .cart_nums');
            
            $num_add.on('click', function () {
                var $nums = $cart_nums.val();
                $nums++;
                if ($nums >= 99) {
                    $nums = 99;
                }
                $cart_nums.val($nums);
            });
            $num_reduce.on('click', function () {
                var $nums = $cart_nums.val();
                $nums--;
                if ($nums <= 0) {
                    $nums = 0;
                }
                $cart_nums.val($nums);
            })
            $cart_nums.change(function () {
                var $reg = /\d+/g;
                if (!$reg.test($(this).val())) {
                    $(this).val(1);
                } else if (parseInt($cart_nums.val()) >= 99) {
                    $cart_nums.val(99);
                }
            })

        }(jQuery);


        /** 加入购物车部分 */
        require(['jqcookie'], function () {
            ! function ($) {
                var $gid = location.search.substring(1).split('=')[1];
                var $add_cart = $('.btn_cart .add_cart');
                var $cart_nums = $('.count .cart_nums');
                var $id_arr = [];
                var $nums_arr = [];
                var $cnums=0;
                if ($.cookie('goods_id') && $.cookie('goods_nums')) {
                    $id_arr = $.cookie('goods_id').split(',');
                    $nums_arr = $.cookie('goods_nums').split(',');
                    $.each($nums_arr,function(i,v){
                        $cnums+=parseInt($nums_arr[i]);
                        $('.cart_box .cart_nums').find('.c_nums').html($cnums);
                    })
                }
                
                $add_cart.on('click', function () {
                    if ($.inArray($gid, $id_arr) != -1) {
                        var $change_nums = parseInt($nums_arr[$.inArray($gid, $id_arr)]) + parseInt($cart_nums.val());
                        $nums_arr[$.inArray($gid, $id_arr)] = $change_nums;
                        $.cookie('goods_nums', $nums_arr.toString(), {
                            expires: 7
                        });
                    } else {
                        $id_arr.push($gid);
                        $nums_arr.push($cart_nums.val());
                        $.cookie('goods_id', $id_arr.toString(), {
                            expires: 7
                        });
                        $.cookie('goods_nums', $nums_arr.toString(), {
                            expires: 7
                        });
                    }


                    $cnums++;
                    var $buy_box=$('.buy');
                    var $cart_box=$('.cart_box');
                    var $gc_box=$('.buy .gc_box')
                    var $img_box=$('.goods_scale .img_box');
                    var $clone_gcbox=$gc_box.clone(true);
                    $clone_gcbox.find('img').attr('src',$img_box.find('img').attr('src'));
                    $clone_gcbox.css({
                        visibility: 'visible',
                        position: 'absolute',
                        left: $gc_box.offset().left+'px',
                        top: $gc_box.offset().top+'px',
                        zIndex: 9999,
                    })
                    $('body').append($clone_gcbox);
                    var $currentvalue={
                        x:$clone_gcbox.offset().left,
                        y:$clone_gcbox.offset().top,
                    };
                    console.log($currentvalue.x,$currentvalue.y);
                    var $distance={
                        x:$cart_box.offset().left-$currentvalue.x,
                        y:$cart_box.offset().top-$currentvalue.y,
                    }
                    var $a=0.0009;
                    var $b=($distance.y-$a*$distance.x*$distance.x)/$distance.x;
                    var $speedx=0;
                    var $timer=setInterval(function(){
                        $speedx+=10;
                        $clone_gcbox.css({
                            left: $currentvalue.x+$speedx+'px',
                            top: $currentvalue.y+($a*$speedx*$speedx+$b*$speedx)+'px',
                        });
                        if($clone_gcbox.offset().left>=$cart_box.offset().left){
                            clearInterval($timer);
                            $clone_gcbox.remove();
                            $('.cart_nums .c_nums').html($cnums);
                        }
                    },10);
                    
                    



                })
                

                var $cart_box=$('.cart_box');
                $cart_box.on('click',function(){
                    if($cart_box.find('.cart_nums').find('.c_nums').html()!=0){
                        location.href='http://127.0.0.1/workPHP/taobao/src/cart.html';
                    }else{
                        alert('您的商品为空');
                    }
                })
            }(jQuery);
        })



    })
})