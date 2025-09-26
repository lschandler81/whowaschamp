'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import Link from 'next/link';

interface Profile {
  id: string;
  name: string;
  slug: string;
  nickname?: string;
  type: 'wrestler' | 'fighter';
  promotions: string[];
  era?: string;
  divisions?: string[];
  hometown?: string;
  activeYears?: { start: number; end?: number };
  bio?: string;
}

function ProfileCard({ profile }: { profile: Profile }) {
  const isWrestler = profile.type === 'wrestler';
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">
              <Link 
                href={`/profiles/${profile.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {profile.name}
              </Link>
            </CardTitle>
            {profile.nickname && (
              <p className="text-muted-foreground text-sm mt-1">
                "{profile.nickname}"
              </p>
            )}
          </div>
          <Badge variant={isWrestler ? "default" : "secondary"}>
            {isWrestler ? "Wrestler" : "Fighter"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {/* Promotions */}
          <div className="flex flex-wrap gap-1">
            {profile.promotions.slice(0, 3).map(promotion => (
              <Badge key={promotion} variant="outline" className="text-xs">
                {promotion}
              </Badge>
            ))}
            {profile.promotions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.promotions.length - 3}
              </Badge>
            )}
          </div>

          {/* Era/Division */}
          {isWrestler ? (
            profile.era && (
              <div className="text-sm text-muted-foreground">
                Era: {profile.era}
              </div>
            )
          ) : (
            profile.divisions && profile.divisions.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Division: {profile.divisions[0]}
              </div>
            )
          )}

          {/* Active Years */}
          {profile.activeYears && (
            <div className="text-sm text-muted-foreground">
              {profile.activeYears.start} - {profile.activeYears.end || 'Present'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClientProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [promotion, setPromotion] = useState('all');
  const [era, setEra] = useState('all');
  const [division, setDivision] = useState('all');

  // Load profiles
  useEffect(() => {
    async function loadProfiles() {
      try {
        const response = await fetch('/api/profiles');
        if (response.ok) {
          const data = await response.json();
          setProfiles(data);
          setFilteredProfiles(data);
        } else {
          // Fallback to local JSON
          const fallbackResponse = await fetch('/data/profiles.json');
          const data = await fallbackResponse.json();
          setProfiles(data);
          setFilteredProfiles(data);
        }
      } catch (error) {
        console.error('Failed to load profiles:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = profiles;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(searchLower) ||
        profile.nickname?.toLowerCase().includes(searchLower) ||
        profile.promotions.some(p => p.toLowerCase().includes(searchLower))
      );
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter(profile => profile.type === type);
    }

    // Promotion filter
    if (promotion !== 'all') {
      const promLower = promotion.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.promotions.some(p => p.toLowerCase() === promLower)
      );
    }

    // Era filter
    if (era !== 'all') {
      const eraMap: Record<string,string> = {
        'Golden Era': 'Golden',
        'Attitude Era': 'Attitude',
        'Ruthless Aggression': 'Ruthless Aggression',
        'PG Era': 'PG',
        'Modern Era': 'Modern',
        'New Generation': 'New Generation',
      };
      const canonical = eraMap[era] || era;
      filtered = filtered.filter(profile => (profile.era || '').toLowerCase() === canonical.toLowerCase());
    }

    // Division filter
    if (division !== 'all') {
      const divLower = division.toLowerCase();
      filtered = filtered.filter(profile => 
        (profile.divisions || []).some(d => d.toLowerCase() === divLower)
      );
    }

    setFilteredProfiles(filtered);
  }, [profiles, search, type, promotion, era, division]);

  const clearFilters = () => {
    setSearch('');
    setType('all');
    setPromotion('all');
    setEra('all');
    setDivision('all');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Fighter & Wrestler Profiles</h1>
        <p className="text-muted-foreground text-lg">
          Explore the careers and achievements of legendary fighters and wrestlers 
          from WWE, UFC, boxing, and beyond.
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-card rounded-lg border p-6 space-y-4 mb-8">
        <div className="flex gap-2">
          <Input
            placeholder="Search by name, nickname, or promotion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="wrestler">Wrestlers</SelectItem>
              <SelectItem value="fighter">Fighters</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={promotion} onValueChange={setPromotion}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Promotion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Promotions</SelectItem>
              <SelectItem value="WWE">WWE</SelectItem>
              <SelectItem value="UFC">UFC</SelectItem>
              <SelectItem value="WCW">WCW</SelectItem>
              <SelectItem value="AEW">AEW</SelectItem>
              <SelectItem value="ROH">ROH</SelectItem>
              <SelectItem value="TNA">TNA</SelectItem>
              <SelectItem value="PWG">PWG</SelectItem>
              <SelectItem value="NWA">NWA</SelectItem>
              <SelectItem value="AWA">AWA</SelectItem>
              <SelectItem value="NJPW">NJPW</SelectItem>
              <SelectItem value="AJPW">AJPW</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={era} onValueChange={setEra}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Era" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Eras</SelectItem>
              <SelectItem value="New Generation">New Generation</SelectItem>
              <SelectItem value="Golden Era">Golden Era</SelectItem>
              <SelectItem value="Attitude Era">Attitude Era</SelectItem>
              <SelectItem value="Ruthless Aggression">Ruthless Aggression</SelectItem>
              <SelectItem value="PG Era">PG Era</SelectItem>
              <SelectItem value="Modern Era">Modern Era</SelectItem>
            </SelectContent>
          </Select>
          
          {type === 'fighter' && (
            <Select value={division} onValueChange={setDivision}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Divisions</SelectItem>
                <SelectItem value="Heavyweight">Heavyweight</SelectItem>
                <SelectItem value="Light Heavyweight">Light Heavyweight</SelectItem>
                <SelectItem value="Middleweight">Middleweight</SelectItem>
                <SelectItem value="Welterweight">Welterweight</SelectItem>
                <SelectItem value="Lightweight">Lightweight</SelectItem>
                <SelectItem value="Featherweight">Featherweight</SelectItem>
                <SelectItem value="Bantamweight">Bantamweight</SelectItem>
                <SelectItem value="Flyweight">Flyweight</SelectItem>
                <SelectItem value="Women's Bantamweight">Women's Bantamweight</SelectItem>
                <SelectItem value="Women's Featherweight">Women's Featherweight</SelectItem>
                <SelectItem value="Women's Flyweight">Women's Flyweight</SelectItem>
                <SelectItem value="Women's Strawweight">Women's Strawweight</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {filteredProfiles.length} Profile{filteredProfiles.length !== 1 ? 's' : ''}
          </h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredProfiles.length} of {profiles.length} total
          </div>
        </div>
        
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No profiles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more profiles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
