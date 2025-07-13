# SonarQube Integration

## Configuración completada

✅ **Vitest**: Genera reportes de cobertura en formato LCOV y JUnit  
✅ **Playwright**: Genera reportes JUnit y JSON para tests E2E  
✅ **SonarQube Scanner**: Configurado para analizar el proyecto

## Scripts disponibles

```bash
# Ejecutar tests unitarios con cobertura
pnpm test:coverage

# Ejecutar tests E2E
pnpm test:e2e

# Ejecutar análisis de SonarQube (requiere servidor SonarQube)
pnpm sonar

# Ejecutar todo: tests + análisis SonarQube
pnpm test:sonar
```

## Reportes generados

- **Coverage**: `./coverage/lcov.info` (para SonarQube)
- **Unit Tests**: `./test-results/junit.xml`
- **E2E Tests**: `./.playwright/test-results/junit.xml`

## Variables de entorno para SonarQube

El servidor SonarQube está configurado en `https://sonar.ingenial.co`.

### 🔐 Configuración Segura de Token

**⚠️ NUNCA hardcodees el token en archivos de código**

1. **Para desarrollo local**:

   ```bash
   # Opción 1: Variable de entorno
   export SONAR_TOKEN="your-sonar-token"

   # Opción 2: Archivo .env.local (recomendado)
   echo "SONAR_TOKEN=your-sonar-token" >> .env.local
   ```

2. **Para GitHub Actions**:
   - Configura el secret `SONAR_TOKEN` en GitHub
   - El workflow lo usará automáticamente

3. **Obtener el token**:
   - Visita: https://sonar.ingenial.co/account/security
   - Genera token con permisos "Analyze"
   - Úsalo inmediatamente y guárdalo seguro

## Configuración de CI/CD

Para GitHub Actions, Jenkins, etc., usa:

```bash
pnpm test:coverage
pnpm test:e2e
pnpm sonar
```

Los reportes se generarán automáticamente en los directorios configurados.
