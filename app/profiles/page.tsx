import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { filterProfiles, getProfileUrl, getAllProfiles } from '@/lib/profiles';
import { Profile, ProfilesFilter } from '@/lib/types/profiles';
import { ProfilesSearch } from '@/components/ProfilesSearch';
import ProfilesDebug from '@/components/ProfilesDebug';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Fighter & Wrestler Profiles | Who Was Champ',
  description: 'Explore comprehensive profiles of legendary fighters and wrestlers across WWE, UFC, and boxing history.',
};

export const revalidate = 3600; // 1 hour

interface ProfilesPageProps {
  searchParams: {
    search?: string;
    type?: string;
    promotion?: string;
    era?: string;
    division?: string;
  };
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
                href={getProfileUrl(profile.name)}
                className="hover:text-blue-600 transition-colors"
              >
                {profile.name}
              </Link>
            </CardTitle>
            {profile.nickname && (
              <p className="text-sm text-muted-foreground mt-1">
                "{profile.nickname}"
              </p>
            )}
          </div>
          <Badge variant={isWrestler ? "default" : "secondary"} className="ml-2">
            {profile.type === 'wrestler' ? 'Wrestler' : 'Fighter'}
          </Badge>
        </div>
        
        {profile.tagline && (
          <p className="text-sm font-medium text-blue-600 mt-2">
            {profile.tagline}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {profile.promotions.map(promotion => (
              <Badge key={promotion} variant="outline" className="text-xs">
                {promotion}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Active:</span>{' '}
              {profile.activeYears.start}
              {profile.activeYears.end ? `-${profile.activeYears.end}` : '-Present'}
            </div>
            <div>
              <span className="font-medium">From:</span> {profile.hometown}
            </div>
          </div>
          
          {profile.type === 'wrestler' && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">World Titles:</span>{' '}
              {(profile as any).worldTitleReigns || 0}
            </div>
          )}
          
          {profile.type === 'fighter' && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Record:</span>{' '}
              {(profile as any).record ? 
                `${(profile as any).record.wins}-${(profile as any).record.losses}${(profile as any).record.draws ? `-${(profile as any).record.draws}` : ''}` : 
                'N/A'
              }
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

async function ProfilesGrid({ searchParams }: { searchParams: ProfilesPageProps['searchParams'] }) {
  const allProfiles = await getAllProfiles();
  
  // Build filters from search params
  const filters: Partial<ProfilesFilter> = {
    search: searchParams.search || '',
    type: searchParams.type === 'all' ? 'all' : (searchParams.type as 'wrestler' | 'fighter' | undefined),
    promotions: searchParams.promotion && searchParams.promotion !== 'all' ? [searchParams.promotion] : undefined,
    eras: searchParams.era && searchParams.era !== 'all' ? [searchParams.era as any] : undefined,
  };
  
  const filteredProfiles = filterProfiles(allProfiles, filters);
  
  if (filteredProfiles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No profiles found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find more profiles.
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {filteredProfiles.length} Profile{filteredProfiles.length !== 1 ? 's' : ''}
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing {filteredProfiles.length} of {allProfiles.length} total
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </>
  );
}

export default async function ProfilesPage({ searchParams }: ProfilesPageProps) {
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
      
      {/* Debug Info */}
      <ProfilesDebug />
      
      {/* Search and Filters */}
      <div className="mb-8">
        <ProfilesSearch
          initialSearch={searchParams.search}
          initialType={searchParams.type}
          initialPromotion={searchParams.promotion}
          initialEra={searchParams.era}
          initialDivision={searchParams.division}
        />
      </div>
      
      {/* Results */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading profiles...</p>
          </div>
        </div>
      }>
        <ProfilesGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}