import { useState, useEffect } from 'react';
import { Minus, Plus, Users, Wifi, Wind, Tv, Eye, Coffee, Bed, Bath, Building2, Maximize2, ChevronLeft, BedDouble, X, Wallet } from 'lucide-react';
import IosStatusBar from './IosStatusBar';
import './App.css';

export default function RoomCustomization() {
  useEffect(() => {
    document.title = 'Full Screen';
  }, []);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [confirmedSelections, setConfirmedSelections] = useState({});
  const [currentPage, setCurrentPage] = useState('rooms'); // 'rooms' or 'checkout'
  const [rooms, setRooms] = useState([
    { id: 1, bedType: 'no-preference', mealPlan: 'no-meal' }
  ]);
  const [textContent, setTextContent] = useState("1. Browse available rooms and customize your preferences by selecting 'Select and Customize' to open the bottom sheet.");

  const roomCards = [
    {
      id: 1,
      name: 'Double or Twin Room',
      bedOptions: [
        { text: 'Option 1: 2 single beds', isSingle: true },
        { text: 'Option 2: 1 extra-large double bed', isSingle: false }
      ],
      size: '25m²',
      amenities: [
        { icon: Wifi, text: 'Free WiFi' },
        { icon: Bath, text: 'Bath' },
        { icon: Wind, text: 'Air conditioning' },
      ],
      isRefundable: true,
      cancellation: 'Free cancellation at any time',
      prepayment: 'Pay at the property',
      breakfast: 'Breakfast available at additional cost (€ 19.50)',
      discount: null,
      discountBadges: [],
      originalPrice: null,
      price: 45,
      priceFor: 2,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%236b7280"%3EDouble or Twin Room%3C/text%3E%3C/svg%3E'
    },
    {
      id: 2,
      name: 'Deluxe King Room',
      bedOptions: [
        { text: '1 king-size bed', isSingle: false }
      ],
      size: '28 m²',
      amenities: [
        { icon: Wifi, text: 'Free WiFi' },
        { icon: Bath, text: 'Private bathroom' },
        { icon: Wind, text: 'Air conditioning' },
        { icon: Eye, text: 'Garden view' },
        { icon: Tv, text: 'Flat-screen TV' }
      ],
      isRefundable: false,
      cancellation: null,
      prepayment: null,
      breakfast: 'Breakfast available, pay at the property (€ 12)',
      discount: '15% discount',
      discountBadges: [],
      originalPrice: 152,
      price: 129,
      priceFor: 2,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%233b82f6"%3EDeluxe King%3C/text%3E%3C/svg%3E'
    },
    {
      id: 3,
      name: 'Standard Twin Room',
      bedOptions: [
        { text: '2 single beds', isSingle: true }
      ],
      size: '25 m²',
      amenities: [
        { icon: Wifi, text: 'Free WiFi' },
        { icon: Bath, text: 'Shared bathroom' },
        { icon: Building2, text: 'Street view' },
        { icon: Tv, text: 'TV' }
      ],
      isRefundable: true,
      cancellation: 'Free cancellation before 29 May 2025',
      prepayment: 'No prepayment needed – pay at the property',
      breakfast: 'Breakfast available, pay at the property (€ 12)',
      discount: '20% discount',
      discountBadges: ['20% off'],
      originalPrice: 124,
      price: 99,
      priceFor: 2,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23fef3c7" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23f59e0b"%3EStandard Twin%3C/text%3E%3C/svg%3E'
    }
  ];

  const bedOptions = [
    { value: 'no-preference', label: 'No preference' },
    { value: '1-double', label: '1 double bed' },
    { value: '2-single', label: '2 single beds' },
  ];

  const mealOptions = [
    { value: 'no-meal', label: 'No meal', price: 0 },
    { value: 'breakfast', label: 'Breakfast included', price: 15 },
    { value: 'half-board', label: 'Half board (Breakfast + Dinner)', price: 35 }
  ];

  const handleRoomCountChange = (delta) => {
    const newCount = Math.max(0, Math.min(5, numberOfRooms + delta));
    setNumberOfRooms(newCount);

    if (newCount === 0) {
      setIsBottomSheetOpen(false);
      setRooms([]);
      return;
    }

    if (delta > 0) {
      setRooms([...rooms, {
        id: newCount,
        bedType: 'no-preference',
        mealPlan: 'no-meal'
      }]);
    } else if (delta < 0 && rooms.length > 0) {
      setRooms(rooms.slice(0, -1));
    }
  };

  const updateRoom = (roomId, field, value) => {
    setRooms(rooms.map(room =>
      room.id === roomId ? { ...room, [field]: value } : room
    ));
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedRoomType ? selectedRoomType.price : 0;
    const mealTotal = rooms.reduce((sum, room) => {
      const meal = mealOptions.find(m => m.value === room.mealPlan);
      return sum + (meal ? meal.price : 0);
    }, 0);
    return (basePrice * numberOfRooms) + mealTotal;
  };

  const calculateGrandTotal = () => {
    let total = 0;
    Object.keys(confirmedSelections).forEach(roomTypeId => {
      const roomType = roomCards.find(r => r.id === parseInt(roomTypeId));
      if (roomType) {
        total += roomType.price * confirmedSelections[roomTypeId];
      }
    });
    return total;
  };

  const getTotalRoomsSelected = () => {
    return Object.values(confirmedSelections).reduce((sum, count) => sum + count, 0);
  };

  useEffect(() => {
    if (currentPage === 'checkout') {
      setTextContent('2. Review your booking summary before completing your reservation.');
    } else {
      setTextContent("1. Browse available rooms and customize your preferences by selecting 'Select and Customize' to open the bottom sheet.");
    }
  }, [currentPage]);

  const handleSelectAndCustomize = (roomType) => {
    setSelectedRoomType(roomType);
    setIsBottomSheetOpen(true);

    // Load existing selection if available
    const existingRoomCount = confirmedSelections[roomType.id] || 1;
    setNumberOfRooms(existingRoomCount);

    // Initialize rooms array based on existing or new selection
    const initialRooms = [];
    for (let i = 1; i <= existingRoomCount; i++) {
      initialRooms.push({ id: i, bedType: 'no-preference', mealPlan: 'no-meal' });
    }
    setRooms(initialRooms);
  };

  const handleConfirm = () => {
    setIsBottomSheetOpen(false);
    setConfirmedSelections({
      ...confirmedSelections,
      [selectedRoomType.id]: numberOfRooms
    });
    console.log('Room preferences:', rooms);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Full Screen</h1>
        <p className="text-gray-600 text-lg mt-2">Single page room selection flow</p>
      </div>
      <div className="flex items-start gap-12 max-w-7xl mx-auto">


        <div className="relative">
          {/* Phone frame background */}
          <div
            className="phone-frame-background"
          />
          <div style={{ width: '390px', aspectRatio: '1 / 2.13', transform: 'scale(0.9)', zIndex: 2, overflow: 'hidden' }}
            className="bg-gray-50 shadow-2xl flex flex-col mx-auto relative overflow-hidden">
            {/* iOS Header */}
            <div className="header" style={{ height: 'auto' }}>
              <IosStatusBar />
              <div className="flex items-center px-3 py-2 relative">
                {currentPage === 'checkout' ? (
                  <button onClick={() => setCurrentPage('rooms')}><ChevronLeft className="w-6 h-6" /></button>
                ) : (
                  <button onClick={() => window.location.hash = '#/'}><ChevronLeft className="w-6 h-6" /></button>
                )}
                <h1 className="text-lg font-bold absolute left-0 right-0 text-center pointer-events-none">
                  {currentPage === 'checkout' ? 'Checkout' : 'Choose your Stay'}
                </h1>
              </div>
            </div>

            {/* Room Cards */}
            {currentPage === 'rooms' && (
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {roomCards.map((roomType) => (
                  <div key={roomType.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-3 text-blue-600">{roomType.name}</h2>

                      {/* Price for */}
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-gray-700" />
                        <span className="text-base text-gray-700">Price for {roomType.priceFor} {roomType.priceFor === 1 ? 'adult' : 'adults'}</span>
                      </div>

                      {/* Bed options */}
                      <div className="mb-3">
                        {roomType.bedOptions.map((option, idx) => {
                          const BedIcon = option.isSingle ? Bed : BedDouble;
                          return (
                            <div key={idx} className="flex items-start gap-2 mb-1">
                              <BedIcon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                              <span className="text-base text-gray-700">{option.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Size */}
                      <div className="flex items-center gap-2 mb-3">
                        <Maximize2 className="w-5 h-5 text-gray-700" />
                        <span className="text-base text-gray-700">Size: {roomType.size}</span>
                      </div>

                      {/* Amenities - inline style */}
                      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
                        {roomType.amenities.map((amenity, idx) => {
                          const IconComponent = amenity.icon;
                          return (
                            <div key={idx} className="inline-flex items-center gap-1.5">
                              <IconComponent className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{amenity.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Benefits */}
                      <div className="mb-3 space-y-2">
                        {roomType.isRefundable ? (
                          <>
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.576l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                              <span className="text-base text-green-700 font-semibold">{roomType.cancellation}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.576l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                              <span className="text-base text-green-700 font-semibold">{roomType.prepayment}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start gap-2">
                              <X className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                              <span className="text-base text-gray-900 font-semibold">Non-refundable</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Wallet className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                              <span className="text-base text-gray-900">Pay online</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-start gap-2">
                          <Coffee className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-base text-gray-700">{roomType.breakfast}</span>
                        </div>
                      </div>

                      {/* Discount */}
                      {roomType.discount && (
                        <div className="mb-3">
                          <div className="flex items-start gap-2 mb-1">
                            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.576l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            </div>
                            <div>
                              <span className="text-base text-gray-900 block leading-tight">{roomType.discount}</span>
                              <p className="text-sm text-gray-600 leading-tight">Applied to the price before taxes and charges</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Discount badges */}
                      {roomType.discountBadges.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {roomType.discountBadges.map((badge, idx) => (
                            <span key={idx} className={`px-2 py-0.5 rounded text-sm font-semibold text-white ${badge === 'Non-refundable' ? 'bg-gray-700' :
                              badge.includes('off') ? 'bg-green-600' : 'bg-blue-700'
                              }`}>
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price */}
                      <div className="mb-4">
                        <p className="text-base text-gray-700 mb-1">Price for 1 night</p>
                        <div className="flex items-baseline gap-2">
                          {roomType.originalPrice && (
                            <span className="text-xl text-red-600 line-through">€ {roomType.originalPrice}</span>
                          )}
                          <span className="text-2xl font-bold text-gray-900">€ {roomType.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Includes taxes and charges</p>
                      </div>

                      <button
                        onClick={() => handleSelectAndCustomize(roomType)}
                        className={`w-full py-3 rounded-lg font-medium transition-colors ${confirmedSelections[roomType.id] > 0
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                          }`}
                      >
                        {confirmedSelections[roomType.id] > 0
                          ? `${confirmedSelections[roomType.id]} ${confirmedSelections[roomType.id] === 1 ? 'room' : 'rooms'} selected`
                          : 'Select and Customize'
                        }
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Fixed Bottom Action Bar - Only show when rooms are selected */}
            {getTotalRoomsSelected() > 0 && currentPage === 'rooms' && (
              <div className="fixed bottom-0 w-[390px] left-0 right-0 flex justify-center">
                <div className="w-[390px] bg-white border-t border-gray-200 px-5 py-4 shadow-lg z-30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base text-gray-600 font-semibold">
                      {getTotalRoomsSelected()} {getTotalRoomsSelected() === 1 ? 'room' : 'rooms'} · <span className="text-gray-900">€ {calculateGrandTotal()}</span>
                    </div>
                    <button
                      onClick={() => setCurrentPage('checkout')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Checkout Page */}
            {currentPage === 'checkout' && (
              <div className="flex-1 flex flex-col bg-gray-50">
                <div className="flex-1 overflow-auto p-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
                    <div className="space-y-3">
                      {Object.keys(confirmedSelections).map(roomTypeId => {
                        const roomType = roomCards.find(r => r.id === parseInt(roomTypeId));
                        const count = confirmedSelections[roomTypeId];
                        if (roomType && count > 0) {
                          return (
                            <div key={roomTypeId} className="flex justify-between items-center py-2 border-b  border-gray-200">
                              <div>
                                <p className="font-medium">{roomType.name}</p>
                                <p className="text-sm text-gray-600">{count} {count === 1 ? 'room' : 'rooms'}</p>
                              </div>
                              <p className="font-semibold">€ {roomType.price * count}</p>
                            </div>
                          );
                        }
                        return null;
                      })}
                      <div className="flex justify-between items-center pt-3 text-lg font-bold">
                        <span>Total</span>
                        <span>€ {calculateGrandTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Screen Customize Panel */}
            <div
              className={`fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-300 ease-out ${isBottomSheetOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
              {/* iOS-style header */}
              <div className="header" style={{ height: 'auto' }}>
                <IosStatusBar />
                <div className="flex items-center px-3 py-2 relative">
                  <button onClick={() => setIsBottomSheetOpen(false)}>
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-lg font-bold absolute left-0 right-0 text-center pointer-events-none">{selectedRoomType?.name}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto px-5 py-5">

                {/* Number of Rooms Stepper */}
                <div className="mb-6 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-700">Number of Rooms</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleRoomCountChange(-1)}
                        className="w-10 h-10 rounded-md border-2 border-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                      >
                        <Minus className="w-5 h-5 text-blue-600" />
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">{numberOfRooms}</span>
                      <button
                        data-demo="fs-plus-btn"
                        onClick={() => handleRoomCountChange(1)}
                        disabled={numberOfRooms === 5}
                        className="w-10 h-10 rounded-md border-2 border-blue-600 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
                      >
                        <Plus className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>


                {/* Room Configurations */}
                <div className="space-y-6 mb-6">
                  {rooms.map((room) => (
                    <div key={room.id} className="pt-2 first:border-t-0 first:pt-0">
                      <h3 className="text-xl font-bold mb-4">Room {room.id}</h3>

                      {/* Bed Type */}
                      <div className="mb-5 preferences ">
                        <label className="block pref-title text-base text-gray-900 mb-2">Choose your bed</label>
                        <div className="flex flex-col gap-2">
                          {bedOptions.map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center justify-between py-2 cursor-pointer"
                            >
                              <span className="text-base">{option.label}</span>
                              <input
                                type="radio"
                                name={`bed-type-${room.id}`}
                                value={option.value}
                                checked={room.bedType === option.value}
                                onChange={(e) => updateRoom(room.id, 'bedType', e.target.value)}
                                className="w-5 h-5 text-blue-600 cursor-pointer"
                              />
                            </label>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Bottom CTA */}
              <div className="px-5 py-5 border-t border-gray-200 bg-white">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-base whitespace-nowrap font-semibold">
                    {numberOfRooms} {numberOfRooms === 1 ? 'room' : 'rooms'} · <span className="font-semibold text-gray-900">${calculateTotalPrice()}</span>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Confirm Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Text Description */}

        </div>
        <div className="w-72 animate-fadeIn flex items-center text-base" key={textContent}>
          <p className="leading-relaxed">{textContent}</p>
        </div>
      </div>
    </div >
  );
}