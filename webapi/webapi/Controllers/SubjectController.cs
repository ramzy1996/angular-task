using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.IRepository;
using webapi.Repository;

namespace webapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SubjectController : ControllerBase
  {
    private readonly ISubjectRepository _subjectRepository;
    public SubjectController(ISubjectRepository subjectRepository)
    {
      _subjectRepository = subjectRepository;
    }
    [HttpGet]
    [Route("GetSubjects")]
    public async Task<IActionResult> GetSubjects()
    {
      try
      {
        var classroom = await _subjectRepository.GetSubjects();
        return Ok(classroom);
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPost]
    [Route("CreateSubject")]
    public async Task<IActionResult> CreateSubject([FromBody] SubjectCreate sub)
    {
      try
      {
        await _subjectRepository.CreateSubject(sub);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPut]
    [Route("EditSubject/{id}")]
    public async Task<IActionResult> EditSubject(int id, [FromBody] SubjectEdit sub)
    {
      try
      {
        await _subjectRepository.EditSubject(id, sub);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpDelete("{id}")]
    [Route("DeleteSubject/{id}")]
    public async Task<IActionResult> DeleteSubject(int id)
    {
      try
      {
        await _subjectRepository.DeleteSubject(id);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
  }
}
