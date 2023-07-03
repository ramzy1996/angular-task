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
  public class ClassroomRepository : IClassroomRepository
  {
    private readonly DapperContext _context;
    public ClassroomRepository(DapperContext context)
    {
      _context = context;
    }

    public async Task CreateClassroom(ClassroomCreation classroom)
    {
      using (var connection = _context.CreateConnection())
      {
         await connection.ExecuteAsync("dbo.SaveClassroom", new { ClassroomName =classroom.ClassRoomName},commandType:System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task DeleteClassroom(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.DeleteClassroom", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task EditClassroom(int id, ClassroomEdit classroom)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.EditClassroom", new { id = id , ClassroomName = classroom.ClassRoomName }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<Classroom>> GetClassroom()
    {
      using (var connection = _context.CreateConnection())
      {
        var classroom = await connection.QueryAsync<Classroom>("dbo.GetClassrooms",commandType:System.Data.CommandType.StoredProcedure);
        return classroom.ToList();
      }
    }
  }
}
