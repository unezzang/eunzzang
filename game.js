let hints = 3;
let time = 1800; // 30분
let chat = document.getElementById("chat");

// 시작
document.getElementById("startScreen").onclick = () => {
 document.getElementById("startScreen").style.display="none";
 document.getElementById("bgm").play();
 intro();
 startTimer();
};

// 프롤로그
function intro(){
 sendMsg("은혜야... 여기 이상해...");
 delayMsg("문이 안 열려...");
 delayMsg("누가 우리 가둔 거 같아...");
 delayMsg("문 3개 보이지?");
}

// 카톡 메시지
function sendMsg(text){
 let div = document.createElement("div");
 div.className="msg";
 div.innerText=text;
 chat.appendChild(div);

 document.getElementById("msgSound").play();
 navigator.vibrate(200);

 chat.scrollTop = chat.scrollHeight;
}

function delayMsg(text){
 setTimeout(()=>sendMsg(text),2000);
}

// 타이머
function startTimer(){
 setInterval(()=>{
  time--;
  let m = Math.floor(time/60);
  let s = time%60;
  document.getElementById("timer").innerText =
   `${m}:${s<10?"0":""}${s}`;

  if(time<=0){
    alert("사망");
    location.reload();
  }
 },1000);
}

// 힌트
document.getElementById("hint").onclick = ()=>{
 if(hints<=0){
  alert("힌트 없음");
  return;
 }
 hints--;
 alert("힌트: 빨간 문부터 확인해");
 document.getElementById("hint").innerText = `힌트 (${hints})`;
};

// 퍼즐 (10개 중 일부 예시)
let progress = 0;

document.querySelector("#door1").onclick = ()=>{
 puzzle1();
};

document.querySelector("#door2").onclick = ()=>{
 if(progress>=3) puzzle2();
 else alert("잠겨있다");
};

document.querySelector("#door3").onclick = ()=>{
 if(progress>=7) puzzle3();
 else alert("잠겨있다");
};

function puzzle1(){
 let answer = prompt("거울에 적힌 글자를 입력");
 if(answer==="HELP"){
   progress++;
   document.getElementById("doorSound").play();
   sendMsg("문이 열렸어...");
 } else {
   fail();
 }
}

function puzzle2(){
 let answer = prompt("피로 적힌 숫자 조합?");
 if(answer==="4132"){
   progress++;
   document.getElementById("scary").play();
   sendMsg("뭔가 지나갔어...");
 } else {
   fail();
 }
}

function puzzle3(){
 alert("탈출 성공");
}

// 실패
function fail(){
 document.getElementById("scary").play();
 alert("틀림");
}
