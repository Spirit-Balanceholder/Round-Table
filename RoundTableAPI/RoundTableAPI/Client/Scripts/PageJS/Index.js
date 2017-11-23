$("#message").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#sendmessage").click();
    }
});

$(function () {

    var tasksdone = 0;

    // Declare a proxy to reference the hub.
    var Global = $.connection.globalHub;
    // Create a function that the hub can call to broadcast messages.
    Global.client.setHostName = function (hostname) {
        $('.hostname').append(hostname);
        tasksdone++;
        IsPageReady();
    };
    Global.client.setServerName = function (servername) {
        $('.servername').append(servername);
        tasksdone++;
        IsPageReady();
    };

    // Start the connection.
    $.connection.hub.start().done(function () {
        Global.server.getServerName();
        Global.server.getHostName();
    });

    // Declare a proxy to reference the hub.
    var chat = $.connection.chatHub;
    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        // Html encode display name and message.
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page.
        $('#discussion').append('<li class="list-group-item"><strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };
    // Get the user name and store it to prepend to messages.
    $('#displayname').val(prompt('Enter your name:', ''));
    tasksdone++;
    IsPageReady();
    // Set initial focus to message input box.
    $('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            chat.server.send($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
    });

    function IsPageReady () {
        if (tasksdone >= 3)
            $('#curtain').css("display", "none");
    }
});