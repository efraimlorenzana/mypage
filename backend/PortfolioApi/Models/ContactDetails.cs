using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class ContactDetails
{
    public int Id { get; set; }
    
    // Store as JSON string for multiple emails
    public string? EmailsJson { get; set; }
    
    // Store as JSON string for multiple phones
    public string? PhonesJson { get; set; }
    
    public string? Address { get; set; }
    
    public string? City { get; set; }
    
    public string? Country { get; set; }
    
    // Legacy fields for backward compatibility
    public string? Title { get; set; }
    
    public string? Type { get; set; }
    
    public string? Info { get; set; }
    
    public int? SvgIconId { get; set; }
    
    public string? MediaIconUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
