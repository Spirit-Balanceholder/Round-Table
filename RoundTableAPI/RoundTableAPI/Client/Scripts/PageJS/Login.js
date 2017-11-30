$(function () {

    //localStorage.clear();

    var KnownUsers;

    $(document).ready(function () {
        KnownUsers = JSON.parse(localStorage.getItem('KnownUsers'));
        if (KnownUsers == null)
            KnownUsers = [];

        if (KnownUsers.length == 0) {
            $('#KnownUserList').prepend('<li class="disabled"><a><i>No previous names found<i></a></li>');
        }
        else {
            for (var i = KnownUsers.length-1; i > -1 ; i--) {
                $('#KnownUserList').prepend('<li><a class="KnownUser" id="' + KnownUsers[i] + '">' + KnownUsers[i] + '</a></li>');
            }
        };
    });

    $('#submit').click(function () {
        // Declare a proxy to reference the hub.
        var Global = $.connection.globalHub;
        Global.client.loginResponse = function (success) {
            if (success) {

                var index = $.inArray($('#name').val(), KnownUsers);
                if (index != -1) {
                    KnownUsers.unshift(KnownUsers.splice(index, 1))
                }
                else {
                    if (KnownUsers.unshift($('#name').val()) > 5) {
                        KnownUsers.pop();
                    };
                }
                
                localStorage.setItem('KnownUsers', JSON.stringify(KnownUsers));
                alert('success');
            }
            else
                alert('Wrong password; Lightning strikes as you are flung off into the chasm.');
        };

        $.connection.hub.start().done(function () {
            if ($('#name').val() === "" || $('#quest').val() === "" || $('#password').val() === "")
            {
                alert("I asked you a question, now answer it!");
            }
            else
            {
                Global.server.checkPassword($('#password').val());
            }
        });

        //alert($('#password').val());
        return false;
    });
});
