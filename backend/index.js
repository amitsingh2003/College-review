const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Helper function to clean text
const cleanText = (text) => {
  return text
    .replace(/\[\d+\]/g, '') // Remove citation numbers
    .replace(/\n+/g, ' ') // Replace multiple newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
};

// Helper function to extract coordinates
const extractCoordinates = (infobox) => {
  const coords = infobox['Coordinates'] || infobox['Location'] || '';
  const coordMatch = coords.match(/(\d+\.?\d*)°[NS]\s*(\d+\.?\d*)°[EW]/);
  if (coordMatch) {
    return {
      latitude: coordMatch[1],
      longitude: coordMatch[2],
      raw: coords
    };
  }
  return null;
};

// Helper function to extract financial information
const extractFinancialInfo = (infobox, sections) => {
  const financial = {};
  
  // From infobox
  const financialKeys = [
    'Tuition', 'Annual tuition', 'Undergraduate tuition', 'Graduate tuition',
    'Fees', 'Room and board', 'Total cost', 'Endowment', 'Budget', 'Revenue'
  ];
  
  financialKeys.forEach(key => {
    if (infobox[key]) {
      financial[key.toLowerCase().replace(/\s+/g, '_')] = cleanText(infobox[key]);
    }
  });
  
  // From sections
  const financialSection = sections['Finances'] || sections['Tuition and fees'] || 
                          sections['Cost'] || sections['Financial aid'] || '';
  
  if (financialSection) {
    financial.details = cleanText(financialSection);
  }
  
  return Object.keys(financial).length > 0 ? financial : null;
};

// Helper function to extract academic information
const extractAcademicInfo = (infobox, sections) => {
  const academic = {};
  
  // From infobox
  const academicKeys = [
    'Academic staff', 'Faculty', 'Students', 'Undergraduates', 'Postgraduates',
    'Doctoral students', 'Academic affiliations', 'Accreditation', 'Rankings',
    'Schools', 'Colleges', 'Departments', 'Programs'
  ];
  
  academicKeys.forEach(key => {
    if (infobox[key]) {
      academic[key.toLowerCase().replace(/\s+/g, '_')] = cleanText(infobox[key]);
    }
  });
  
  // Extract specific academic sections
  const academicSections = [
    'Academics', 'Schools and colleges', 'Programs', 'Research',
    'Faculty', 'Rankings', 'Accreditation'
  ];
  
  academicSections.forEach(sectionName => {
    const section = sections[sectionName];
    if (section && section.trim()) {
      academic[sectionName.toLowerCase().replace(/\s+/g, '_')] = cleanText(section);
    }
  });
  
  return Object.keys(academic).length > 0 ? academic : null;
};

// Helper function to extract campus information
const extractCampusInfo = (infobox, sections) => {
  const campus = {};
  
  // From infobox
  const campusKeys = [
    'Campus', 'Campus size', 'Location', 'Address', 'City', 'State', 'Country',
    'Facilities', 'Libraries', 'Museums', 'Athletics'
  ];
  
  campusKeys.forEach(key => {
    if (infobox[key]) {
      campus[key.toLowerCase().replace(/\s+/g, '_')] = cleanText(infobox[key]);
    }
  });
  
  // Extract campus-related sections
  const campusSections = [
    'Campus', 'Facilities', 'Libraries', 'Museums', 'Student life',
    'Housing', 'Dining', 'Recreation', 'Athletics', 'Sports'
  ];
  
  campusSections.forEach(sectionName => {
    const section = sections[sectionName];
    if (section && section.trim()) {
      campus[sectionName.toLowerCase().replace(/\s+/g, '_')] = cleanText(section);
    }
  });
  
  return Object.keys(campus).length > 0 ? campus : null;
};

// Main endpoint
app.get("/college", async (req, res) => {
  const collegeName = req.query.name;
  if (!collegeName) {
    return res.status(400).json({ 
      error: "Please provide a college name using ?name=YourCollegeName" 
    });
  }

  try {
    console.log(`🔍 Searching for: ${collegeName}`);
    
    // Step 1: Enhanced search with multiple strategies
    const searchQueries = [
      collegeName,
      `${collegeName} university`,
      `${collegeName} college`,
      `${collegeName} school`
    ];
    
    let searchResults = [];
    for (const query of searchQueries) {
      try {
        const searchRes = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            srsearch: query,
            srlimit: 5,
            format: "json",
          },
          timeout: 10000
        });
        
        if (searchRes.data.query.search.length > 0) {
          searchResults = searchRes.data.query.search;
          break;
        }
      } catch (searchErr) {
        console.warn(`Search failed for "${query}":`, searchErr.message);
        continue;
      }
    }

    if (searchResults.length === 0) {
      return res.status(404).json({ 
        error: "College not found. Try a different name or check spelling." 
      });
    }

    // Find the best match (prioritize exact matches and educational institutions)
    const bestMatch = searchResults.find(result => 
      result.title.toLowerCase().includes('university') || 
      result.title.toLowerCase().includes('college') ||
      result.title.toLowerCase().includes('school') ||
      result.title.toLowerCase() === collegeName.toLowerCase()
    ) || searchResults[0];

    const title = bestMatch.title;
    console.log(`📚 Found: ${title}`);

    // Step 2: Get summary with better error handling
    let summary = '';
    let image = null;
    
    try {
      const summaryRes = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        { timeout: 10000 }
      );
      summary = summaryRes.data.extract || '';
      image = summaryRes.data.thumbnail?.source || 
              summaryRes.data.originalimage?.source || null;
    } catch (summaryErr) {
      console.warn('Summary fetch failed:', summaryErr.message);
    }

    // Step 3: Get full HTML content
    const htmlRes = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`,
      { timeout: 15000 }
    );
    const $ = cheerio.load(htmlRes.data);

    // Step 4: Enhanced infobox extraction
    const infobox = {};
    const infoBoxTable = $(".infobox, .infobox-full");
    
    infoBoxTable.find("tr").each((i, el) => {
      const $row = $(el);
      const label = $row.find("th, .infobox-label").first().text().trim();
      const valueEl = $row.find("td, .infobox-data").first();
      
      if (label && valueEl.length > 0) {
        let value = valueEl.text().trim();
        
        // Also try to get links for certain fields
        const links = [];
        valueEl.find('a').each((i, link) => {
          const href = $(link).attr('href');
          const text = $(link).text().trim();
          if (href && text && href.startsWith('/wiki/')) {
            links.push({
              text: text,
              url: `https://en.wikipedia.org${href}`
            });
          }
        });
        
        infobox[label] = {
          text: cleanText(value),
          links: links.length > 0 ? links : undefined
        };
      }
    });

    // Step 5: Enhanced section extraction
    const sections = {};
    let currentHeading = "";
    let currentLevel = 0;
    
    $("h1, h2, h3, h4, p, ul, ol").each((i, el) => {
      const tag = $(el).get(0).tagName.toLowerCase();
      
      if (tag.match(/^h[1-4]$/)) {
        const level = parseInt(tag.charAt(1));
        currentHeading = $(el).text().replace(/\[edit\]/g, "").trim();
        currentLevel = level;
        
        if (currentHeading && !sections[currentHeading]) {
          sections[currentHeading] = {
            content: "",
            level: level,
            subsections: {}
          };
        }
      } else if (currentHeading && (tag === "p" || tag === "ul" || tag === "ol")) {
        const text = $(el).text().trim();
        if (text) {
          if (typeof sections[currentHeading] === 'string') {
            sections[currentHeading] += text + "\n";
          } else {
            sections[currentHeading].content += text + "\n";
          }
        }
      }
    });

    // Step 6: Extract structured information
    const coordinates = extractCoordinates(
      Object.fromEntries(
        Object.entries(infobox).map(([k, v]) => [k, typeof v === 'object' ? v.text : v])
      )
    );
    
    const flatInfobox = Object.fromEntries(
      Object.entries(infobox).map(([k, v]) => [k, typeof v === 'object' ? v.text : v])
    );
    
    const flatSections = Object.fromEntries(
      Object.entries(sections).map(([k, v]) => [k, typeof v === 'object' ? v.content : v])
    );
    
    const financialInfo = extractFinancialInfo(flatInfobox, flatSections);
    const academicInfo = extractAcademicInfo(flatInfobox, flatSections);
    const campusInfo = extractCampusInfo(flatInfobox, flatSections);

    // Step 7: Get additional images
    const images = [image].filter(Boolean);
    $('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src && src.includes('upload.wikimedia.org') && !images.includes(src)) {
        images.push(src);
      }
    });

    // Step 8: Compile comprehensive response
    const response = {
      title,
      description: summary,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      images: images.slice(0, 5), // Limit to 5 images
      coordinates,
      basic_info: {
        type: infobox['Type']?.text || infobox['School type']?.text || 'Unknown',
        established: infobox['Established']?.text || infobox['Founded']?.text,
        location: infobox['Location']?.text || infobox['City']?.text,
        motto: infobox['Motto']?.text,
        website: infobox['Website']?.text
      },
      infobox: infobox,
      academic_info: academicInfo,
      financial_info: financialInfo,
      campus_info: campusInfo,
      sections: sections,
      metadata: {
        search_results: searchResults.length,
        selected_result: bestMatch.title,
        extraction_timestamp: new Date().toISOString(),
        sections_found: Object.keys(sections).length
      }
    };

    console.log(`✅ Successfully extracted information for ${title}`);
    res.json(response);

  } catch (err) {
    console.error('❌ Error:', err);
    
    // More specific error messages
    if (err.code === 'ENOTFOUND') {
      return res.status(503).json({ 
        error: "Unable to connect to Wikipedia. Please check your internet connection." 
      });
    } else if (err.code === 'ETIMEDOUT') {
      return res.status(504).json({ 
        error: "Request timed out. Wikipedia may be slow. Please try again." 
      });
    } else if (err.response?.status === 404) {
      return res.status(404).json({ 
        error: "College page not found on Wikipedia." 
      });
    } else {
      return res.status(500).json({ 
        error: "Internal server error occurred while fetching college information.",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    service: "College Information API"
  });
});

// List available endpoints
app.get("/", (req, res) => {
  res.json({
    message: "College Information API",
    endpoints: {
      "/college": "GET - Fetch detailed college information (requires ?name=CollegeName)",
      "/health": "GET - Health check"
    },
    usage: "Example: /college?name=Harvard University"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ College Information API running at http://localhost:${PORT}`);
  console.log(`📖 Usage: http://localhost:${PORT}/college?name=YourCollegeName`);
});