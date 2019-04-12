<?php
    include 'conn.php';
    if(isset($_POST['submit']) && $_POST['submit']=="注册"){
		$user=$_POST['username'];
		$pass=md5($_POST['password']);
		$member=$_POST['member'];
        $query="insert into user values(null,'{$user}','{$pass}','{$member}',NOW())";
		mysql_query($query);
        header('location:http://127.0.0.1/workPHP/taobao/src/login.html');
        echo $user;
        echo $pass;
        echo $member;
    }
    if(isset($_POST['username'])){
		$username=$_POST['username'];
        $query="select * from user where username='$username'";
		$result=mysql_query($query);
        if(mysql_fetch_array($result)){
			echo 'false';
		}else{
			echo 'true';
		}        
    }
?>