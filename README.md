# Frontend Archetype 🎯

> **Plantilla de configuración agnóstica de framework para proyectos frontend modernos**

Una base de configuración lista para usar que establece estándares de calidad, seguridad y consistencia en proyectos frontend, independientemente del framework elegido (React, Vue, Angular, Svelte, etc.).

## 📋 Tabla de Contenidos

- [¿Qué es este repositorio?](#qué-es-este-repositorio)
- [Características](#características)
- [Herramientas Configuradas](#herramientas-configuradas)
- [Cómo Empezar](#cómo-empezar)
- [Guía de Uso](#guía-de-uso)
- [Comandos Disponibles](#comandos-disponibles)
- [Configuración por Herramienta](#configuración-por-herramienta)
- [Herramientas Externas Recomendadas](#herramientas-externas-recomendadas)
- [Consideraciones Importantes](#consideraciones-importantes)
- [Contribución](#contribución)

---

## ¿Qué es este repositorio?

**Frontend Archetype** es una plantilla de configuración que proporciona:

✅ **Estándares de código** - Linting, formatting y type-checking automáticos  
✅ **Seguridad** - Auditoría de dependencias y validación de supply chain  
✅ **Consistencia** - Configuración compartida entre desarrolladores  
✅ **Agnóstico de framework** - Funciona con cualquier framework frontend moderno  
✅ **Git hooks automáticos** - Validaciones antes de commit y push  
✅ **Configuración lista para usar** - Copia y personaliza según tus necesidades

### Caso de Uso

Cuando inicias un nuevo proyecto frontend, en lugar de configurar manualmente:

- ESLint + TypeScript
- Prettier
- Husky + lint-staged
- EditorConfig
- Auditoría de seguridad
- Validación de commits

...simplemente **clona este repositorio, personaliza los archivos de configuración y comienza a desarrollar**.

---

## Características

| Característica             | Descripción                                                   |
| -------------------------- | ------------------------------------------------------------- |
| **TypeScript**             | Type-checking estricto con configuración moderna (ES2022)     |
| **ESLint**                 | Linting con reglas de TypeScript, imports y mejores prácticas |
| **Prettier**               | Formateo automático de código consistente                     |
| **Husky**                  | Git hooks para validaciones automáticas                       |
| **lint-staged**            | Ejecuta linters solo en archivos modificados                  |
| **commitlint**             | Validación robusta de conventional commits                    |
| **Knip**                   | Detecta código y dependencias no utilizadas                   |
| **EditorConfig**           | Configuración consistente entre editores                      |
| **CSpell**                 | Verificación ortográfica en código                            |
| **Auditoría de seguridad** | Detección de vulnerabilidades (pnpm audit + NPQ)              |

---

## Herramientas Configuradas

### 1. **TypeScript** (`tsconfig.json`)

**Propósito**: Type-checking estricto para detectar errores en tiempo de desarrollo.

**Configuración clave**:

- Target: `ES2022` (soporte moderno)
- Modo estricto habilitado
- Path aliases: `@/*` → `./src/*`
- JSX: `react-jsx` (compatible con React 17+)
- Validaciones: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`

**Uso**: `pnpm type-check`

---

### 2. **ESLint** (`eslint.config.mjs`)

**Propósito**: Detectar problemas de código y aplicar mejores prácticas.

**Configuración clave**:

- Reglas TypeScript estrictas
- Validación de imports (orden alfabética, sin duplicados)
- Prohibición de `any`, `console.log`, `debugger`
- Soporte para archivos de test
- Flat config (ESLint 9+)

**Plugins incluidos**:

- `@typescript-eslint` - Reglas específicas de TypeScript
- `eslint-plugin-import` - Validación de imports

**Uso**:

```bash
pnpm lint          # Verificar
pnpm lint:fix      # Corregir automáticamente
```

---

### 3. **Prettier** (`.prettierrc`)

**Propósito**: Formateo automático y consistente de código.

**Configuración clave**:

- Ancho de línea: 100 caracteres
- Comillas simples
- Indentación: 2 espacios
- Punto y coma: habilitado
- Trailing commas: deshabilitado
- Prose wrap: `always` (excepto en Markdown)

**Uso**:

```bash
pnpm format        # Formatear
pnpm format:check  # Verificar sin cambiar
```

---

### 4. **Husky** (`.husky/`)

**Propósito**: Ejecutar validaciones automáticas en eventos de Git.

**Hooks configurados**:

#### `pre-commit`

Ejecuta `lint-staged` para validar archivos modificados antes de hacer commit.

#### `commit-msg`

Ejecuta `commitlint` para validar que el mensaje de commit siga el formato **Conventional Commits**:

```
tipo(scope): descripción

Tipos válidos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

#### `pre-push`

Ejecuta validaciones completas antes de hacer push:

- Linting
- Formateo
- Type-checking
- Auditoría de seguridad

**Nota**: En producción, agregar `pnpm build` y `pnpm test` según sea necesario.

---

### 5. **commitlint** (`commitlint.config.js`)

**Propósito**: Validación robusta de mensajes de commit siguiendo Conventional Commits.

**Configuración clave**:

- Extiende `@commitlint/config-conventional`
- Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- Máximo 100 caracteres en el header
- Subject no puede estar vacío
- Type en minúsculas obligatorio

**Integración**: Se ejecuta automáticamente en el hook `commit-msg` de Husky.

**Uso manual**:

```bash
echo "feat: mi mensaje" | pnpm commitlint  # Validar mensaje
```

---

### 6. **lint-staged** (`package.json`)

**Propósito**: Ejecutar linters solo en archivos modificados (más rápido).

**Configuración**:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,scss,yaml,yml}": ["prettier --write"],
  "{package.json,pnpm-lock.yaml}": ["pnpm audit --audit-level=high"]
}
```

---

### 7. **Knip** (`knip.config.js`)

**Propósito**: Detectar código no utilizado y dependencias innecesarias.

**Características**:

- Encuentra archivos no importados
- Detecta exports no utilizados
- Identifica dependencias innecesarias
- Reduce bundle size y mejora mantenibilidad

**Uso**: Script utilitario aislado (no integrado en el flujo de desarrollo)

```bash
pnpm knip  # Analizar proyecto
```

**Nota**: Ejecutar periódicamente para mantener el proyecto limpio.

---

### 8. **EditorConfig** (`.editorconfig`)

**Propósito**: Configuración consistente entre diferentes editores (VS Code, WebStorm, etc.).

**Configuración**:

- Charset: UTF-8
- Indentación: 2 espacios
- Fin de línea: LF
- Máximo 100 caracteres por línea
- Trim de espacios en blanco
- Newline final en archivos

---

### 9. **CSpell** (`.cspell.json`)

**Propósito**: Verificación ortográfica en código (detecta typos).

**Configuración**:

- Idiomas: Inglés y Español
- Palabras personalizadas: `archetype`, `pnpm`, `husky`, `commitlint`, `knip`, `npq`, etc.
- Ignora: `node_modules`, `.next`, `dist`, `pnpm-lock.yaml`

**Uso**: Integrado en VS Code (extensión CSpell)

---

### 10. **Node Version Manager** (`.nvmrc`)

**Propósito**: Especificar la versión de Node.js requerida.

**Versión**: `24.3.0` (LTS moderno)

**Uso**: `nvm use` (automático con `.nvmrc`)

---

### 11. **NPM/PNPM Config** (`.npmrc`)

**Propósito**: Configuración del gestor de paquetes.

**Configuración clave**:

- `save-exact=true` - Guardar versiones exactas
- `auto-install-peers=true` - Instalar peer dependencies automáticamente
- `engine-strict=true` - Validar versión de Node
- `ignore-scripts=true` - **Seguridad**: No ejecutar scripts post-install
- `shamefully-hoist=true` - Compatibilidad con PNPM

---

### 12. **Package Manager** (`package.json`)

**Propósito**: Gestión de dependencias y scripts.

**Especificaciones**:

- Node: `>=24.3.0`
- PNPM: `>=9.15.0`
- Type: `module` (ES modules)

**Scripts principales**:

```bash
pnpm prepare       # Instalar Husky
pnpm lint          # Verificar código
pnpm lint:fix      # Corregir automáticamente
pnpm format        # Formatear código
pnpm format:check  # Verificar formateo
pnpm type-check    # Verificar tipos TypeScript
pnpm audit:check   # Verificar vulnerabilidades
pnpm audit:fix     # Corregir vulnerabilidades
pnpm audit:npq     # Auditoría avanzada con NPQ
pnpm security      # Auditoría completa
pnpm validate      # Ejecutar todas las validaciones
pnpm fix           # Corregir todo automáticamente
pnpm prepush       # Validaciones antes de push
pnpm knip          # Detectar código no utilizado
```

---

### 13. **NPQ** (Script utilitario)

**Propósito**: Auditoría avanzada de dependencias con análisis de riesgos.

**Características**:

- Análisis más profundo que `pnpm audit`
- Detección de paquetes abandonados
- Análisis de licencias
- Recomendaciones de alternativas

**Uso**: Script utilitario aislado

```bash
pnpm audit:npq  # Ejecutar auditoría NPQ
```

**Nota**: Puede ser lento y depende de servicios externos. Ejecutar periódicamente.

---

## Cómo Empezar

### Prerrequisitos

- **Node.js**: 24.3.0 o superior
- **PNPM**: 9.15.0 o superior
- **NVM** (recomendado): Para gestionar versiones de Node

### Instalación Rápida

#### 1. Usar NVM para la versión correcta de Node

```bash
nvm install 24.3.0
nvm use
```

#### 2. Instalar PNPM (si no lo tienes)

```bash
npm install -g pnpm@9.15.0
```

#### 3. Clonar o usar este repositorio como base

```bash
# Opción A: Clonar
git clone <url-del-repositorio>
cd frontend-archetype

# Opción B: Usar como template
# En GitHub: "Use this template" → "Create a new repository"
```

#### 4. Instalar dependencias

```bash
pnpm install
```

#### 5. Preparar Husky (instalar git hooks)

```bash
pnpm prepare
```

#### 6. Verificar que todo funciona

```bash
pnpm validate
```

---

## Guía de Uso

### Para Nuevos Proyectos

#### Paso 1: Personalizar `package.json`

```json
{
  "name": "mi-proyecto-frontend",
  "description": "Mi descripción",
  "author": "tu-email@ejemplo.com"
}
```

#### Paso 2: Personalizar `tsconfig.json` (si es necesario)

- Cambiar `jsx` si usas Vue, Svelte, etc.
- Ajustar `lib` según el entorno (DOM, WebWorker, etc.)
- Modificar `paths` según tu estructura de carpetas

#### Paso 3: Personalizar ESLint (si es necesario)

- Agregar plugins específicos del framework (React, Vue, etc.)
- Ajustar reglas según preferencias del equipo

#### Paso 4: Agregar tu código

```bash
# Reemplazar src/index.ts con tu código
rm src/index.ts
# Crear tu estructura de carpetas
mkdir -p src/components src/pages src/utils
```

#### Paso 5: Instalar dependencias del framework

```bash
# Ejemplo con React
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom

# Ejemplo con Vue
pnpm add vue

# Ejemplo con Angular
pnpm add @angular/core @angular/common
```

#### Paso 6: Configurar build tool (Vite, Webpack, etc.)

```bash
# Ejemplo con Vite
pnpm add -D vite @vitejs/plugin-react
```

### Flujo de Desarrollo Diario

```bash
# 1. Crear rama
git checkout -b feat/nueva-funcionalidad

# 2. Desarrollar
# ... escribir código ...

# 3. Verificar antes de commit
pnpm validate

# 4. Hacer commit (Husky validará automáticamente)
git add .
git commit -m "feat(componentes): agregar nuevo componente"

# 5. Hacer push (Husky ejecutará pre-push)
git push origin feat/nueva-funcionalidad
```

### Resolver Problemas Comunes

#### ❌ "Commit rechazado por formato de mensaje"

```bash
# Usar formato correcto: tipo(scope): mensaje
git commit -m "feat(auth): agregar login"
```

#### ❌ "Pre-push falla por vulnerabilidades"

```bash
# Revisar vulnerabilidades
pnpm audit

# Corregir automáticamente
pnpm audit:fix

# O actualizar manualmente
pnpm update
```

#### ❌ "TypeScript falla en pre-push"

```bash
# Verificar errores
pnpm type-check

# Corregir manualmente según los errores
```

---

## Herramientas Externas Recomendadas

Estas herramientas **NO están incluidas** en este archetype porque se recomienda que vivan en tu **pipeline CI/CD** (GitHub Actions, GitLab CI, Jenkins, etc.):

### 1. **Socket CLI** 🔌

**Propósito**: Detectar cambios maliciosos en dependencias (supply chain security).

**Por qué no está aquí**: Requiere configuración específica por organización y debe ejecutarse en CI.

**Recomendación**: Integrar en CI/CD

```yaml
- name: Socket Security Check
  run: npx socket-cli@latest scan
```

**Referencia**: https://socket.dev/

---

### 2. **SonarQube / SonarCloud** 📊

**Propósito**: Análisis de calidad de código, cobertura de tests, deuda técnica.

**Por qué no está aquí**: Requiere servidor externo y configuración específica.

**Recomendación**: Integrar en CI/CD

```yaml
- name: SonarCloud Scan
  uses: SonarSource/sonarcloud-github-action@master
```

**Referencia**: https://www.sonarsource.com/

---

### 3. **Lighthouse CI** 🚀

**Propósito**: Auditoría de performance, accesibilidad, SEO.

**Por qué no está aquí**: Requiere build y servidor, específico de aplicaciones web.

**Recomendación**: Agregar a CI/CD

```bash
npm install -g @lhci/cli@latest
lhci autorun
```

**Referencia**: https://github.com/GoogleChrome/lighthouse-ci

---

### 4. **Dependabot / Renovate** 🤖

**Propósito**: Actualización automática de dependencias.

**Por qué no está aquí**: Se configura a nivel de repositorio, no en el código.

**Recomendación**: Habilitar en GitHub/GitLab

- GitHub: Settings → Code security → Dependabot
- GitLab: Settings → Integrations → Renovate

**Referencia**: https://www.whitesourcesoftware.com/free-developer-tools/renovate/

---

## Consideraciones Importantes

### 🔒 Seguridad

1. **`ignore-scripts=true` en `.npmrc`**
   - Previene ejecución de scripts maliciosos en post-install
   - Requiere instalar dependencias manualmente si es necesario

2. **Auditoría regular**

   ```bash
   pnpm security  # Ejecutar regularmente
   ```

3. **Dependencias de desarrollo**
   - Todas las herramientas están en `devDependencies`
   - No afectan el bundle de producción

### 📦 Tamaño del Bundle

- Este archetype **no agrega dependencias de runtime**
- Solo herramientas de desarrollo
- El bundle final depende de tu framework y código

### 🔄 Compatibilidad

- **Node.js**: 24.3.0+ (LTS moderno)
- **PNPM**: 9.15.0+ (más rápido que npm)
- **Frameworks**: React, Vue, Angular, Svelte, Astro, Next.js, Nuxt, etc.

### 🎯 Personalización

Este archetype es una **base**, no una solución final:

1. **Ajusta las reglas de ESLint** según tu equipo
2. **Modifica Prettier** según preferencias
3. **Agrega plugins** específicos del framework
4. **Extiende TypeScript** según necesidades
5. **Personaliza Husky** con validaciones adicionales

---

## Contribución

Si encuentras mejoras o tienes sugerencias:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feat/mejora`
3. Commit: `git commit -m "feat: descripción"`
4. Push: `git push origin feat/mejora`
5. Abre un Pull Request
