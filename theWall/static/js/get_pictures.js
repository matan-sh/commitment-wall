
function setImg(){	
	//setInterval(function(){
		$.ajax({
			url:"../pages/get_last_pictures.php",
			method:"POST",
			data:{},
         dataType:"text",
         success:function(data){
				$('.magicwall-grid').html(data);
				alert(data); 
				
				$(".magicwall").magicWall({
					columnsCount: 13,
					rowsCount: 8,
					delay: 10,
				});
				$(".grid-count").html($(".magicwall-grid").children().length);
			}
		});
		
}

function addImg(index){	
	$.ajax({
		url:"../pages/get_pictures.php",
		method:"POST",
		data:{index:index},
		dataType:"text",
		success:function(data){
			$('#items-holder').html(data);
			update(index);
		}
	});
}


function update(index){

	//var i=index-107;
	var i = 104;
	var OUT_OF_FRAME = 104;
	var size = $("#items-holder").children().length;
	alert("size=" + size);
	$("#items-holder").append($("#items-holder").children().slice(0, size).clone());
	$(".magicwall").magicWall("appendItems", $("#items-holder").children().slice(0, size));
	//if($(".magicwall-grid").children().length == 108){
		var a = $(".magicwall-grid").children("li.id"+i)[0]["outerHTML"];
		var str = a.substring(a.indexOf("data-index")+12, a.length);
		str = str.substring(0, str.indexOf('"'));
		/*if(str<OUT_OF_FRAME){
			$(".magicwall").magicWall("switchItem", str, "flipX", "100", "1000");
		}
		$(".magicwall").magicWall("removeItems", $(".magicwall-grid").children("li.id"+i));
		*/
		i++
	//}

	if($(".magicwall-grid").children().length < 200){
		$(".add").removeAttr("disabled");
	}else{
		$(".add").attr("disabled", "disabled");
	}
	
	if($(".magicwall-grid").children().length > -1){
		$(".remove").removeAttr("disabled");
	}else{
		$(".remove").attr("disabled", "disabled");
	}
	
	$(".grid-count").html($(".magicwall-grid").children().length);
	$(".grid-switching").html($(".magicwall-grid").children().length <= 0 ? "off" : "on");
}