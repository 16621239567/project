<?php
//  header('content-type:text/html; charset=utf-8;');
//	define('HOST','localhost');
//	define('USERNAME','root');
//	define('PASSWORD','jxx5201314');

	$_mysqli = new mysqli('localhost', 'root', 'jxx5201314');
	$_mysqli->set_charset('utf8');
	
    if(!mysqli_connect_errno()){
        die('连接数据库有误'.mysqli_connect_error());
    }
    if(!$_mysqli->select_db('taobao')){
        die('你当前选择的数据库不存在');
    }else{
        $_mysqli->select_db('taobao');
    }
//  define('HOST','localhost');
//  define('USERNAME','root');
//  define('PASSWORD','jxx5201314');
//  $conn=mysqli_connect('localhost', 'root', 'jxx5201314');
//  if(mysqli_connect('localhost', 'root', 'jxx5201314')){
//      die('连接数据库有误'.mysqli_connect_error());
//  }
//  if(!mysqli_select_db('taobao')){
//      die('你当前选择的数据库不存在');
//  }else{
//      mysqli_select_db('taobao');
//  }
//  mysqli_query('SET NAMES UTF8');


?>