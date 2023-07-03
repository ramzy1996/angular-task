using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.Entities;

namespace webapi.IRepository
{
  public interface ITeacherRepository
  {
    public Task<IEnumerable<Teacher>> GetTeachers();
    public Task CreateTeacher(TeacherCreate teacher);
    public Task EditTeacher(int id, TeacherEdit teacher);
    public Task DeleteTeacher(int id);
  }
}
