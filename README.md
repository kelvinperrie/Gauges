# Gauges
some gauges built in jquery and jqueryrotate. The pointer will start at zero when the gauge loads and animate to the target angle, it will then twitch slightly around the target angle.

Example 1:

![Example 1](GaugeExample1.gif?raw=true "Example 1")

Example 2:

![Example 2](GaugeExample2.gif?raw=true "Example 2")

# usage

Copy the images folder and include gauges.js and gauges.css on the page. Then call the gaugeMe function on an element. Pass in the targetAngle, which is the angle that the pointer will animate too. A targetAngle of 0 will have the point straight up, 90 will have it pointing to the right, -90 to the left etc. Also set the twitch min and max to something just a bit lower and higher than the target angle - these are the values that the pointer will oscillate randomly between.

```
    <link rel="stylesheet" href="gauges.css">
    
    <div id="myGauge></div>
    
    <script src="scripts/jquery-3.3.1.min.js"></script>
    <script src="scripts/jQueryRotate"></script>
    <script src="scripts/jquery-gauges.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            var myGauge = $("#myGauge").gaugeMe({
              targetAngle : 60,
              twitchMin : 55,
              twitchMax : 65
          });
        })
    </script>
```
Update the pointer position/angle by using the UpdateTargetAngle method

```
myGauge.UpdateTargetAngle(newTargetAngle, newTwitchMin, newTwitchMax);
```

To see available options that can be passed to configure a gauge and see more examples on how to use the code see https://gauges.netlify.app/examples.html
