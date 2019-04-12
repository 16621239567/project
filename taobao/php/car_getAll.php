<?php
	include 'conn.php';
	$result=mysqli_query('select * from goods_list');    
    $data=array();
    for($i=0; $i<mysqli_num_rows($result); $i++){
        $data[$i]=mysqli_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($data);
    
?>