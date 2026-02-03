using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api")]
public class PortfolioController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PortfolioController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("portfolio")]
    public async Task<ActionResult<PortfolioDataDto>> GetAllPortfolioData()
    {
        var data = new PortfolioDataDto
        {
            PersonalInfoes = await _context.PersonalInfos.Select(p => new PersonalInfoDto
            {
                Id = p.Id,
                Firstname = p.Firstname,
                Middlename = p.Middlename,
                Lastname = p.Lastname,
                Bio = p.Bio,
                ProfessionTitle = p.ProfessionTitle,
                AvatarUrl = p.AvatarUrl,
                BannerImageUrl = p.BannerImageUrl
            }).ToListAsync(),
            SkillSets = await _context.Skills.Select(s => new SkillDto
            {
                Id = s.Id,
                Technology = s.Technology,
                KnowledgeLevel = s.KnowledgeLevel
            }).ToListAsync(),
            Projects = await _context.Projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Technology = p.Technology,
                DomainName = p.DomainName,
                Github = p.Github,
                PosterImageUrl = p.PosterImageUrl
            }).ToListAsync(),
            Achievements = await _context.Achievements.Select(a => new AchievementDto
            {
                Id = a.Id,
                Title = a.Title,
                Source = a.Source,
                Issuer = a.Issuer,
                DateAcquired = a.DateAcquired,
                CertificateUrl = a.CertificateUrl,
                GoogleDriveLocation = a.GoogleDriveLocation
            }).ToListAsync(),
            WorkHistories = await _context.WorkHistories.Select(w => new WorkHistoryDto
            {
                Id = w.Id,
                Company = w.Company,
                Role = w.Role,
                DurationFrom = w.DurationFrom,
                DurationTo = w.DurationTo,
                Industry = w.Industry,
                Department = w.Department,
                JobDescription = w.JobDescription,
                LogoUrl = w.LogoUrl,
                BrandColorTag = w.BrandColorTag,
                CardPosition = w.CardPosition
            }).ToListAsync(),
            SocialAccounts = await _context.SocialAccounts.Select(s => new SocialAccountDto
            {
                Id = s.Id,
                Organization = s.Organization,
                Link = s.Link,
                SvgIconId = s.SvgIconId
            }).ToListAsync(),
            Technologies = await _context.Technologies.Select(t => new TechnologyDto
            {
                Id = t.Id,
                LanguageName = t.LanguageName,
                SvgIconId = t.SvgIconId,
                IconUrl = t.IconUrl
            }).ToListAsync(),
            ContactDetailses = await _context.ContactDetails.Select(c => new ContactDetailsDto
            {
                Id = c.Id,
                Title = c.Title,
                Type = c.Type,
                Info = c.Info,
                SvgIconId = c.SvgIconId,
                MediaIconUrl = c.MediaIconUrl
            }).ToListAsync(),
            Resumes = await _context.Resumes.Select(r => new ResumeDto
            {
                Id = r.Id,
                Url = r.Url,
                NavigationLinkText = r.NavigationLinkText
            }).ToListAsync(),
            SvgIcons = await _context.SvgIcons.Select(s => new SvgIconDto
            {
                Id = s.Id,
                Title = s.Title,
                ViewBox = s.ViewBox,
                Path = s.Path,
                IconClass = s.IconClass,
                Fill = s.Fill
            }).ToListAsync(),
            Testimonials = await _context.Testimonials.Select(t => new TestimonialDto
            {
                Id = t.Id,
                Name = t.Name,
                Email = t.Email,
                Company = t.Company,
                Role = t.Role,
                Message = t.Message,
                Approved = t.Approved
            }).ToListAsync()
        };

        return Ok(data);
    }

    // Personal Info CRUD
    [HttpGet("personal-info")]
    public async Task<ActionResult<List<PersonalInfoDto>>> GetPersonalInfos()
    {
        return await _context.PersonalInfos.Select(p => new PersonalInfoDto
        {
            Id = p.Id,
            Firstname = p.Firstname,
            Middlename = p.Middlename,
            Lastname = p.Lastname,
            Bio = p.Bio,
            ProfessionTitle = p.ProfessionTitle,
            AvatarUrl = p.AvatarUrl,
            BannerImageUrl = p.BannerImageUrl
        }).ToListAsync();
    }

    [HttpPost("personal-info")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<PersonalInfoDto>> CreatePersonalInfo(CreatePersonalInfoDto dto)
    {
        var item = new PersonalInfo
        {
            Firstname = dto.Firstname,
            Middlename = dto.Middlename,
            Lastname = dto.Lastname,
            Bio = dto.Bio,
            ProfessionTitle = dto.ProfessionTitle,
            AvatarUrl = dto.AvatarUrl,
            BannerImageUrl = dto.BannerImageUrl
        };
        _context.PersonalInfos.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new PersonalInfoDto
        {
            Id = item.Id,
            Firstname = item.Firstname,
            Middlename = item.Middlename,
            Lastname = item.Lastname,
            Bio = item.Bio,
            ProfessionTitle = item.ProfessionTitle,
            AvatarUrl = item.AvatarUrl,
            BannerImageUrl = item.BannerImageUrl
        });
    }

    [HttpPut("personal-info/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<PersonalInfoDto>> UpdatePersonalInfo(int id, CreatePersonalInfoDto dto)
    {
        var item = await _context.PersonalInfos.FindAsync(id);
        if (item == null) return NotFound();

        item.Firstname = dto.Firstname;
        item.Middlename = dto.Middlename;
        item.Lastname = dto.Lastname;
        item.Bio = dto.Bio;
        item.ProfessionTitle = dto.ProfessionTitle;
        item.AvatarUrl = dto.AvatarUrl;
        item.BannerImageUrl = dto.BannerImageUrl;
        item.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new PersonalInfoDto
        {
            Id = item.Id,
            Firstname = item.Firstname,
            Middlename = item.Middlename,
            Lastname = item.Lastname,
            Bio = item.Bio,
            ProfessionTitle = item.ProfessionTitle,
            AvatarUrl = item.AvatarUrl,
            BannerImageUrl = item.BannerImageUrl
        });
    }

    [HttpDelete("personal-info/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeletePersonalInfo(int id)
    {
        var item = await _context.PersonalInfos.FindAsync(id);
        if (item == null) return NotFound();
        _context.PersonalInfos.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Skills CRUD
    [HttpGet("skills")]
    public async Task<ActionResult<List<SkillDto>>> GetSkills()
    {
        return await _context.Skills.Select(s => new SkillDto
        {
            Id = s.Id,
            Technology = s.Technology,
            KnowledgeLevel = s.KnowledgeLevel
        }).ToListAsync();
    }

    [HttpPost("skills")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SkillDto>> CreateSkill(CreateSkillDto dto)
    {
        var item = new Skill { Technology = dto.Technology, KnowledgeLevel = dto.KnowledgeLevel };
        _context.Skills.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new SkillDto { Id = item.Id, Technology = item.Technology, KnowledgeLevel = item.KnowledgeLevel });
    }

    [HttpPut("skills/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SkillDto>> UpdateSkill(int id, CreateSkillDto dto)
    {
        var item = await _context.Skills.FindAsync(id);
        if (item == null) return NotFound();
        item.Technology = dto.Technology;
        item.KnowledgeLevel = dto.KnowledgeLevel;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new SkillDto { Id = item.Id, Technology = item.Technology, KnowledgeLevel = item.KnowledgeLevel });
    }

    [HttpDelete("skills/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteSkill(int id)
    {
        var item = await _context.Skills.FindAsync(id);
        if (item == null) return NotFound();
        _context.Skills.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Projects CRUD
    [HttpGet("projects")]
    public async Task<ActionResult<List<ProjectDto>>> GetProjects()
    {
        return await _context.Projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            Technology = p.Technology,
            DomainName = p.DomainName,
            Github = p.Github,
            PosterImageUrl = p.PosterImageUrl
        }).ToListAsync();
    }

    [HttpPost("projects")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProjectDto>> CreateProject(CreateProjectDto dto)
    {
        var item = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            Technology = dto.Technology,
            DomainName = dto.DomainName,
            Github = dto.Github,
            PosterImageUrl = dto.PosterImageUrl
        };
        _context.Projects.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new ProjectDto
        {
            Id = item.Id,
            Title = item.Title,
            Description = item.Description,
            Technology = item.Technology,
            DomainName = item.DomainName,
            Github = item.Github,
            PosterImageUrl = item.PosterImageUrl
        });
    }

    [HttpPut("projects/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProjectDto>> UpdateProject(int id, CreateProjectDto dto)
    {
        var item = await _context.Projects.FindAsync(id);
        if (item == null) return NotFound();
        item.Title = dto.Title;
        item.Description = dto.Description;
        item.Technology = dto.Technology;
        item.DomainName = dto.DomainName;
        item.Github = dto.Github;
        item.PosterImageUrl = dto.PosterImageUrl;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new ProjectDto
        {
            Id = item.Id,
            Title = item.Title,
            Description = item.Description,
            Technology = item.Technology,
            DomainName = item.DomainName,
            Github = item.Github,
            PosterImageUrl = item.PosterImageUrl
        });
    }

    [HttpDelete("projects/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteProject(int id)
    {
        var item = await _context.Projects.FindAsync(id);
        if (item == null) return NotFound();
        _context.Projects.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Achievements CRUD
    [HttpGet("achievements")]
    public async Task<ActionResult<List<AchievementDto>>> GetAchievements()
    {
        return await _context.Achievements.Select(a => new AchievementDto
        {
            Id = a.Id,
            Title = a.Title,
            Source = a.Source,
            Issuer = a.Issuer,
            DateAcquired = a.DateAcquired,
            CertificateUrl = a.CertificateUrl,
            GoogleDriveLocation = a.GoogleDriveLocation
        }).ToListAsync();
    }

    [HttpPost("achievements")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<AchievementDto>> CreateAchievement(CreateAchievementDto dto)
    {
        var item = new Achievement
        {
            Title = dto.Title,
            Source = dto.Source,
            Issuer = dto.Issuer,
            DateAcquired = dto.DateAcquired,
            CertificateUrl = dto.CertificateUrl,
            GoogleDriveLocation = dto.GoogleDriveLocation
        };
        _context.Achievements.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new AchievementDto
        {
            Id = item.Id,
            Title = item.Title,
            Source = item.Source,
            Issuer = item.Issuer,
            DateAcquired = item.DateAcquired,
            CertificateUrl = item.CertificateUrl,
            GoogleDriveLocation = item.GoogleDriveLocation
        });
    }

    [HttpPut("achievements/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<AchievementDto>> UpdateAchievement(int id, CreateAchievementDto dto)
    {
        var item = await _context.Achievements.FindAsync(id);
        if (item == null) return NotFound();
        item.Title = dto.Title;
        item.Source = dto.Source;
        item.Issuer = dto.Issuer;
        item.DateAcquired = dto.DateAcquired;
        item.CertificateUrl = dto.CertificateUrl;
        item.GoogleDriveLocation = dto.GoogleDriveLocation;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new AchievementDto
        {
            Id = item.Id,
            Title = item.Title,
            Source = item.Source,
            Issuer = item.Issuer,
            DateAcquired = item.DateAcquired,
            CertificateUrl = item.CertificateUrl,
            GoogleDriveLocation = item.GoogleDriveLocation
        });
    }

    [HttpDelete("achievements/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteAchievement(int id)
    {
        var item = await _context.Achievements.FindAsync(id);
        if (item == null) return NotFound();
        _context.Achievements.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Work Histories CRUD
    [HttpGet("work-histories")]
    public async Task<ActionResult<List<WorkHistoryDto>>> GetWorkHistories()
    {
        return await _context.WorkHistories.Select(w => new WorkHistoryDto
        {
            Id = w.Id,
            Company = w.Company,
            Role = w.Role,
            DurationFrom = w.DurationFrom,
            DurationTo = w.DurationTo,
            Industry = w.Industry,
            Department = w.Department,
            JobDescription = w.JobDescription,
            LogoUrl = w.LogoUrl,
            BrandColorTag = w.BrandColorTag,
            CardPosition = w.CardPosition
        }).ToListAsync();
    }

    [HttpPost("work-histories")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<WorkHistoryDto>> CreateWorkHistory(CreateWorkHistoryDto dto)
    {
        var item = new WorkHistory
        {
            Company = dto.Company,
            Role = dto.Role,
            DurationFrom = dto.DurationFrom,
            DurationTo = dto.DurationTo,
            Industry = dto.Industry,
            Department = dto.Department,
            JobDescription = dto.JobDescription,
            LogoUrl = dto.LogoUrl,
            BrandColorTag = dto.BrandColorTag,
            CardPosition = dto.CardPosition
        };
        _context.WorkHistories.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new WorkHistoryDto
        {
            Id = item.Id,
            Company = item.Company,
            Role = item.Role,
            DurationFrom = item.DurationFrom,
            DurationTo = item.DurationTo,
            Industry = item.Industry,
            Department = item.Department,
            JobDescription = item.JobDescription,
            LogoUrl = item.LogoUrl,
            BrandColorTag = item.BrandColorTag,
            CardPosition = item.CardPosition
        });
    }

    [HttpPut("work-histories/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<WorkHistoryDto>> UpdateWorkHistory(int id, CreateWorkHistoryDto dto)
    {
        var item = await _context.WorkHistories.FindAsync(id);
        if (item == null) return NotFound();
        item.Company = dto.Company;
        item.Role = dto.Role;
        item.DurationFrom = dto.DurationFrom;
        item.DurationTo = dto.DurationTo;
        item.Industry = dto.Industry;
        item.Department = dto.Department;
        item.JobDescription = dto.JobDescription;
        item.LogoUrl = dto.LogoUrl;
        item.BrandColorTag = dto.BrandColorTag;
        item.CardPosition = dto.CardPosition;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new WorkHistoryDto
        {
            Id = item.Id,
            Company = item.Company,
            Role = item.Role,
            DurationFrom = item.DurationFrom,
            DurationTo = item.DurationTo,
            Industry = item.Industry,
            Department = item.Department,
            JobDescription = item.JobDescription,
            LogoUrl = item.LogoUrl,
            BrandColorTag = item.BrandColorTag,
            CardPosition = item.CardPosition
        });
    }

    [HttpDelete("work-histories/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteWorkHistory(int id)
    {
        var item = await _context.WorkHistories.FindAsync(id);
        if (item == null) return NotFound();
        _context.WorkHistories.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Social Accounts CRUD
    [HttpGet("social-accounts")]
    public async Task<ActionResult<List<SocialAccountDto>>> GetSocialAccounts()
    {
        return await _context.SocialAccounts.Select(s => new SocialAccountDto
        {
            Id = s.Id,
            Organization = s.Organization,
            Link = s.Link,
            SvgIconId = s.SvgIconId
        }).ToListAsync();
    }

    [HttpPost("social-accounts")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SocialAccountDto>> CreateSocialAccount(CreateSocialAccountDto dto)
    {
        var item = new SocialAccount { Organization = dto.Organization, Link = dto.Link, SvgIconId = dto.SvgIconId };
        _context.SocialAccounts.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new SocialAccountDto { Id = item.Id, Organization = item.Organization, Link = item.Link, SvgIconId = item.SvgIconId });
    }

    [HttpPut("social-accounts/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SocialAccountDto>> UpdateSocialAccount(int id, CreateSocialAccountDto dto)
    {
        var item = await _context.SocialAccounts.FindAsync(id);
        if (item == null) return NotFound();
        item.Organization = dto.Organization;
        item.Link = dto.Link;
        item.SvgIconId = dto.SvgIconId;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new SocialAccountDto { Id = item.Id, Organization = item.Organization, Link = item.Link, SvgIconId = item.SvgIconId });
    }

    [HttpDelete("social-accounts/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteSocialAccount(int id)
    {
        var item = await _context.SocialAccounts.FindAsync(id);
        if (item == null) return NotFound();
        _context.SocialAccounts.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Technologies CRUD
    [HttpGet("technologies")]
    public async Task<ActionResult<List<TechnologyDto>>> GetTechnologies()
    {
        return await _context.Technologies.Select(t => new TechnologyDto
        {
            Id = t.Id,
            LanguageName = t.LanguageName,
            SvgIconId = t.SvgIconId,
            IconUrl = t.IconUrl
        }).ToListAsync();
    }

    [HttpPost("technologies")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<TechnologyDto>> CreateTechnology(CreateTechnologyDto dto)
    {
        var item = new Technology { LanguageName = dto.LanguageName, SvgIconId = dto.SvgIconId, IconUrl = dto.IconUrl };
        _context.Technologies.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new TechnologyDto { Id = item.Id, LanguageName = item.LanguageName, SvgIconId = item.SvgIconId, IconUrl = item.IconUrl });
    }

    [HttpPut("technologies/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<TechnologyDto>> UpdateTechnology(int id, CreateTechnologyDto dto)
    {
        var item = await _context.Technologies.FindAsync(id);
        if (item == null) return NotFound();
        item.LanguageName = dto.LanguageName;
        item.SvgIconId = dto.SvgIconId;
        item.IconUrl = dto.IconUrl;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new TechnologyDto { Id = item.Id, LanguageName = item.LanguageName, SvgIconId = item.SvgIconId, IconUrl = item.IconUrl });
    }

    [HttpDelete("technologies/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteTechnology(int id)
    {
        var item = await _context.Technologies.FindAsync(id);
        if (item == null) return NotFound();
        _context.Technologies.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Contact Details CRUD
    [HttpGet("contact-details")]
    public async Task<ActionResult<List<ContactDetailsDto>>> GetContactDetails()
    {
        return await _context.ContactDetails.Select(c => new ContactDetailsDto
        {
            Id = c.Id,
            Title = c.Title,
            Type = c.Type,
            Info = c.Info,
            SvgIconId = c.SvgIconId,
            MediaIconUrl = c.MediaIconUrl
        }).ToListAsync();
    }

    [HttpPost("contact-details")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ContactDetailsDto>> CreateContactDetails(CreateContactDetailsDto dto)
    {
        var item = new ContactDetails { Title = dto.Title, Type = dto.Type, Info = dto.Info, SvgIconId = dto.SvgIconId, MediaIconUrl = dto.MediaIconUrl };
        _context.ContactDetails.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new ContactDetailsDto { Id = item.Id, Title = item.Title, Type = item.Type, Info = item.Info, SvgIconId = item.SvgIconId, MediaIconUrl = item.MediaIconUrl });
    }

    [HttpPut("contact-details/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ContactDetailsDto>> UpdateContactDetails(int id, CreateContactDetailsDto dto)
    {
        var item = await _context.ContactDetails.FindAsync(id);
        if (item == null) return NotFound();
        item.Title = dto.Title;
        item.Type = dto.Type;
        item.Info = dto.Info;
        item.SvgIconId = dto.SvgIconId;
        item.MediaIconUrl = dto.MediaIconUrl;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new ContactDetailsDto { Id = item.Id, Title = item.Title, Type = item.Type, Info = item.Info, SvgIconId = item.SvgIconId, MediaIconUrl = item.MediaIconUrl });
    }

    [HttpDelete("contact-details/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteContactDetails(int id)
    {
        var item = await _context.ContactDetails.FindAsync(id);
        if (item == null) return NotFound();
        _context.ContactDetails.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Resumes CRUD
    [HttpGet("resumes")]
    public async Task<ActionResult<List<ResumeDto>>> GetResumes()
    {
        return await _context.Resumes.Select(r => new ResumeDto
        {
            Id = r.Id,
            Url = r.Url,
            NavigationLinkText = r.NavigationLinkText
        }).ToListAsync();
    }

    [HttpPost("resumes")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ResumeDto>> CreateResume(CreateResumeDto dto)
    {
        var item = new Resume { Url = dto.Url, NavigationLinkText = dto.NavigationLinkText };
        _context.Resumes.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new ResumeDto { Id = item.Id, Url = item.Url, NavigationLinkText = item.NavigationLinkText });
    }

    [HttpPut("resumes/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ResumeDto>> UpdateResume(int id, CreateResumeDto dto)
    {
        var item = await _context.Resumes.FindAsync(id);
        if (item == null) return NotFound();
        item.Url = dto.Url;
        item.NavigationLinkText = dto.NavigationLinkText;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new ResumeDto { Id = item.Id, Url = item.Url, NavigationLinkText = item.NavigationLinkText });
    }

    [HttpDelete("resumes/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteResume(int id)
    {
        var item = await _context.Resumes.FindAsync(id);
        if (item == null) return NotFound();
        _context.Resumes.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // SVG Icons CRUD
    [HttpGet("svg-icons")]
    public async Task<ActionResult<List<SvgIconDto>>> GetSvgIcons()
    {
        return await _context.SvgIcons.Select(s => new SvgIconDto
        {
            Id = s.Id,
            Title = s.Title,
            ViewBox = s.ViewBox,
            Path = s.Path,
            IconClass = s.IconClass,
            Fill = s.Fill
        }).ToListAsync();
    }

    [HttpPost("svg-icons")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SvgIconDto>> CreateSvgIcon(CreateSvgIconDto dto)
    {
        var item = new SvgIcon { Title = dto.Title, ViewBox = dto.ViewBox, Path = dto.Path, IconClass = dto.IconClass, Fill = dto.Fill };
        _context.SvgIcons.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new SvgIconDto { Id = item.Id, Title = item.Title, ViewBox = item.ViewBox, Path = item.Path, IconClass = item.IconClass, Fill = item.Fill });
    }

    [HttpPut("svg-icons/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SvgIconDto>> UpdateSvgIcon(int id, CreateSvgIconDto dto)
    {
        var item = await _context.SvgIcons.FindAsync(id);
        if (item == null) return NotFound();
        item.Title = dto.Title;
        item.ViewBox = dto.ViewBox;
        item.Path = dto.Path;
        item.IconClass = dto.IconClass;
        item.Fill = dto.Fill;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new SvgIconDto { Id = item.Id, Title = item.Title, ViewBox = item.ViewBox, Path = item.Path, IconClass = item.IconClass, Fill = item.Fill });
    }

    [HttpDelete("svg-icons/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteSvgIcon(int id)
    {
        var item = await _context.SvgIcons.FindAsync(id);
        if (item == null) return NotFound();
        _context.SvgIcons.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }

    // Testimonials CRUD
    [HttpGet("testimonials")]
    public async Task<ActionResult<List<TestimonialDto>>> GetTestimonials()
    {
        return await _context.Testimonials.Select(t => new TestimonialDto
        {
            Id = t.Id,
            Name = t.Name,
            Email = t.Email,
            Company = t.Company,
            Role = t.Role,
            Message = t.Message,
            Approved = t.Approved
        }).ToListAsync();
    }

    [HttpPost("testimonials")]
    public async Task<ActionResult<TestimonialDto>> CreateTestimonial(CreateTestimonialDto dto)
    {
        var item = new Testimonial
        {
            Name = dto.Name,
            Email = dto.Email,
            Company = dto.Company,
            Role = dto.Role,
            Message = dto.Message,
            Approved = false
        };
        _context.Testimonials.Add(item);
        await _context.SaveChangesAsync();
        return Ok(new TestimonialDto
        {
            Id = item.Id,
            Name = item.Name,
            Email = item.Email,
            Company = item.Company,
            Role = item.Role,
            Message = item.Message,
            Approved = item.Approved
        });
    }

    [HttpPut("testimonials/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<TestimonialDto>> UpdateTestimonial(int id, CreateTestimonialDto dto)
    {
        var item = await _context.Testimonials.FindAsync(id);
        if (item == null) return NotFound();
        item.Name = dto.Name;
        item.Email = dto.Email;
        item.Company = dto.Company;
        item.Role = dto.Role;
        item.Message = dto.Message;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new TestimonialDto
        {
            Id = item.Id,
            Name = item.Name,
            Email = item.Email,
            Company = item.Company,
            Role = item.Role,
            Message = item.Message,
            Approved = item.Approved
        });
    }

    [HttpPut("testimonials/{id}/approve")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<TestimonialDto>> ApproveTestimonial(int id)
    {
        var item = await _context.Testimonials.FindAsync(id);
        if (item == null) return NotFound();
        item.Approved = true;
        item.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(new TestimonialDto
        {
            Id = item.Id,
            Name = item.Name,
            Email = item.Email,
            Company = item.Company,
            Role = item.Role,
            Message = item.Message,
            Approved = item.Approved
        });
    }

    [HttpDelete("testimonials/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteTestimonial(int id)
    {
        var item = await _context.Testimonials.FindAsync(id);
        if (item == null) return NotFound();
        _context.Testimonials.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Deleted successfully" });
    }
}
