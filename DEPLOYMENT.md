# Vercel Deployment Anleitung

## Schritt 1: Vercel Dashboard öffnen

1. Gehen Sie zu [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Wählen Sie Ihr Projekt "app-web" aus

## Schritt 2: Environment Variables konfigurieren

Gehen Sie zu **Settings → Environment Variables** und fügen Sie folgende Variablen hinzu:

### Erforderliche Variablen:

| Variable | Wert aus .env |
|----------|---------------|
| `DATABASE_URL` | Ihre PostgreSQL URL (mit pooler) |
| `SHADOW_DATABASE_URL` | Ihre PostgreSQL URL (ohne pooler) |
| `NEXTAUTH_URL` | https://ihre-app.vercel.app |
| `NEXTAUTH_SECRET` | Ihr generierter Secret |
| `AUTH_TRUST_HOST` | true |

### Stack Auth Variablen:

| Variable | Wert aus .env |
|----------|---------------|
| `NEXT_PUBLIC_STACK_PROJECT_ID` | Ihre Stack Project ID |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Ihr Stack Public Key |
| `STACK_SECRET_SERVER_KEY` | Ihr Stack Secret Key |
| `STACK_JWKS_URL` | Ihre Stack JWKS URL |

## Schritt 3: Deployment neu starten

Nach dem Hinzufügen aller Variablen:

1. Gehen Sie zu **Deployments**
2. Klicken Sie auf die drei Punkte neben dem letzten Deployment
3. Wählen Sie **Redeploy**
4. Bestätigen Sie mit **Redeploy**

## Alternative: Vercel CLI

Wenn Sie die Vercel CLI verwenden möchten:

```bash
# 1. Alle Environment Variables lokal setzen
vercel env add DATABASE_URL production
# (Fügen Sie den Wert ein und drücken Enter)

# Wiederholen für alle anderen Variablen...

# 2. Deployment erneut ausführen
vercel --prod
```

## Schritt 4: Datenbank initialisieren

Nach erfolgreichem Deployment:

```bash
# Prisma Migrationen auf Production ausführen
npx prisma migrate deploy

# Optional: Seed-Daten hinzufügen
npx prisma db seed
```

## Wichtige URLs

- **Production**: https://app-web.vercel.app (oder Ihre custom domain)
- **Preview**: Bei jedem Git Push wird automatisch eine Preview-URL erstellt
- **Vercel Dashboard**: https://vercel.com/info-ceconnectmeds-projects/app-web

## Troubleshooting

### Fehler: Environment Variables nicht gefunden
→ Stellen Sie sicher, dass alle Variablen in Vercel konfiguriert sind

### Fehler: Database connection failed
→ Überprüfen Sie die DATABASE_URL und stellen Sie sicher, dass SSL aktiviert ist

### Fehler: Build failed
→ Überprüfen Sie die Build-Logs in Vercel Dashboard

## Nächste Schritte

1. Custom Domain konfigurieren (Settings → Domains)
2. Analytics aktivieren (Analytics Tab)
3. Monitoring einrichten (Integrations)
4. Backup-Strategie für Datenbank implementieren