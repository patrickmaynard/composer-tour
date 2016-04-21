window.ctour = {};
window.ctour.init = function(){
	ctour = window.ctour;
	$.ajax({
	    dataType: "json",
	    url: "composers.json",
	    mimeType: "application/json",
	    success: function(data){
		ctour = window.ctour;
		//window.console.log('The data:');
		//window.console.log(data);
		ctour.sites = data;
		},
	    complete: function(a,b){
		//console.log('Result type from ajax call:');
		//console.log(b);
		} 
	}).then(window.ctour.sortslides).then(window.ctour.testhash);
	window.onhashchange = window.ctour.testhash;
}
window.ctour.sortslides = function(){
	window.ctour.sites = window.ctour.sites.sort(function(a,b){return(a.order - b.order);});
}
window.ctour.getsupplementals = function(sn){
	var output = "";
	if(ctour.sites[sn]['youtube'] != ""){
		output += '<br><br><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+ctour.sites[sn]['youtube']+'?enablejsapi=1&wmode=opaque">View video</a>';
	}
	if(ctour.sites[sn]['nextdirections'] != ""){
		output += '<br><br><strong>Directions to next stop:</strong> '+ctour.sites[sn]['nextdirections']+'';
	}
	return(output);
}
window.ctour.showslide = function(slidenumber){
	$("html, body").animate({ scrollTop: 0 }, "fast");
	$( ".description" ).hide();
	ctour = window.ctour;
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
	$( ".description" ).fadeIn( "slow", function() {
		// Animation complete.
	});
}
window.ctour.getcoords = function(sn){
	ctour = window.ctour;
	coordstring = ctour.sites[sn]['coords'];
	coords = coordstring.split('-76');
	coords[1] = parseFloat('-76'+coords[1].trim());
	coords[0] = parseFloat(coords[0].trim());
	return(coords);
}
window.ctour.testhash = function(){
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
	//window.ctour.testhash();
	$.when(ctour.init()).then(function(){
		setTimeout(function(){
			window.ctour.testhash();
		},500);
	});
});
