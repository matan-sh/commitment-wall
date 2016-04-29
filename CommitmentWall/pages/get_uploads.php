<?php
	
	$folder = '../uploads';
	$handle = opendir($folder);
	
	$num = 0;
	while((($file = readdir($handle)) !== false) && ($num<104))
	{
		if($file != '.' && $file != '..')
		{
			echo '<img src="'.$folder.'/'.$file.'" alt='.$file.' style="padding:1px"; width="7.5%" height="68"/>';
			$num++;
		}
	}
?>