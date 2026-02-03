using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class PersonalInfo
{
    public int Id { get; set; }
    
    [Required]
    public string Firstname { get; set; } = string.Empty;
    
    public string? Middlename { get; set; }
    
    [Required]
    public string Lastname { get; set; } = string.Empty;
    
    public string? Bio { get; set; }
    
    public string? ProfessionTitle { get; set; }
    
    public string? AvatarUrl { get; set; }
    
    public string? BannerImageUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
