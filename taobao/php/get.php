<?php
    include 'conn.php';
    $result=mysqli_query('select * from goods_list');
    $data_nums=$_POST['nums'];
    $data=array();
    for($i=0; $i<$data_nums; $i++){
        $data[$i]=mysqli_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($data);


    
?>