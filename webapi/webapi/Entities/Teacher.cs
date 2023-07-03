using System;

namespace webapi.Entities
{
  public class Teacher
  {
    public int TeacherId { get; set; }
    public string? Fname { get; set; }
    public string? Lname { get; set; }
    public int ContactNo { get; set; }
    public string? EmailId { get; set; }
  }
}
