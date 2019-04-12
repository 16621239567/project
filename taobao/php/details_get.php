<?php
    include 'conn.php';
    $sid=$_POST['id'];
    $query="select * from goods_list where sid={$sid}";
    $result=mysqli_query($query);
    $values=array();
    for($i=0; $i<mysqli_num_rows($result); $i++){
        $values[$i]=mysqli_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($values);
?>