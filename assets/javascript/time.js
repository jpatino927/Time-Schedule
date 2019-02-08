// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEB9kP6mvRcfpx3RFRblvLKd81-3uEtHQ",
    authDomain: "crazy-flyt-schedule.firebaseapp.com",
    databaseURL: "https://crazy-flyt-schedule.firebaseio.com",
    projectId: "crazy-flyt-schedule",
    storageBucket: "crazy-flyt-schedule.appspot.com",
    messagingSenderId: "990803549160"
  };
  firebase.initializeApp(config);
  let airData = firebase.database()
  $('#avion').on('click',function(event){
      event.preventDefault();
      let flytNumber = $('#flytNumber').val()
      let destination = $('#flytDestination').val()
      let firstFlytTime = $('#firstFlytTime').val()
      let frequency = $('#frequency').val()
      console.log(flytNumber);
      console.log(destination);
      console.log(firstFlytTime);
      console.log(frequency);
      let newFlyt = {
          FlytNumber:flytNumber,
          Destination:destination,
          FirstFlytTime:firstFlytTime,
          Frequency:frequency,
      }
      console.log(newFlyt)
    //   alert('added new flyt');
      airData.ref().push(newFlyt)
      $('#flytNumber').val("");
      $('#flytDestination').val("");
      $('#firstFlytTime').val("");
      $('#frequency').val("");
  })
  airData.ref().on('child_added', function(snapShotChild, previousChild){
      console.log(snapShotChild.val())
      let flytNumber = snapShotChild.val().FlytNumber;
      let destination = snapShotChild.val().Destination;
      let firstFlytTime = snapShotChild.val().FirstFlytTime;
      let frequency = snapShotChild.val().Frequency;

      let airTime = firstFlytTime.split(':'); // 10:11 -> ["10", "11"]
      let flyTime = moment().hours(airTime[0]).minutes(airTime[1]);
      let maxTime = moment().max(moment(), flyTime);
      var minutes = 0;
      var arrival = 0;

      if (maxTime === flyTime) {
        arrival = flyTime.format('hh:mm A');
        minutes = flyTime.diff(moment(),'minutes');
        // alert(minutes)
      }
      else {
          let diffTimes = moment().diff(flyTime,'minutes');
          let remTime = diffTimes % frequency
          minutes = frequency - remTime;
        //   alert(minutes)
          arrival = moment().add(minutes,"m").format('hh:mm A')
      }
      console.log(arrival);
      console.log(minutes);

      $('#flytTable > tbody').append(
          $("<tr>").append(
              $("<td>").text(flytNumber),
              $("<td>").text(destination),
              $("<td>").text(frequency + " minutes"),
              $("<td>").text(arrival), 
              $("<td>").text(minutes + " minutes")
          )
      )
  })