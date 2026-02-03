using Microsoft.EntityFrameworkCore;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<PersonalInfo> PersonalInfos { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Achievement> Achievements { get; set; }
    public DbSet<WorkHistory> WorkHistories { get; set; }
    public DbSet<SocialAccount> SocialAccounts { get; set; }
    public DbSet<Technology> Technologies { get; set; }
    public DbSet<ContactDetails> ContactDetails { get; set; }
    public DbSet<Resume> Resumes { get; set; }
    public DbSet<SvgIcon> SvgIcons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
