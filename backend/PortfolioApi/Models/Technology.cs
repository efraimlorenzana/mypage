using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class Technology
{
    public int Id { get; set; }
    
    [Required]
    public string LanguageName { get; set; } = string.Empty;
    
    public int? SvgIconId { get; set; }
    
    public string? IconUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
