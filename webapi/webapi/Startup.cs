using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Context;
using webapi.IRepository;
using webapi.Repository;

namespace webapi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
      services.AddSingleton<DapperContext>();
      services.AddScoped<IClassroomRepository, ClassroomRepository>();
      services.AddScoped<IStudentRepository, StudentRepository>();
      services.AddScoped<ITeacherRepository, TeacherRepository>();
      services.AddScoped<ISubjectRepository, SubjectRepository>();
      services.AddScoped<IAllocateSubjectRepository, AllocateSubjectRepository>();
      services.AddScoped<IAllocationClassroomRepository, AllocationClassroomRepository>();

      services.AddCors((opt) =>
      {
        opt.AddPolicy("test", (policy) =>
        {
          policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseCors("test");
      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
