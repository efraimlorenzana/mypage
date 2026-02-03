using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class Achievement
{
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? Source { get; set; }
    
    public string? Issuer { get; set; }
    
    public string? DateAcquired { get; set; }
    
    public string? CertificateUrl { get; set; }
    
    public string? GoogleDriveLocation { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
