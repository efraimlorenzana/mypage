using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class ContactDetails
{
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? Type { get; set; }
    
    public string? Info { get; set; }
    
    public int? SvgIconId { get; set; }
    
    public string? MediaIconUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
