$(document).ready(function() {
    $('#alarm-button').click(function(e) {
      e.preventDefault();
      convertAlarmDateTime($('#alarm-input').val());
    });
});

  function currentDate(){
    var now = moment();
    return now;
  }

  function convertAlarmDateTime(dateTime){
    var alarm = moment(dateTime)
    timeDifference(alarm)
  };

  function timeDifference(alarm){
    var current = currentDate();
    var difference = alarm.diff(current)
    setAlarm(difference);
  };

  function setAlarm(milliseconds) {
    setTimeout(timesUp, milliseconds);
    alert('alarm set')
  };

  function timesUp(){
    $('#alarm-div').addClass("pulse");
    $('#alarm-modal').modal('toggle')
    var thissound = document.getElementById('bell');
    thissound.play();
  };
