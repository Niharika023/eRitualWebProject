/* contain ajax function */
function makeAjax(url, callback){

	$(".callbacks").click(); //showing throbber
	var project_url = $("#project_name").val();

    $.ajax({     
    	
  	  url: url,
  	  statusCode : {
  		  
  		  901: function(){
  			 window.location.href = "/"+project_url+"/sessionexpired";
  		  },
  		  200 : function(result){
  			$("#cboxClose").click(); //hide throbber 
			callback(result);
  		  },
  		  500 : function(result){
  			$("#ajaxImage").hide();
			$("#alertModal").modal("show");
			$("#alertModelBody").html("");
			$("#alertModelBody").text("Server not responding...try again later...");
  		  }
  	  }
  });   
}

function makeAjaxPost(url, callback){

	$(".callbacks").click(); //showing throbber
	var project_url = $("#project_name").val();

    $.ajax({     
    	
  	  url: url,
  	  type: 'POST',
  	  statusCode : {
  		  
  		  901: function(){
  			 window.location.href = "/"+project_url+"/sessionexpired";
  		  },
  		  200 : function(result){
  			$("#cboxClose").click(); //hide throbber 
			callback(result);
  		  },
  		  500 : function(result){
  			$("#ajaxImage").hide();
			$("#alertModal").modal("show");
			$("#alertModelBody").html("");
			$("#alertModelBody").text("Server not responding...try again later...");
  		  }
  	  }
  });   
}


function getMonthName(monthVal){
	
	var monthName = [];
	monthName.push({id:0,name:'Jan'});	
	monthName.push({id:1,name:'Feb'});	
	monthName.push({id:2,name:'Mar'});	
	monthName.push({id:3,name:'Apr'});	
	monthName.push({id:4,name:'May'});	
	monthName.push({id:5,name:'Jun'});	
	monthName.push({id:6,name:'Jul'});	
	monthName.push({id:7,name:'Aug'});	
	monthName.push({id:8,name:'Sep'});	
	monthName.push({id:9,name:'Oct'});	
	monthName.push({id:10,name:'Nov'});	
	monthName.push({id:11,name:'Dec'});	
	
	for(var i=0; i<monthName.length; i++){
		if(monthName[i].id == monthVal){
			return monthName[i].name;
		}
	}
}


function getFileExtension(extension){
	
	var arr = ["ANI","ANIM","APNG","ART","BMP","BSAVE","CAL","CIN", "CPC","CPT","DPX","ECW","EXR","FITS","FLIC","FPX","GIF","HDRi","HEVC","ICER",
	           "ICNS","ICO", "CUR","ICS","ILBM","JBIG","JBIG2","JNG","JPG","JPEG","JPEG","JPEG-LS","JPEG XR","MNG", "MIFF","PAM","PBM","PGM",
	           "PPM","PNM","PCX","PGF","PICtor", "PNG","PSD","PSB","PSP","QTVR","RAS","RBE","JPEG-HDR","Logluv","TIFF","SGI","TGA","TIFF",
	           "TIFF/EP","TIFF/IT","WBMP","WebP","XBM","XCF","XPM","XWD","CIFF","DNG"];
	var result = false;
	extension = extension.toUpperCase();
	for(var i =0 ;i<arr.length;i++){
		if(arr[i] == extension){
			result = true;
		}
	}
	
	return result;
}

