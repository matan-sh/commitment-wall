<?php
	header("Content-Type: application/json");
	$folder = '../uploads';
	$handle = opendir($folder);

    $dir = $folder."/";
    //$dirHandle = opendir($dir);
    $jsonData = '[ ';
    $i = 0;
    while ($file = readdir($handle)) {
        if(!is_dir($file) && strpos($file, '.jpg')){
            $i++;
            $src = "$dir$file";
            $jsonData .= '{ "title" : "test'.$i.'" , "subtitle" : "'.$i.'" , "url" : "" , "img" : "http://localhost/theWall/uploads/' .$file.'" },' ;
        }
    }
    closedir($handle);
    $jsonData = chop($jsonData, ",");
    $jsonData .= ' ]';
    echo $jsonData;
?>