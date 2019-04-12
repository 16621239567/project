<?php
    include 'conn.php';
       $resulut=mysqli_query('select * from goods_list');
       $values=array();
       for($i=0; $i<mysqli_num_rows($resulut); $i++){
           $values[$i]=mysqli_fetch_array($resulut,MYSQLI_ASSOC);
       }

     print_r($values);

       for($i=0; $i<count($values); $i++){
           mysqli_query("insert into goods_list values(null,'{$values[$i]['url']}','{$values[$i]['title']}','{$values[$i]['price']}','{$values[$i]['discount_price']}','{$values[$i]['sales']}','{$values[$i]['comment']}','{$values[$i]['collect']}','{$values[$i]['urls']}')");
       }    
    
    

?>