using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace PortfolioApi.Services;

public interface IJwtService
{
    string GenerateToken(string email, bool isAdmin);
    ClaimsPrincipal? ValidateToken(string token);
}

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;
    private readonly SymmetricSecurityKey _key;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
        var secretKey = _configuration["Jwt:SecretKey"] ?? "your-super-secret-key-that-is-at-least-32-characters-long";
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
    }

    public string GenerateToken(string email, bool isAdmin)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, isAdmin ? "Admin" : "User")
        };

        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
        var expireMinutes = int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "1440");

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"] ?? "PortfolioApi",
            audience: _configuration["Jwt:Audience"] ?? "PortfolioApp",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"] ?? "PortfolioApi",
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"] ?? "PortfolioApp",
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out _);
            return principal;
        }
        catch
        {
            return null;
        }
    }
}
