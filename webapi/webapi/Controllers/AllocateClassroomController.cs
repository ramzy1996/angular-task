using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Dto;
using webapi.IRepository;

namespace webapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AllocateClassroomController : ControllerBase
  {
    private readonly IAllocationClassroomRepository _allocationClassroomRepository;
    public AllocateClassroomController(IAllocationClassroomRepository allocationClassroomRepository)
    {
      _allocationClassroomRepository = allocationClassroomRepository;
    }

    [HttpPost]
    [Route("AllocateClassroom")]
    public async Task<IActionResult> AllocateClassroom([FromBody] AllocationClassroom allocate)
    {
      try
      {
        await _allocationClassroomRepository.AllocateClassroom(allocate);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }

    [HttpGet]
    [Route("GetClassroomById/{id}")]
    public async Task<IActionResult> GetClassroomById(int id)
    {
      try
      {
        var sub = await _allocationClassroomRepository.GetClassroomById(id);
        return Ok(sub);
      }
      catch (System.Exception)
      {

        throw;
      }
    }

    [HttpDelete]
    [Route("DeAllocateClassroom/{id}")]
    public async Task<IActionResult> DeAllocateClassroom(int id)
    {
      try
      {
        await _allocationClassroomRepository.DeAllocateClassroom(id);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
  }
}
