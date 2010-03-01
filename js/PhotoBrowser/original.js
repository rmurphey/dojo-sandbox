/* thanks to cody lindley */
$(function(){
	loadImages("interesting");

	$("#sidebar h1").click(function(){
		setTag(this);
	});

	$("a#addlist").click(function(){
		this.blur();
		var tagname = prompt("Enter a tag to search Flickr for photos.","");
		if (!tagname) return;
		$("div#sidebar")
			.append("<h1>"+tagname+"</h1>")
			.find("h1:last-child")
				.click(function(){
					setTag(this);
				});
		setTag($("div#sidebar h1:last-child"));
	});

	$("a#removelist").click(function(){
		this.blur();
		if ($("div#sidebar h1.active").text() == "Interesting Photos") return;
		$("div#sidebar h1.active").remove();
		setTag($("div#sidebar h1:last-child"));
	});
});

function loadImages(tag){
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+tag+"&tagmode=any&format=json&jsoncallback=?", function(data){
        $.each(data.items, function(i,item){
            img = new Image();
            img.src = item.media.m;
            img.onload = function() {
                $(this).animate({opacity: 1}, "normal");
    	    }
            $(img).css({opacity: 0}).appendTo("#content").wrap("<div></div>");
    		if ( i == 20 ) return false;
    	});
    	$("#content div").click(function(){
			$("#content div").removeClass("active");
			$(this).addClass("active");
		});
	});
}

function setTag(node){
	$("#content").empty();
	$("#sidebar h1").removeClass("active");
	$(node).addClass("active");
	loadImages($(node).text());
}