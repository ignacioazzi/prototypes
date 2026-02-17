import React, { useState } from 'react';
import { Minus, Plus, Users, Wifi, Wind, Tv, Eye, Waves, Coffee, Check, Bed, Bath, Building2, Maximize2, ArrowLeft, BedDouble, X, Wallet, Trash2 } from 'lucide-react';

export default function TwoStepRoomSelection() {
  const [currentPage, setCurrentPage] = useState("rooms"); // 'rooms', 'select-rate', 'checkout'
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [confirmedSelections, setConfirmedSelections] = useState({});
  const [rooms, setRooms] = useState([
    { id: 1, bedType: "no-preference", smokingPreference: "no-preference" },
  ]);

  const roomCards = [
    {
      id: 1,
      name: "Standard Room",
      bedOptions: [
        { text: "Option 1: 2 single beds", isSingle: true },
        { text: "Option 2: 1 extra-large double bed", isSingle: false },
      ],
      size: "32 m²",
      amenities: [
        { icon: Wifi, text: "Free WiFi" },
        { icon: Bath, text: "Ensuite bathroom" },
        { icon: Wind, text: "Air conditioning" },
        { icon: Building2, text: "City view" },
        { icon: Waves, text: "Pool with a view" },
        { icon: Building2, text: "Rooftop pool" },
        { icon: Tv, text: "Flat-screen TV" },
      ],
      priceFor: 3,
      rates: [
        {
          id: 1,
          price: 86,
          originalPrice: 163,
          breakfast: "Excellent breakfast € 23.90",
          isRefundable: true,
          cancellation: "Free cancellation before 4:00 PM on April 20, 2026",
          prepayment: "No prepayment needed – pay at the property",
        },
        {
          id: 2,
          price: 171,
          originalPrice: null,
          breakfast: "Excellent breakfast € 23.90",
          isRefundable: false,
          cancellation: null,
          prepayment: null,
        },
        {
          id: 3,
          price: 205,
          originalPrice: null,
          breakfast: "Excellent breakfast € 23.90",
          isRefundable: true,
          cancellation: "Free cancellation before 4:00 PM on April 20, 2026",
          prepayment: "No prepayment needed – pay at the property",
        },
        {
          id: 4,
          price: 217,
          originalPrice: null,
          breakfast: "Excellent breakfast included",
          isRefundable: false,
          cancellation: null,
          prepayment: null,
        },
      ],
    },
    {
      id: 2,
      name: "Deluxe King Room",
      bedOptions: [{ text: "1 king-size bed", isSingle: false }],
      size: "28 m²",
      amenities: [
        { icon: Wifi, text: "Free WiFi" },
        { icon: Bath, text: "Private bathroom" },
        { icon: Wind, text: "Air conditioning" },
        { icon: Eye, text: "Garden view" },
        { icon: Tv, text: "Flat-screen TV" },
      ],
      priceFor: 2,
      rates: [
        {
          id: 1,
          price: 129,
          originalPrice: 152,
          breakfast: "Excellent breakfast € 23.90",
          isRefundable: false,
          cancellation: null,
          prepayment: null,
        },
        {
          id: 2,
          price: 189,
          originalPrice: null,
          breakfast: "Excellent breakfast included",
          isRefundable: true,
          cancellation: "Free cancellation before 4:00 PM on April 20, 2026",
          prepayment: "No prepayment needed – pay at the property",
        },
        {
          id: 3,
          price: 225,
          originalPrice: null,
          breakfast: "Excellent breakfast included",
          isRefundable: false,
          cancellation: null,
          prepayment: null,
        },
      ],
    },
    {
      id: 3,
      name: "Standard Twin Room",
      bedOptions: [{ text: "2 single beds", isSingle: true }],
      size: "25 m²",
      amenities: [
        { icon: Wifi, text: "Free WiFi" },
        { icon: Bath, text: "Shared bathroom" },
        { icon: Building2, text: "Street view" },
        { icon: Tv, text: "TV" },
      ],
      priceFor: 2,
      rates: [
        {
          id: 1,
          price: 99,
          originalPrice: 124,
          breakfast: "Excellent breakfast € 23.90",
          isRefundable: true,
          cancellation: "Free cancellation before 4:00 PM on April 20, 2026",
          prepayment: "No prepayment needed – pay at the property",
        },
        {
          id: 2,
          price: 145,
          originalPrice: null,
          breakfast: "Excellent breakfast included",
          isRefundable: false,
          cancellation: null,
          prepayment: null,
        },
        {
          id: 3,
          price: 178,
          originalPrice: null,
          breakfast: "Excellent breakfast included",
          isRefundable: true,
          cancellation: "Free cancellation before 4:00 PM on April 20, 2026",
          prepayment: "No prepayment needed – pay at the property",
        },
      ],
    },
  ];

  const bedOptions = [
    { value: "no-preference", label: "No preference" },
    { value: "1-double", label: "1 double bed" },
    { value: "2-single", label: "2 single beds" },
  ];

  const smokingOptions = [
    { value: "no-preference", label: "No preference" },
    { value: "smoking", label: "Smoking room" },
    { value: "non-smoking", label: "Non-smoking room" },
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
      setRooms([
        ...rooms,
        {
          id: newCount,
          bedType: "no-preference",
          smokingPreference: "no-preference",
        },
      ]);
    } else if (delta < 0 && rooms.length > 0) {
      setRooms(rooms.slice(0, -1));
    }
  };

  const updateRoom = (roomId, field, value) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, [field]: value } : room
      )
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedRate ? selectedRate.price : 0;
    return basePrice * numberOfRooms;
  };

  const calculateGrandTotal = () => {
    let total = 0;
    Object.keys(confirmedSelections).forEach((roomTypeId) => {
      const selection = confirmedSelections[roomTypeId];
      if (selection) {
        total += selection.rate.price * selection.numberOfRooms;
      }
    });
    return total;
  };

  const getTotalRoomsSelected = () => {
    return Object.values(confirmedSelections).reduce((sum, selection) => {
      return sum + (selection ? selection.numberOfRooms : 0);
    }, 0);
  };

  const handleSelectAndCustomize = (roomType) => {
    setSelectedRoomType(roomType);
    setCurrentPage("select-rate");

    // If there's an existing selection, use that rate; otherwise use first rate
    const existingSelection = confirmedSelections[roomType.id];
    if (existingSelection && existingSelection.rate) {
      setSelectedRate(existingSelection.rate);
    } else {
      setSelectedRate(roomType.rates[0]);
    }
  };

  const handleRateClick = (rate, index) => {
    setSelectedRate(rate);
    // Scroll to the selected rate
    setTimeout(() => {
      const rateElement = document.getElementById(`rate-${rate.id}`);
      if (rateElement) {
        rateElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleRateSelect = () => {
    if (!selectedRate) return;

    setIsBottomSheetOpen(true);
    setNumberOfRooms(1);
    setRooms([{ id: 1, bedType: "no-preference", smokingPreference: "no-preference" }]);
  };

  const handleConfirm = () => {
    setIsBottomSheetOpen(false);
    setConfirmedSelections({
      ...confirmedSelections,
      [selectedRoomType.id]: {
        rate: selectedRate,
        numberOfRooms: numberOfRooms,
        rooms: rooms,
      },
    });
    setCurrentPage("rooms");

    // Scroll to the selected room card after a short delay
    setTimeout(() => {
      const roomCard = document.getElementById(`room-card-${selectedRoomType.id}`);
      if (roomCard) {
        roomCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);
  };

  const handleRemoveSelection = (roomTypeId) => {
    const newSelections = { ...confirmedSelections };
    delete newSelections[roomTypeId];
    setConfirmedSelections(newSelections);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Two Steps Selection</h1>
        <p className="text-gray-600 text-lg mt-2">Select room then choose rate</p>
      </div>
      <div style={{ width: '390px', aspectRatio: '1 / 2.13', transform: 'scale(0.9)', zIndex: 2, overflow: 'hidden' }} className=" bg-gray-50 rounded-3xl shadow-2xl  flex flex-col w-full relative overflow-hidden">
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        
        .page-transition {
          position: absolute;
          top: 56px;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f9fafb;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.3s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-50">
        {currentPage === "checkout" ? (
          <>
            <button onClick={() => setCurrentPage("rooms")}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Checkout</h1>
            <div className="w-6"></div>
          </>
        ) : currentPage === "select-rate" ? (
          <>
            <button onClick={() => setCurrentPage("rooms")}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Select Rate</h1>
            <div className="w-6"></div>
          </>
        ) : (
          <>
            <button onClick={() => window.location.hash = '#/'}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Select Room</h1>
            <div className="w-6"></div>
          </>
        )}
      </div>

      {/* Room Cards */}
      {currentPage === "rooms" && (
        <div className="page-transition flex flex-col animate-slide-in-right z-10">
          <div className="flex-1 overflow-auto p-4 space-y-4 pb-32">
            {roomCards.map((roomType) => {
              const isSelected = !!confirmedSelections[roomType.id];
              const selection = confirmedSelections[roomType.id];

              return (
                <div
                  key={roomType.id}
                  id={`room-card-${roomType.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-3 text-blue-600">
                      {roomType.name}
                    </h2>

                    {/* Price for */}
                    {!isSelected && (
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-gray-700" />
                        <span className="text-base text-gray-700">
                          Price for {roomType.priceFor}{" "}
                          {roomType.priceFor === 1 ? "adult" : "adults"}
                        </span>
                      </div>
                    )}

                    {/* Bed options */}
                    <div className="mb-3">
                      {roomType.bedOptions.map((option, idx) => {
                        const BedIcon = option.isSingle ? Bed : BedDouble;
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-2 mb-1"
                          >
                            <BedIcon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                            <span className="text-base text-gray-700">
                              {option.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Size */}
                    <div className="flex items-center gap-2 mb-3">
                      <Maximize2 className="w-5 h-5 text-gray-700" />
                      <span className="text-base text-gray-700">
                        Size: {roomType.size}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
                      {roomType.amenities.map((amenity, idx) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5"
                          >
                            <IconComponent className="w-4 h-4 text-gray-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {amenity.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* First rate information */}
                    {!isSelected && roomType.rates[0] && (
                      <div className="mb-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <Coffee className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-base text-gray-700">
                            {roomType.rates[0].breakfast}
                          </span>
                        </div>

                        {roomType.rates[0].isRefundable ? (
                          <>
                            <div className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                />
                              </svg>
                              <span className="text-base text-green-700 font-semibold">
                                {roomType.rates[0].cancellation}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                />
                              </svg>
                              <span className="text-base text-green-700 font-semibold">
                                {roomType.rates[0].prepayment}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start gap-2">
                              <X className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                              <span className="text-base text-gray-900 font-semibold">
                                Non-refundable
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Wallet className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                              <span className="text-base text-gray-900">
                                Pay online
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    {!isSelected && roomType.rates[0] && (
                      <div className="mb-4">
                        <p className="text-base text-gray-700 mb-1">
                          Price for 1 night
                        </p>
                        <div className="flex items-baseline gap-2">
                          {roomType.rates[0].originalPrice && (
                            <span className="text-xl text-red-600 line-through">
                              € {roomType.rates[0].originalPrice}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-gray-900">
                            € {roomType.rates[0].price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Includes taxes and fees
                        </p>
                      </div>
                    )}

                    {/* Show selected rate info if selected */}
                    {isSelected && selection.rate && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-base font-bold text-blue-900 mb-3">
                          <span className="font-bold">
                            {selection.numberOfRooms}
                          </span>{" "}
                          {selection.numberOfRooms === 1 ? "room" : "rooms"}{" "}
                          selected
                        </p>

                        {/* Price for adults */}
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-5 h-5 text-gray-700" />
                          <span className="text-base text-gray-700">
                            Price for {roomType.priceFor}{" "}
                            {roomType.priceFor === 1 ? "adult" : "adults"}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-start gap-2">
                            <Coffee className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <span className="text-base text-gray-700">
                              {selection.rate.breakfast}
                            </span>
                          </div>

                          {selection.rate.isRefundable ? (
                            <>
                              <div className="flex items-start gap-2">
                                <svg
                                  className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  />
                                </svg>
                                <span className="text-base text-green-700 font-semibold">
                                  {selection.rate.cancellation}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <svg
                                  className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  />
                                </svg>
                                <span className="text-base text-green-700 font-semibold">
                                  {selection.rate.prepayment}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-start gap-2">
                                <X className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                                <span className="text-base text-gray-900 font-semibold">
                                  Non-refundable
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Wallet className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                                <span className="text-base text-gray-900">
                                  Pay online
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Total price at bottom */}
                        <div className="pt-3 border-t border-blue-200">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              € {selection.rate.price * selection.numberOfRooms}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Includes taxes and fees
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSelectAndCustomize(roomType)}
                        className={`flex-1 py-3 rounded-lg font-medium transition-colors ${isSelected
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                          }`}
                      >
                        {isSelected ? "Edit selection" : "Select"}
                      </button>
                      {isSelected && (
                        <button
                          onClick={() => handleRemoveSelection(roomType.id)}
                          className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Select Rate Page */}
      {currentPage === "select-rate" && selectedRoomType && (
        <div className="page-transition flex flex-col animate-slide-in-right z-20">
          <div className="flex-1 overflow-auto p-4 space-y-4 pb-32">
            {selectedRoomType.rates.map((rate, index) => {
              const isSelectedRate = selectedRate?.id === rate.id;

              return (
                <div
                  key={rate.id}
                  id={`rate-${rate.id}`}
                  onClick={() => handleRateClick(rate, index)}
                  className={`bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all ${isSelectedRate
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="p-4">
                    {/* Price for */}
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-gray-700" />
                      <span className="text-base text-gray-700">
                        Price for {selectedRoomType.priceFor}{" "}
                        {selectedRoomType.priceFor === 1 ? "adult" : "adults"}
                      </span>
                    </div>

                    {/* My choices section */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <Coffee className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-900 font-medium">
                          {rate.breakfast}
                        </span>
                      </div>

                      {rate.isRefundable ? (
                        <>
                          <div className="flex items-start gap-2">
                            <svg
                              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              />
                            </svg>
                            <span className="text-base text-green-700 font-semibold">
                              {rate.cancellation}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <svg
                              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              />
                            </svg>
                            <span className="text-base text-green-700 font-semibold">
                              {rate.prepayment}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <X className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                            <span className="text-base text-gray-900 font-semibold">
                              Non-refundable
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Wallet className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                            <span className="text-base text-gray-900">
                              Pay online
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Price at bottom */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-baseline gap-2 mb-1">
                        {rate.originalPrice && (
                          <span className="text-xl text-red-600 line-through">
                            € {rate.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">
                          € {rate.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Includes taxes and fees
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fixed Bottom Action Bar - Select Rate */}
          {selectedRate && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="text-lg text-gray-800 whitespace-nowrap">
                  <span className="font-bold">1</span>{" "}
                  <span className="font-bold">room</span> ·{" "}
                  <span className="font-bold text-gray-900">
                    € {selectedRate.price}
                  </span>
                </div>
                <button
                  onClick={handleRateSelect}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  Select
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fixed Bottom Action Bar - Room List */}
      {getTotalRoomsSelected() > 0 && currentPage === "rooms" && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 shadow-lg z-30">
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg text-gray-800">
              <span className="font-bold">{getTotalRoomsSelected()}</span>{" "}
              <span className="font-bold">
                {" "}
                {getTotalRoomsSelected() === 1 ? "room" : "rooms"} ·{" "}
              </span>
              <span className="font-bold text-gray-900">
                € {calculateGrandTotal()}
              </span>
            </div>
            <button
              onClick={() => setCurrentPage("checkout")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
            >
              Reserve
            </button>
          </div>
        </div>
      )}

      {/* Checkout Page */}
      {currentPage === "checkout" && (
        <div className="page-transition flex flex-col animate-slide-in-right z-30">
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              <div className="space-y-3">
                {Object.keys(confirmedSelections).map((roomTypeId) => {
                  const roomType = roomCards.find(
                    (r) => r.id === parseInt(roomTypeId)
                  );
                  const selection = confirmedSelections[roomTypeId];
                  if (roomType && selection) {
                    return (
                      <div
                        key={roomTypeId}
                        className="flex justify-between items-center py-2 border-b"
                      >
                        <div>
                          <p className="font-medium">{roomType.name}</p>
                          <p className="text-sm text-gray-600">
                            {selection.numberOfRooms}{" "}
                            {selection.numberOfRooms === 1 ? "room" : "rooms"}
                          </p>
                        </div>
                        <p className="font-semibold">
                          € {selection.rate.price * selection.numberOfRooms}
                        </p>
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

      {/* Bottom Sheet Overlay */}
      {isBottomSheetOpen && (
        <div
          className="absolute inset-0 bg-black/40 transition-opacity"
          style={{ zIndex: 100 }}
          onClick={() => setIsBottomSheetOpen(false)}
        />
      )}

      {/* Bottom Sheet - Room Customization */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${isBottomSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        style={{ height: "86vh", zIndex: 100 }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div
          className="px-5 pb-5 overflow-y-auto"
          style={{ height: "calc(86vh - 100px)" }}
        >
          <h2 className="text-2xl font-bold mb-6">Customize Your Rooms</h2>

          {/* Number of Rooms Stepper */}
          <div className="mb-6 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-700">
                Number of Rooms
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleRoomCountChange(-1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-xl font-semibold w-8 text-center">
                  {numberOfRooms}
                </span>
                <button
                  onClick={() => handleRoomCountChange(1)}
                  disabled={numberOfRooms === 5}
                  className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Room Configurations */}
          <div className="space-y-6 mb-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="border-t pt-6 first:border-t-0 first:pt-0"
              >
                <h3 className="text-lg font-semibold mb-4">Room {room.id}</h3>

                {/* Bed Type */}
                <div className="mb-5">
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Bed Type
                  </label>
                  <div className="space-y-2">
                    {bedOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${room.bedType === option.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`bed-type-${room.id}`}
                            value={option.value}
                            checked={room.bedType === option.value}
                            onChange={(e) =>
                              updateRoom(room.id, "bedType", e.target.value)
                            }
                            className="w-4 h-4 text-blue-600 cursor-pointer"
                          />
                          <span className="text-base font-medium">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Smoking Preference */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Smoking Preference
                  </label>
                  <div className="space-y-2">
                    {smokingOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${room.smokingPreference === option.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`smoking-preference-${room.id}`}
                            value={option.value}
                            checked={room.smokingPreference === option.value}
                            onChange={(e) =>
                              updateRoom(room.id, "smokingPreference", e.target.value)
                            }
                            className="w-4 h-4 text-blue-600 cursor-pointer"
                          />
                          <span className="text-base font-medium">
                            {option.label}
                          </span>
                        </div>
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
            <div className="text-lg text-gray-800 whitespace-nowrap">
              <span className="font-bold">{numberOfRooms}</span>{" "}
              <span className="font-bold">
                {" "}
                {numberOfRooms === 1 ? "room" : "rooms"}
              </span>{" "}
              · <span className="font-bold">€ {calculateTotalPrice()}</span>
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
    </div>
  );
}
