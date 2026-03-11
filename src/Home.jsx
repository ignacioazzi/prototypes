import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Prototypes';
  }, []);

  const handleNavigation = (hash) => {
    window.location.hash = hash;
  };

  return (



    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Prototypes</h1>
        <p className="text-gray-600 text-lg mt-2">Room customization with bottom sheet drawer</p>
      </div>

      <div className="relative">
        {/* Phone frame background */}
        <div className="phone-frame-background" />
        <div style={{ width: '390px', aspectRatio: '1 / 2.13', transform: 'scale(0.9)', zIndex: 2 }} className=" flex shadow-2xl  flex-col items-center justify-center bg-gray-50  gap-8 p-8 relative">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => handleNavigation('#full')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg "
            >
              Full Screen
            </button>

            <button
              onClick={() => handleNavigation('#bottom')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg"
            >
              Bottom Sheet
            </button>

            <button
              onClick={() => handleNavigation('#two')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg  "
            >
              Two Steps Selection
            </button>
          </nav>
        </div>
      </div>
    </div >
  );
}
