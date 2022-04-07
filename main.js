
Status="";
objects=[];
ring="";



function setup(){

    canvas = createCanvas(500, 420);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
    document.getElementById("numofobjects").innerHTML = "number of objects detected : 0";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
    console.log(objects);
}

function preload(){
    ring = loadSound("ring.mp3");
}

function draw(){
    image(video, 0, 0, 500, 420);
        if(Status !=""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectDetector.detect(video, gotResult);
            for(i=0; i<objects.length; i++){
                
                document.getElementById("numofobjects").innerHTML = "number of objects detected : "+objects.length;
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " "+ percent +"%", objects[i].x, objects[i].y);
                noFill();
                stroke(b, g, r);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                if(objects[i].label=="person"){
                    console.log("person alive");
                    ring.stop();
                    document.getElementById("status").innerHTML = "status : person alive";
                }
                
            }
            if(objects.length==0){
                ring.play();
                        console.log("person ded");
                        document.getElementById("status").innerHTML = "status : person ded";
            }
            }
        }

       





