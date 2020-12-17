(function (){
    const endDate = document.querySelector("input[name='endDate']");
const clock = document.querySelector('.clock');
let timeInterval;
let timeStop = true;
let saveValue = localStorage.getItem('Contdown') || false;
if (saveValue) {
    startClock(saveValue);
    let inputeValue = new Date(saveValue);
    endDate.valueAsDate = inputeValue;
}


endDate.addEventListener("change", function (e) {
    clearInterval(timeInterval);
    e.preventDefault();
    const temp = new Date(endDate.value);
    localStorage.setItem('Contdown', temp);
    startClock(temp);
});
function startClock(d) {
    function updateCounter() {
        let tl = timeLeft(d);
        if (tl.total <= 0) {
            timeStop = false;
        }
        for (pro in tl) {
            //   console.log(pro);
            let el = clock.querySelector("." + pro);
            if (el) {
                el.innerHTML = tl[pro];
            }
        }
    }
    updateCounter();
    if (timeStop) {
        timeInterval = setInterval(updateCounter, 1000);
    } else {
        clearInterval(timeInterval);
    }

}
function timeLeft(d) {
    let currentDate = new Date();
    let t = Date.parse(d) - Date.parse(currentDate);

    let secuonds = Math.floor(t / 1000 % 60);
    let minutes = Math.floor((t / 1000) / 60) % 60;
    let hours = Math.floor((t / 1000 * 60 * 60) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total': t,
        'secounds': secuonds,
        'minutes': minutes,
        'hourse': hours,
        'days': days
    }
}
})();