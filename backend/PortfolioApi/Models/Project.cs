using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class Project
{
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public string? Technology { get; set; }
    
    public string? DomainName { get; set; }
    
    public string? Github { get; set; }
    
    public string? PosterImageUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
