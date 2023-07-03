using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Dto;

namespace webapi.IRepository
{
  public interface IAllocationClassroomRepository
  {
    public Task AllocateClassroom(AllocationClassroom allocate);
    public Task<IEnumerable<GetClassroomAllocation>> GetClassroomById(int id);
    public Task DeAllocateClassroom(int id);
  }
}
