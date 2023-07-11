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
  public class StudentRepository : IStudentRepository
  {
    private readonly DapperContext _context;
    public StudentRepository(DapperContext context)
    {
      _context = context;
    }
    public async Task CreateStudent(StudentCreate std)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.SaveStudents", new
        {
          Fname = std.Fname,
          Lname = std.Lname,
          ContactPerson = std.ContactPerson,
          ContactNo = std.ContactNo,
          EmailID = std.EmailId,
          DateOfBirth = std.DateOfBirth,
          Age = std.Age,
          ClassroomId = std.ClassroomId
        }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task DeleteStudent(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.DeleteStudent", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task EditStudent(int id, StudentEdit std)
    {
      using (var connection = _context.CreateConnection())
      {
        await connection.ExecuteAsync("dbo.EditStudent", new
        {
          id = id,
          Fname = std.Fname,
          Lname = std.Lname,
          ContactPerson = std.ContactPerson,
          ContactNo = std.ContactNo,
          EmailID = std.EmailId,
          DateOfBirth = std.DateOfBirth,
          Age = std.Age,
          ClassroomId = std.ClassroomId
        }, commandType: System.Data.CommandType.StoredProcedure);
      }
    }

    public async Task<StudentDetailReport> GetStudentById(int id)
    {
      using (var connection = _context.CreateConnection())
      {
        var sub = await connection.QuerySingleOrDefaultAsync<StudentDetailReport>("dbo.GetStudentById", new { id = id }, commandType: System.Data.CommandType.StoredProcedure);
        return sub;
      }
    }

    public async Task<IEnumerable<Student>> GetStudents()
    {
      using (var connection = _context.CreateConnection())
      {
        var std = await connection.QueryAsync<Student>("dbo.GetStudents", commandType: System.Data.CommandType.StoredProcedure);
        return std.ToList();
      }
    }
  }
}
