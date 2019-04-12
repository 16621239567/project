<?php
    include 'conn.php';
    if(isset($_POST['username']) &&isset($_POST['password'])){
        $user=$_POST['username'];
        $pass=md5($_POST['password']);
        $query="select * from user where username='{$user}' and password='{$pass}'";
        $result=mysql_query($query);
        if(mysql_fetch_array($result)){
            echo true;
            // header('location:http://127.0.0.1/taobao/src/index.html');
        }else{
            echo false;
            // header('location:http://127.0.0.1/taobao/src/login.html');
        }
    }
?>