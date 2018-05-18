$(function() { 
  var url_string = window.location.href; //gets browser url
  var url = new URL(url_string);
  var location = url.searchParams.get("loc"); 
  var eID = url.searchParams.get("id");


  // Event details

  $.getJSON('/location/'+ location +'/' + location + '.json', function(data) {

    $.each(data.event, function(i, f) {

        

          if (f.eventID == eID) {

            if (f.youtubeID == "") {
              var bannerdetail = "<div class='video-wrap'><img class='event-banner' src='/location/"+location+"/banners/"+ f.eventbanner +"'/></div>"
            } else {
              var bannerdetail = "<div class='video-wrap'><amp-youtube data-videoid='"+ f.youtubeID +"' layout='responsive' width='480' height='270'></amp-youtube></div>"
            }

            $.getJSON('/speakers/speakers.json', function(data) {
              
              var eventdetail = "<div class='event-detail'><h4>"+ f.title +"</h4><div class='star-rating'><div class='rating rating-"+ f.rating +"'></div><img src='/images/star.png'></div><span class='speaker-detail month'>Streamed live on " + f.date + "</span><p class='event-content'>"+ f.details +"</p><h4>Speakers</h4></div>"
              $(eventdetail).appendTo("#event-detail-wrap");

              $.each(data.speakers, function(j, sp) {
                
                $.each(f.speakers, function(k, spkr) {

                  if (spkr == sp.speakerID) {
                    var speakerdetail = "<div class='speaker-wrap'><img class='speaker-thumb' src='/speakers/thumb/"+ sp.thumb +"'><h3>"+ sp.speaker +"</h3><span class='speaker-name'><span class='speaker-detail company'>" + sp.profile + "</span></span><div class='details'><p>"+ sp.speakerdesc +"</p></div></div>"
                    $(speakerdetail).appendTo("#speaker-detail-wrap");
                  }
                });
                
                
             });
            });

            $(bannerdetail).appendTo("#event-detail-wrap");
            

          } 
       
    });

  });



});

        
