const socket = io();

let userName = $('#admin_name').val();
let text1 = $('#join1');
let text2 = $('#join2');
let text3 = $('#join3');
let text4 = $('#join4');

function scrollToBottom (number) {
    let messages = $('#messages'+number);
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMesageHeigth = newMessage.innerHeight();
    let lastMesageHeigth = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMesageHeigth + lastMesageHeigth - 10 >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('newMessage', function (message) {
    console.log('MESSAGE ', message)
    let screenNumber, messages;
    if (message.fromRoom === text1.text()) {
        messages = $('#messages1');
        screenNumber = 1;
    } else if (message.fromRoom === text2.text()) {
        messages = $('#messages2');
        screenNumber = 2;
    } else if (message.fromRoom === text3.text()) {
        messages = $('#messages3');
        screenNumber = 3;
    } else if (message.fromRoom === text4.text()) {
        messages = $('#messages4');
        screenNumber = 4;
    }
    const formattedTime = moment(message.createdAt).format('h:mm a');
    let li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    messages.append(li);
    scrollToBottom(screenNumber);
});

socket.on('request', function (email) {
    const params = {name: userName, room: email};
    socket.emit('joinAdmin', params, function (err) {
        if (err) {
            alert(err);
        } else {
            if (!text1.text()) {
                text1.text(email);
            } else if (!text2.text()) {
                text2.text(email);
            } else if (!text3.text()) {
                text3.text(email);
            } else if (!text4.text()) {
                text4.text(email);
            } else {

            }
        }
    });
});

$('#message-form').on('submit', function (e) {
    let messages = $('#messages1');
    const $textBox = $('[name=message]');
    const formattedTime = moment().format('h:mm a');
    e.preventDefault();
    if ($textBox.val().length > 0) {
        socket.emit('createMessage', {
            text: $textBox.val(),
            fromRoom: $('#join1').text()
        }, function () {
            console.log('ENVIADA')
            $textBox.val('')
        });
        let li = $('<li></li>');
        li.text(`${userName} ${formattedTime}: ${$textBox.val()}`);
        messages.append(li);
        scrollToBottom(1);
    }
});

socket.on('disconnection', function (room) {
    console.log(room, 'LEFT ');
    let left;
    if (room === text1.text()) {
        left = 1
    } else if (room === text2.text()) {
        left = 2;
    } else if (message.fromRoom === text3.text()) {
        left = 3;
    } else if (message.fromRoom === text4.text()) {
        left= 4;
    }
    socket.emit('leaveAdmin', room, function (err) {
        if (err) {
            alert(err);
        } else {
            console.log('DISCONNECTED ', room)
            $('#join'+left).text('');
        }
    });

});

$('#message-form2').on('submit', function (e) {
    let messages = $('#messages2');
    const $textBox = $('[name=message2]');
    const formattedTime = moment().format('h:mm a');
    e.preventDefault();
    if ($textBox.val().length > 0) {
        socket.emit('createMessage', {
            text: $textBox.val(),
            fromRoom: $('#join2').text()
        }, function () {
            console.log('ENVIADA');
            $textBox.val('')
        });
        let li = $('<li></li>');
        li.text(`${userName} ${formattedTime}: ${$textBox.val()}`);
        messages.append(li);
        scrollToBottom(2);
    }
});

$('#message-form3').on('submit', function (e) {
    let messages = $('#messages3');
    const $textBox = $('[name=message3]');
    const formattedTime = moment().format('h:mm a');
    e.preventDefault();
    if ($textBox.val().length > 0) {
        socket.emit('createMessage', {
            text: $textBox.val(),
            fromRoom: $('#join3').text()
        }, function () {
            console.log('ENVIADA')
            $textBox.val('')
        });
        let li = $('<li></li>');
        li.text(`${userName} ${formattedTime}: ${$textBox.val()}`);
        messages.append(li);
        scrollToBottom(3);
    }
});

$('#message-form4').on('submit', function (e) {
    let messages = $('#messages4');
    const $textBox = $('[name=message4]');
    const formattedTime = moment().format('h:mm a');
    e.preventDefault();
    if ($textBox.val().length > 0) {
        socket.emit('createMessage', {
            text: $textBox.val(),
            fromRoom: $('#join4').text()
        }, function () {
            console.log('ENVIADA')
            $textBox.val('')
        });
        let li = $('<li></li>');
        li.text(`${userName} ${formattedTime}: ${$textBox.val()}`);
        messages.append(li);
        scrollToBottom(4);
    }
});