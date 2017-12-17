using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using LogViewer.Web.Hubs;

namespace LogViewer.Web.Controllers
{
    [Route("api/message")]
    public class MessageController : Controller
    {
        private IHubContext<MessageHub> _messageHubContext;
        public  MessageController(IHubContext<MessageHub> messageHubContext)
        {
            _messageHubContext = messageHubContext;
        }
        public JsonResult post(int id)
        {
            _messageHubContext.Clients.All.InvokeAsync("send", "Hello from the aserver");
            return Json(new Test { Id=20});
        }
    }


    public class Test {
        public int Id { get; set; }
    }
}
