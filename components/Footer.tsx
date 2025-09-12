import { Separator } from '@/components/ui/separator';
import { Github, Shield, Database, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              About This Site
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Birthday Champion Finder is an independent fan project that helps wrestling 
              enthusiasts discover which champions held titles on their special days. 
              We celebrate wrestling history through interactive exploration.
            </p>
          </div>

          {/* Data */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Sources
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Wikipedia wrestling articles</li>
              <li>• Pro Wrestling Wiki database</li>
              <li>• Cross-referenced with WWE.com</li>
              <li>• Community-verified information</li>
            </ul>
          </div>

          {/* Updates */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Data Updates
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              Our database is automatically refreshed twice weekly using GitHub Actions 
              to ensure the most current championship information.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Legal Disclaimer */}
        <div className="text-center space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-400 mb-2">⚖️ Legal Disclaimer</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              This site is an independent fan project and is <strong>not affiliated with or endorsed by WWE, 
              All Elite Wrestling, or any other wrestling organization</strong>. All wrestling company names, 
              champion names, and related trademarks are the property of their respective owners. 
              This site is for educational and entertainment purposes only.
            </p>
          </div>

          <div className="text-gray-400 text-xs">
            <p>© 2024 Birthday Champion Finder. Built with ❤️ for wrestling fans worldwide.</p>
            <p className="mt-1">
              Data sourced from publicly available wrestling databases and cross-referenced for accuracy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
