using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class WorkHistory
{
    public int Id { get; set; }
    
    [Required]
    public string Company { get; set; } = string.Empty;
    
    [Required]
    public string Role { get; set; } = string.Empty;
    
    public string? DurationFrom { get; set; }
    
    public string? DurationTo { get; set; }
    
    public string? Industry { get; set; }
    
    public string? Department { get; set; }
    
    public string? JobDescription { get; set; }
    
    public string? LogoUrl { get; set; }
    
    public string? BrandColorTag { get; set; }
    
    public string? CardPosition { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
