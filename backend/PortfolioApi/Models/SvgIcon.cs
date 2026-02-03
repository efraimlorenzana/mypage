using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class SvgIcon
{
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? ViewBox { get; set; }
    
    public string? Path { get; set; }
    
    public string? IconClass { get; set; }
    
    public string? Fill { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
