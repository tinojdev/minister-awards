import { useState, useEffect } from "react";
function CountDown() {
  // Set the date we're counting down to
  let countDownDate = new Date("Dec 6, 2024 12:00:00").getTime();
  const [countDownString, setCountDownString] = useState("");
  const [hasVoteBegun, setHasVoteBegun] = useState(false);

  function checkInterval() {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    setCountDownString(
      days + "d " + hours + "h " + minutes + "m " + seconds + "s "
    );

    // If the count down is over, write some text
    if (distance < 0) {
      setHasVoteBegun(true);
    }
  }

  // Update the count down every 1 second
  useEffect(() => {
    console.log("skibidi");
    if (hasVoteBegun === true) {
      return;
    }
    checkInterval();
    let x = setInterval(function () {
      checkInterval();
    }, 1000);
    return () => clearInterval(x);
  }, [hasVoteBegun]);
  if (hasVoteBegun != true) {
    return (
      <div>
        <p className="countDownString">Äänestys alkaa</p>
        <br></br>
        <p className="countDownString"> {countDownString}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Äänestys on alkanut</p>
      </div>
    );
  }
}

export default CountDown;
