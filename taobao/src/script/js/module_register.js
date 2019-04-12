define(['config'], function () {
    require(['jquery'], function () {
        /** 输入框focus 事件 */
        ! function ($) {
            var $form_notice = $('.form_item .label_right');
            var $form_input = $('.form_box input');
            $.each($form_input, function (i) {
                $form_input.eq(i).focus(function () {
                    $form_notice.eq(i).show();
                })
            })
        }(jQuery);

        require(['jqvalidate'],function(){
            $(function () {
                $('#register_form').validate({
                    rules: {
                        username: {
                            required: true,
                            rangelength: [11, 11],
                            remote: {
                                type: 'post',
                                url: 'http://127.0.0.1/workPHP/taobao/php/reg.php'
                            }
                        },
                        password: {
                            required: true,
                            minlength: 6
                        },
                        repass: {
                            required: true,
                            equalTo: '#password'
                        },
                        member: {
                            required: true,
                            minlength: 6,
                            maxlength: 30,
                        }
                    },
                    messages: {
                        username: {
                            required: '<p style="color:#f40;"><i class="iconfont">󰅕</i>手机号码必须填写</p>',
                            rangelength: '<p style="color:#f40;"><i class="iconfont">󰅕</i>输入的手机号码不合法</p>',
                            remote: '<p style="color:#f40;"><i class="iconfont">󰅕</i>该手机号码已注册</p>'
                        },
                        password: {
                            required: '<span style="color:#f40;"><i class="iconfont">󰅕</i>用户密码不允许为空</span>',
                            minlength: '<span style="color:#f40;"><i class="iconfont">󰅕</i>密码长度小于6位</span>',
                        },
                        repass: {
                            required: '<p style="color:#f40;"><i class="iconfont">󰅕</i>密码重复不能为空</p>',
                            equalTo: ' <p style="color:#f40;"><i class="iconfont">󰅕</i>密码不匹配</p>'
                        },
                        member: {
                            required: '<p style="color:#f40;"><i class="iconfont">󰅕</i>会员名不能为空</p>',
                            minlength: '<p style="color:#f40;"><i class="iconfont">󰅕</i>用户名不能小于4</p>',
                            maxlength: '<p style="color:#f40;"><i class="iconfont">󰅕</i>用户名不能大于10</p>',
                        }
                    }
    
                });
            });
            $.validator.setDefaults({
                success: function (label) {
                    label.html('<i class="iconfont" data-spm-anchor-id="a2145.7275777.0.i2.7b165d7cfkppEl">󰅖</i>').css('color', 'green').addClass('valid');
                }
            });
        })

        /** 表单验证部分 */
        

        /** registor 页面加载 底部 */
        ! function ($) {
            $.ajax({
                type: 'get',
                url: 'http://127.0.0.1/workPHP/taobao/src/bottom.html',
                dataType:'html',
            }).done(function(data){
                $('#bottom').append(data);
            })
        }(jQuery);
       
    });
})