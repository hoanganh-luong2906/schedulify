# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
#EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SchedulifySystem.API/SchedulifySystem.API.csproj", "SchedulifySystem.API/"]
COPY ["SchedulifySystem.Service/SchedulifySystem.Service.csproj", "SchedulifySystem.Service/"]
COPY ["SchedulifySystem.Repository/SchedulifySystem.Repository.csproj", "SchedulifySystem.Repository/"]
RUN dotnet restore "./SchedulifySystem.API/SchedulifySystem.API.csproj"
COPY . .
WORKDIR "/src/SchedulifySystem.API"
RUN dotnet build "./SchedulifySystem.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SchedulifySystem.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# One-off EF Core migration runner (docker compose run --rm migrate); not the default target
FROM build AS migrate
ENV PATH="$PATH:/root/.dotnet/tools"
RUN dotnet tool install --global dotnet-ef --version 8.*
WORKDIR /src
ENTRYPOINT ["dotnet", "ef", "database", "update", "--project", "SchedulifySystem.Repository", "--startup-project", "SchedulifySystem.API"]

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SchedulifySystem.API.dll"]