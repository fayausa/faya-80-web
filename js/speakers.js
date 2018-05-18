$(function() { 
  // Speaker details
	$.getJSON('/speakers/speakers.json', function(data) {
	    $.each(data.speakers, function(i, sp) {
	    	$.getJSON('/json/all-events/events.json', function(data) {
	    		var li = $('<li/>').appendTo("#speaker-list");
	    		var speakerimg = "<img class='speaker-thumb' src='speakers/thumb/"+sp.thumb+"'>";
	    		$(speakerimg).appendTo(li);
				var speakerdetail = "<h4>"+ sp.speaker +"</h4><span class='profile'>"+ sp.profile +"</span><p class='desc'>"+ sp.speakerdesc +"</p>"
				$(speakerdetail).appendTo(li);
			  	$.each(data.event, function(i, ev) {					
			  		$.each(sp.events, function(j, evnt) {		
			    		if (evnt == ev.eventID) {
			    			if (ev.eventID.match("^T")) {
			    				var eventlist = "<a class='event-link' href='detail.html?loc=tvm&id="+ sp.events[j] +"'>"+ ev.title +"</a><br>"
			    				$(eventlist).appendTo(li);
							}
							else if (ev.eventID.match("^C")){
								var eventlist = "<a class='event-link' href='detail.html?loc=kochi&id="+ sp.events[j] +"'>"+ ev.title +"</a><br>"
			    				$(eventlist).appendTo(li);
							}
							else if (ev.eventID.match("^K")) {
								var eventlist = "<a class='event-link' href='detail.html?loc=kzkd&id="+ sp.events[j] +"'>"+ ev.title +"</a><br>"
			    				$(eventlist).appendTo(li);
							}			  				
			  			}
			    	});
			  	});	 
			});
	    }); 
	});
});
