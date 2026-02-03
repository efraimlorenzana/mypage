namespace PortfolioApi.DTOs;

public class PersonalInfoDto
{
    public int Id { get; set; }
    public string Firstname { get; set; } = string.Empty;
    public string? Middlename { get; set; }
    public string Lastname { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? ProfessionTitle { get; set; }
    public string? AvatarUrl { get; set; }
    public string? BannerImageUrl { get; set; }
}

public class CreatePersonalInfoDto
{
    public string Firstname { get; set; } = string.Empty;
    public string? Middlename { get; set; }
    public string Lastname { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? ProfessionTitle { get; set; }
    public string? AvatarUrl { get; set; }
    public string? BannerImageUrl { get; set; }
}

public class SkillDto
{
    public int Id { get; set; }
    public string Technology { get; set; } = string.Empty;
    public double KnowledgeLevel { get; set; }
}

public class CreateSkillDto
{
    public string Technology { get; set; } = string.Empty;
    public double KnowledgeLevel { get; set; }
}

public class ProjectDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Technology { get; set; }
    public string? DomainName { get; set; }
    public string? Github { get; set; }
    public string? PosterImageUrl { get; set; }
}

public class CreateProjectDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Technology { get; set; }
    public string? DomainName { get; set; }
    public string? Github { get; set; }
    public string? PosterImageUrl { get; set; }
}

public class AchievementDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Source { get; set; }
    public string? Issuer { get; set; }
    public string? DateAcquired { get; set; }
    public string? CertificateUrl { get; set; }
    public string? GoogleDriveLocation { get; set; }
}

public class CreateAchievementDto
{
    public string Title { get; set; } = string.Empty;
    public string? Source { get; set; }
    public string? Issuer { get; set; }
    public string? DateAcquired { get; set; }
    public string? CertificateUrl { get; set; }
    public string? GoogleDriveLocation { get; set; }
}

public class WorkHistoryDto
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? DurationFrom { get; set; }
    public string? DurationTo { get; set; }
    public string? Industry { get; set; }
    public string? Department { get; set; }
    public string? JobDescription { get; set; }
    public string? LogoUrl { get; set; }
    public string? BrandColorTag { get; set; }
    public string? CardPosition { get; set; }
}

public class CreateWorkHistoryDto
{
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? DurationFrom { get; set; }
    public string? DurationTo { get; set; }
    public string? Industry { get; set; }
    public string? Department { get; set; }
    public string? JobDescription { get; set; }
    public string? LogoUrl { get; set; }
    public string? BrandColorTag { get; set; }
    public string? CardPosition { get; set; }
}

public class SocialAccountDto
{
    public int Id { get; set; }
    public string Organization { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public int? SvgIconId { get; set; }
}

public class CreateSocialAccountDto
{
    public string Organization { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public int? SvgIconId { get; set; }
}

public class TechnologyDto
{
    public int Id { get; set; }
    public string LanguageName { get; set; } = string.Empty;
    public int? SvgIconId { get; set; }
    public string? IconUrl { get; set; }
}

public class CreateTechnologyDto
{
    public string LanguageName { get; set; } = string.Empty;
    public int? SvgIconId { get; set; }
    public string? IconUrl { get; set; }
}

public class ContactDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Type { get; set; }
    public string? Info { get; set; }
    public int? SvgIconId { get; set; }
    public string? MediaIconUrl { get; set; }
}

public class CreateContactDetailsDto
{
    public string Title { get; set; } = string.Empty;
    public string? Type { get; set; }
    public string? Info { get; set; }
    public int? SvgIconId { get; set; }
    public string? MediaIconUrl { get; set; }
}

public class ResumeDto
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? NavigationLinkText { get; set; }
}

public class CreateResumeDto
{
    public string Url { get; set; } = string.Empty;
    public string? NavigationLinkText { get; set; }
}

public class SvgIconDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? ViewBox { get; set; }
    public string? Path { get; set; }
    public string? IconClass { get; set; }
    public string? Fill { get; set; }
}

public class CreateSvgIconDto
{
    public string Title { get; set; } = string.Empty;
    public string? ViewBox { get; set; }
    public string? Path { get; set; }
    public string? IconClass { get; set; }
    public string? Fill { get; set; }
}

public class TestimonialDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string? Role { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool Approved { get; set; }
}

public class CreateTestimonialDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string? Role { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class PortfolioDataDto
{
    public List<PersonalInfoDto> PersonalInfoes { get; set; } = new();
    public List<SkillDto> SkillSets { get; set; } = new();
    public List<ProjectDto> Projects { get; set; } = new();
    public List<AchievementDto> Achievements { get; set; } = new();
    public List<WorkHistoryDto> WorkHistories { get; set; } = new();
    public List<SocialAccountDto> SocialAccounts { get; set; } = new();
    public List<TechnologyDto> Technologies { get; set; } = new();
    public List<ContactDetailsDto> ContactDetailses { get; set; } = new();
    public List<ResumeDto> Resumes { get; set; } = new();
    public List<SvgIconDto> SvgIcons { get; set; } = new();
    public List<TestimonialDto> Testimonials { get; set; } = new();
}
