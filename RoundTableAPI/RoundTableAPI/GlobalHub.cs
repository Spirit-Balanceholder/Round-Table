using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace RoundTableAPI
{
    public class GlobalHub : Hub
    {
        public void GetServerName()
        {
            Clients.Caller.setServerName("Spirit's Server");
        }

        public void GetHostName()
        {
            Clients.Caller.setHostName("Spirit");
        }

        public void CheckPassword(string password)
        {
            if (password == "cheeze")
                Clients.Caller.loginResponse(true);
            else
                Clients.Caller.loginResponse(false);
        }
    }
}