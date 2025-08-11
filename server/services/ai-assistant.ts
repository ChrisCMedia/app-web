interface AIRequest {
  prompt: string
  context?: string
  type: "general" | "calculation" | "material" | "scheduling" | "documentation"
}

interface AIResponse {
  content: string
  confidence: number
  suggestions?: string[]
}

export class AIAssistant {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ""
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    // Mock implementation - in production, this would use OpenAI API
    if (!this.apiKey) {
      return this.getMockResponse(request)
    }

    try {
      const systemPrompt = this.getSystemPrompt(request.type)
      const response = await this.callOpenAI(systemPrompt, request.prompt, request.context)
      
      return {
        content: response.content,
        confidence: response.confidence,
        suggestions: response.suggestions
      }
    } catch (error) {
      console.error("AI Assistant error:", error)
      return this.getMockResponse(request)
    }
  }

  private async callOpenAI(systemPrompt: string, userPrompt: string, context?: string): Promise<AIResponse> {
    // This would be the actual OpenAI API call
    // For now, return mock data
    return this.getMockResponse({ prompt: userPrompt, type: "general" })
  }

  private getMockResponse(request: AIRequest): AIResponse {
    const responses = {
      general: {
        content: "Als Handwerker-KI kann ich Ihnen bei verschiedenen Aufgaben helfen. Was möchten Sie wissen?",
        confidence: 0.8,
        suggestions: [
          "Materialberechnung für Ihr Projekt",
          "Zeitplanung und Terminierung",
          "Kostenvoranschlag erstellen"
        ]
      },
      calculation: {
        content: "Für eine präzise Kalkulation benötige ich mehr Informationen über das Projekt. Welche Art von Arbeiten sollen durchgeführt werden?",
        confidence: 0.75,
        suggestions: [
          "Materialliste erstellen",
          "Arbeitszeit schätzen", 
          "Kosten pro m² berechnen"
        ]
      },
      material: {
        content: "Basierend auf Ihrer Anfrage kann ich Ihnen folgende Materialien empfehlen. Bitte spezifizieren Sie Ihr Projekt genauer.",
        confidence: 0.85,
        suggestions: [
          "Materialbedarf berechnen",
          "Lieferanten vorschlagen",
          "Qualitätsstandards prüfen"
        ]
      },
      scheduling: {
        content: "Für eine optimale Terminplanung berücksichtige ich Ihre verfügbaren Ressourcen und Projektanforderungen.",
        confidence: 0.9,
        suggestions: [
          "Gantt-Chart erstellen",
          "Kritischen Pfad analysieren",
          "Pufferzeiten einplanen"
        ]
      },
      documentation: {
        content: "Ich kann Ihnen bei der Erstellung verschiedener Dokumente helfen. Welche Art von Dokumentation benötigen Sie?",
        confidence: 0.85,
        suggestions: [
          "Arbeitsberichte verfassen",
          "Bautagebuch führen",
          "Abnahmeprotokoll erstellen"
        ]
      }
    }

    return responses[request.type] || responses.general
  }

  private getSystemPrompt(type: string): string {
    const prompts = {
      general: `Du bist eine KI-Assistentin für Handwerksbetriebe. Du hilfst bei der Geschäftsführung, 
                Projektplanung, Kostenberechnung und Organisation. Antworte präzise und praxisorientiert.`,
      
      calculation: `Du bist Experte für Kostenkalkulationen im Handwerk. Berücksichtige Materialkosten, 
                   Arbeitszeit, Gemeinkosten und angemessene Gewinnmargen. Gib detaillierte Aufschlüsselungen.`,
      
      material: `Du bist Spezialist für Baumaterialien und deren Eigenschaften. Berücksichtige Qualität, 
                 Kosten, Verfügbarkeit und Eignung für spezifische Projekte.`,
      
      scheduling: `Du bist Experte für Projektplanung und Terminierung. Berücksichtige Abhängigkeiten, 
                   Ressourcenverfügbarkeit und realistische Zeitschätzungen.`,
      
      documentation: `Du hilfst bei der Erstellung professioneller Geschäftsdokumente. Achte auf 
                     Vollständigkeit, rechtliche Aspekte und branchenübliche Standards.`
    }

    return prompts[type as keyof typeof prompts] || prompts.general
  }

  async calculateMaterialNeeds(projectType: string, area: number, specifications?: string): Promise<AIResponse> {
    const calculations = {
      "bathroom": {
        content: `Für ein ${area}m² Badezimmer empfehle ich folgende Materialien:
        - Fliesen: ${Math.ceil(area * 1.1)}m² (inkl. 10% Verschnitt)
        - Fliesenkleber: ${Math.ceil(area * 0.003)}kg
        - Fugenmasse: ${Math.ceil(area * 0.5)}kg
        - Grundierung: ${Math.ceil(area * 0.15)}L
        - Dichtmasse: 2-3 Kartuschen`,
        confidence: 0.9,
        suggestions: ["Detaillierte Materialliste", "Lieferantenempfehlungen", "Kostenvoranschlag"]
      },
      "kitchen": {
        content: `Für eine ${area}m² Küche sind folgende Materialien typisch:
        - Küchenzeile: Nach Maß (ca. ${area * 800}€/m²)
        - Arbeitsplatte: ${Math.ceil(area * 0.8)}m²
        - Elektroinstallation: Pauschal 1500-2500€
        - Wasseranschlüsse: 2-3 Stück`,
        confidence: 0.85,
        suggestions: ["Küchenplanung", "Geräteauswahl", "Installationsplan"]
      }
    }

    return calculations[projectType as keyof typeof calculations] || {
      content: "Für eine genauere Materialberechnung benötige ich mehr Informationen über das Projekt.",
      confidence: 0.6,
      suggestions: ["Projekttyp spezifizieren", "Pläne hochladen", "Beratungstermin vereinbaren"]
    }
  }

  async generateWorkReport(projectName: string, tasks: string[], hours: number): Promise<string> {
    return `
Arbeitsbericht - ${new Date().toLocaleDateString("de-DE")}

Projekt: ${projectName}
Arbeitszeit: ${hours} Stunden

Durchgeführte Arbeiten:
${tasks.map((task, index) => `${index + 1}. ${task}`).join("\n")}

Status: Arbeiten planmäßig durchgeführt
Besonderheiten: Keine

Nächste Schritte:
- Fortsetzung der Arbeiten nach Plan
- Materiallieferung für nächste Phase koordinieren

Unterschrift: _________________
    `
  }

  async suggestOptimizations(projectData: any): Promise<AIResponse> {
    const optimizations = [
      "Parallele Arbeitsabläufe zur Zeitersparnis",
      "Materialsammelbestellungen für bessere Konditionen",
      "Vorfertigung von Komponenten im Betrieb",
      "Digitale Baufortschrittsdokumentation",
      "Automatisierte Terminplanung basierend auf Ressourcen"
    ]

    return {
      content: `Basierend auf Ihren Projektdaten empfehle ich folgende Optimierungen:

${optimizations.map((opt, index) => `${index + 1}. ${opt}`).join("\n")}

Diese Maßnahmen können Effizienz steigern und Kosten senken.`,
      confidence: 0.8,
      suggestions: [
        "Detailierte Optimierungsanalyse",
        "ROI-Berechnung für Maßnahmen",
        "Umsetzungsplan erstellen"
      ]
    }
  }
}