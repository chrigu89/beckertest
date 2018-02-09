'use strict';


var pushNotification;
var final_token;

var permanentStorage = window.localStorage;
var tempStorage = window.sessionStorage;

var init = {
	initialize: function() {

		console.log('init.initialize');

		if (document.location.protocol == "file:") {
			// file protocol indicates phonegap
			document.addEventListener("deviceready", init.onDeviceReady, false);
		} else {
			// browser on localhost, no phonegap
			init.onDomReady();
		}
	},
	onDeviceReady: function() {
		
		$.support.cors = true;
		
		console.log('init.onDeviceReady ❤ running on DEVICE');
		init.run();

		document.addEventListener("online", onOnline, false);
		document.addEventListener("offline", onOffline, false);
		
		
		var push = PushNotification.init({
			android: {
				senderID: "620690747883"
			},
			ios: {
				alert: "true",
				badge: true,
				sound: 'true'
			},
			windows: {}
		});
		
	
		
		jQuery('#website').attr("src", "https://login.mailingwork.de/-survey2/3179/39/H87l4");
		
		
		/* cb 19.09 */
		$(document).bind("mobileinit", function () { $.mobile.defaultPageTransition = 'none'; });
	
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);  // TEMPORARY oder PERSISTENT


	},
	onDomReady: function() {
		console.log('init.onDomReady ❤ running on DESKTOP');
		init.run();
	},
	run: function() {
		console.log('init.run');
	}
};
init.initialize();



// Dateisystem erfolgreich geladen!
function onFileSystemSuccess(fileSystem) {
	
	 fileSystem.root.getFile(
		'index.html',
		{create: true, exclusive: false},
		onGetFileSuccess,
		onFail
	);
	/*alert(fileSystem.root.toInternalURL());
	alert(fileSystem.root.nativeURL);*/
	
}

//  Hole Root Verzeichnis
function onGetFileSuccess(fileEntry) {
	var path = fileEntry.toURL().replace('index.html', ''); // URL der offenen Datei!

}

// PDF Anzeigen
function showPDF(url) {
	//window.resolveLocalFileSystemURI(url, onResolveSuccess, onFail); <- Klappt
	cordova.plugins.fileOpener2.open(
		url, // e.g. '/var/mobile/Applications/XXXXXXXXX/Library/files/mypdf.pdf'
		'application/pdf', {
			error: function(errorObj) {
				alert('Error status: ' + errorObj.status + ' - Error message: ' + errorObj.message);
			},
			success: function() {
				//alert('Datei erfolgreich geladen');
			}
		}
	);
}


function onResolveSuccess(fileEntry){
	alert(fileEntry.name);	
	alert(fileEntry.fullPath);	
	alert(fileEntry.filesystem);	
}

function onFail(error){
	alert(error.code);
}


function onOnline() {
	document.getElementById('offline').css('display', 'none');
}

function onOffline() {
	
	if(activ==0){
		document.getElementById('offline').css('display', 'block');
	}
	
}


function successHandler (result) {
	//$("#app-status-ul").append('<li>success:'+ result +'</li>');
}


function errorHandler (error) {
	//$("#app-status-ul").append('<li>error:'+ error +'</li>');
}
