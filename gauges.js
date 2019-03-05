function getRandomIntForGauge(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TwitchIt(element, settings) {
    if(!settings.currentAngle) {
        settings.currentAngle = settings.targetAngle;
    }
    var twitchTo = getRandomIntForGauge(settings.twitchMin, settings.twitchMax);
    // if twitchTo is the same as current then do nothing for a while
    if(twitchTo === settings.currentAngle) {
        setTimeout(function() { TwitchIt(element, settings); } , settings.twitchDuration);
    } else {
        $(element).children(".pointer").rotate({
            duration: settings.twitchDuration,
            angle: settings.currentAngle,
            animateTo: twitchTo,
            callback: function() { settings.currentAngle = twitchTo; TwitchIt(element, settings); },
            easing: function (x,t,b,c,d){ return c*(t/d)+b; }
        });
    }
}

$.fn.gaugeMe = function(settings) {
    var pointerImage, backingImage, pointerVerticalOffset, startAngle;
    switch (settings.gaugeType) {
        case 2:
            pointerImage = "Pointer2";
            backingImage = "Backing2";
            pointerVerticalOffset = '80px';
            startAngle = settings.startAngle || -120;
            break;
        case 3:
            pointerImage = "Pointer3";
            backingImage = "Backing3";
            pointerVerticalOffset = '0px';
            startAngle = settings.startAngle || -135;
            break;
        default:
            pointerImage = "Pointer1";
            backingImage = "Backing1";
            pointerVerticalOffset = '65px';
            startAngle = settings.startAngle || -90;
        }
    // if set explicitly then take precedence
    // great consistency and use of extend, well done me
    if(settings.pointerImage) {
        pointerImage = settings.pointerImage;
    }
    if(settings.backingImage) {
        backingImage = settings.backingImage;
    }
    if(settings.pointerVerticalOffset) {
        pointerVerticalOffset = settings.pointerVerticalOffset;
    }
    if(!settings.initialAnimationDuration) {
        settings.initialAnimationDuration = 2000;
    }
    if(!settings.twitchDuration) {
        settings.twitchDuration = 200;
    }
    
    var gauge = $(this);
    $(this).addClass('gauge');
    // add the images we need; a background and a pointer
    $(this).prepend($('<img>',{class:'pointer',src:'images/'+pointerImage+'.png', style:'top:'+pointerVerticalOffset+';', alt:'gauge pointer'}))
    $(this).prepend($('<img>',{class:'backing',src:'images/'+backingImage+'.png', alt:'gauge background'}))
    // animate the pointer from 0 to the target angle, then start it twitching
    $(this).children(".pointer").rotate({
        duration: settings.initialAnimationDuration,
        angle: startAngle,
        animateTo: settings.targetAngle,
        callback: function() { 
            TwitchIt(gauge, settings); 
        }
    });
};