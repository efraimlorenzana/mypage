using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class Resume
{
    public int Id { get; set; }
    
    [Required]
    public string Url { get; set; } = string.Empty;
    
    public string? NavigationLinkText { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
