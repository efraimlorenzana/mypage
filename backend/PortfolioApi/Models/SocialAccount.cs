using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class SocialAccount
{
    public int Id { get; set; }
    
    [Required]
    public string Organization { get; set; } = string.Empty;
    
    [Required]
    public string Link { get; set; } = string.Empty;
    
    public int? SvgIconId { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
