using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.Entities;

namespace webapi.IRepository
{
  public interface IAllocateSubjectRepository
  {
    public Task AllocateSubject(AllocateSubject allocate);
    public Task<IEnumerable<GetSubjectAllocation>> GetSubjectsById(int id);
    public Task DeAllocateSubject(int id);
    public Task<IEnumerable<GetAllocateSubjectTeachers>> GetAllocateSubject();
  }
}
