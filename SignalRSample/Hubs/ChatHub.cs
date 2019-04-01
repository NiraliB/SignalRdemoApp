using Microsoft.AspNetCore.SignalR;
using SignalRSample.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRSample.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessagge(string user, string message)
        {
            await Clients.All.ReceiveMessage( user, message);
        }

        public async Task SendMessageToCaller(string message)
        {
            await Clients.Caller.ReceiveMessage(message);
        }

        public async Task SendMessageToGroup(string message)
        {
            await Clients.Group("SignalUsers").ReceiveMessage(message);
        }

        [HubMethodName("SendMessageToUser")]
        public Task DirectMessage(string user, string message)
        {
            return Clients.User(user).ReceiveMessage(message);
        }

        public Task ThrowException()
        {
            throw new HubException("This error will be sent to the client!");
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalUsers");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalUsers");
            await base.OnDisconnectedAsync(exception);
        }



    }
}
