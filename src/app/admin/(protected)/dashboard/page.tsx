'use client'

import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const stats = [
    {
      name: 'Skupno novic',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: '📰'
    },
    {
      name: 'Aktivni uporabniki',
      value: '143',
      change: '+3%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      name: 'Prihajajoči dogodki',
      value: '5',
      change: '-2%',
      changeType: 'negative',
      icon: '📅'
    },
    {
      name: 'Ogledi strani',
      value: '2.1k',
      change: '+8%',
      changeType: 'positive',
      icon: '👀'
    }
  ]

  const recentActivities = [
    { id: 1, action: 'Dodana nova novica', user: 'Admin', time: '2 min nazaj' },
    { id: 2, action: 'Posodobljen uporabnik', user: 'Admin', time: '1 ura nazaj' },
    { id: 3, action: 'Dodan nov dogodek', user: 'Admin', time: '3 ure nazaj' },
    { id: 4, action: 'Prijava v sistem', user: 'Admin', time: '5 ur nazaj' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Nadzorna plošča
          </h1>
          <p className="text-gray-600 mt-2">
            Pregled aktivnosti in statistika spletne strani
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Zadnja posodobitev: danes ob 14:30
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.name} className="card p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.changeType === 'positive' ? 'text-primary-green' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
            Nedavne aktivnosti
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
                  <span className="text-primary-white text-sm font-medium">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
            Hitri dostopi
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => router.push('/admin/novice/nova')}
              className="p-4 bg-primary-green text-primary-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-left"
            >
              <div className="text-2xl mb-2">📝</div>
              <p className="font-medium">Nova novica</p>
            </button>
            <button 
              onClick={() => router.push('/admin/uporabniki/nov')}
              className="p-4 bg-primary-yellow text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200 text-left"
            >
              <div className="text-2xl mb-2">👥</div>
              <p className="font-medium">Nov uporabnik</p>
            </button>
            <button 
              onClick={() => router.push('/admin/dogodki/nov')}
              className="p-4 bg-blue-500 text-primary-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-left"
            >
              <div className="text-2xl mb-2">📅</div>
              <p className="font-medium">Nov dogodek</p>
            </button>
            <button 
              onClick={() => router.push('/admin/nastavitve')}
              className="p-4 bg-purple-500 text-primary-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-left"
            >
              <div className="text-2xl mb-2">⚙️</div>
              <p className="font-medium">Nastavitve</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}