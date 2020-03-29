$(document).ready(function() {
	//Add megnet link
	if ($('td:contains("Info Hash:")').length > 0 || $('td:contains("Info:")').length > 0) {
		var torDown = $('a:contains("Torrent Free Downloads")');
		if (torDown.length == 1)
		{
			torDown.after(' | <a id="magnetLink" href="javascript:void(0)">Magnet</a> <a id="magnetIcon" title="magnet link"><img src="/images/magnet.gif" /></a>');
			$('#magnetIcon').hide();
		}
	}
	if ($('audio').length > 0){
		var playerwidth = 156;
		
		var attr = $('.postContent .center a img').attr("width");
		// attribute exists?
		if(attr !== undefined && attr !== false) {
			playerwidth = $('.postContent .center a img').attr("width");
		} 
		
		if($('audio').attr('src').indexOf('audible') > -1 || $('audio').attr('src').indexOf('bigfinish') > -1 || $('audio').attr('src').indexOf('blacklibrary') > -1)
		{
			var sample = $('audio').attr('src');
			var playerhtml = '<iframe src="https://loving-clarke-58dd81.netlify.com/?w='+playerwidth+'&s='+sample+'" style="width: '+playerwidth+'px;height:30px;margin:0 auto;display:block;" frameBorder="0"></iframe>';
		}
		else
		{
			var playerhtml = '<div class="player" style="width: '+playerwidth+'px"><div class="info"><div class="name">Sample<div class="btns"><div class="iconfont play-pause icon-play"></div></div></div></div><div class="progress"></div></div>';			
		}
		$('.postContent .center a img').parent().after(playerhtml);
			
		 var aud = $('audio')[0];
		  $('.play-pause').on('click', function(){
			  if (aud.paused) {
				aud.play();
				$('.play-pause').removeClass('icon-play');
				$('.play-pause').addClass('icon-stop');
			  }
			  else {
				aud.pause();
				$('.play-pause').removeClass('icon-stop');
				$('.play-pause').addClass('icon-play');
			  }
		  })
		  aud.ontimeupdate = function(){
			$('.progress').css('width', aud.currentTime / aud.duration * 100 + '%')
		  }
	}
	
	var searchString = getUrlParameter("s");
	if (searchString != "")
	{
		$("#searchform").children("input").val(decodeURI(searchString));
	}
	var searchCat = getUrlParameter("cat");
	if (searchCat != "")
	{
		searchCat = decodeURIComponent(searchCat);
		if(searchCat.includes(","))
		{			
			var cats = searchCat.split(",");
			for (i = 0; i < cats.length; ++i) {
				if(cats[i]>0)
					$("select#cat").val(cats[i]);	
				else
					$("select#ec").val(cats[i]);
			}
		}
		else
		{
			if(searchCat>0)
				$("select#cat").val(searchCat);	
			else
				$("select#ec").val(searchCat);	
		}		
	}
	
	$('.re-ab').each(function(i, obj) {
    	var str = $(this).text();
		$(this).html(Base64.decode(str));
		$(this).show();	
	});	
	
	$(".topButton a").click(function(){
        $(".overlay").toggle();
		$(".overlay-wrap").toggle();
		$(".topSearch").toggle();	
		$(".topMenu").toggle();	
		$("#lsidebar").children("ul").children("li.leftCat").toggle();	
       $(this).toggleClass('btn-open').toggleClass('btn-close');
    });
	
	$(".leftCat").click(function(){
		if (document.body.clientWidth < 720)
		{
		   $(this).children("ul").toggle();
		   $(this).toggleClass('closeCat').toggleClass('openCat');
		}
    });	
	
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	
	configureMenus();
	
		
});   			
	
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1].replace(/\+/g, " ");
        }
    }
    return "";
}

var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },


    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

$("#searchform").on( "submit", function() {
	if($('select#ec').val() == "0")
		$('select#ec').attr('disabled', true);
	if($('select#cat').val() == "0")
		$('select#cat').attr('disabled', true);
	if($('select#cat').attr('disabled') != "disabled" && $('select#ec').attr('disabled') != "disabled" )
	{
		var cat1 = Number($('select#ec').val());
		var cat2 = Number($('select#cat').val());
		if( cat1 + cat2 != 0)
			$("#searchform").append("<input type='hidden' name='cat' value='"+$('select#cat').val()+","+$('select#ec').val()+"'>");
		$('select#ec').attr('disabled', true);
		$('select#cat').attr('disabled', true);
	}
	$('input.s').val (function () {
		var res = this.value.toLowerCase();
		res = res.replace(/\+/gi, " ");
		res = res.replace(/\-/, " ");
		res = res.replace(/\%26/, " ");
		res = res.replace(/\&/, " ");
		res = res.replace(/\:/, " ");
		return $.trim(res);
	})
});
$("a.searchSubmit").on( "click", function() {
	$('input.s').val (function () {
		var res = this.value.toLowerCase();
		res = res.replace(/\+/gi, " ");
		res = res.replace(/\-/, " ");
		res = res.replace(/\%26/, " ");
		res = res.replace(/\&/, " ");
		res = res.replace(/\:/, " ");
		return $.trim(res);
	})
	if($('select#ec').val() == "0")
		$('select#ec').attr('disabled', true);
	if($('select#cat').val() == "0")
		$('select#cat').attr('disabled', true);
	if($('select#cat').attr('disabled') != "disabled" && $('select#ec').attr('disabled') != "disabled" )
	{
		var cat1 = Number($('select#ec').val());
		var cat2 = Number($('select#cat').val());
		if( cat1 + cat2 != 0)
			$("#searchform").append("<input type='hidden' name='cat' value='"+$('select#cat').val()+","+$('select#ec').val()+"'>");
		$('select#ec').attr('disabled', true);
		$('select#cat').attr('disabled', true);
	}
});
$("#categories-toggle").on('click', function(eve){
     eve.preventDefault(); 
     $(this).toggleClass("down");
	 $("#aSearch").toggle();
});
$('a.searchSubmit').click(function(){
   if($.trim($('input.s').val()) == ''){
      alert('Search can not be left blank.');
	  return false;
   }
});
$('input.s').keydown(function (e) {
    if (e.keyCode == 13 && $.trim($('input.s').val()) == '') {		
        e.preventDefault();
        return false;		
    }
});
$('.related-audiobook').on('click', function(){
	window.location.href = $(this).attr("dest");
});
$('.audiobook-tag').on('click', function(){
	window.location.href = $(this).attr("dest");
});

$('.overlay').on('click', function(){
    $(".overlay").toggle(); 
	$(".overlay-wrap").toggle(); 
	$(".topSearch").toggle();
	$(".topMenu").toggle();	
	$("#lsidebar").children("ul").children("li.leftCat").toggle();
    $(".topButton a").toggleClass('btn-open').toggleClass('btn-close');
    open = false;
});
$('.overlay-wrap').on('click', function(){
    $(".overlay").toggle(); 
	$(".overlay-wrap").toggle(); 
	$(".topSearch").toggle();
	$(".topMenu").toggle();	
	$("#lsidebar").children("ul").children("li.leftCat").toggle();
    $(".topButton a").toggleClass('btn-open').toggleClass('btn-close');
    open = false;
});

$('body').on('click', '#magnetLink', function() {
	var infoHash = $('td:contains("Info:")');
	var hash = $('td:contains("Info Hash:")');
	if (infoHash.length == 1 || hash.length == 1)
	{	
		var hashCode = $('td:contains("Info:")').next().text();
		$.ajax
		({
			url: "/download-magnet.php?h="+hashCode,
			success : function(ajaxresult) 
			{
				if(ajaxresult!='invalid' && ajaxresult!='valid')
				{
					var data = "magnet:"
						+ "?xt=urn:btih:" + ajaxresult
						+ "&dn=" + encodeURIComponent($('h1').text())
						+ "&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969"
						+ "&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969"
						+ "&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce"
						+ "&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce"
						+ "&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A69691337%2Fannounce"
						+ "&tr=udp%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce"
						+ "&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce"
						+ "&tr=http%3A%2F%2Fretracker.telecom.by%3A80%2Fannounce"
						+ "&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce"				
						;
					$('#magnetIcon').attr("href", data);				
					$('#magnetIcon').show(500);				
				}
				else if (ajaxresult=='invalid')
				{
					var url = window.location.pathname; 
					window.location='/member/login.php?r='+url;
				}
				else if (ajaxresult=='valid')
				{
					var data = "magnet:"
						+ "?xt=urn:btih:" + $('td:contains("Info Hash:")').next().text()
						+ "&dn=" + encodeURIComponent($('h1').text())
						+ "&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969"
						+ "&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969"
						+ "&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce"
						+ "&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce"
						+ "&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A69691337%2Fannounce"
						+ "&tr=udp%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce"
						+ "&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce"
						+ "&tr=http%3A%2F%2Fretracker.telecom.by%3A80%2Fannounce"
						+ "&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce"					
						;
					$('#magnetIcon').attr("href", data);				
					$('#magnetIcon').show(500);	
				}
			}
		});
	}
});
function configureMenus() {
		// variable to hold current window state - small, medium, or large
		 var windowState = 'large';
		  
		  // check intital width of the screen, respond with appropriate menu
		 var sw = document.body.clientWidth;
		 if (sw < 720) {
			 smMenu();
		 } else if (sw >= 721 && sw <= 988) {
				 medMenu();
		 } else {
				 lgMenu();
			  };
		  
		  // take care of resizing the window
		  $(window).resize(function() {
			  var sw = document.body.clientWidth;
			  if (sw < 720 && windowState != 'small') {
				 smMenu();
			  }
			  if (sw >= 721 && sw <= 988 && windowState != 'medium') {
				 medMenu();
			  }  
			  if (sw > 988 && windowState != 'large') {
				 lgMenu();
			  } 
		  });

	function smMenu() {
		$(".topMenu").hide();
		$(".topSearch").hide();
		$("#lsidebar").children("ul").children("li.leftCat").hide();
		$(".topButton a").addClass('btn-open').removeClass('btn-close');
		$(".leftCat").addClass('closeCat').removeClass('openCat');
		$("#lsidebar").children("ul").children("li.leftCat").children("ul").hide();
		windowState = 'small';
	}
	
	function medMenu() {
		$(".topMenu").show();
		$(".topSearch").show();
		$("#lsidebar").children("ul").children("li.leftCat").show();
		$("#lsidebar").children("ul").children("li.leftCat").children("ul").show();
		$(".overlay-wrap").hide();
		$(".overlay").hide();			
		windowState = 'medium';
	}
	
	function lgMenu() {
		$(".topMenu").show();
		$(".topSearch").show();
		$("#lsidebar").children("ul").children("li.leftCat").show();
		$("#lsidebar").children("ul").children("li.leftCat").children("ul").show();
		$(".overlay-wrap").hide();
		$(".overlay").hide();
		windowState = 'large';
	}
}