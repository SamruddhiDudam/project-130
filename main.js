song1 = "";

song2 = "";

left_wrist_x =  0;

left_wrist_y =  0;

right_wrist_x = 0;

right_wrist_y = 0;

scoreRightWrist = 0;

scoreLeftWrist = 0;

song1_status = "";

song2_status = "";

function loadSound(){
    
}

function preload() {
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}



function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
   
    
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Intitialized');
}




function gotPoses(results) {
    if(results.length > 0)
    {
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

     console.log(results);
     left_wrist_x = results[0].pose.leftWrist.x;
     left_wrist_y = results[0].pose.leftWrist.y;
     console.log("left_wrist_x =" + left_wristx +"left_wrist_y =" + leftWrist_y);

     right_wristX = results[0].pose.rightWrist.x;
     right_wristY = results[0].pose.rightWrist.y;
     console.log("right_wrist_x ="+ right_wrist_x +"right_wrist_y =" + right_wrist_y);
    }
}


function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song1_status = song2.isPlaying();

    fill("#000000");
    stroke("#000000");
   
    if (scoreRightWrist > 0.2) {
      circle(right_wrist_X, right_wrist_Y, 30);

      song2.stop();

     if (song1_status == false)
     {
         song1.play();
         document.getElementById("song_name").innerHTML = "Playing - Harry Potter Theme Song"
     } 
    }
      
    if (scoreLeftWrist > 0.2) {
        circle(left_wrist_X, left_wrist_Y, 30);
  
        song1.stop();
  
       if (song2_status == false)
       {
           song2.play();
           document.getElementById("song_name").innerHTML = "Playing - Peter Pan Song"
       } 
      }
  
  
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}