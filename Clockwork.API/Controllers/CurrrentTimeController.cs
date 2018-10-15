using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Clockwork.API.Controllers
{
	[Route("api/currenttime/{timezone}")]
	public class CurrentTimeController : Controller
	{
		// GET api/currenttime
		[HttpGet]
        public IActionResult Get(string timezone)
        {
			DateTime utcTime = DateTime.UtcNow;
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();
			var additionalHrs = timezone.Replace(":", ".");

			additionalHrs = additionalHrs.Replace("p","+").Replace("m","-");

			var returnVal = new CurrentTimeQuery
			{
				UTCTime = utcTime,
				ClientIp = ip,
				Time =Convert.ToDateTime(utcTime.AddHours(Convert.ToDouble(additionalHrs))),			
				TimeZone = timezone
            };

            using (var db = new ClockworkContext())
            {
				db.Database.Migrate();
                db.CurrentTimeQueries.Add(returnVal);
                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }

            return Ok(returnVal);
        }
    }
}
