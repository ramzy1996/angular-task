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
  public class TeacherRepository : ITeacherRepository
  {
    private readonly DapperContext _context;
    public TeacherRepository(DapperContext context)
    {
      _context = context;
    }

    public async Task CreateTeacher(TeacherCreate teacher)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.SaveTeacher", new
        {
          Fname = teacher.Fname,
          Lname = teacher.Lname,
          ContactNo = teacher.ContactNo,
          EmailID = teacher.EmailId
        }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task DeleteTeacher(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.DeleteTeacher", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public  async Task EditTeacher(int id, TeacherEdit teacher)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.EditTeacher", new
        {
          id = id,
          Fname = teacher.Fname,
          Lname = teacher.Lname,
          ContactNo = teacher.ContactNo,
          EmailID = teacher.EmailId,
        }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<Teacher>> GetTeachers()
    {
      using (var connection = _context.CreateConnection())
      {
        var teacher = await connection.QueryAsync<Teacher>("dbo.GetTeachers", commandType: System.Data.CommandType.StoredProcedure);
        return teacher.ToList();
      }
    }
  }
}
