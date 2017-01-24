(function(){
	ctour = {};
	ctour.init = function(){
		ctour = ctour;
		$.ajax({
				dataType: "json",
				url: "composers.json",
				mimeType: "application/json",
				success: function(data){
			ctour = ctour;
			//window.console.log('The data:');
			//window.console.log(data);
			ctour.sites = data;
			},
				complete: function(a,b){
			//console.log('Result type from ajax call:');
			//console.log(b);
			} 
		}).then(ctour.sortslides).then(ctour.testhash);
		window.onhashchange = ctour.testhash;
	}
	ctour.sortslides = function(){
		ctour.sites = ctour.sites.sort(function(a,b){return(a.order - b.order);});
	}
	ctour.getsupplementals = function(sn){
		var output = "";
		if(ctour.sites[sn]['youtube'] != ""){
			output += '<br><br><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+ctour.sites[sn]['youtube']+'?enablejsapi=1&wmode=opaque">View video</a>';
		}
		if(ctour.sites[sn]['nextdirections'] != ""){
			output += '<br><br><strong>Directions to next stop:</strong> '+ctour.sites[sn]['nextdirections']+'';
		}
		return(output);
	}
	ctour.showslide = function(slidenumber){
		$("html, body").animate({ scrollTop: 0 }, "fast");
		$( ".description" ).hide();
		$( ".slidenav" ).hide();
		$("html, body").animate({ scrollTop: 0 }, "fast");
		$( ".description" ).hide();
		ctour = ctour;
		var sn = slidenumber;
		ctour.sites[sn]['compnameshort'] = ctour.sites[sn]['compname'].split(',')[0];
		var prevlink = (sn-1) in ctour.sites ? '<a href="#'+(sn)+'">Previous</a> | ' : '<span>Previous</span> | ';
		var nextlink = (sn+1) in ctour.sites ? '<a href="#'+(sn+2)+'">Next</a>' : '<span>Next</span>';
		$('.compnameshort').html(ctour.sites[sn]['compnameshort']);
		$('.compname').html(ctour.sites[sn]['compname']);
			$('.significance').html(""+ctour.sites[sn]['significance']);
		$('.placename').html(ctour.sites[sn]['placename']);
		$('.placerelation').html(ctour.sites[sn]['placerelation']);
		var description = ctour.sites[sn]['description'].replace('. ','. <br>') + ctour.getsupplementals(sn); 
		$('.description').html(description); 
		$('.slidenav').html(prevlink+nextlink);
		coords = ctour.getcoords(sn);
		$('iframe#map').attr('src', 'http://www.openstreetmap.org/export/embed.html?bbox='+(coords[1] - .001)+'%2C'+(coords[0] - .001)+'%2C'+(coords[1] + .001)+'%2C'+(coords[0] + .001)+'&amp;layer=mapnik&marker='+coords[0]+'%2C'+coords[1] );
		$(".description").animate({ scrollTop: 0 }, "fast");
		$( ".description" ).fadeIn( "slow", function() {
			$(".description").animate({ scrollTop: 0 }, "fast");
			$( ".slidenav" ).fadeIn("slow");
			// Animation complete.
		});
	}
	ctour.getcoords = function(sn){
		ctour = ctour;
		coordstring = ctour.sites[sn]['coords'];
		coords = coordstring.split('-76');
		coords[1] = parseFloat('-76'+coords[1].trim());
		coords[0] = parseFloat(coords[0].trim());
		return(coords);
	}
	ctour.testhash = function(){
			//console.log('testing hash ...');
			cleanhash = parseInt(window.location.hash.replace('#','')) - 1;
			//console.log('Hash is ...');
			//console.log(cleanhash);
			//console.log('Type of our attempted object should be "object" and is ... ');
			if(typeof($(ctour.sites)[(cleanhash)]) == 'object'){
				ctour.showslide(cleanhash);  
			}else{
				ctour.showslide(0);	
		}
	}
	$(function(){
		//ctour.init();
		//ctour.testhash();
		$.when(ctour.init()).then(function(){
			setTimeout(function(){
				ctour.testhash();
			},500);
		});
	});
});
