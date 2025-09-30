import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProfileBySlug } from '@/lib/profiles';
import { WrestlerProfile, FighterProfile } from '@/lib/types/profiles';
import CareerHighlightsSection from '@/components/CareerHighlights';
import RivalriesSection from '@/components/Rivalries';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Trophy, Target, Users } from 'lucide-react';
export const runtime = 'nodejs';

interface ProfilePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const profile = await getProfileBySlug(params.slug);
  
  if (!profile) {
    return {
      title: 'Profile Not Found | Who Was Champ'
    };
  }
  
  return {
    title: `${profile.name} Profile | Who Was Champ`,
    description: profile.bio || `Complete profile and career statistics for ${profile.name}, ${profile.tagline}`,
  };
}

export const revalidate = 3600; // 1 hour

function WrestlerDetails({ wrestler }: { wrestler: WrestlerProfile }) {
  return (
    <div className="space-y-6">
      {/* Championship Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Championship Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {wrestler.worldTitleReigns || 0}
              </div>
              <div className="text-sm text-muted-foreground">World Title Reigns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {wrestler.combinedDaysAsChampion || 0}
              </div>
              <div className="text-sm text-muted-foreground">Days as Champion</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">
                {wrestler.firstReign ? new Date(wrestler.firstReign).getFullYear() : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">First Reign</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">
                {wrestler.lastReign ? new Date(wrestler.lastReign).getFullYear() : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Last Reign</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wrestling Details */}
      <Card>
        <CardHeader>
          <CardTitle>Wrestling Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Finisher:</span> {wrestler.finisher || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Era:</span> {wrestler.era || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Debut:</span>{' '}
              {wrestler.debut ? new Date(wrestler.debut).toLocaleDateString() : 'N/A'}
            </div>
            <div>
              <span className="font-medium">Height/Weight:</span> {wrestler.height}, {wrestler.weight}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FighterDetails({ fighter }: { fighter: FighterProfile }) {
  return (
    <div className="space-y-6">
      {/* Fight Stats (only if available) */}
      {(fighter.record?.wins !== undefined || fighter.record?.losses !== undefined || fighter.titleReigns) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Fight Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fighter.record?.wins !== undefined && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {fighter.record.wins}
                  </div>
                  <div className="text-sm text-muted-foreground">Wins</div>
                </div>
              )}
              {fighter.record?.losses !== undefined && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {fighter.record.losses}
                  </div>
                  <div className="text-sm text-muted-foreground">Losses</div>
                </div>
              )}
              {fighter.record?.draws !== undefined && fighter.record?.draws > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {fighter.record.draws}
                  </div>
                  <div className="text-sm text-muted-foreground">Draws</div>
                </div>
              )}
              {fighter.titleReigns !== undefined && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {fighter.titleReigns}
                  </div>
                  <div className="text-sm text-muted-foreground">Title Reigns</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fighting Details */}
      <Card>
        <CardHeader>
          <CardTitle>Fighting Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Divisions:</span>{' '}
              {Array.isArray(fighter.divisions) && fighter.divisions.length > 0
                ? fighter.divisions.join(', ')
                : 'N/A'}
            </div>
            <div>
              <span className="font-medium">Stance:</span> {fighter.stance || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Reach:</span> {fighter.reach || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Height/Weight:</span> {fighter.height}, {fighter.weight}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfileBySlug(params.slug);
  
  if (!profile) {
    notFound();
  }
  
  const isWrestler = profile.type === 'wrestler';
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/profiles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profiles
          </Link>
        </Button>
      </div>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
            {profile.nickname && (
              <p className="text-xl text-muted-foreground mb-3">
                "{profile.nickname}"
              </p>
            )}
            {profile.tagline && (
              <p className="text-lg font-medium text-primary mb-4">
                {profile.tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge variant={isWrestler ? "default" : "secondary"} className="text-sm">
                {profile.type === 'wrestler' ? 'Professional Wrestler' : 'MMA Fighter'}
              </Badge>
              {profile.promotions.map((promotion: string) => (
                <Badge key={promotion} variant="outline">
                  {promotion}
                </Badge>
              ))}
            </div>
          </div>
          {/* Inline Quick Info (simpler layout) */}
          <div className="w-full md:w-auto md:min-w-[20rem]">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Active:</span>
                <span>
                  {profile.activeYears.start}
                  {profile.activeYears.end ? `-${profile.activeYears.end}` : '-Present'}
                </span>
              </div>
              {(profile.hometown || profile.nationality) && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">From:</span>
                  <span>{[profile.hometown, profile.nationality].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {profile.debut && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Debut:</span>
                  <span>{new Date(profile.debut).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Biography */}
      {profile.bio && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Type-specific details */}
      {isWrestler ? (
        <WrestlerDetails wrestler={profile as WrestlerProfile} />
      ) : (
        <FighterDetails fighter={profile as FighterProfile} />
      )}
      
      {/* Career Highlights */}
      <CareerHighlightsSection highlights={profile.careerHighlights || []} />
      
      {/* Rivalries */}
      <RivalriesSection rivalries={profile.rivalries || []} />
    </div>
  );
}
