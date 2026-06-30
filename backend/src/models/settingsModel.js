const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '../data/settings.json');

class CompanySettings {
  static get() {
    try {
      const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Failed to read settings.json:', err.message);
      return null;
    }
  }

  static update(data) {
    try {
      const current = this.get() || {};
      const updated = {
        name: data.name ?? current.name,
        tagline: data.tagline ?? current.tagline,
        description: data.description ?? current.description,
        detailedDescription: data.detailedDescription ?? current.detailedDescription,
        foundedYear: data.foundedYear ? parseInt(data.foundedYear) : current.foundedYear,
        address: data.address ?? current.address,
        email: data.email ?? current.email,
        phone: data.phone ?? current.phone,
        mapHref: data.mapHref ?? current.mapHref,
      };
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf8');
      return updated;
    } catch (err) {
      console.error('Failed to write settings.json:', err.message);
      throw err;
    }
  }
}

module.exports = CompanySettings;
