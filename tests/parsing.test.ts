import { describe, it, expect } from 'vitest';
import { parseChampionshipData, isValidReign, isValidChampionship } from '../lib/schema';
import wweData from '../public/data/wwe_championship_reigns.json';

const validReign = {
  name: 'Test Champion',
  start_date: '2020-01-01',
  end_date: '2020-06-01',
  event: 'Test Event',
  location: 'Test Location'
};

const validMetadata = {
  generated_at: '2024-01-15T10:30:00Z',
  source: 'Test Source',
  revision: '123456',
  total_reigns: 1,
  date_range: {
    earliest: '2020-01-01',
    latest: '2020-06-01'
  }
};

const validChampionshipData = {
  metadata: validMetadata,
  reigns: [validReign]
};

describe('parseChampionshipData', () => {
  it('should parse valid championship data', () => {
    const result = parseChampionshipData(validChampionshipData);
    expect(result).toEqual(validChampionshipData);
  });

  it('should throw error for missing metadata', () => {
    const invalidData = { reigns: [validReign] };
    expect(() => parseChampionshipData(invalidData)).toThrow();
  });

  it('should throw error for missing reigns', () => {
    const invalidData = { metadata: validMetadata };
    expect(() => parseChampionshipData(invalidData)).toThrow();
  });

  it('should throw error for empty reigns array', () => {
    const invalidData = { metadata: validMetadata, reigns: [] };
    expect(() => parseChampionshipData(invalidData)).toThrow();
  });
});

describe('isValidReign', () => {
  it('should validate correct reign object', () => {
    expect(isValidReign(validReign)).toBe(true);
  });

  it('should reject reign without name', () => {
    const invalidReign = { ...validReign };
    delete (invalidReign as any).name;
    expect(isValidReign(invalidReign)).toBe(false);
  });

  it('should reject reign with invalid start date format', () => {
    const invalidReign = { ...validReign, start_date: '2020/01/01' };
    expect(isValidReign(invalidReign)).toBe(false);
  });

  it('should reject reign with invalid end date format', () => {
    const invalidReign = { ...validReign, end_date: '2020/06/01' };
    expect(isValidReign(invalidReign)).toBe(false);
  });

  it('should accept reign with null end date', () => {
    const currentChampionReign = { ...validReign, end_date: null };
    expect(isValidReign(currentChampionReign)).toBe(true);
  });

  it('should reject reign where end date is before start date', () => {
    const invalidReign = { 
      ...validReign, 
      start_date: '2020-06-01', 
      end_date: '2020-01-01' 
    };
    expect(isValidReign(invalidReign)).toBe(false);
  });

  it('should accept optional fields', () => {
    const minimalReign = {
      name: 'Minimal Champion',
      start_date: '2020-01-01',
      end_date: null
    };
    expect(isValidReign(minimalReign)).toBe(true);
  });
});

describe('isValidChampionship', () => {
  it('should validate correct championship object', () => {
    expect(isValidChampionship(validChampionshipData)).toBe(true);
  });

  it('should reject championship with invalid metadata', () => {
    const invalidData = {
      metadata: { ...validMetadata, total_reigns: -1 },
      reigns: [validReign]
    };
    expect(isValidChampionship(invalidData)).toBe(false);
  });

  it('should reject championship with invalid reigns', () => {
    const invalidReign = { name: '', start_date: 'invalid', end_date: null };
    const invalidData = {
      metadata: validMetadata,
      reigns: [invalidReign]
    };
    expect(isValidChampionship(invalidData)).toBe(false);
  });

  it('should handle complex championship data', () => {
    const complexData = {
      metadata: {
        ...validMetadata,
        total_reigns: 3,
        date_range: {
          earliest: '1980-01-01',
          latest: null // Current champion
        }
      },
      reigns: [
        {
          name: 'Champion 1',
          start_date: '1980-01-01',
          end_date: '1985-01-01',
          event: 'Event 1',
          location: 'Location 1',
          notes: 'Some notes'
        },
        {
          name: 'Champion 2',
          start_date: '1985-01-01',
          end_date: '1990-01-01'
        },
        {
          name: 'Current Champion',
          start_date: '1990-01-01',
          end_date: null
        }
      ]
    };
    expect(isValidChampionship(complexData)).toBe(true);
  });
});

describe('Real WWE Championship Data', () => {
  it('should have sufficient championship reigns (no mock data)', () => {
    expect(Array.isArray(wweData)).toBe(true);
    expect(wweData.length).toBeGreaterThan(50);
  });

  it('should include Bruno Sammartino', () => {
    const bruno = wweData.find(r => r.champion === 'Bruno Sammartino');
    expect(bruno).toBeTruthy();
    expect(bruno?.start_date).toBeTruthy();
  });

  it('should have current champion with null end_date', () => {
    const currentChampion = wweData[wweData.length - 1];
    expect(currentChampion.end_date).toBeNull();
  });

  it('should have proper date formats', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    for (const reign of wweData.slice(0, 5)) { // Test first 5 entries
      expect(reign.start_date).toMatch(dateRegex);
      if (reign.end_date) {
        expect(reign.end_date).toMatch(dateRegex);
      }
    }
  });
});