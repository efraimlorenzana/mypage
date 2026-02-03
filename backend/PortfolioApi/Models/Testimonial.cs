using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class Testimonial
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Email { get; set; } = string.Empty;
    
    public string? Company { get; set; }
    
    public string? Role { get; set; }
    
    [Required]
    public string Message { get; set; } = string.Empty;
    
    public bool Approved { get; set; } = false;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
