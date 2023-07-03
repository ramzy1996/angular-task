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
  public class TeacherController : ControllerBase
  {
    private readonly ITeacherRepository _teacherRepository;
    public TeacherController(ITeacherRepository teacherRepository)
    {
      _teacherRepository = teacherRepository;
    }

    [HttpGet]
    [Route("GetTeachers")]
    public async Task<IActionResult> GetTeachers()
    {
      try
      {
        var std = await _teacherRepository.GetTeachers();
        return Ok(std);
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPost]
    [Route("CreateTeacher")]
    public async Task<IActionResult> CreateTeacher([FromBody] TeacherCreate teacher)
    {
      try
      {
        await _teacherRepository.CreateTeacher(teacher);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPut]
    [Route("EditTeacher/{id}")]
    public async Task<IActionResult> EditTeacher(int id, [FromBody] TeacherEdit teacher)
    {
      try
      {
        await _teacherRepository.EditTeacher(id, teacher);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpDelete]
    [Route("DeleteTeacher/{id}")]
    public async Task<IActionResult> DeleteTeacher(int id)
    {
      try
      {
        await _teacherRepository.DeleteTeacher(id);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
  }
}
