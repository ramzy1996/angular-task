using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.IRepository;

namespace webapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ClassroomController : ControllerBase
  {
    private readonly IClassroomRepository _classroomRepository;
    public ClassroomController(IClassroomRepository classroomRepository)
    {
      _classroomRepository = classroomRepository;
    }
    [HttpGet]
    [Route("GetClassroom")]
    public async Task<IActionResult> GetClassroom()
    {
      try
      {
        var classroom = await _classroomRepository.GetClassroom();
        return Ok(classroom);
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPost]
    [Route("CreateClassroom")]
    public async Task<IActionResult> CreateClassroom([FromBody] ClassroomCreation classroom)
    {
      try
      {
        await _classroomRepository.CreateClassroom(classroom);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPut]
    [Route("EditClassroom/{id}")]
    public async Task<IActionResult> EditClassroom(int id, [FromBody] ClassroomEdit classroom)
    {
      try
      {
        await _classroomRepository.EditClassroom(id, classroom);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpDelete]
    [Route("DeleteClassroom/{id}")]
    public async Task<IActionResult> DeleteClassroom(int id)
    {
      try
      {
        await _classroomRepository.DeleteClassroom(id);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
  }
}
