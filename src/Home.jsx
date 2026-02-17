import React from 'react';

export default function Home() {
  const handleNavigation = (hash) => {
    window.location.hash = hash;
  };

  return (
    <div style={{ width: '390px', aspectRatio: '1 / 2.13', transform: 'scale(0.9)' }} className=" flex rounded-3xl shadow-2xl  flex-col items-center justify-center bg-gray-50  gap-8 p-8">

      <h1 className="text-2xl font-bold">Prototypes</h1>
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
  );
}
