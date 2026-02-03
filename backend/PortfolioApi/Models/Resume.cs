using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioApi.Models;

public class Resume
{
    public int Id { get; set; }
    
    public string? FullName { get; set; }
    
    public string? Location { get; set; }
    
    public string? Phone { get; set; }
    
    public string? Email { get; set; }
    
    public string? Website { get; set; }
    
    public string? Summary { get; set; }
    
    // Store as JSON string
    public string? SkillsJson { get; set; }
    
    // Store as JSON string
    public string? ExperienceJson { get; set; }
    
    // Store as JSON string
    public string? EducationJson { get; set; }
    
    // Store as JSON string
    public string? CertificationsJson { get; set; }
    
    // Legacy fields for backward compatibility
    public string? Url { get; set; }
    
    public string? NavigationLinkText { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
