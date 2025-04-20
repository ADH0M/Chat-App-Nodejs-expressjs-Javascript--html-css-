const socket = io();
socket.on('message',(mss)=>{
    getMsg(mss);
});

function getMsg(sms){
    const messageList = document.getElementById('messageList');
    const userName = localStorage.getItem('username');
    const room = localStorage.getItem('room');
    console.log(userName ,room);
    
    const htmlMsg = `<div class="message">
                        <p class="username"> ${userName} <span class="timestamp"> ${new Date().toLocaleTimeString()}</span>
                        <p class="timestamp"dir='ltr'> ${room}</p>
                        </p>
                        <p class="message-text">${sms}</p>
                    </div>`;

    messageList.insertAdjacentHTML('beforeend' , htmlMsg);
};

function sendMsg(){
    const input = document.getElementById('messageInput');
    socket.emit('getMsg',input.value);
    input.value='';
    input.focus();
};



document.getElementById('messageForm').addEventListener('submit' ,(event)=>{
    event.preventDefault();
    sendMsg();
})