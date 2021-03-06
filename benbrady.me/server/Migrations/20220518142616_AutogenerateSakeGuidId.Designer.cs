// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.SakeTracker.Repository;

namespace server.Migrations
{
    [DbContext(typeof(SakeDbContext))]
    [Migration("20220518142616_AutogenerateSakeGuidId")]
    partial class AutogenerateSakeGuidId
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.13");

            modelBuilder.Entity("server.SakeTracker.Models.Sake", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("BensRating")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Cost")
                        .HasColumnType("REAL");

                    b.Property<int>("JasonsRating")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Sakes");
                });
#pragma warning restore 612, 618
        }
    }
}
