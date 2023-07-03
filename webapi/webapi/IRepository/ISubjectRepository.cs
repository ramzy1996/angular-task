using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.Entities;

namespace webapi.IRepository
{
  public interface ISubjectRepository
  {
    public Task<IEnumerable<Subject>> GetSubjects();
    public Task CreateSubject(SubjectCreate sub);
    public Task EditSubject(int id, SubjectEdit sub);
    public Task DeleteSubject(int id);
  }
}
