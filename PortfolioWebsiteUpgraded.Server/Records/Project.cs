using Newtonsoft.Json;
using System.Data;
using System.Text.Json.Nodes;

namespace PortfolioWebsiteUpgraded.Server.Records
{
    public record Project(int ProjectId, string Name, string? Description, string[] Images, string? RepositoryUri, string? ExtraData)
    {

        public static Project FromRow(DataRow row)
        {
            return new Project(
                row.Field<int>("project_id")
                , row.Field<string>("name") ?? ""
                , row.Field<string?>("description")
                , JsonConvert.DeserializeObject<string[]>(row.Field<string?>("images") ?? "[]") ?? []
                , row.Field<string?>("repository_uri")
                , row.Field<string?>("extra_data"));
        }
    }
}
