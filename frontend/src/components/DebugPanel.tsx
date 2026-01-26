// Debug content component for modal display
export const DebugContent = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
  
  const debugInfo = {
    'Frontend Environment': {
      'VITE_API_URL (env)': import.meta.env.VITE_API_URL || 'undefined (using default)',
      'API_BASE_URL (computed)': API_BASE_URL,
      'Mode': import.meta.env.MODE,
      'Dev': import.meta.env.DEV.toString(),
      'Prod': import.meta.env.PROD.toString(),
    },
    'Browser Info': {
      'User Agent': navigator.userAgent,
      'Platform': navigator.platform,
      'Language': navigator.language,
      'Online': navigator.onLine.toString(),
    },
    'Current URL': {
      'Origin': window.location.origin,
      'Protocol': window.location.protocol,
      'Host': window.location.host,
      'Port': window.location.port || '(default)',
      'Pathname': window.location.pathname,
    },
  };

  return (
    <div className="space-y-4">
      {Object.entries(debugInfo).map(([section, data]) => (
        <div key={section}>
          <h4 className="font-bold text-gray-700 mb-2 bg-gray-100 px-3 py-2 rounded-lg">
            {section}
          </h4>
          <div className="pl-4 space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex gap-3">
                <span className="text-gray-600 font-medium min-w-[160px]">{key}:</span>
                <span className="text-gray-800 font-mono text-sm break-all flex-1">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4 border-t">
        <h4 className="font-bold text-gray-700 mb-3 bg-gray-100 px-3 py-2 rounded-lg">
          Quick Tests
        </h4>
        <div className="space-y-2 pl-4">
          <button
            onClick={async () => {
              console.log('Testing backend health endpoint...');
              try {
                const response = await fetch(`${API_BASE_URL}/health`);
                const data = await response.json();
                console.log('✅ Health check successful:', data);
                alert('✅ Backend is reachable!\n\n' + JSON.stringify(data, null, 2));
              } catch (error: any) {
                console.error('❌ Health check failed:', error);
                alert('❌ Backend not reachable!\n\n' + error.message);
              }
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Test Backend Connection
          </button>
        </div>
      </div>

      <div className="pt-4 border-t bg-blue-50 rounded-lg p-4">
        <h4 className="font-bold text-gray-700 mb-2">📝 How to View Console Logs</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Open browser DevTools to see detailed logs:</p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li><strong>Chrome/Edge:</strong> Press F12 or Cmd+Option+I (Mac)</li>
            <li><strong>Firefox:</strong> Press F12 or Cmd+Option+K (Mac)</li>
            <li><strong>Safari:</strong> Press Cmd+Option+C</li>
          </ul>
          <p className="mt-2">🔍 Look for grouped logs starting with 🚀, 📤, and 📥</p>
        </div>
      </div>
    </div>
  );
};

