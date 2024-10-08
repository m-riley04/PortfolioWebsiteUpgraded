﻿using Microsoft.AspNetCore.Mvc;
using PortfolioWebsiteUpgraded.Server.Data_Accessors;
using PortfolioWebsiteUpgraded.Server.Records;

namespace PortfolioWebsiteUpgraded.Server.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectController
    {
        public ProjectDataAccessor dbAccessor = new();

        [HttpGet]
        [Route("")]
        public JsonResult GetAll()
        {
            return new JsonResult(dbAccessor.GetProjects().ToList());
        }

        [HttpPut]
        [Route("")]
        public JsonResult Put([FromBody] Project project)
        {
            dbAccessor.InsertProject(project);
            return new JsonResult("Success!");
        }
    }
}
