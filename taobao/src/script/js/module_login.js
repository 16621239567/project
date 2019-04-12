define(['config'],function(){
    require(['jquery'],function(){
        require(['jqcookie'],function(){
            !function($){
                var $username=$('#login_username');
                var $password=$('#login_password');
                var $btn_submit=$('.login_user .btn_submit');
                $btn_submit.click(function(){
                    $.ajax({
                        type:'post',
                        url:'http://127.0.0.1/workPHP/taobao/php/login.php',
                        data:{
                            username:$username.val(),
                            password:$password.val(),
                        }
                    }).done(function(data){
                        if(!data){
                            alert('用户名或账号密码错误！');
                            $username.value='';
                            $password.value='';
                            $username.focus();
                        }else{
                            $.cookie('username',$username.val(),{expires:7});
                            location.href='http://127.0.0.1/workPHP/taobao/src/index.html';
                        }
                    })
                    return false;
                })
            }(jQuery);
        })
        

    })
})