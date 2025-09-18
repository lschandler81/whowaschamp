import { getAllProfiles } from '@/lib/profiles';

export default async function ProfilesDebug() {
  const profiles = await getAllProfiles();
  const wrestlers = profiles.filter(p => p.type === 'wrestler');
  const fighters = profiles.filter(p => p.type === 'fighter');
  
  // Sample recent profiles
  const recentProfiles = profiles.slice(-10);
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <p><strong>Total Profiles:</strong> {profiles.length}</p>
      <p><strong>Wrestlers:</strong> {wrestlers.length}</p>
      <p><strong>Fighters:</strong> {fighters.length}</p>
      
      <div className="mt-4">
        <strong>Last 10 Profiles Added:</strong>
        <ul className="list-disc pl-4 mt-2">
          {recentProfiles.map(profile => (
            <li key={profile.id}>
              {profile.name} ({profile.type})
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4">
        <strong>Data Source:</strong> Check console logs for "Loaded X profiles from..."
      </div>
    </div>
  );
}