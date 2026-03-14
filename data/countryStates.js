// State names for major countries (used for simulated map data)
// When the backend doesn't have real file-system data, the frontend
// uses this to generate plausible state-level distributions for the map.

const COUNTRY_STATES = {
    'india': {
        code: 'in',
        states: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
            'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
            'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
            'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
            'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
            'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh',
            'Puducherry', 'Andaman and Nicobar'
        ]
    },
    'united states': {
        code: 'us',
        states: [
            'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
            'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
            'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
            'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
            'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
            'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ]
    },
    'bangladesh': {
        code: 'bd',
        states: [
            'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal',
            'Sylhet', 'Rangpur', 'Mymensingh'
        ]
    },
    'united kingdom': {
        code: 'gb',
        states: [
            'England', 'Scotland', 'Wales', 'Northern Ireland'
        ]
    },
    'canada': {
        code: 'ca',
        states: [
            'Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba',
            'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador',
            'Prince Edward Island', 'Northwest Territories', 'Yukon', 'Nunavut'
        ]
    },
    'australia': {
        code: 'au',
        states: [
            'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
            'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
        ]
    },
    'germany': {
        code: 'de',
        states: [
            'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen',
            'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia',
            'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
        ]
    },
    'france': {
        code: 'fr',
        states: [
            'Île-de-France', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie',
            'Hauts-de-France', 'Grand Est', 'Provence-Alpes-Côte d\'Azur', 'Pays de la Loire',
            'Bretagne', 'Normandie', 'Bourgogne-Franche-Comté', 'Centre-Val de Loire', 'Corse'
        ]
    },
    'brazil': {
        code: 'br',
        states: [
            'São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná',
            'Rio Grande do Sul', 'Pernambuco', 'Ceará', 'Pará', 'Maranhão',
            'Santa Catarina', 'Goiás', 'Amazonas', 'Espírito Santo', 'Paraíba',
            'Mato Grosso', 'Rio Grande do Norte', 'Alagoas', 'Piauí', 'Distrito Federal',
            'Mato Grosso do Sul', 'Sergipe', 'Rondônia', 'Tocantins', 'Acre', 'Amapá', 'Roraima'
        ]
    },
    'japan': {
        code: 'jp',
        states: [
            'Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Saitama', 'Chiba',
            'Hyogo', 'Hokkaido', 'Fukuoka', 'Shizuoka', 'Hiroshima', 'Kyoto',
            'Miyagi', 'Niigata', 'Nagano', 'Gifu', 'Gunma', 'Tochigi',
            'Okayama', 'Mie', 'Kumamoto', 'Kagoshima', 'Okinawa'
        ]
    },
    'mexico': {
        code: 'mx',
        states: [
            'Mexico City', 'State of Mexico', 'Jalisco', 'Nuevo León', 'Veracruz',
            'Puebla', 'Guanajuato', 'Chihuahua', 'Michoacán', 'Baja California',
            'Tamaulipas', 'Sinaloa', 'Coahuila', 'Sonora', 'Guerrero',
            'Oaxaca', 'Chiapas', 'San Luis Potosí', 'Tabasco', 'Yucatán'
        ]
    },
    'south africa': {
        code: 'za',
        states: [
            'Gauteng', 'KwaZulu-Natal', 'Western Cape', 'Eastern Cape', 'Limpopo',
            'Mpumalanga', 'North West', 'Free State', 'Northern Cape'
        ]
    },
    'indonesia': {
        code: 'id',
        states: [
            'Jakarta', 'West Java', 'East Java', 'Central Java', 'North Sumatra',
            'Banten', 'South Sulawesi', 'East Kalimantan', 'Bali', 'South Sumatra',
            'Riau', 'West Sumatra', 'Lampung', 'Yogyakarta'
        ]
    },
    'italy': {
        code: 'it',
        states: [
            'Lombardy', 'Lazio', 'Campania', 'Veneto', 'Sicily',
            'Emilia-Romagna', 'Piedmont', 'Tuscany', 'Puglia', 'Calabria',
            'Sardinia', 'Liguria', 'Marche', 'Friuli Venezia Giulia', 'Abruzzo',
            'Trentino-Alto Adige', 'Umbria', 'Basilicata', 'Molise', 'Aosta Valley'
        ]
    },
    'spain': {
        code: 'es',
        states: [
            'Andalusia', 'Catalonia', 'Madrid', 'Valencia', 'Galicia',
            'Castile and León', 'Basque Country', 'Canary Islands', 'Castilla-La Mancha',
            'Aragón', 'Murcia', 'Extremadura', 'Balearic Islands', 'Asturias',
            'Navarre', 'Cantabria', 'La Rioja'
        ]
    },
    'turkey': {
        code: 'tr',
        states: [
            'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya',
            'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri',
            'Eskişehir', 'Diyarbakır', 'Samsun', 'Trabzon'
        ]
    },
    'pakistan': {
        code: 'pk',
        states: [
            'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan',
            'Islamabad', 'Gilgit-Baltistan', 'Azad Kashmir'
        ]
    },
    'nigeria': {
        code: 'ng',
        states: [
            'Lagos', 'Kano', 'Oyo', 'Rivers', 'Kaduna', 'Ogun', 'Anambra',
            'Borno', 'Delta', 'Imo', 'Enugu', 'Edo', 'Abia', 'Abuja'
        ]
    },
    'egypt': {
        code: 'eg',
        states: [
            'Cairo', 'Alexandria', 'Giza', 'Qalyubia', 'Dakahlia',
            'Sharqia', 'Gharbia', 'Monufia', 'Beheira', 'Kafr el-Sheikh',
            'Faiyum', 'Minya', 'Asyut', 'Sohag', 'Luxor', 'Aswan', 'Red Sea'
        ]
    },
    'thailand': {
        code: 'th',
        states: [
            'Bangkok', 'Chiang Mai', 'Phuket', 'Nonthaburi', 'Chon Buri',
            'Songkhla', 'Nakhon Ratchasima', 'Samut Prakan', 'Pathum Thani',
            'Khon Kaen', 'Udon Thani', 'Surat Thani'
        ]
    },
    'philippines': {
        code: 'ph',
        states: [
            'Metro Manila', 'Cebu', 'Davao', 'Calabarzon', 'Central Luzon',
            'Western Visayas', 'Central Visayas', 'Northern Mindanao',
            'Ilocos Region', 'Cagayan Valley', 'Bicol Region'
        ]
    },
    'malaysia': {
        code: 'my',
        states: [
            'Selangor', 'Johor', 'Sabah', 'Sarawak', 'Perak',
            'Kedah', 'Penang', 'Kelantan', 'Pahang', 'Terengganu',
            'Negeri Sembilan', 'Melaka', 'Kuala Lumpur', 'Putrajaya', 'Labuan'
        ]
    },
    'saudi arabia': {
        code: 'sa',
        states: [
            'Riyadh', 'Makkah', 'Madinah', 'Eastern Province', 'Asir',
            'Tabuk', 'Hail', 'Jazan', 'Najran', 'Al Bahah',
            'Northern Borders', 'Al Jawf', 'Al Qassim'
        ]
    },
    'uae': {
        code: 'ae',
        states: [
            'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah',
            'Fujairah', 'Umm Al Quwain'
        ]
    },
    'united arab emirates': {
        code: 'ae',
        states: [
            'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah',
            'Fujairah', 'Umm Al Quwain'
        ]
    },
    'south korea': {
        code: 'kr',
        states: [
            'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon',
            'Gwangju', 'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon',
            'North Chungcheong', 'South Chungcheong', 'North Jeolla',
            'South Jeolla', 'North Gyeongsang', 'South Gyeongsang', 'Jeju'
        ]
    },
    'nepal': {
        code: 'np',
        states: [
            'Bagmati', 'Gandaki', 'Lumbini', 'Koshi', 'Madhesh',
            'Sudurpashchim', 'Karnali'
        ]
    },
    'sri lanka': {
        code: 'lk',
        states: [
            'Western', 'Central', 'Southern', 'Northern', 'Eastern',
            'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
        ]
    },
    'singapore': {
        code: 'sg',
        states: ['Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region']
    },
    'new zealand': {
        code: 'nz',
        states: [
            'Auckland', 'Wellington', 'Canterbury', 'Waikato', 'Bay of Plenty',
            'Otago', 'Manawatu-Wanganui', 'Hawke\'s Bay', 'Northland',
            'Taranaki', 'Southland', 'Nelson', 'Gisborne'
        ]
    },
    'netherlands': {
        code: 'nl',
        states: [
            'North Holland', 'South Holland', 'North Brabant', 'Gelderland',
            'Utrecht', 'Overijssel', 'Limburg', 'Friesland', 'Groningen',
            'Drenthe', 'Zeeland', 'Flevoland'
        ]
    },
    'sweden': {
        code: 'se',
        states: [
            'Stockholm', 'Västra Götaland', 'Skåne', 'Östergötland',
            'Uppsala', 'Jönköping', 'Halland', 'Örebro', 'Dalarna',
            'Gävleborg', 'Västerbotten', 'Norrbotten'
        ]
    },
    'switzerland': {
        code: 'ch',
        states: [
            'Zürich', 'Bern', 'Vaud', 'Aargau', 'St. Gallen',
            'Lucerne', 'Geneva', 'Ticino', 'Valais', 'Basel-Stadt',
            'Fribourg', 'Solothurn', 'Thurgau', 'Graubünden'
        ]
    },
    'poland': {
        code: 'pl',
        states: [
            'Masovia', 'Silesia', 'Greater Poland', 'Lower Silesia',
            'Łódź', 'Lesser Poland', 'Pomerania', 'Lublin',
            'Subcarpathia', 'Kuyavia-Pomerania', 'Warmia-Masuria',
            'West Pomerania', 'Podlaskie', 'Lubusz', 'Opole', 'Świętokrzyskie'
        ]
    },
    'argentina': {
        code: 'ar',
        states: [
            'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán',
            'Entre Ríos', 'Salta', 'Chaco', 'Misiones', 'Santiago del Estero',
            'San Juan', 'Jujuy', 'Río Negro', 'Neuquén', 'Corrientes'
        ]
    },
    'colombia': {
        code: 'co',
        states: [
            'Bogotá', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Santander',
            'Cundinamarca', 'Bolívar', 'Nariño', 'Tolima', 'Boyacá',
            'Córdoba', 'Magdalena', 'Cesar', 'Meta', 'Huila'
        ]
    },
    'chile': {
        code: 'cl',
        states: [
            'Santiago Metropolitan', 'Valparaíso', 'Biobío', 'Maule', 'Araucanía',
            'O\'Higgins', 'Los Lagos', 'Coquimbo', 'Antofagasta', 'Atacama',
            'Tarapacá', 'Los Ríos', 'Aysén', 'Magallanes'
        ]
    },
    'kenya': {
        code: 'ke',
        states: [
            'Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Kakamega',
            'Bungoma', 'Meru', 'Kilifi', 'Uasin Gishu', 'Machakos',
            'Kisumu', 'Nyandarua', 'Nyeri', 'Murang\'a', 'Kajiado'
        ]
    }
};

/**
 * Get country data (code + states) by matching the location string.
 * Tries to match the location against known country names.
 * @param {string} location - The dataset location string (e.g., "INDIA", "United States", etc.)
 * @returns {{ code: string, states: string[] } | null}
 */
export function getCountryData(location) {
    if (!location) return null;
    const normalized = location.toLowerCase().trim();

    // Direct match
    if (COUNTRY_STATES[normalized]) return COUNTRY_STATES[normalized];

    // Partial match - check if location contains a known country name
    for (const [key, val] of Object.entries(COUNTRY_STATES)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return val;
        }
    }

    return null;
}

/**
 * Generate a simulated state distribution based on totalRecords.
 * Uses a seeded-like approach based on state name length for deterministic results.
 * @param {string[]} states - Array of state names
 * @param {number} totalRecords - Total number of records to distribute
 * @returns {Object} - { stateName: count }
 */
export function generateSimulatedDistribution(states, totalRecords) {
    if (!states || states.length === 0 || !totalRecords) return {};

    const distribution = {};
    let remaining = totalRecords;

    // Create weights based on state index (first states get more weight — simulating population distribution)
    const weights = states.map((state, i) => {
        // Use character codes for variety + index-based weighting
        const charSum = state.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
        return Math.max(1, Math.pow(states.length - i, 1.5) + (charSum % 50));
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    states.forEach((state, i) => {
        const share = Math.round((weights[i] / totalWeight) * totalRecords);
        if (share > 0) {
            distribution[state] = share;
            remaining -= share;
        }
    });

    // Distribute any remainder to the top state
    if (remaining > 0 && states.length > 0) {
        distribution[states[0]] = (distribution[states[0]] || 0) + remaining;
    }

    return distribution;
}

export default COUNTRY_STATES;
