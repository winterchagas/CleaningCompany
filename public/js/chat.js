const socket = io();

let userName;

function scrollToBottom () {
    let messages = $('#messages');
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
    let messages = $('#messages');
    $('#recipient').val(message.fromRoom);
    const formattedTime = moment(message.createdAt).format('h:mm a');
    let li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    messages.append(li);
    scrollToBottom();
});

$('#message-form').on('submit', function (e) {
    let messages = $('#messages');
    const $textBox = $('[name=message]');
    const formattedTime = moment().format('h:mm a');
    e.preventDefault();
    if ($textBox.val().length > 0) {
        socket.emit('createMessage', {
            text: $textBox.val(),
            fromRoom: $('#recipient').val()
        }, function () {
            $textBox.val('')
        });
        let li = $('<li></li>');
        li.text(`${userName} ${formattedTime}: ${$textBox.val()}`);
        messages.append(li);
        scrollToBottom();
    }
});

$('#join').on('click', function (e) {
    const params = {name: $('#name').val(),email_room: $('#email').val()};
    userName = params.name;
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
        } else {
            console.log('No error');
        }
    });
});