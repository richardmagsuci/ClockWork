using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clockwork.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Clockwork.API.Controllers
{
    [Route("api/timerecord")]
    public class TimeRecordContrroller : Controller
    {
        // GET: api/<controller>
        [HttpGet]
		public IActionResult Get()
		{
			var result = new ClockworkContext();
			var data = result.CurrentTimeQueries.OrderByDescending(a => a.CurrentTimeQueryId).ToList();

			return Ok(data);
		}
	}
}
