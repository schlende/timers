
function Timer(attachDiv, minutes){
    this.attachDiv = attachDiv;
    this.setMinutes(minutes);
}

Timer.prototype.setMinutes = function(minutes){
    console.log("Set timer to " + minutes + " minutes");
    this.timeInMinutes = minutes;
    this.timeInSeconds = minutes * 60;
    this.elapsedTimeSeconds = 0;
}

Timer.prototype.onFinish = function(callback){
    this.finishCallback = callback;
}

Timer.prototype.onTimeChange = function(callback){
    this.timeChangeCallback = callback;
}

Timer.prototype.start = function(){
    var _self = this;
    console.log("Starting timer -- " + this.timeInSeconds);
    this.timerHandler = setInterval(function(){
        console.log("Tick tock " + _self.elapsedTimeSeconds);
        _self.elapsedTimeSeconds += 1;

        var remainingTime = _self.timeInSeconds - _self.elapsedTimeSeconds;

        var onesDigit = remainingTime % 10;
        var tensDigit = Math.floor(remainingTime % 60 / 10);
        var minOnesDigit = Math.floor(remainingTime / 60 % 10);
        var minTensDigit = Math.floor(remainingTime / 60 / 10);

        _self.attachDiv.innerHTML = minTensDigit + " " + minOnesDigit + " " + tensDigit + " " + onesDigit;
        _self.timeChangeCallback({onesec: onesDigit, tensec: tensDigit, min: minOnesDigit, tenmin: minTensDigit});

        if(_self.elapsedTimeSeconds >= _self.timeInSeconds){
            _self.pause();
            _self.reset();
            _self.finishCallback();
        }
    }, 1000);
}

Timer.prototype.pause = function(){
    clearInterval(this.timerHandler);
}

Timer.prototype.reset = function(){
    this.elapsedTimeSeconds = 0;
}



