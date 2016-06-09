/*
*	check for places with multi spaces and delete them,
*	for example change this - "  abc   def"  to this - "abc def" 
*/
function deleteUnnecessarySpaces(str) {
	var txt = str;
	var start = 0;
	var end = txt.length;

	//Looking for spaces at the beginning of a string
	for(var i=0; i<end && txt.charAt(i) === " "; i++){
		start++;
	}
	//Looking for spaces at the end of a string
	for(var i=txt.length-1; i>=0 && txt.charAt(i) === " "; i--){
		end--;
	}
	
	if(start<end)
		txt = txt.substring(start, end);
	else //Empty word
		txt = "";
	
	for(var i=1; i<txt.length-1; i++)
		while(txt.charAt(i) == txt.charAt(i+1) && txt.charAt(i) == " ")
			txt = txt.replace("  ", " ");
	
	return txt;
}