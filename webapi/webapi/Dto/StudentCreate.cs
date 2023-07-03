using System;

namespace webapi.Dto
{
  public class StudentCreate
  {
    public string? Fname { get; set; }
    public string? Lname { get; set; }
    public string? ContactPerson { get; set; }
    public int ContactNo { get; set; }
    public string? EmailId { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public int ClassroomId { get; set; }
  }
}
