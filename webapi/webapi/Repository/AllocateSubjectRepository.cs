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
  public class AllocateSubjectRepository : IAllocateSubjectRepository
  {
    private readonly DapperContext _context;
    public AllocateSubjectRepository(DapperContext context)
    {
      _context = context;
    }

    public async Task AllocateSubject(AllocateSubject allocate)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.SaveAllocateSubject", new { TeacherId = allocate.TeacherId, SubjectId = allocate.SubjectId }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task DeAllocateSubject(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.DeAllocateSubject", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<GetSubjectAllocation>> GetSubjectsById(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        var sub = await connection.QueryAsync<GetSubjectAllocation>("dbo.GetSubjectsById", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
        return sub.ToList();
      }
    }
    public async Task<IEnumerable<GetAllocateSubjectTeachers>> GetAllocateSubject()
    {
      using (var connection = _context.CreateConnection())
      {
        var subject = await connection.QueryAsync<GetAllocateSubjectTeachers>("dbo.GetAllocateSubjects", commandType: System.Data.CommandType.StoredProcedure);
        return subject.ToList();
      }
    }
  }
}
