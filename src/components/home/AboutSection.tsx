import { Users, Target, Heart } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Users,
      title: 'Skupnost',
      description: 'Ustvarjamo prostor za povezovanje mladih v Radencih',
    },
    {
      icon: Target,
      title: 'Cilji',
      description: 'Organiziramo dogodke in aktivnosti za mlade',
    },
    {
      icon: Heart,
      title: 'Vrednote',
      description: 'Spoštovanje, sodelovanje in ustvarjalnost',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-12">O društvu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
