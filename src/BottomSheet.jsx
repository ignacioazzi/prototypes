import React, { useState } from "react";
import {
    Minus,
    Plus,
    Users,
    Wifi,
    Wind,
    Tv,
    Eye,
    Waves,
    Coffee,
    Check,
    Bed,
    Bath,
    Building2,
    Maximize2,
    ArrowLeft,
    BedDouble,
    X,
    ChevronRight,
} from "lucide-react";

export default function BookingFlowCustomizer() {
    const [currentPage, setCurrentPage] = useState("rooms"); // 'rooms', 'room-detail', 'checkout'
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [confirmedSelections, setConfirmedSelections] = useState({});
    const [editingRoomIndex, setEditingRoomIndex] = useState(null);
    const [isPageSlideOut, setIsPageSlideOut] = useState(false);
    const [textContent, setTextContent] = useState(
        "1. Customizable rooms were distinguished from other room types by a dedicated call-to-action labeled 'Select and Customize.' When activated, this control triggered a bottom sheet, enabling users to configure the room according to their preferences."
    );
    const [rooms, setRooms] = useState([{ id: 1, bedType: "no-preference" }]);

    const roomCards = [
        {
            id: 1,
            name: "Double or Twin Room",
            bedOptions: [
                { text: "Option 1: 2 single beds", isSingle: true },
                { text: "Option 2: 1 extra-large double bed", isSingle: false },
            ],
            size: "25m²",
            amenities: [
                { icon: Wifi, text: "Free WiFi" },
                { icon: Bath, text: "Bath" },
                { icon: Wind, text: "Air conditioning" },
            ],
            priceFor: 2,
            price: 45,
            originalPrice: null,
            cancellation: "Free cancellation at any time",
            prepayment: "Pay at the property",
            breakfast: "Breakfast available at additional cost (€ 19.50)",
            discount: null,
            discountBadges: [],
        },
        {
            id: 2,
            name: "Ruyschen Suite with Can",
            bedOptions: [
                { text: "1 extra large double bed, 1 sofa bed", isSingle: false },
            ],
            size: "25m²",
            priceFor: 2,
            price: 45,
            originalPrice: null,
            cancellation: "Free cancellation at any time",
            prepayment: null,
            breakfast: null,
            discount: null,
            discountBadges: [],
            amenities: [
                { icon: Wifi, text: "Free WiFi" },
                { icon: Bath, text: "Bath" },
                { icon: Wind, text: "Air conditioning" },
            ],
        },
    ];

    const bedOptions = [
        { value: "no-preference", label: "No preference" },
        { value: "single", label: "Single Bed" },
        { value: "double", label: "Double bed" },
    ];

    const handleRoomCountChange = (delta) => {
        const newCount = Math.max(0, Math.min(5, numberOfRooms + delta));
        setNumberOfRooms(newCount);

        if (newCount === 0) {
            setIsBottomSheetOpen(false);
            setRooms([]);
            // Remove the selection for this room type
            const newSelections = { ...confirmedSelections };
            delete newSelections[selectedRoomType.id];
            setConfirmedSelections(newSelections);
            return;
        }

        if (delta > 0) {
            setRooms([
                ...rooms,
                {
                    id: newCount,
                    bedType: "no-preference",
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

    const handleSelectAndCustomize = (roomType) => {
        setSelectedRoomType(roomType);

        // Check if there's an existing selection
        const existingSelection = confirmedSelections[roomType.id];
        if (existingSelection) {
            setNumberOfRooms(existingSelection.numberOfRooms);
            setRooms(existingSelection.rooms);
        } else {
            setNumberOfRooms(1);
            setRooms([{ id: 1, bedType: "no-preference" }]);
        }

        setIsBottomSheetOpen(true);
        setTextContent(
            "2. Here, number of rooms was adjusted using a stepper control. Each additional room generated a dedicated entry point, allowing users to configure its individual preferences separately."
        );
    };

    const handleEditRoom = (roomIndex) => {
        setEditingRoomIndex(roomIndex);
        setCurrentPage("room-detail");
        setTextContent(
            "3. Because each room was configured on a dedicated screen, there was sufficient space to present preference options using radio groups. After completing the selection, users tapped 'Confirm' to apply their choices and return to the bottom sheet."
        );
    };

    const handleBackFromDetail = () => {
        setIsPageSlideOut(true);
        setTextContent(
            "4. After confirming their preferences, users returned to the bottom sheet where they could customize their next room or tap 'Confirm' to continue."
        );
        setTimeout(() => {
            setCurrentPage("rooms");
            setEditingRoomIndex(null);
            setIsPageSlideOut(false);
        }, 250);
    };

    const handleConfirm = () => {
        setIsBottomSheetOpen(false);
        setConfirmedSelections({
            ...confirmedSelections,
            [selectedRoomType.id]: {
                numberOfRooms: numberOfRooms,
                rooms: rooms,
            },
        });
        setTextContent(" ");
    };

    const getTotalRoomsSelected = () => {
        return Object.values(confirmedSelections).reduce((sum, selection) => {
            return sum + (selection ? selection.numberOfRooms : 0);
        }, 0);
    };

    const calculateGrandTotal = () => {
        let total = 0;
        Object.keys(confirmedSelections).forEach((roomTypeId) => {
            const selection = confirmedSelections[roomTypeId];
            const roomType = roomCards.find((r) => r.id === parseInt(roomTypeId));
            if (selection && roomType) {
                total += roomType.price * selection.numberOfRooms;
            }
        });
        return total;
    };

    const getBedTypeLabel = (value) => {
        const option = bedOptions.find((opt) => opt.value === value);
        return option ? option.label : value;
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-0 gap-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Bottom Sheet</h1>
                <p className="text-gray-600 text-lg mt-2">Room customization with bottom sheet drawer</p>
            </div>
            <div className="flex items-start gap-12 max-w-7xl">
                {/* Mobile Prototype */}
                <div
                    className="w-72"> </div>
                <div className="relative">
                    {/* Phone frame background */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: "-12px",
                            left: "-12px",
                            right: "-12px",
                            bottom: "-12px",
                            backgroundImage: "url(src/frame.png)",
                            backgroundSize: "91% 91%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            zIndex: 1,
                        }}
                    />

                    <div
                        className="relative bg-gray-50 flex flex-col overflow-hidden rounded-3xl shadow-2xl"
                        style={{
                            width: "390px",
                            aspectRatio: "1 / 2.13",
                            transform: "scale(0.9)",
                            zIndex: 2,
                        }}
                    >
                        <style>{`
          @keyframes slideInRight {
            from {
              transform: translate3d(100%, 0, 0);
              opacity: 0.95;
            }
            to {
              transform: translate3d(0, 0, 0);
              opacity: 1;
            }
          }
          
          @keyframes slideOutRight {
            from {
              transform: translate3d(0, 0, 0);
              opacity: 1;
            }
            to {
              transform: translate3d(100%, 0, 0);
              opacity: 0.95;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .page-transition {
            position: absolute;
            top: 54px;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f9fafb;
            will-change: transform;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
          }
          
          .animate-slide-out-right {
            animation: slideOutRight 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in forwards;
          }
          
          
        `}</style>

                        {/* Header */}
                        <div
                            className="px-4 flex items-center justify-between relative bg-white text-gray-900 border-b border-gray-200"
                            style={{
                                height: "54px",
                                zIndex: currentPage === "room-detail" ? 300 : 200,
                            }}
                        >
                            {currentPage === "checkout" ? (
                                <>
                                    <button onClick={() => setCurrentPage("rooms")}>
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                    <h1 className="text-lg font-semibold">Checkout</h1>
                                    <div className="w-6"></div>
                                </>
                            ) : currentPage === "room-detail" ? (
                                <>
                                    <button onClick={handleBackFromDetail}>
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                    <h1 className="text-lg font-semibold">Room requests</h1>
                                    <div className="w-6"></div>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => window.location.hash = '#/'}>
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                    <h1 className="text-lg font-semibold">Choose your stay</h1>
                                    <div className="w-6 h-6"></div>
                                </>
                            )}
                        </div>

                        {/* Room Cards */}
                        {currentPage === "rooms" && (
                            <div className="flex-1 overflow-auto p-4 space-y-4">
                                {roomCards.map((roomType) => {
                                    const isSelected = !!confirmedSelections[roomType.id];
                                    const selection = confirmedSelections[roomType.id];

                                    return (
                                        <div
                                            key={roomType.id}
                                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                        >
                                            <div className="p-4">
                                                <h2 className="text-lg font-semibold mb-3 text-blue-600">
                                                    {roomType.name}
                                                </h2>

                                                {/* Price for */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users className="w-5 h-5 text-gray-700" />
                                                    <span className="text-base text-gray-700">
                                                        Price for {roomType.priceFor}{" "}
                                                        {roomType.priceFor === 1 ? "adult" : "adults"}
                                                    </span>
                                                </div>

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
                                                {roomType.size && (
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Maximize2 className="w-5 h-5 text-gray-700" />
                                                        <span className="text-base text-gray-700">
                                                            Size: {roomType.size}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Amenities */}
                                                {roomType.amenities &&
                                                    roomType.amenities.length > 0 && (
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
                                                    )}

                                                {/* Benefits */}
                                                <div className="mb-3 space-y-2">
                                                    {roomType.cancellation && (
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
                                                                {roomType.cancellation}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {roomType.prepayment && (
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
                                                                {roomType.prepayment}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {roomType.breakfast && (
                                                        <div className="flex items-start gap-2">
                                                            <Coffee className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-base text-gray-700">
                                                                {roomType.breakfast}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Discount */}
                                                {roomType.discount && (
                                                    <div className="mb-3">
                                                        <div className="flex items-start gap-2 mb-1">
                                                            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <svg
                                                                    className="w-3 h-3 text-white"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <span className="text-base text-gray-900 block leading-tight">
                                                                    {roomType.discount}
                                                                </span>
                                                                <p className="text-sm text-gray-600 leading-tight">
                                                                    Applied to the price before taxes and charges
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Discount badges */}
                                                {roomType.discountBadges &&
                                                    roomType.discountBadges.length > 0 && (
                                                        <div className="flex gap-2 mb-3">
                                                            {roomType.discountBadges.map((badge, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className={`px-2 py-0.5 rounded text-sm font-semibold text-white ${badge === "Non-refundable"
                                                                        ? "bg-gray-700"
                                                                        : badge.includes("off")
                                                                            ? "bg-green-600"
                                                                            : "bg-blue-700"
                                                                        }`}
                                                                >
                                                                    {badge}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                {/* Price */}
                                                <div className="mb-4">
                                                    <p className="text-base text-gray-700 mb-1">
                                                        Price for 1 night
                                                    </p>
                                                    <div className="flex items-baseline gap-2">
                                                        {roomType.originalPrice && (
                                                            <span className="text-xl text-red-600 line-through">
                                                                € {roomType.originalPrice}
                                                            </span>
                                                        )}
                                                        <span className="text-2xl font-bold text-gray-900">
                                                            € {roomType.price}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Includes taxes and charges
                                                    </p>
                                                </div>

                                                {/* CTA */}
                                                <button
                                                    onClick={() => handleSelectAndCustomize(roomType)}
                                                    className={`w-full py-3 rounded-lg font-medium transition-colors ${isSelected
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                                                        }`}
                                                >
                                                    {isSelected
                                                        ? `${selection.numberOfRooms} room${selection.numberOfRooms > 1 ? "s" : ""
                                                        } selected`
                                                        : "Select and customize"}
                                                </button>

                                                {/* {isSelected && (
                          <p className="text-xs text-gray-600 mt-2 text-center">
                            Choose your bed type
                          </p>
                        )} */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Room Detail Customization Page */}
                        {currentPage === "room-detail" && editingRoomIndex !== null && (
                            <div
                                className={`page-transition flex flex-col ${isPageSlideOut
                                    ? "animate-slide-out-right"
                                    : "animate-slide-in-right"
                                    }`}
                                style={{ zIndex: 260 }}
                            >
                                <div className="flex-1 overflow-auto p-4 pb-24">
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold mb-2">
                                            Choose your bed
                                        </h2>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Subject to availability at the property
                                        </p>

                                        <div className="space-y-2">
                                            {bedOptions.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all bg-white"
                                                >
                                                    <span className="text-base">{option.label}</span>
                                                    <input
                                                        type="radio"
                                                        name="bed-type"
                                                        value={option.value}
                                                        checked={
                                                            rooms[editingRoomIndex]?.bedType === option.value
                                                        }
                                                        onChange={(e) =>
                                                            updateRoom(
                                                                rooms[editingRoomIndex].id,
                                                                "bedType",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-5 h-5 text-blue-700 cursor-pointer"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Fixed Bottom CTA - Room Detail */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg"
                                    style={{ zIndex: 40 }}
                                >
                                    <button
                                        onClick={handleBackFromDetail}
                                        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Checkout Page */}
                        {currentPage === "checkout" && (
                            <div
                                className="page-transition flex flex-col animate-slide-in-right"
                                style={{ zIndex: 30 }}
                            >
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
                                                                    {selection.numberOfRooms === 1
                                                                        ? "room"
                                                                        : "rooms"}
                                                                </p>
                                                            </div>
                                                            <p className="font-semibold">
                                                                € {roomType.price * selection.numberOfRooms}
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

                        {/* Fixed Bottom Action Bar - Room List */}
                        {getTotalRoomsSelected() > 0 && currentPage === "rooms" && (
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 shadow-lg"
                                style={{ zIndex: 40 }}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-lg text-gray-800">
                                        <span className="font-bold">{getTotalRoomsSelected()}</span>{" "}
                                        <span className="font-bold">
                                            {getTotalRoomsSelected() === 1 ? "room" : "rooms"}
                                        </span>{" "}
                                        ·{" "}
                                        <span className="font-bold">€ {calculateGrandTotal()}</span>
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage("checkout")}
                                        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap"
                                    >
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Bottom Sheet Overlay */}
                        {isBottomSheetOpen && (
                            <div
                                className="fixed inset-0 bg-black/50"
                                style={{
                                    zIndex: 250,
                                    transition: "opacity 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                }}
                                onClick={() => setIsBottomSheetOpen(false)}
                            />
                        )}

                        {/* Bottom Sheet - Room Selection */}
                        <div
                            className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl ${isBottomSheetOpen ? "translate-y-0" : "translate-y-full"
                                }`}
                            style={{
                                height: "75vh",
                                zIndex: 250,
                                transition: "transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                willChange: "transform",
                            }}
                        >
                            <div className="flex justify-center pt-3 pb-2">
                                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                            </div>

                            <div
                                className="px-5 pb-5 overflow-y-auto"
                                style={{ height: "calc(75vh - 140px)" }}
                            >
                                <h2 className="text-xl font-bold mb-1" style={{ paddingTop: "1em" }}>
                                    {selectedRoomType?.name}
                                </h2>

                                {/* Number of Rooms Stepper */}
                                <div className="mb-6 pt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-700">
                                            Number of rooms
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleRoomCountChange(-1)}
                                                className="w-10 h-10 rounded-md border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <Minus className="w-5 h-5 text-gray-700" />
                                            </button>
                                            <span className="text-xl font-semibold w-8 text-center">
                                                {numberOfRooms}
                                            </span>
                                            <button
                                                onClick={() => handleRoomCountChange(1)}
                                                disabled={numberOfRooms === 5}
                                                className="w-10 h-10 rounded-md border-2 border-blue-700 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
                                            >
                                                <Plus className="w-5 h-5 text-blue-700" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Room List */}
                                <div className="space-y-3 mb-6">
                                    {rooms.map((room, index) => (
                                        <div
                                            key={room.id}
                                            className="border border-gray-200 rounded-lg p-4 bg-white"
                                        >
                                            <h3 className="text-base font-semibold mb-1">
                                                Room {room.id}
                                            </h3>
                                            <button
                                                onClick={() => handleEditRoom(index)}
                                                className="text-blue-700 text-sm font-medium hover:underline flex items-center gap-1 mb-2"
                                            >
                                                Edit bed preferences
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                            <p className="text-sm text-gray-600">
                                                {getBedTypeLabel(room.bedType)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fixed Bottom CTA */}
                            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-200 bg-white">
                                <div className="flex items-center justify-between gap-4 mb-3">
                                    <div className="text-lg text-gray-800">
                                        <span className="font-bold">{numberOfRooms}</span>{" "}
                                        <span className="font-bold">
                                            {numberOfRooms === 1 ? "room" : "rooms"}
                                        </span>{" "}
                                        ·{" "}
                                        <span className="font-bold">
                                            €{" "}
                                            {selectedRoomType?.price
                                                ? selectedRoomType.price * numberOfRooms
                                                : 0}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleConfirm}
                                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors shadow-sm"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Description */}
                <div
                    className="w-72 animate-fadeIn flex items-center pt-16 text-base"
                    key={textContent}
                    style={{}}
                >
                    <p className="leading-relaxed">
                        {/* <span className="font-bold  mr-2">
              {currentPage === "rooms" &&
              !isBottomSheetOpen &&
              getTotalRoomsSelected() === 0
                ? "1."
                : currentPage === "rooms" &&
                  !isBottomSheetOpen &&
                  getTotalRoomsSelected() > 0
                ? "5."
                : currentPage === "rooms" && isBottomSheetOpen
                ? "2."
                : currentPage === "room-detail"
                ? "3."
                : "4."}
            </span> */}
                        {currentPage === "rooms" &&
                            !isBottomSheetOpen &&
                            getTotalRoomsSelected() > 0
                            ? "5. Once rooms were selected and configured, users could proceed by tapping 'Reserve' to continue to the next screen."
                            : textContent}
                    </p>
                </div>
            </div >
        </div >
    );
}