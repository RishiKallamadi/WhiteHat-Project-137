var status = ""
var object
var objects = []

function reload() {
    location.reload();
}

function setup() {
    canvas = createCanvas(420, 420)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    video.size(420, 420)
}

function draw() {
    image(video, 0, 0, 420, 420)

    if (status != "") {
        objectDetector.detect(video, gotResult)
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status - Objects Detected"

            fill("#FF0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == object) {
                video.stop()
                objectDetector.detect(gotResult)

                document.getElementById("object_detection").innerHTML = object + " Found"
                synth = window.speechSynthesis
                var utterThis = new SpeechSynthesisUtterance(object + " Found")
                synth.speak(utterThis)
            } else {
                document.getElementById("object_detection").innerHTML = object + " Not Found"
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status - Detecting Objects"
    
    object = document.getElementById("object").value
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objects = results
}