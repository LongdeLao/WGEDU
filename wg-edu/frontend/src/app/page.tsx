import { Navbar } from '@/components/Navbar';
import ServerStatusCard from '@/components/ServerStatusCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Stats Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">24,583</dd>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Sessions</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">3,128</dd>
              </div>
            </div>

            {/* Server Status Card - Using client component */}
            <ServerStatusCard />
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Activity #{item}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            User performed an action
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
