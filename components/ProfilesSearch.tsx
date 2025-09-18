'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ProfilesSearchProps {
  initialSearch?: string;
  initialType?: string;
  initialPromotion?: string;
  initialEra?: string;
  initialDivision?: string;
}

export function ProfilesSearch({
  initialSearch = '',
  initialType = 'all',
  initialPromotion = 'all',
  initialEra = 'all',
  initialDivision = 'all'
}: ProfilesSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);
  const [promotion, setPromotion] = useState(initialPromotion);
  const [era, setEra] = useState(initialEra);
  const [division, setDivision] = useState(initialDivision);

  const updateUrl = () => {
    const params = new URLSearchParams();
    
    if (search.trim()) params.set('search', search.trim());
    if (type !== 'all') params.set('type', type);
    if (promotion !== 'all') params.set('promotion', promotion);
    if (era !== 'all') params.set('era', era);
    if (division !== 'all') params.set('division', division);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/profiles?${queryString}` : '/profiles';
    
    router.push(newUrl);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl();
  };

  const clearFilters = () => {
    setSearch('');
    setType('all');
    setPromotion('all');
    setEra('all');
    setDivision('all');
    router.push('/profiles');
  };

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <form onSubmit={handleSearchSubmit}>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search by name, nickname, or promotion..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select value={type} onValueChange={(value) => { setType(value); }}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="wrestler">Wrestlers</SelectItem>
                <SelectItem value="fighter">Fighters</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={promotion} onValueChange={(value) => { setPromotion(value); }}>
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
            
            <Select value={era} onValueChange={(value) => { setEra(value); }}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Era" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Eras</SelectItem>
                <SelectItem value="Golden Era">Golden Era</SelectItem>
                <SelectItem value="Attitude Era">Attitude Era</SelectItem>
                <SelectItem value="Ruthless Aggression">Ruthless Aggression</SelectItem>
                <SelectItem value="PG Era">PG Era</SelectItem>
                <SelectItem value="Modern Era">Modern Era</SelectItem>
              </SelectContent>
            </Select>
            
            {type === 'fighter' && (
              <Select value={division} onValueChange={(value) => { setDivision(value); }}>
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
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={updateUrl}
              className="whitespace-nowrap"
            >
              Apply Filters
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              onClick={clearFilters}
              className="whitespace-nowrap"
            >
              Clear All
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}