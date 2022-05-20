FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /app

ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install --global dotnet-ef
ENTRYPOINT ["dotnet", "ef", "database", "update"]
