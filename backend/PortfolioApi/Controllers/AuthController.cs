using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;
using PortfolioApi.Services;
using BCrypt.Net;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthController(ApplicationDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserResponseDto>> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
        {
            return BadRequest(new { message = "Email already registered" });
        }

        var isFirstUser = !await _context.Users.AnyAsync();

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            IsAdmin = isFirstUser
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new UserResponseDto
        {
            Id = user.Id,
            Email = user.Email,
            IsActive = user.IsActive,
            IsAdmin = user.IsAdmin,
            CreatedAt = user.CreatedAt
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponseDto>> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        var token = _jwtService.GenerateToken(user.Email, user.IsAdmin);

        return Ok(new TokenResponseDto
        {
            AccessToken = token,
            TokenType = "bearer",
            User = new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                IsActive = user.IsActive,
                IsAdmin = user.IsAdmin,
                CreatedAt = user.CreatedAt
            }
        });
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserResponseDto>> GetCurrentUser()
    {
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
        if (string.IsNullOrEmpty(email))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(new UserResponseDto
        {
            Id = user.Id,
            Email = user.Email,
            IsActive = user.IsActive,
            IsAdmin = user.IsAdmin,
            CreatedAt = user.CreatedAt
        });
    }
}
