$(function() {

	//location tab works here
	$( ".edition-list__item button" ).click(function() {
	  	var loc = $( this ).attr( "data-attr" );
	  	$( ".edition-list__item button" ).removeClass("active");
	  	$(this).addClass("active");
	  	$( "#event-list" ).empty(); // Clearing all the events before the tab content loads
		// $.getJSON('location/'+ loc + '/'+ loc +'.json', function(data) {
	 //       $.each(data.event, function(key, value) {
	 //          var details = "<li class='loc-cls "+ value.technology +"'><div class='video-widget-wrap'><a href='/detail.html?loc="+loc +"&id="+value.eventID+"'><div class='video-thumb'><img  layout='responsive' src='/location/"+loc+"/banners/"+ value.eventbanner +"'></img><div class='video-overlay'></div></div></a><div class='video-detail-wrap'><h4>" + value.title + "</h4><span class='speaker'>" + value.speaker + "</span><span class='company'>" + value.profile + "</span><span class='month'>"+ value.date + "</span><span class='edition'>"+ value.eventID + "</span></div></div></li>"
	 //           $(details).appendTo("#event-list");
	           
	 //     	});
	 //    });
	    $.getJSON('location/'+ loc + '/'+ loc +'.json', function(data) {
				var eventList = data.event.sort((a, b) => new Date(a.date)- new Date(b.date));
				// console.log("After 2:", eventList);

	        $.each(eventList, function(key, value) {
	           $.getJSON('/speakers/speakers.json', function(data) {
	               	var li = $('<li class="loc-cls '+ value.technology +'"/>');
	               	var eventdetail = "<a href='/detail.html?loc="+loc +"&id="+value.eventID+"'><div class='video-widget-wrap'><div class='video-thumb'><img  layout='responsive' src='/location/"+loc +"/banners/"+ value.eventbanner +"'></img></div><div class='video-detail-wrap'><h4>" + value.title + "</h4><span class='month'>"+ value.date + "</span><span class='edition'>"+ value.eventID + "</span><div id='speakerdetail'></div></div></div> <div class='video-overlay'><div class='text'>View Details2</div></div></a>"
	           		$(eventdetail).appendTo(li);  
	           		  $.each(data.speakers, function(j, sp) {
		                $.each(value.speakers, function(k, spkr) {
		                  if (spkr == sp.speakerID) {
		                    var speakerdetail = "<div class='speaker-widget-wrap'><span class='speaker'>" + sp.speaker + "</span><span class='company'> - " + sp.profile + "</span></div>"
		                    $(speakerdetail).appendTo(li);
		                  }
		                });
		             })
	            });
				
	     	});
    	});
	    $(".filter-list a").removeClass('active');
	    $(".filter-list a#all").addClass('active');
	});

	//loading tvm.json for the first page load
   $.getJSON('location/tvm/tvm.json', function(data) {
		var eventList = data.event.sort((a, b) => new Date(a.date)- new Date(b.date));
        $.each(eventList, function(key, value) {
					console.log("After 1:", key);

           $.getJSON('/speakers/speakers.json', function(data) {
               	var li = $('<li class="loc-cls '+ key + value.technology +'"/>').appendTo("#event-list");
               	var eventdetail = "<a href='/detail.html?loc=tvm&id="+value.eventID+"'><div class='video-widget-wrap'><div class='video-thumb'><img  layout='responsive' src='/location/tvm/banners/"+ value.eventbanner +"'></img></div><div class='video-detail-wrap'><h4>" + value.title + "</h4><span class='month'>"+ value.date + "</span><span class='edition'>"+ value.eventID + "</span><div id='speakerdetail'></div></div></div> <div class='video-overlay'><div class='text'>View Details1</div></div></a>"
           		$(eventdetail).appendTo(li);  
           		  $.each(data.speakers, function(j, sp) {
	                $.each(value.speakers, function(k, spkr) {
	                  if (spkr == sp.speakerID) {
	                    var speakerdetail = "<div class='speaker-widget-wrap'><span class='speaker'>" + sp.speaker + "</span><span class='company'> - " + sp.profile + "</span></div>"
	                    $(speakerdetail).appendTo(li);
	                  }
	                });
	             });
            });
     	});
    });


});
//technology tab works here
$(function() {
	var jQuerybtns = $('.filter-list a').click(function(e) {
	    e.preventDefault();
	    if (this.id == 'all') {
	      $('.event-list > li').fadeIn(450);
	    } else {
	      var jQueryel = $('.' + this.id).fadeIn(450);
	      $('.event-list > li').not(jQueryel).hide('slow');
	    }
	    jQuerybtns.removeClass('active');
	    $(this).addClass('active');
  	});
  	
});
