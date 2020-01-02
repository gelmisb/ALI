
 function render(data) {

        var html = "<div class='commentBox'><div class='leftPanelImg'><img src='http://via.placeholder.com/100x100'/></div><div class='rightPanel'><span>" + data.name + "</span><div class='date'>" + data.date + "</div><p>" + data.body + "</p></div><div class='clear'></div></div>";

        $('#container').append(html);

    }


	var coment = [{
		"name": "username",
		"date": "01 Apr, 2017",
		"body": "this is a comment 1"
	}];

	for (var i = 0; i < coment.length; i++) {
		render(coment[i]);

	}

	$('#addComent').click(function() {
		var addObj = {
			"name": $('#name').val(),
			"date": $('#date').val(),
			"body": $('#bodyText').val()
		};

		coment.push(addObj);
		render(addObj);
		$('#name').val('');
		$('#date').val('dd/mm/yyyy');
		$('#bodyText').val('');
	});
	
	
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAj7opLh0OlhqYBh4xMf_-jGtY_ayuUI24",
    authDomain: "demoproject-de8c7.firebaseapp.com",
    databaseURL: "https://demoproject-de8c7.firebaseio.com",
    projectId: "demoproject-de8c7",
    storageBucket: "demoproject-de8c7.appspot.com",
    messagingSenderId: "882836399805",
    appId: "1:882836399805:web:125256fb92e9dab3a179d4",
    measurementId: "G-XDD886EPEF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Get a reference to the database service
  var database = firebase.database();
	
	
	function writeUserData() {

		firebase.database().ref('comments/' + $('#name').val()).set({
			name: $('#name').val(),
			date: $('#date').val(),
			text:  $('#bodyText').val()
		});
		
		showData();
	}
	
	
	function showData(){
		
		var leadsRef = database.ref('comments/');
		leadsRef.on('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var childData = childSnapshot.val();
				console.log(childData.name + " + ");
			});
		});
		
//		coment.push(childData);
		leadsRef.on('child_added', function(snapshot) {
			console.log(snapshot);
			coment.push(snapshot.node_.children_.root_);
		});
	}