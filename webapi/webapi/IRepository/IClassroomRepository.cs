using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.Entities;

namespace webapi.IRepository
{
  public interface IClassroomRepository
  {
    public Task<IEnumerable<Classroom>> GetClassroom();
    public Task  CreateClassroom(ClassroomCreation classroom);
    public Task  EditClassroom(int id, ClassroomEdit classroom);
    public Task  DeleteClassroom(int id);
  }
}
