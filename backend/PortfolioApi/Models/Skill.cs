using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class Skill
{
    public int Id { get; set; }
    
    [Required]
    public string Technology { get; set; } = string.Empty;
    
    public double KnowledgeLevel { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}
