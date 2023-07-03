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
  public class StudentController : ControllerBase
  {
    private readonly IStudentRepository _studentRepository;
    public StudentController(IStudentRepository studentRepository)
    {
      _studentRepository = studentRepository;
    }
    [HttpGet]
    [Route("GetStudents")]
    public async Task<IActionResult> GetStudents()
    {
      try
      {
        var std = await _studentRepository.GetStudents();
        return Ok(std);
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPost]
    [Route("CreateStudent")]
    public async Task<IActionResult> CreateStudent([FromBody] StudentCreate std)
    {
      try
      {
        await _studentRepository.CreateStudent(std);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpPut]
    [Route("EditStudent/{id}")]
    public async Task<IActionResult> EditStudent(int id, [FromBody] StudentEdit std)
    {
      try
      {
        await _studentRepository.EditStudent(id, std);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpDelete]
    [Route("DeleteStudent/{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
      try
      {
        await _studentRepository.DeleteStudent(id);
        return Ok();
      }
      catch (System.Exception)
      {

        throw;
      }
    }
    [HttpGet]
    [Route("GetStudentById/{id}")]
    public async Task<IActionResult> GetStudentById(int id)
    {
      try
      {
        var sub = await _studentRepository.GetStudentById(id);
        return Ok(sub);
      }
      catch (System.Exception)
      {

        throw;
      }
    }
  }
}
