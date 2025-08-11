# Handwerker WebApp - Komplettes Betriebsmanagement-System

Eine moderne, vollständige Webanwendung für Handwerksbetriebe zur digitalen Verwaltung aller Geschäftsprozesse.

## 🚀 Features

### Hauptmodule
- **Dashboard** - Übersicht mit KPIs und Schnellzugriffen
- **Kundenverwaltung (CRM)** - Vollständige Kundendatenbank mit Historie
- **Projektverwaltung** - Projekte mit Gantt-Diagrammen und Fortschrittsverfolgung
- **Terminkalender** - Ressourcenplanung und Terminverwaltung
- **Aufträge & Aufgaben** - Auftragsmanagement mit Priorisierung

### Workflow-Module
- **Aufmaß** - Digitale Aufmaßerfassung vor Ort
- **Angebotserstellung** - Professionelle Angebote mit Vorlagen
- **Arbeitsberichte** - Digitale Stundenzettel und Tätigkeitsnachweise
- **Bautagebuch** - Fotodokumentation und tägliche Notizen
- **Abnahmeprotokolle** - Digitale Abnahmen mit Unterschriften
- **Rechnungswesen** - Rechnungserstellung und Mahnwesen

### Verwaltung
- **Zeiterfassung** - Start/Stop-Timer mit optionaler GPS-Erfassung
- **Kalkulation** - Vor- und Nachkalkulation von Projekten
- **EFB-Preisblätter** - Standardkonforme PDF-Generierung
- **Material & Leistungen** - Katalogverwaltung mit Preisen
- **Lagerverwaltung** - Bestandsführung und Materialverfolgung
- **Ressourcenplanung** - Personal- und Geräteeinsatzplanung

### Administration
- **Personalverwaltung** - Mitarbeiterdaten und Qualifikationen
- **Baudokumentation** - Zentrale Dokumentenablage
- **Unternehmenssteuerung** - Reports und Analytics
- **Handwerker-KI** - AI-Assistent für Texterstellung
- **Formular-Editor** - Drag & Drop Formularerstellung
- **Datensicherheit** - DSGVO-konforme Datenverwaltung
- **Einstellungen** - Systemkonfiguration

## 🛠️ Technologie-Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Datenbank**: PostgreSQL (Neon) mit Prisma ORM
- **Authentifizierung**: NextAuth.js mit rollenbasierter Zugriffskontrolle
- **Deployment**: Optimiert für Vercel
- **Testing**: Vitest (Unit Tests), Playwright (E2E Tests)

## 📋 Voraussetzungen

- Node.js 18+ 
- pnpm (empfohlen) oder npm
- PostgreSQL Datenbank (z.B. Neon, Supabase, oder lokal)
- Optional: Vercel Account für Deployment

## 🚀 Installation

### 1. Repository klonen
```bash
git clone <repository-url>
cd app-web
```

### 2. Abhängigkeiten installieren
```bash
pnpm install
# oder
npm install
```

### 3. Umgebungsvariablen konfigurieren
```bash
cp .env.example .env
```

Bearbeiten Sie die `.env` Datei und fügen Sie Ihre Datenbank-Credentials und API-Keys ein:

```env
# Datenbank
DATABASE_URL="postgresql://..."
SHADOW_DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
AUTH_TRUST_HOST=true

# Stack Auth (falls verwendet)
NEXT_PUBLIC_STACK_PROJECT_ID="..."
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="..."
STACK_SECRET_SERVER_KEY="..."
STACK_JWKS_URL="..."
```

### 4. Datenbank einrichten
```bash
# Prisma Migrationen ausführen
pnpm prisma migrate dev

# Datenbank mit Beispieldaten füllen (optional)
pnpm prisma db seed
```

### 5. Entwicklungsserver starten
```bash
pnpm dev
# oder
npm run dev
```

Die Anwendung ist nun unter [http://localhost:3000](http://localhost:3000) verfügbar.

## 🧪 Testing

### Unit Tests ausführen
```bash
pnpm test
# oder
npm run test
```

### E2E Tests ausführen
```bash
pnpm test:e2e
# oder
npm run test:e2e
```

### Type Checking
```bash
pnpm type-check
# oder
npm run type-check
```

## 📦 Deployment

### Vercel Deployment (Empfohlen)

1. Pushen Sie Ihren Code zu GitHub/GitLab/Bitbucket
2. Importieren Sie das Projekt in Vercel
3. Konfigurieren Sie die Umgebungsvariablen in Vercel
4. Deploy!

### Manuelles Deployment

```bash
# Production Build erstellen
pnpm build

# Production Server starten
pnpm start
```

## 🔐 Sicherheit

- **Authentifizierung**: Sichere Session-basierte Auth mit NextAuth.js
- **Autorisierung**: Rollenbasierte Zugriffskontrolle (RBAC) mit drei Rollen:
  - ADMIN: Vollzugriff
  - MANAGER: Erweiterte Rechte
  - MITARBEITER: Basis-Rechte
- **Datenschutz**: DSGVO-konforme Implementierung
- **Verschlüsselung**: Alle Passwörter werden mit bcrypt gehasht
- **Validierung**: Eingabevalidierung mit Zod
- **SQL Injection Schutz**: Durch Prisma ORM
- **XSS Schutz**: Durch React's automatisches Escaping
- **CSRF Schutz**: Durch NextAuth.js
- **Rate Limiting**: Implementiert für API-Endpunkte
- **Audit Logging**: Alle kritischen Aktionen werden protokolliert

## 🏗️ Projektstruktur

```
app-web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-bezogene Seiten
│   ├── (dashboard)/       # Dashboard Layout
│   ├── api/               # API Routes
│   └── [modules]/         # Alle Business-Module
├── components/            # React Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   ├── forms/            # Formulare
│   └── layouts/          # Layout-Komponenten
├── lib/                   # Utility-Funktionen
│   ├── auth.ts           # Auth-Konfiguration
│   ├── prisma.ts         # Prisma Client
│   └── utils.ts          # Hilfsfunktionen
├── prisma/               # Datenbank-Schema
├── public/               # Statische Assets
├── server/               # Server-seitige Services
│   ├── services/         # Business Logic
│   └── ai/               # KI-Integration
└── tests/                # Test-Dateien
```

## 📝 Verfügbare Scripts

```json
{
  "dev": "Entwicklungsserver starten",
  "build": "Production Build erstellen",
  "start": "Production Server starten",
  "lint": "Code-Linting ausführen",
  "test": "Unit Tests ausführen",
  "test:e2e": "E2E Tests ausführen",
  "prisma:generate": "Prisma Client generieren",
  "prisma:migrate": "Datenbank-Migrationen ausführen",
  "prisma:seed": "Datenbank mit Beispieldaten füllen",
  "type-check": "TypeScript Type Checking"
}
```

## 🤝 Support

Bei Fragen oder Problemen:
1. Überprüfen Sie die [Dokumentation](./docs/)
2. Schauen Sie in die [API-Dokumentation](./docs/api.md)
3. Erstellen Sie ein Issue im Repository

## 📄 Lizenz

Dieses Projekt ist proprietär und vertraulich. Alle Rechte vorbehalten.

## 🔄 Updates

Die Anwendung wird regelmäßig aktualisiert. Führen Sie folgende Schritte für Updates aus:

```bash
# Code aktualisieren
git pull

# Abhängigkeiten aktualisieren
pnpm install

# Datenbank-Migrationen ausführen
pnpm prisma migrate deploy

# Anwendung neu starten
pnpm build
pnpm start
```

## ⚡ Performance

- **Lighthouse Score**: > 90
- **Ladezeit (LCP)**: < 2.5s
- **Interaktivität (TTI)**: < 3.5s
- **Bundle Splitting**: Automatisch durch Next.js
- **Image Optimization**: next/image für alle Bilder
- **Caching**: Implementiert für statische Assets

## 🌐 Browser-Unterstützung

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Mobile)

---

**Entwickelt mit ❤️ für Handwerksbetriebe**