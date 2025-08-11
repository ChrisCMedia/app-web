# API Dokumentation

## Übersicht

Die Handwerker WebApp API basiert auf Next.js API Routes und bietet RESTful Endpoints für alle Geschäftsprozesse.

## Basis-URL

```
Development: http://localhost:3000/api
Production: https://ihre-domain.com/api
```

## Authentifizierung

Alle API-Anfragen (außer Auth-Endpoints) erfordern einen gültigen Session-Cookie oder Bearer Token.

```javascript
// Mit Session Cookie (automatisch bei Browser-Requests)
fetch('/api/customers', {
  credentials: 'include'
})

// Mit Bearer Token
fetch('/api/customers', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
```

## Endpoints

### Authentication

#### POST /api/auth/register
Neuen Benutzer registrieren

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "Max Mustermann",
  "company": "Mustermann GmbH",
  "role": "MITARBEITER"
}
```

**Response:**
```json
{
  "user": {
    "id": "clxx...",
    "email": "user@example.com",
    "name": "Max Mustermann",
    "role": "MITARBEITER"
  }
}
```

#### POST /api/auth/callback/credentials
Benutzer anmelden (via NextAuth)

### Customers

#### GET /api/customers
Alle Kunden abrufen

**Query Parameters:**
- `search` (optional): Suchbegriff
- `page` (optional): Seitennummer (default: 1)
- `limit` (optional): Einträge pro Seite (default: 20)

**Response:**
```json
{
  "customers": [
    {
      "id": "clxx...",
      "company": "Beispiel GmbH",
      "name": "Max Mustermann",
      "email": "kunde@beispiel.de",
      "phone": "+49 123 456789",
      "address": "Musterstraße 1, 12345 Musterstadt",
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "pages": 5
}
```

#### POST /api/customers
Neuen Kunden erstellen

**Request Body:**
```json
{
  "company": "Neue Firma GmbH",
  "name": "Kontaktperson",
  "email": "kontakt@firma.de",
  "phone": "+49 123 456789",
  "address": "Firmenstraße 1, 12345 Stadt",
  "taxId": "DE123456789",
  "notes": "Wichtiger Kunde"
}
```

#### GET /api/customers/:id
Einzelnen Kunden abrufen

#### PUT /api/customers/:id
Kunden aktualisieren

#### DELETE /api/customers/:id
Kunden löschen

### Projects

#### GET /api/projects
Alle Projekte abrufen

**Query Parameters:**
- `status` (optional): PLANNING | IN_PROGRESS | COMPLETED | ON_HOLD
- `customerId` (optional): Kunden-ID
- `assigneeId` (optional): Mitarbeiter-ID

**Response:**
```json
{
  "projects": [
    {
      "id": "clxx...",
      "name": "Badezimmer Renovierung",
      "description": "Komplette Badsanierung",
      "customerId": "clxx...",
      "customer": {
        "company": "Kunde GmbH",
        "name": "Max Mustermann"
      },
      "status": "IN_PROGRESS",
      "startDate": "2024-01-15T00:00:00Z",
      "endDate": "2024-02-15T00:00:00Z",
      "progress": 45,
      "budget": 15000,
      "spent": 6750
    }
  ]
}
```

#### POST /api/projects
Neues Projekt erstellen

**Request Body:**
```json
{
  "name": "Neues Projekt",
  "description": "Projektbeschreibung",
  "customerId": "clxx...",
  "status": "PLANNING",
  "startDate": "2024-02-01",
  "endDate": "2024-03-01",
  "budget": 20000
}
```

### Invoices

#### GET /api/invoices
Alle Rechnungen abrufen

**Query Parameters:**
- `status` (optional): DRAFT | SENT | PAID | OVERDUE | CANCELLED
- `customerId` (optional): Kunden-ID
- `from` (optional): Startdatum (ISO 8601)
- `to` (optional): Enddatum (ISO 8601)

#### POST /api/invoices
Neue Rechnung erstellen

**Request Body:**
```json
{
  "customerId": "clxx...",
  "projectId": "clxx...",
  "dueDate": "2024-02-28",
  "items": [
    {
      "description": "Arbeitsleistung",
      "quantity": 10,
      "unit": "Stunden",
      "price": 65,
      "tax": 19
    },
    {
      "description": "Material",
      "quantity": 1,
      "unit": "Pauschale",
      "price": 500,
      "tax": 19
    }
  ],
  "notes": "Zahlbar innerhalb von 14 Tagen"
}
```

#### GET /api/invoices/:id/pdf
Rechnung als PDF generieren

**Response:** PDF-Datei

### Quotes

#### GET /api/quotes
Alle Angebote abrufen

#### POST /api/quotes
Neues Angebot erstellen

**Request Body:**
```json
{
  "customerId": "clxx...",
  "validUntil": "2024-02-28",
  "items": [
    {
      "description": "Position 1",
      "quantity": 1,
      "unit": "Stück",
      "price": 1000,
      "tax": 19
    }
  ],
  "terms": "Angebot gültig bis..."
}
```

### Time Entries

#### GET /api/time-entries
Zeiteinträge abrufen

**Query Parameters:**
- `userId` (optional): Benutzer-ID
- `projectId` (optional): Projekt-ID
- `from` (optional): Startdatum
- `to` (optional): Enddatum

#### POST /api/time-entries
Neuen Zeiteintrag erstellen

**Request Body:**
```json
{
  "projectId": "clxx...",
  "taskId": "clxx...",
  "start": "2024-01-20T08:00:00Z",
  "end": "2024-01-20T16:30:00Z",
  "description": "Fliesenlegen im Bad",
  "break": 30
}
```

#### POST /api/time-entries/start
Zeit-Tracking starten

**Request Body:**
```json
{
  "projectId": "clxx...",
  "taskId": "clxx...",
  "description": "Arbeit beginnen"
}
```

#### POST /api/time-entries/:id/stop
Zeit-Tracking stoppen

### Materials

#### GET /api/materials
Materialliste abrufen

**Query Parameters:**
- `category` (optional): Kategorie
- `search` (optional): Suchbegriff
- `inStock` (optional): Nur vorrätiges Material

#### POST /api/materials
Neues Material anlegen

**Request Body:**
```json
{
  "name": "Zement 25kg",
  "description": "Portland-Zement CEM I 42,5 R",
  "category": "Baumaterial",
  "unit": "Sack",
  "price": 8.50,
  "stock": 50,
  "minStock": 10,
  "supplier": "Baustoffhandel GmbH"
}
```

#### PUT /api/materials/:id/stock
Lagerbestand aktualisieren

**Request Body:**
```json
{
  "quantity": 25,
  "type": "ADD" | "REMOVE" | "SET",
  "reason": "Lieferung erhalten"
}
```

### Appointments

#### GET /api/appointments
Termine abrufen

**Query Parameters:**
- `from` (required): Startdatum
- `to` (required): Enddatum
- `userId` (optional): Benutzer-ID
- `projectId` (optional): Projekt-ID

#### POST /api/appointments
Neuen Termin erstellen

**Request Body:**
```json
{
  "title": "Baustellenbesichtigung",
  "description": "Erstbesichtigung mit Kunde",
  "start": "2024-01-25T10:00:00Z",
  "end": "2024-01-25T11:30:00Z",
  "projectId": "clxx...",
  "assigneeIds": ["user1", "user2"],
  "location": "Musterstraße 1, 12345 Stadt",
  "reminder": 15
}
```

### Reports

#### GET /api/reports/dashboard
Dashboard-Statistiken abrufen

**Response:**
```json
{
  "stats": {
    "totalRevenue": 125000,
    "openInvoices": 15000,
    "activeProjects": 8,
    "completedThisMonth": 3,
    "hoursThisMonth": 320,
    "upcomingAppointments": 12
  },
  "revenueChart": [...],
  "projectStatus": {...}
}
```

#### GET /api/reports/revenue
Umsatzberichte

**Query Parameters:**
- `from` (required): Startdatum
- `to` (required): Enddatum
- `groupBy` (optional): day | week | month | year

#### GET /api/reports/time
Zeitberichte

**Query Parameters:**
- `from` (required): Startdatum
- `to` (required): Enddatum
- `groupBy` (optional): user | project | task

### AI Assistant

#### POST /api/ai/generate
Text mit KI generieren

**Request Body:**
```json
{
  "type": "quote_description" | "invoice_text" | "email" | "report",
  "context": {
    "customer": "Kunde GmbH",
    "project": "Badezimmer Renovierung",
    "details": "..."
  },
  "language": "de"
}
```

**Response:**
```json
{
  "text": "Generierter Text...",
  "suggestions": ["Alternative 1", "Alternative 2"]
}
```

## Error Responses

Alle Fehlerantworten folgen diesem Format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Fehlerbeschreibung",
    "details": {}
  }
}
```

### HTTP Status Codes

- `200 OK`: Erfolgreiche Anfrage
- `201 Created`: Ressource erfolgreich erstellt
- `400 Bad Request`: Ungültige Anfrage
- `401 Unauthorized`: Authentifizierung erforderlich
- `403 Forbidden`: Keine Berechtigung
- `404 Not Found`: Ressource nicht gefunden
- `409 Conflict`: Konflikt (z.B. Duplikat)
- `422 Unprocessable Entity`: Validierungsfehler
- `500 Internal Server Error`: Serverfehler

## Rate Limiting

API-Anfragen sind limitiert:
- **Authentifizierte Nutzer**: 1000 Anfragen pro Stunde
- **Unauthentifizierte Nutzer**: 100 Anfragen pro Stunde

Rate Limit Headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

Endpoints mit vielen Ergebnissen unterstützen Pagination:

```
GET /api/customers?page=2&limit=20
```

Response enthält Pagination-Metadaten:
```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
```

## Webhooks

Webhooks können für folgende Events konfiguriert werden:
- `invoice.created`
- `invoice.paid`
- `project.completed`
- `appointment.reminder`

Webhook-Payload:
```json
{
  "event": "invoice.paid",
  "data": {
    "invoiceId": "clxx...",
    "amount": 1190,
    "paidAt": "2024-01-20T15:30:00Z"
  },
  "timestamp": "2024-01-20T15:30:00Z",
  "signature": "sha256=..."
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { HandwerkerAPI } from '@handwerker/sdk';

const api = new HandwerkerAPI({
  baseURL: 'https://api.ihre-domain.com',
  apiKey: 'YOUR_API_KEY'
});

// Kunden abrufen
const customers = await api.customers.list({
  search: 'GmbH',
  page: 1
});

// Rechnung erstellen
const invoice = await api.invoices.create({
  customerId: 'clxx...',
  items: [...]
});
```

### cURL
```bash
# Kunden abrufen
curl -X GET "https://api.ihre-domain.com/api/customers" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Neues Projekt erstellen
curl -X POST "https://api.ihre-domain.com/api/projects" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Neues Projekt",
    "customerId": "clxx..."
  }'
```