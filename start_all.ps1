# start_all.ps1
# This script starts all the backend microservices and the frontend in separate PowerShell windows

Write-Host "Starting Auth Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/auth-service'; mvnw spring-boot:run"

Write-Host "Starting Event Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/event-service'; mvnw spring-boot:run"

Write-Host "Starting Booking Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/booking-service'; mvnw spring-boot:run"

Write-Host "Starting Notification Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/notification-service'; mvnw spring-boot:run"

Write-Host "Starting Payment Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/payment-service'; mvnw spring-boot:run"

Write-Host "Starting Frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'fjp project/Event Ticketing System (1)'; npm run dev"

Write-Host "All services are starting up in separate windows. Ensure your MySQL and MongoDB are also running."
