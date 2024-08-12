using System.Data;

namespace PortfolioWebsiteUpgraded.Server.Records
{
    public record Project(int ProjectId, string Name, string? Description, int AuthorId, string? Collaborators, string? Images, string? RepositoryUri, string? ReleaseUri, string? ReadmeUri, string? ExtraData)
    {

        public static Project FromRow(DataRow row)
        {
            return new Project(
                row.Field<int>("project_id")
                , row.Field<string>("name") ?? ""
                , row.Field<string?>("description")
                , row.Field<int>("author_id")
                , row.Field<string?>("collaborators")
                , row.Field<string?>("images")
                , row.Field<string?>("repository_uri")
                , row.Field<string?>("release_uri")
                , row.Field<string?>("readme_uri")
                , row.Field<string?>("extra_data"));
        }
    }
}
