using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogViewer.Web.Models;

namespace LogViewer.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            String path = "~/Views/Home/Index.cshtml";
            if (User.Identity.IsAuthenticated)
            {
                path = "~/Views/Home/ClientApp.cshtml";
            }
            return View(path);
            //return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult ClientApp()
        {

            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
