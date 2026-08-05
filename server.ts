import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Memory store for reservations
interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  specialRequests?: string;
  createdAt: string;
}

const reservations: Reservation[] = [
  {
    id: "RES-8921",
    name: "Eleanor Vance",
    email: "eleanor@example.com",
    phone: "+1 (555) 234-5678",
    date: "2026-08-10",
    time: "20:00",
    guests: 2,
    seatingArea: "Ocean View Lounge",
    specialRequests: "Anniversary celebration, window table preferred",
    createdAt: new Date().toISOString(),
  },
];

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Abyssal Elegance" });
});

// Reservation Endpoints
app.get("/api/reservations", (_req, res) => {
  res.json({ reservations });
});

app.post("/api/reservations", (req, res) => {
  const {
    name,
    email,
    phone,
    date,
    time,
    guests,
    seatingArea,
    specialRequests,
  } = req.body;
  if (!name || !email || !date || !time || !guests || !seatingArea) {
    res.status(400).json({ error: "Missing required reservation fields" });
    return;
  }
  const newReservation: Reservation = {
    id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    email,
    phone: phone || "",
    date,
    time,
    guests: Number(guests),
    seatingArea,
    specialRequests: specialRequests || "",
    createdAt: new Date().toISOString(),
  };
  reservations.unshift(newReservation);
  res.json({ success: true, reservation: newReservation });
});

// AI Sommelier & Curator Endpoint
app.post("/api/ai-sommelier", async (req, res) => {
  const { preferences, dietaryRestrictions, courseCount, mood } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Elegant fallback curator recommendation
    res.json({
      recommendation: {
        title: "The Oceanic Abyss 5-Course Odyssey",
        sommelierNote:
          "Designed around deep water salinity and mineral complexities, paired with coastal vintages.",
        courses: [
          {
            course: "Course 1: Amuse-Bouche",
            dish: "Oysters in Sea Foam & Finger Lime Caviar",
            pairing: "2021 Chablis Grand Cru 'Les Clos', Domaine Drouhin",
            notes:
              "Vibrant acidity cuts through natural oyster brine with flinty minerality.",
          },
          {
            course: "Course 2: Cold Appetizer",
            dish: "Bluefin Tuna Tartare with Truffle Pearls",
            pairing: "2019 Domaine Leflaive Puligny-Montrachet",
            notes:
              "Creamy textures elevate the tuna fat while subtle oak frames truffle notes.",
          },
          {
            course: "Course 3: Warm Entrée",
            dish: "Butter-Poached Royal King Crab & Saffron Reduction",
            pairing: "2020 Meursault-Charmes, Domaine Roulot",
            notes: "Rich buttery profile harmonizes with saffron aroma.",
          },
          {
            course: "Course 4: Main Course",
            dish: "Seared Chilean Sea Bass with Squid Ink Velouté",
            pairing:
              "2018 Pinot Noir 'Reserve', Domaine Serene, Willamette Valley",
            notes:
              "Silky tannins and red fruit notes contrast dark oceanic umami.",
          },
          {
            course: "Course 5: Dessert",
            dish: "Bioluminescent Yuzu Sphere with Dark Chocolate Pearl",
            pairing: "Château d'Yquem 2015 Sauternes",
            notes:
              "Honeyed citrus complexity pairs with luminous dark chocolate crisp.",
          },
        ],
      },
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are Master Sommelier & Executive Chef of "Abyssal Elegance", a 3-Michelin Star ultra-luxury deep-ocean seafood restaurant.
User Preferences:
- Taste profile/mood: ${mood || "Exquisite oceanic luxury"}
- Guest preferences: ${preferences || "Surprise & delight"}
- Dietary restrictions: ${dietaryRestrictions || "None"}
- Number of courses: ${courseCount || 5}

Return a JSON response with:
1. "title": A luxury name for the customized menu.
2. "sommelierNote": A poetic 2-sentence introduction from the Sommelier.
3. "courses": Array of ${courseCount || 5} course objects, each containing:
   - "course": e.g. "Course 1: Amuse-Bouche"
   - "dish": Gourmet seafood dish name with luxurious ingredients
   - "pairing": Specific vintage wine or artisanal sake pairing
   - "notes": Tasting notes explaining why the wine elevates the dish.

Output valid JSON only with no markdown formatting around it if possible, or clean JSON string.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const cleanJson = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleanJson);
    res.json({ recommendation: parsed });
  } catch (err: any) {
    console.error("AI Sommelier Error:", err);
    res.json({
      recommendation: {
        title: "Abyssal Signature 5-Course Journey",
        sommelierNote:
          "A handcrafted journey through pristine oceanic flavors and rare coastal vintages.",
        courses: [
          {
            course: "Course 1",
            dish: "Kumbaja Oyster & Smoked Sea Foam",
            pairing: "Krug Grande Cuvée 170th Edition Champagne",
            notes:
              "Effervescent brilliance balancing sea salt and rich brioche notes.",
          },
          {
            course: "Course 2",
            dish: "Seared Langoustine with Sea Seaweed Emulsion",
            pairing: "2021 Chablis Premier Cru 'Mont de Milieu'",
            notes: "Crisp salinity enhancing sweet langoustine meat.",
          },
          {
            course: "Course 3",
            dish: "Sous-Vide Octopus with Black Garlic Crisp",
            pairing: "2020 Tenuta delle Terre Nere Etna Bianco",
            notes: "Volcanic minerality grounding deep smoky garlic flavors.",
          },
          {
            course: "Course 4",
            dish: "Wild Turbot in Sea Urchin Butter",
            pairing: "2019 Corton-Charlemagne Grand Cru",
            notes: "Opulent body matching the velvety sea urchin reduction.",
          },
          {
            course: "Course 5",
            dish: "Matcha Sea Salt Soufflé & Caramelized Pearl",
            pairing: "2017 Tokaji Aszú 5 Puttonyos",
            notes:
              "Rich botrytis sweetness balancing bitter ceremonial matcha.",
          },
        ],
      },
    });
  }
});

// Vite Development / Production Middleware Setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Lazy-load Vite only in development so the production bundle does not
    // require the "vite" devDependency at runtime.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `[Abyssal Elegance] Server listening at http://0.0.0.0:${PORT}`,
    );
  });
}

start();
