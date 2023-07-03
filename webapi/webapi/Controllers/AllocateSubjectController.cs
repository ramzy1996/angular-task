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
  public class AllocateSubjectController : ControllerBase
  {
    private readonly IAllocateSubjectRepository _repository;
    public AllocateSubjectController(IAllocateSubjectRepository repository)
    {
      _repository = repository;
    }

    [HttpPost]
    [Route("AllocateSubject")]
    public async Task<IActionResult> AllocateSubject([FromBody] AllocateSubject allocate)
    {
      try
      {
        await _repository.AllocateSubject(allocate);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }

    [HttpGet]
    [Route("GetSubjectsById/{id}")]
    public async Task<IActionResult> GetSubjectsById(int id)
    {
      try
      {
        var sub = await _repository.GetSubjectsById(id);
        return Ok(sub);
      }
      catch (System.Exception)
      {

        throw;
      }
    }

    [HttpDelete]
    [Route("DeAllocateSubject/{id}")]
    public async Task<IActionResult> DeAllocateSubject(int id)
    {
      try
      {
        await _repository.DeAllocateSubject(id);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
  }
}
