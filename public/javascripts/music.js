var playList=[];
var playButton=document.getElementById("playButton");
var pauseButton=document.getElementById("pauseButton");
var switchButton=document.getElementById("switchButton");
var nextButton=document.getElementById("nextButton");
var previousButton=document.getElementById("previousButton");
var playState=document.getElementById("playState");
var process=$("#process");
var bar=$('#bar');

//获取音乐列表信息
(function(){
  $.ajax(
      {
        url:'/',
        type:'POST',
        async:false,
        success:function(data){
          console.log("获取音乐列表成功");
          playList=data;
          console.log(playList);
        },
        error:function(){
          console.log("获取音乐列表失败");
        }
      }
  );
})();

var audio=document.createElement("audio");
audio.index=0;
audio.src='music/'+playList[audio.index];
updateState();


switchButton.addEventListener("click",playOrPause);
nextButton.addEventListener("click",nextSong);
previousButton.addEventListener('click',previousSong);

function switchSong(){
    audio.src='music/'+playList[audio.index];
    audio.play();
}

function playOrPause(){
    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
    updateState();
}

function nextSong(){
    audio.index+1<playList.length?audio.index+=1:audio.index=0;
    switchSong();
    updateState();
}

function previousSong(){
    audio.index-1<0?audio.index=playList.length-1:audio.index-=1;
    switchSong();
    updateState();
}

function updateState(){
    if(audio.paused){
        playButton.style.display="inline";
        pauseButton.style.display="none";
        playState.innerHTML=playList[audio.index];
    }
    else{
        playButton.style.display="none";
        pauseButton.style.display="inline";
        playState.innerHTML=playList[audio.index];
    }

}

audio.addEventListener("ended",function(){
    nextSong();
});

audio.addEventListener("timeupdate",function(){
    var persent=audio.currentTime/audio.duration;
    bar.css("width",persent*100+"%");
});


process.click(changeProcess);

function changeProcess(e){
    var persent=(e.pageX-process.offset().left)/process.width();
    audio.currentTime=audio.duration*persent;
    bar.css("width",persent*100+"%");
}