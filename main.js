Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 2000
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_img" src="'+data_uri+'">';
    });
    
};

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bL5z-tsrl/', modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
};

function check(){
    img = document.getElementById('capture_img');
    classifier.classify(img, gotResult);
};

function gotResult(error, results){

    if (error) {
        console.error(error);
    } else {
        console.log(results)
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("accuracy_percentage").innerHTML = results[0].confidence.toFixed(1);
    }
};