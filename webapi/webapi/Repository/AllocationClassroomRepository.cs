using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Context;
using webapi.Dto;
using webapi.IRepository;

namespace webapi.Repository
{
  public class AllocationClassroomRepository: IAllocationClassroomRepository
  {
    private readonly DapperContext _context;
    public AllocationClassroomRepository(DapperContext context)
    {
      _context = context;
    }

    public async Task AllocateClassroom(AllocationClassroom allocate)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.SaveAllocateClassroom", new { TeacherId = allocate.TeacherId, ClassroomId = allocate.ClassroomId }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task DeAllocateClassroom(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.DeAllocateClassroom", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<GetClassroomAllocation>> GetClassroomById(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        var sub = await connection.QueryAsync<GetClassroomAllocation>("[dbo].[GetClassroomById]", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
        return sub.ToList();
      }
    }
  }
}
