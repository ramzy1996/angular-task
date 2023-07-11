using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.Entities;

namespace webapi.IRepository
{
  public interface IStudentRepository
  {
    public Task<IEnumerable<Student>> GetStudents();
    public Task CreateStudent(StudentCreate std);
    public Task EditStudent(int id, StudentEdit std);
    public Task DeleteStudent(int id);
    public Task<StudentDetailReport> GetStudentById(int id);
  }
}
