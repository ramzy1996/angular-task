using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Context;
using webapi.Dto;
using webapi.Entities;
using webapi.IRepository;

namespace webapi.Repository
{
  public class SubjectRepository : ISubjectRepository
  {
    private readonly DapperContext _context;
    public SubjectRepository(DapperContext context)
    {
      _context = context;
    }

    public async Task CreateSubject(SubjectCreate sub)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.SaveSubject", new { SubjectName = sub.SubjectName }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task DeleteSubject(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.DeleteSubject", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task EditSubject(int id, SubjectEdit sub)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.EditSubject", new { id = id, SubjectName = sub.SubjectName }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<Subject>> GetSubjects()
    {
      using (var connection = _context.CreateConnection())
      {
        var subject = await connection.QueryAsync<Subject>("dbo.GetSubjects", commandType: System.Data.CommandType.StoredProcedure);
        return subject.ToList();
      }
    }
  }
}
