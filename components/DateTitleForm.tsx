'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from './ResultCard';
import { findChampionOn } from '@/lib/dateRange';
import { championshipSchema, type Championship } from '@/lib/schema';
import { Search, Calendar } from 'lucide-react';

const WRESTLING_CHAMPIONSHIPS = [
  { id: 'wwe', name: 'WWE Championship', file: 'wwe_championship_reigns.json', active: true },
  { id: 'wwe_world_2023', name: 'World Heavyweight Championship (2023)', file: 'wwe_world_heavyweight_2023_reigns.json', active: true },
  { id: 'wwe_world_2002', name: 'World Heavyweight Championship (2002-2013)', file: 'wwe_world_heavyweight_2002_2013_reigns.json', active: false },
  { id: 'universal', name: 'WWE Universal Championship', file: 'wwe_universal_championship_reigns.json', active: true },
  { id: 'wcw', name: 'WCW World Heavyweight Championship', file: 'wcw_championship_reigns.json', active: true },
  { id: 'nwa', name: 'NWA Worlds Heavyweight Championship', file: 'nwa_worlds_heavyweight_reigns.json', active: true },
  { id: 'iwgp_1987', name: 'IWGP Heavyweight Championship (1987-2021)', file: 'iwgp_heavyweight_1987_2021_reigns.json', active: false },
  { id: 'iwgp_2021', name: 'IWGP World Heavyweight Championship', file: 'iwgp_world_heavyweight_2021_reigns.json', active: true },
  { id: 'ecw_original', name: 'ECW World Heavyweight Championship', file: 'ecw_world_heavyweight_reigns.json', active: false },
  { id: 'wwe_ecw', name: 'WWE ECW Championship', file: 'wwe_ecw_championship_reigns.json', active: false },
  { id: 'intercontinental', name: 'WWE Intercontinental Championship', file: 'intercontinental_reigns.json', active: true, category: 'secondary' },
  { id: 'aew', name: 'AEW World Championship', file: 'aew_championship_reigns.json', active: true },
  { id: 'wwe_womens', name: 'WWE Women\'s Championship', file: 'wwe_womens_championship_reigns.json', active: true, category: 'womens' },
  { id: 'nxt', name: 'NXT Championship', file: 'nxt_championship_reigns.json', active: true, category: 'developmental' },
  { id: 'tna', name: 'TNA/Impact World Championship', file: 'tna_championship_reigns.json', active: true },
];

// Complete UFC championships list - statically defined to work in production builds
const UFC_CHAMPIONSHIPS: { id: string; name: string; file: string; active: boolean; category?: string }[] = [
  { id: 'ufc_mens_heavyweight', name: 'UFC Men\'s Heavyweight Championship', file: 'ufc_mens_heavyweight_reigns.json', active: true },
  { id: 'ufc_mens_light_heavyweight', name: 'UFC Men\'s Light Heavyweight Championship', file: 'ufc_mens_light_heavyweight_reigns.json', active: true },
  { id: 'ufc_mens_middleweight', name: 'UFC Men\'s Middleweight Championship', file: 'ufc_mens_middleweight_reigns.json', active: true },
  { id: 'ufc_mens_welterweight', name: 'UFC Men\'s Welterweight Championship', file: 'ufc_mens_welterweight_reigns.json', active: true },
  { id: 'ufc_mens_lightweight', name: 'UFC Men\'s Lightweight Championship', file: 'ufc_mens_lightweight_reigns.json', active: true },
  { id: 'ufc_mens_featherweight', name: 'UFC Men\'s Featherweight Championship', file: 'ufc_mens_featherweight_reigns.json', active: true },
  { id: 'ufc_mens_bantamweight', name: 'UFC Men\'s Bantamweight Championship', file: 'ufc_mens_bantamweight_reigns.json', active: true },
  { id: 'ufc_mens_flyweight', name: 'UFC Men\'s Flyweight Championship', file: 'ufc_mens_flyweight_reigns.json', active: true },
  { id: 'ufc_womens_featherweight', name: 'UFC Women\'s Featherweight Championship', file: 'ufc_womens_featherweight_reigns.json', active: true },
  { id: 'ufc_womens_bantamweight', name: 'UFC Women\'s Bantamweight Championship', file: 'ufc_womens_bantamweight_reigns.json', active: true },
  { id: 'ufc_womens_flyweight', name: 'UFC Women\'s Flyweight Championship', file: 'ufc_womens_flyweight_reigns.json', active: true },
  { id: 'ufc_womens_strawweight', name: 'UFC Women\'s Strawweight Championship', file: 'ufc_womens_strawweight_reigns.json', active: true },
];

export function DateTitleForm() {
  const searchParams = useSearchParams();
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sport, setSport] = useState<'wrestling' | 'ufc'>('wrestling');

  // Handle URL parameters on component mount
  useEffect(() => {
    const date = searchParams?.get('date');
    const sportParam = searchParams?.get('sport');
    
    if (date) {
      setBirthDate(date);
    }
    
    if (sportParam === 'ufc' || sportParam === 'wrestling') {
      setSport(sportParam);
    }
    
    // Auto-submit if both date and sport are provided
    if (date && sportParam) {
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) {
          form.requestSubmit();
        }
      }, 100);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    setLoading(true);
    setError('');
    const foundResults: any[] = [];
    
    // Build active list based on selected sport
    let activeChampionships = (sport === 'wrestling' ? WRESTLING_CHAMPIONSHIPS : UFC_CHAMPIONSHIPS).filter(c => c.active);
    
    if (sport === 'ufc' && activeChampionships.length === 0) {
      setLoading(false);
      setResults([]);
      setError('UFC titles coming soon — we\'re adding reign data next.');
      return;
    }
    
    try {
      // Load data for all active championships
      const tempResults: any[] = [];
      for (const championship of activeChampionships) {
        try {
          const response = await fetch(`/data/${championship.file}`);
          console.log(`${championship.name} fetch response status:`, response.status);
          
          if (response.ok) {
            const raw = await response.json();
            const data = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.reigns) ? raw.reigns : []);
            if (!Array.isArray(data) || data.length === 0) {
              console.warn(`No reigns array for ${championship.name}`);
              continue;
            }
            console.log(`Loaded ${championship.name} data:`, data.slice(0, 2));
            console.log(`Sample champion object structure:`, Object.keys(data[0] || {}));
            
            // Data is array of reigns
            const champion = findChampionOn(new Date(birthDate), data);
            console.log(`Found ${championship.name} champion:`, champion);
            console.log(`Champion object keys:`, champion ? Object.keys(champion) : 'No champion found');
            
            if (champion && typeof champion.start_date === 'string' && /\d{4}-\d{2}-\d{2}/.test(champion.start_date)) {
             console.log(`Adding ${championship.name} result for champion:`, champion.champion);
              tempResults.push({
                champion,
                championship: championship.name,
                birthDate: new Date(birthDate),
                metadata: { 
                  generated_at: champion.generated_at || new Date().toISOString(),
                  total_reigns: data.length 
                },
              });
           } else {
             console.log(`No champion found for ${championship.name} on date ${birthDate}`);
            }
          }
        } catch (err) {
          console.error(`Failed to load ${championship.name} data:`, err);
        }
      }
      // Deduplicate by (championship, champion name, start_date)
      const seen = new Set<string>();
      for (const r of tempResults) {
        const key = `${r.championship}|${r.champion?.champion}|${r.champion?.start_date}`;
        if (!seen.has(key)) {
          seen.add(key);
          foundResults.push(r);
        }
      }
      console.log(`Total results found:`, foundResults.length);
      console.log(`Results by championship:`, foundResults.map(r => r.championship));
      setResults(foundResults);
      
      if (foundResults.length === 0) {
        setError('No champions found for that date. Some championships may not have existed yet on your birthday.');
      }
    } catch (err) {
      console.error('Error finding champion:', err);
      setError('Data temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="mx-auto max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Find Your Birthday Champions
          </CardTitle>
          <p className="text-gray-600 mt-2">Enter your birth date to discover which wrestling legends held championship gold on your special day</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sport toggle */}
            <div className="flex items-center justify-center gap-2">
              <Label className="text-sm text-gray-700">Sport:</Label>
              <div className="inline-flex rounded-lg border bg-white p-1">
                <button
                  type="button"
                  onClick={() => setSport('wrestling')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    sport === 'wrestling' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={sport === 'wrestling'}
                >
                  Wrestling
                </button>
                <button
                  type="button"
                  onClick={() => setSport('ufc')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    sport === 'ufc' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={sport === 'ufc'}
                >
                  UFC
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth-date" className="text-sm font-medium text-gray-700">
                Your Birth Date
              </Label>
              <Input
                id="birth-date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                min="1963-04-25"
                max={new Date().toISOString().split('T')[0]}
                className="w-full h-12 text-lg"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find My Champions
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Championship Info */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          {sport === 'wrestling' ? (
            <>
              Currently searching: <strong>WWE Championship</strong>, <strong>WWE Universal Championship</strong>, <strong>WWE Intercontinental Championship</strong>, <strong>WWE Women's Championship</strong>, 
              <strong>World Heavyweight Championship</strong>, <strong>WCW World Heavyweight Championship</strong>, <strong>NWA Worlds Heavyweight Championship</strong>,
              <strong>IWGP World Heavyweight Championship</strong>, <strong>ECW World Heavyweight Championship</strong>, <strong>AEW World Championship</strong>, 
              <strong>NXT Championship</strong>, and <strong>TNA/Impact World Championship</strong>
            </>
          ) : (
            <>
              Currently searching: <strong>UFC Men's Heavyweight</strong>, <strong>UFC Men's Light Heavyweight</strong>, <strong>UFC Men's Middleweight</strong>, <strong>UFC Men's Welterweight</strong>,
              <strong>UFC Men's Lightweight</strong>, <strong>UFC Men's Featherweight</strong>, <strong>UFC Men's Bantamweight</strong>, <strong>UFC Men's Flyweight</strong>,
              <strong>UFC Women's Featherweight</strong>, <strong>UFC Women's Bantamweight</strong>, <strong>UFC Women's Flyweight</strong>, and <strong>UFC Women's Strawweight Championships</strong>
            </>
          )}
        </p>
      </div>

     

      {results.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Your Birthday Champions ({results.length} found) 🎉</h2>
            <p className="text-gray-600">Here are the champions who held title gold on your special day.</p>
          </div>
          
          {/* Render results: UFC simple list; Wrestling grouped */}
          {sport === 'ufc' ? (
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold text-center mb-6 text-blue-800">🥋 UFC Titles</h3>
                <div className="space-y-8">
                  {results.map((result, index) => (
                    <ResultCard key={`ufc-${index}`} {...result} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            (() => {
              const categories = {
                mens_world: results.filter(r => 
                  r.championship.includes('WWE Championship') || 
                  r.championship.includes('WWE Universal Championship') ||
                  r.championship.includes('World Heavyweight Championship') ||
                  r.championship.includes('NWA Worlds Heavyweight Championship') ||
                  r.championship.includes('IWGP') ||
                  r.championship.includes('ECW World Heavyweight Championship') ||
                  r.championship.includes('WWE ECW Championship') ||
                  r.championship.includes('WCW World') || 
                  r.championship.includes('AEW World') ||
                  r.championship.includes('TNA/Impact World')
                ),
                womens: results.filter(r => r.championship.includes('Women\'s')),
                developmental: results.filter(r => r.championship.includes('NXT')),
                secondary: results.filter(r => 
                  r.championship.includes('Intercontinental') ||
                  r.championship.includes('United States') ||
                  r.championship.includes('Television')
                )
              };
              
              return (
                <div className="space-y-12">
                  {categories.mens_world.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-center mb-6 text-blue-800">🏆 World Championships</h3>
                      <div className="space-y-8">
                        {categories.mens_world.map((result, index) => (
                          <ResultCard key={`mens-${index}`} {...result} />
                        ))}
                      </div>
                    </div>
                  )}
                  {categories.womens.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-center mb-6 text-pink-800">👑 Women's Championships</h3>
                      <div className="space-y-8">
                        {categories.womens.map((result, index) => (
                          <ResultCard key={`womens-${index}`} {...result} />
                        ))}
                      </div>
                    </div>
                  )}
                  {categories.developmental.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-center mb-6 text-yellow-800">⭐ Developmental Championships</h3>
                      <div className="space-y-8">
                        {categories.developmental.map((result, index) => (
                          <ResultCard key={`dev-${index}`} {...result} />
                        ))}
                      </div>
                    </div>
                  )}
                  {categories.secondary.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-center mb-6 text-green-800">🥈 Secondary Championships</h3>
                      <div className="space-y-8">
                        {categories.secondary.map((result, index) => (
                          <ResultCard key={`secondary-${index}`} {...result} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}
