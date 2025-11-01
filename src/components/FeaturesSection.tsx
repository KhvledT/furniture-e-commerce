import { Award, Shield, Truck, HeadphonesIcon } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "High Quality",
      description: "crafted from top materials",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Order over 150 $",
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "24 / 7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <section className="bg-[#2F2F2F] text-white py-10 px-[60px] md:px-[200px]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="text-2xl">{feature.icon}</div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

