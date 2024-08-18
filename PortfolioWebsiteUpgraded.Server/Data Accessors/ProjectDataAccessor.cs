using Newtonsoft.Json;
using PortfolioWebsiteUpgraded.Server.Helpers;
using PortfolioWebsiteUpgraded.Server.Records;
using System.Data;
using System.Data.SqlClient;

namespace PortfolioWebsiteUpgraded.Server.Data_Accessors
{
    public class ProjectDataAccessor : IDataAccessor
    {
        private DatabaseHelper DatabaseHelper { get; set; } = new();

        public ProjectDataAccessor() { }

        public IEnumerable<Project> GetProjects()
        {
            string sql = @"select * from projects";

            return DatabaseHelper.Query(sql, Project.FromRow);
        }

        public int InsertProject(Project project)
        {
            string sql = @"
                INSERT INTO projects 
                (name, description, images, repository_uri, extra_data)
                VALUES 
                (@Name, @Description, @Images, @RepositoryUri, @ExtraData);";

            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Name", SqlDbType.NVarChar, 50) { Value = project.Name },
                new SqlParameter("@Description", SqlDbType.NVarChar, -1) { Value = (object?)project.Description ?? DBNull.Value },
                new SqlParameter("@Images", SqlDbType.NVarChar, -1) { Value = (object?)JsonConvert.SerializeObject(project.Images) ?? DBNull.Value },
                new SqlParameter("@RepositoryUri", SqlDbType.NVarChar, 2083) { Value = (object?)project.RepositoryUri ?? DBNull.Value },  // Max URL length in practice
                new SqlParameter("@ExtraData", SqlDbType.NVarChar, -1) { Value = (object?)project.ExtraData ?? DBNull.Value }
            };

            return DatabaseHelper.NonQuery(sql, parameters);
        }
    }
}
