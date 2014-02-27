
function Timer(attachDiv, minutes){
    this.attachDiv = attachDiv;
    this.finishCallbacks = [];
    this.timeChangeCallbacks = [];

    this.setMinutes(minutes);
}

Timer.prototype.setMinutes = function(minutes){
    console.log("Set timer to " + minutes + " minutes");
    this.timeInMinutes = minutes;
    this.timeInSeconds = minutes * 60;
    this.elapsedTimeSeconds = 0;
}

Timer.prototype.onFinish = function(callback){
    this.finishCallbacks.push(callback);
}

Timer.prototype.onTimeChange = function(callback){
    this.timeChangeCallbacks.push(callback);
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

        for(callback in _self.timeChangeCallbacks){
            _self.timeChangeCallbacks[callback]({onesec: onesDigit, tensec: tensDigit, min: minOnesDigit, tenmin: minTensDigit});
        }

        if(_self.elapsedTimeSeconds >= _self.timeInSeconds){
            _self.pause();
            _self.reset();

            for(callback in _self.finishCallbacks){
                _self.finishCallbacks[callback]();
            }
        }
    }, 1000);

    this.isPaused = false;
}

Timer.prototype.paused = function(){
    return this.isPaused;
}

Timer.prototype.pause = function(){
    clearInterval(this.timerHandler);
    this.isPaused = true;
}

Timer.prototype.reset = function(){
    this.pause();
    this.elapsedTimeSeconds = 0;
}



