# Architektur-Entscheidungen

## Übersicht

Dieses Dokument dokumentiert die wichtigsten technischen und architektonischen Entscheidungen für die Handwerker WebApp.

## 1. Frontend Framework: Next.js 14 mit App Router

**Entscheidung:** Next.js 14 mit dem neuen App Router

**Begründung:**
- Server Components für bessere Performance
- Eingebaute Optimierungen (Code Splitting, Image Optimization)
- Server Actions für einfache Form-Handling
- Excellente TypeScript-Unterstützung
- Großes Ökosystem und Community

**Alternativen berücksichtigt:**
- Remix: Weniger ausgereift, kleinere Community
- SvelteKit: Kleineres Ökosystem
- Pure React + Vite: Mehr manuelle Konfiguration nötig

## 2. Styling: Tailwind CSS + shadcn/ui

**Entscheidung:** Tailwind CSS für Utility-First Styling mit shadcn/ui Komponenten

**Begründung:**
- Schnelle Entwicklung ohne Context-Switching
- Konsistentes Design-System
- shadcn/ui bietet produktionsreife Komponenten
- Kleine Bundle-Größe durch Purging
- Exzellente IDE-Unterstützung

**Alternativen berücksichtigt:**
- Material-UI: Zu opinionated, größere Bundle-Größe
- Chakra UI: Runtime-Overhead
- CSS Modules: Mehr Boilerplate

## 3. Datenbank: PostgreSQL mit Prisma ORM

**Entscheidung:** PostgreSQL als Datenbank mit Prisma als ORM

**Begründung:**
- PostgreSQL: Robuste, bewährte relationale Datenbank
- Prisma: Type-safe Database Access
- Automatische Migrationen
- Excellente Developer Experience
- Eingebaute Connection Pooling

**Alternativen berücksichtigt:**
- MySQL: Weniger Features
- MongoDB: Nicht ideal für relationale Daten
- TypeORM: Weniger Type-Safety
- Drizzle: Noch zu neu

## 4. Authentifizierung: NextAuth.js

**Entscheidung:** NextAuth.js für Session-Management

**Begründung:**
- Nahtlose Next.js Integration
- Unterstützt multiple Provider
- Session-basiert (sicherer als JWT für Web-Apps)
- Eingebaute CSRF-Protection
- Flexible und erweiterbar

**Alternativen berücksichtigt:**
- Clerk: Vendor Lock-in, Kosten
- Auth0: Externe Abhängigkeit, Kosten
- Eigene Implementation: Sicherheitsrisiko, Aufwand

## 5. State Management: React Server Components + Zustand

**Entscheidung:** Server Components für Server-State, Zustand für Client-State

**Begründung:**
- Server Components eliminieren viel Client-State
- Zustand für komplexe Client-Interaktionen
- Kleine Bundle-Größe
- Einfache API
- TypeScript Support

**Alternativen berücksichtigt:**
- Redux: Zu viel Boilerplate
- Jotai: Weniger verbreitet
- Valtio: Weniger Community Support

## 6. Form Handling: React Hook Form + Zod

**Entscheidung:** React Hook Form mit Zod Validation

**Begründung:**
- Performance durch uncontrolled Components
- Zod für Type-safe Schema Validation
- Server und Client Validation mit gleichen Schemas
- Kleine Bundle-Größe
- Gute DX

**Alternativen berücksichtigt:**
- Formik: Größere Bundle-Größe, Performance-Issues
- React Final Form: Weniger aktiv entwickelt
- Native HTML Validation: Nicht ausreichend

## 7. API Design: RESTful + Server Actions

**Entscheidung:** REST APIs mit Next.js Route Handlers, Server Actions für Mutations

**Begründung:**
- REST ist weit verbreitet und verstanden
- Server Actions vereinfachen Form-Submissions
- Progressive Enhancement möglich
- Einfaches Caching
- Gute Tooling-Unterstützung

**Alternativen berücksichtigt:**
- GraphQL: Overhead für dieses Projekt
- tRPC: Weniger flexibel für externe Clients
- gRPC: Zu komplex für Web-Frontend

## 8. Testing: Vitest + Playwright

**Entscheidung:** Vitest für Unit Tests, Playwright für E2E Tests

**Begründung:**
- Vitest: Schnell, kompatibel mit Jest
- Playwright: Zuverlässige Cross-Browser Tests
- Beide haben exzellente DX
- Gute TypeScript Integration

**Alternativen berücksichtigt:**
- Jest: Langsamer als Vitest
- Cypress: Weniger Features, nur Chrome-basiert
- Testing Library: Verwendet, aber mit Vitest

## 9. Deployment: Vercel

**Entscheidung:** Vercel als primäre Deployment-Platform

**Begründung:**
- Nahtlose Next.js Integration
- Automatische Previews
- Edge Functions
- Eingebaute Analytics
- Großzügiger Free Tier

**Alternativen berücksichtigt:**
- Netlify: Weniger Next.js Features
- AWS: Komplexere Konfiguration
- Railway: Kleinere Platform
- Self-Hosting: Mehr Wartungsaufwand

## 10. Datei-Storage: Database + S3-Compatible

**Entscheidung:** Kleine Dateien in DB, große in S3-compatible Storage

**Begründung:**
- Flexibilität bei Storage-Provider
- Kosteneffizient
- Skalierbar
- Backup-freundlich

**Alternativen berücksichtigt:**
- Nur Datenbank: Nicht skalierbar
- Nur S3: Komplexität für kleine Dateien
- Cloudinary: Vendor Lock-in

## 11. PDF Generation: React PDF

**Entscheidung:** @react-pdf/renderer für PDF-Generierung

**Begründung:**
- React-Komponenten für PDFs
- Gleiche Technologie wie Frontend
- Flexibel und anpassbar
- Gute Qualität

**Alternativen berücksichtigt:**
- Puppeteer: Zu heavy-weight
- jsPDF: Weniger Features
- External Service: Kosten und Latenz

## 12. Monitoring: OpenTelemetry

**Entscheidung:** OpenTelemetry für Observability

**Begründung:**
- Vendor-neutral
- Umfassende Instrumentierung
- Zukunftssicher
- Große Community

**Alternativen berücksichtigt:**
- Datadog: Kosten
- New Relic: Kosten
- Custom Logging: Nicht ausreichend

## 13. Code Quality: ESLint + Prettier + TypeScript Strict

**Entscheidung:** Strikte Linting und Formatting Rules

**Begründung:**
- Konsistenter Code-Style
- Frühe Fehlererkennung
- Automatisierbar
- Team-Skalierbarkeit

## 14. Monorepo vs. Polyrepo

**Entscheidung:** Monorepo-Ansatz

**Begründung:**
- Einfacheres Dependency Management
- Atomic Changes
- Einfacheres Testing
- Code Sharing

**Alternativen berücksichtigt:**
- Polyrepo: Mehr Overhead
- Nx: Zu komplex für Projektgröße
- Turborepo: Berücksichtigt für Zukunft

## 15. Internationalization

**Entscheidung:** Vorbereitung für i18n, Start mit Deutsch

**Begründung:**
- Zielmarkt primär DACH-Region
- Struktur für spätere Erweiterung
- next-intl als zukünftige Lösung

## Design Principles

### 1. Progressive Enhancement
- Grundfunktionalität ohne JavaScript
- Server Actions für Forms
- Verbesserte UX mit Client-Interaktionen

### 2. Performance First
- Server-Side Rendering wo möglich
- Lazy Loading für große Komponenten
- Optimierte Bilder
- Code Splitting

### 3. Security by Design
- Prinzip der minimalen Rechte
- Input Validation überall
- Sichere Defaults
- Audit Logging

### 4. Developer Experience
- TypeScript für Type Safety
- Automatisiertes Testing
- CI/CD Pipeline
- Gute Dokumentation

### 5. Skalierbarkeit
- Horizontale Skalierung möglich
- Caching-Strategien
- Datenbank-Optimierungen
- Modulare Architektur

## Zukünftige Überlegungen

### Kurzfristig (3-6 Monate)
- Implementierung von Turborepo bei Wachstum
- Redis für Session-Storage
- Webhook-System ausbauen
- Mobile App (React Native)

### Mittelfristig (6-12 Monate)
- Microservices für spezielle Features
- GraphQL-Layer optional
- Advanced Analytics
- Multi-Tenancy

### Langfristig (12+ Monate)
- Eigene Mobile Apps
- Offline-First Capabilities
- Machine Learning Features
- Internationale Expansion

## Entscheidungs-Matrix

| Aspekt | Lösung | Priorität | Risiko | Aufwand |
|--------|--------|-----------|--------|---------|
| Framework | Next.js 14 | Hoch | Niedrig | Mittel |
| Database | PostgreSQL | Hoch | Niedrig | Niedrig |
| Auth | NextAuth | Hoch | Niedrig | Niedrig |
| Styling | Tailwind | Mittel | Niedrig | Niedrig |
| Testing | Vitest/Playwright | Mittel | Niedrig | Mittel |
| Deployment | Vercel | Hoch | Niedrig | Niedrig |
| Monitoring | OpenTelemetry | Niedrig | Mittel | Hoch |

## Lessons Learned

1. **Start simple, iterate fast**: Nicht über-engineeren
2. **Type Safety pays off**: TypeScript von Anfang an
3. **Test critical paths**: 100% Coverage nicht nötig
4. **Document decisions**: Dieses Dokument hilft
5. **Monitor early**: Metriken von Anfang an

---

Dieses Dokument wird kontinuierlich aktualisiert, wenn neue Entscheidungen getroffen werden.