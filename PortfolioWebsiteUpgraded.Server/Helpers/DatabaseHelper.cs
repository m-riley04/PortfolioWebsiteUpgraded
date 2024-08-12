using System.Data;
using System.Data.SqlClient;

namespace PortfolioWebsiteUpgraded.Server.Helpers
{
    public class DatabaseHelper
    {
        private readonly string databaseUserIdPath = $"{Directory.GetCurrentDirectory()}\\Secrets\\db_user_id.txt";
        private readonly string databaseUserSecretPath = $"{Directory.GetCurrentDirectory()}\\Secrets\\db_user_secret.txt";

        public DatabaseHelper() { }

        public string DatabaseUserId
        {
            get
            {
                return File.ReadAllText(databaseUserIdPath).Trim();
            }
        }

        public string DatabaseUserSecret
        {
            get
            {
                return File.ReadAllText(databaseUserSecretPath).Trim();
            }
        }

        public int ConnectionTimeout = 30;

        public string Server = "tcp:portfolio-website.database.windows.net,1433";

        public string InitialCatalog = "portfolio-website-db";

        public string ConnectionString
        {
            get
            {
                return $"Server={Server};Initial Catalog={InitialCatalog};Persist Security Info=False;User ID={DatabaseUserId};Password={DatabaseUserSecret};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout={ConnectionTimeout};";
            }
        }

        /// <summary>
        /// Queries the database
        /// </summary>
        /// <typeparam name="T">The type of data record to return from the query.</typeparam>
        /// <param name="query"></param>
        /// <param name="recordConverterMethod">Function that returns a <typeparamref name="T"/> from a <see cref="DataRow"/></param>
        /// <returns></returns>
        public IEnumerable<T> Query<T>(string sql, Func<DataRow, T> recordConverterMethod)
        {
            DataTable table = new DataTable();
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }
            }

            // Convert each row to a record
            List<T> rows = new();
            foreach (DataRow row in table.Rows)
            {
                rows.Add(recordConverterMethod(row));
            }

            return rows;
        }

        /// <summary>
        /// Executes a non-query onto the database
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public int NonQuery(string sql, SqlParameter[] parameters)
        {
            DataTable table = new DataTable();
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    foreach (SqlParameter parameter in parameters)
                    {
                        command.Parameters.Add(parameter);
                    }

                    reader = command.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }
            }

            return table.GetChanges()?.Rows.Count ?? 0;
        }
    }
}
