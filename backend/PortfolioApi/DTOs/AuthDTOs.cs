using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.DTOs;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}

public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Password { get; set; } = string.Empty;
}

public class UserResponseDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public bool IsAdmin { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class TokenResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string TokenType { get; set; } = "bearer";
    public UserResponseDto User { get; set; } = null!;
}
