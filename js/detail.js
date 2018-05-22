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
              var bannerdetail = "<div class='video-wrap'><iframe width='600' height='380' src='https://www.youtube.com/embed/"+ f.youtubeID +"' frameborder='0' allowfullscreen></iframe></div>"
            }

            $.getJSON('/speakers/speakers.json', function(data) {
              
              var eventdetail = "<div class='event-detail'><h4>"+ f.title +"</h4><div class='star-rating'><div class='rating rating-"+ f.rating +"'></div><img src='/images/star.png'></div><span class='speaker-detail month'>Streamed live on " + f.date + "</span><p class='event-content'>"+ f.details +"</p><h4>Speakers</h4></div>"
              $(eventdetail).appendTo("#event-detail-wrap");

              $.each(data.speakers, function(j, sp) {
                
                $.each(f.speakers, function(k, spkr) {

                  if (spkr == sp.speakerID) {
                    var speakerdetail = "<div class='speaker-wrap'><img class='speaker-thumb' src='/speakers/thumb/"+ sp.thumb +"'><h3>"+ sp.speaker +"</h3><span class='speaker-name'><span class='speaker-detail company'>" + sp.profile + "</span></span><div class='details'><p>"+ sp.speakerdesc +"</p><a href='"+sp.facebook+"' title='Facebook' class='social-icons fb' target='_blank'></a><a href='"+sp.twitter+"' title='Twitter' class='social-icons twitter' target='_blank'></a><a href='"+sp.linkedIn+"' title='LinkedIn' class='social-icons linkedIn' target='_blank'></a><a href='mailto:"+sp.email+"' class='social-icons email' target='_top'></a></div></div>"
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

        
