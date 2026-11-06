import React, { useEffect, useRef } from 'react';
import BEML_LAYOUT from '../assets/BEML LAYOUT.jpg';
import DODDA_KANNELI from '../assets/DODDA KANNELI.jpg';
import AECS_LAYOUT from '../assets/AECS LAYOUT.jpg';
import ELECTRONIC_CITY from '../assets/ELECTRONIC CITY.jpg';
import KANPUR from '../assets/KANPUR.jpg';
import NITROGEN_FITNESS from '../assets/NITROGEN FITNESS .jpg';
import SAI_BABA_TEMPLE_ROAD from '../assets/SAI BABA TEMPLE ROAD.jpg';
import MARATHALI from '../assets/MARATHALI.jpg';
import KASVANAHALLI from '../assets/KASVANAHALLI.jpg';
import KADUGODI from '../assets/KADUGODI.jpg';
import PAI_LAYOUT from '../assets/PAI LAYOUT.jpg';
import BELGAUM from '../assets/BELGAUM.jpg';
import BRANCH_NEW_1 from '../assets/BRANCH-NEW-1.jpg';
import BRANCH_NEW_2 from '../assets/BRANCH-NEW-2.jpg';
import BRANCH_NEW_3 from '../assets/BRANCH-NEW-3.jpg';
import INDIA_MAP from '../assets/INDIA-MAP.jpg';

const BranchesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // ===============================================
  // HOW TO ADD A NEW BRANCH BOX:
  // ===============================================
  // 1. Copy the branch object template below
  // 2. Paste it into the branches array
  // 3. Update the following fields:
  //    - name: Your branch name (e.g., 'New Location')
  //    - address: Full address of the branch
  //    - phone: Contact phone number
  //    - hours: Operating hours
  // 
  // TEMPLATE TO COPY:
  // {
  //   name: 'Your Branch Name',
  //   address: 'Your Full Address Here',
  //   phone: '(555) XXX-XXXX',
  //   hours: 'Mon-Fri: 5AM-11PM, Sat-Sun: 6AM-10PM'
  // },
  // ===============================================

  const branches = [
    {
      name: 'BEML LAYOUT',
      image: BEML_LAYOUT,
      address: 'BEML Layout, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/Woqgeqe'
    },
    {
      name: 'AECS LAYOUT',
      image: AECS_LAYOUT,
      address: 'AECS Layout, Dodda Kanneli, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/7GVQWmY'
    },
    {
      name: 'DODDA KANNELI',
      image: DODDA_KANNELI,
      address: 'Dodda Kanneli, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/JFMmJUQ'
    },
    {
      name: 'NITROGEN FITNESS SGR DENTAL COLLEGE ROAD',
      image: NITROGEN_FITNESS,
      address: 'Nitrogen Fitness, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/4BAJvjc'
    },
    {
      name: 'ELECTRONIC CITY',
      image: ELECTRONIC_CITY,
      address: 'Electronic City, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/T35mVff'
    },
    {
      name: 'KANPUR',
      image: KANPUR,
      address: 'SGR Dental College Road, Kanpur, Uttar Pradesh',
      phone: '8260765803',
      map: 'https://g.co/kgs/efBGYX7'
    },
    {
      name: 'BURNOUT FITNESS SAI BABA TEMPLE ROAD',
      image: SAI_BABA_TEMPLE_ROAD,
      address: 'Sai Baba Temple Road, Munnekolala, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/SMWqKRa'
    },
    {
      name: 'BURNOUT FITNESS MARATHAHALLI',
      image: MARATHALI,
      address: 'Marathahalli, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/moudDEu'
    },
    {
      name: 'BURNOUT FITNESS KASVANAHALLI',
      image: KASVANAHALLI,
      address: 'Kasvanahalli, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/2Ze2awz'
    },
    {
      name: 'BURNOUT FITNESS KADUGODI',
      image: KADUGODI,
      address: 'Kadugodi, Pai Layout, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/R3pTpGu'
    },
    {
      name: 'BURNOUT FITNESS PAI LAYOUT',
      image: PAI_LAYOUT,
      address: 'Kadugodi, Pai Layout, Bangalore, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/Jb1xwnk'
    },
    {
      name: 'BURNOUT FITNESS BELGAUM',
      image: BELGAUM,
      address: 'Burnout Fitness, Belgaum, Karnataka',
      phone: '8260765803',
      map: 'https://g.co/kgs/XZEeQ3m'
    },
    {
      map: 'https://share.google/1P5Nziuu5Xl3yxlkJ'
    },
    {
      map: 'https://maps.app.goo.gl/6bp47uJ497SZZv8t7?g_st=aw'
    },
    {
      map: 'https://www.google.com/maps?q=15.881105422973633,74.53862762451172&z=17&hl=en'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.branch-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="branches" className="section-padding bg-burnout-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 section-reveal">
          <h2 className="text-4xl md:text-6xl font-montserrat font-black text-burnout-white mb-4">
            OUR <span className="text-gradient">BRANCHES</span>
          </h2>
          <p className="text-xl text-burnout-gray-300 font-oswald max-w-3xl mx-auto">
            Find a Burnout Fitness Studio near you and start your transformation today
          </p>
        </div>

        {/* Branches Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="branch-card stagger-item card-3d bg-burnout-black border border-burnout-gray-700 rounded-xl p-6 hover:border-burnout-yellow transition-all duration-300 group"
            >
              {/* Branch Image Placeholder */}
              <div className="w-full h-48 mb-6 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src={branch.image} alt={branch.name} className="object-cover w-full h-full" />
              </div>

              {/* Branch Info */}
              <h3 className="text-2xl font-oswald font-semibold text-burnout-yellow mb-3 group-hover:text-yellow-400 transition-colors">
                {branch.name}
              </h3>
              
              <div className="space-y-3 text-burnout-gray-300 font-source">
                <div className="flex items-start space-x-3">
                  <span className="text-burnout-yellow text-sm">📍</span>
                  <span>{branch.address}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <a href={branch.map} target="_blank" rel="noopener noreferrer" className="w-full inline-block">
                  <button className="w-full bg-burnout-yellow text-burnout-black font-oswald font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors">
                    GET LOCATION
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Locations Across India */}
        <div className="mt-24">
          <div className="text-center mb-10 section-reveal">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black text-burnout-white mb-4">
              BURNOUT <span className="text-gradient">LOCATIONS</span> ACROSS INDIA
            </h2>
            <p className="text-xl text-burnout-gray-300 font-oswald max-w-3xl mx-auto">
              15+ branches and growing — find us near you across the country
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden border border-burnout-gray-700 shadow-2xl">
              <img
                src={INDIA_MAP}
                alt="Burnout Fitness locations across India"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BranchesSection;
