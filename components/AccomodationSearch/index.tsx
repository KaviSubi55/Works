'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Destination {
  id: string;
  nameKey: string; // Translation key for destination name
}

const AccommodationSearch: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const destinations: Destination[] = [
    { id: 'are', nameKey: 'search.destinations.are' },
    { id: 'stockholm', nameKey: 'search.destinations.stockholm' },
  ];
  
  // Dropdown states
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  // Selected values
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [adults, setAdults] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Error states for validation
  const [destinationError, setDestinationError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [guestsError, setGuestsError] = useState(false);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Refs for click outside
  const destinationRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setDestinationOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setGuestsOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle destination checkbox
  const handleDestinationChange = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Clear destinations
  const clearDestinations = () => {
    setSelectedDestinations([]);
  };

  // Clear guests
  const clearGuests = () => {
    setAdults(0);
    setSeniors(0);
    setChildren(0);
  };

  // Get total guests
  const totalGuests = adults + seniors + children;

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const monthNames = [
    t('search.months.january'), t('search.months.february'), t('search.months.march'),
    t('search.months.april'), t('search.months.may'), t('search.months.june'),
    t('search.months.july'), t('search.months.august'), t('search.months.september'),
    t('search.months.october'), t('search.months.november'), t('search.months.december')
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
    setDateOpen(false);
  };

  // Handle search button click
  const handleSearch = () => {
    // Reset all errors
    setDestinationError(false);
    setDateError(false);
    setGuestsError(false);

    let hasError = false;

    // Validation: Check if destination is selected
    if (selectedDestinations.length === 0) {
      setDestinationError(true);
      hasError = true;
    }

    // Validation: Check if date is selected
    if (!selectedDate) {
      setDateError(true);
      hasError = true;
    }

    // Validation: Check if guests are added
    if (totalGuests === 0) {
      setGuestsError(true);
      hasError = true;
    }

    // If any error, stop here
    if (hasError) {
      return;
    }

    // Get selected destination names
   const destinationNames = selectedDestinations
  .map(id => {
    const dest = destinations.find(d => d.id === id);
    return dest ? t(dest.nameKey) : null;
  })
  .filter(Boolean)
  .join(', ');


    // Format date
    const dateStr = selectedDate!.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Format guests
    const guestStr = `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`;

    // Build query parameters
    const params = new URLSearchParams();
    params.append('destination', destinationNames);
    params.append('date', dateStr);
    params.append('guests', guestStr);
    if (adults > 0) params.append('adults', adults.toString());
    if (seniors > 0) params.append('seniors', seniors.toString());
    if (children > 0) params.append('children', children.toString());

    // Navigate to accommodation listing page
    router.push(`/accommodation?${params.toString()}`);
  };

  return (
    <div className=" bg-white pt-2 sm:pt-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-3 sm:gap-4">
          {/* Destination Dropdown */}
          <div className="w-full lg:flex-1 lg:min-w-[250px] relative" ref={destinationRef}>
            <button
              onClick={() => {
                setDestinationOpen(!destinationOpen);
                setGuestsOpen(false);
                setDateOpen(false);
                setDestinationError(false); // Clear error on click
              }}
              className={`w-full bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-sm text-left hover:shadow-md transition-shadow ${
                destinationError
                  ? 'border-2 border-red-500'
                  : 'border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base text-gray-900 font-medium">
                  {selectedDestinations.length === 0
                    ? t('search.chooseDestination')
                    : `${selectedDestinations.length} ${t('search.selected')}`}
                </span>
                {destinationOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Destination Dropdown Menu */}
            {destinationOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 sm:max-h-96 overflow-y-auto">
                <div className="p-4 space-y-3">
                  {destinations.map((dest) => (
                    <label
                      key={dest.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(dest.id)}
                        onChange={() => handleDestinationChange(dest.id)}
                        className="w-5 h-5 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]"
                      />
                      <span className="text-gray-900">{t(dest.nameKey)}</span>
                    </label>
                  ))}
                </div>
                <div className="border-t border-gray-200 p-4 flex gap-2">
                  <button
                    onClick={clearDestinations}
                    className="flex-1 px-6 py-2 rounded-full border-2 border-[#C41E3A] text-[#C41E3A] font-medium hover:bg-[#C41E3A] hover:text-white transition-colors"
                  >
                    {t('search.clear')}
                  </button>
                  {selectedDestinations.length > 0 && (
                    <button
                      onClick={() => setDestinationOpen(false)}
                      className="flex-1 px-6 py-2 rounded-full bg-[#C41E3A] text-white font-medium hover:bg-[#A01830] transition-colors"
                    >
                      {t('search.ok')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Guests Dropdown */}
          <div className="w-full lg:flex-1 lg:min-w-[200px] relative" ref={guestsRef}>
            <button
              onClick={() => {
                setGuestsOpen(!guestsOpen);
                setDestinationOpen(false);
                setDateOpen(false);
                setGuestsError(false); // Clear error on click
              }}
              className={`w-full bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-sm text-left hover:shadow-md transition-shadow ${
                guestsError
                  ? 'border-2 border-red-500'
                  : 'border border-gray-200'
              }`}
            >

              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base text-gray-900 font-medium">
                  {totalGuests === 0 ? t('search.addGuests') : `${totalGuests} ${totalGuests === 1 ? t('search.guest') : t('search.guests')}`}
                </span>
                {guestsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Guests Dropdown Menu */}
            {guestsOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-full sm:min-w-[350px]">
                <div className="p-6 space-y-6">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{t('search.adult')}</div>
                      <div className="text-sm text-gray-600">{t('search.adultAge')}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Seniors */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{t('search.senior')}</div>
                      <div className="text-sm text-gray-600">{t('search.seniorAge')}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSeniors(Math.max(0, seniors - 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">{seniors}</span>
                      <button
                        onClick={() => setSeniors(seniors + 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{t('search.childrenYouth')}</div>
                      <div className="text-sm text-gray-600">{t('search.childrenAge')}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 flex gap-2">
                  <button
                    onClick={clearGuests}
                    className="flex-1 px-6 py-2 rounded-full border-2 border-[#C41E3A] text-[#C41E3A] font-medium hover:bg-[#C41E3A] hover:text-white transition-colors"
                  >
                    {t('search.clear')}
                  </button>
                  {totalGuests > 0 && (
                    <button
                      onClick={() => setGuestsOpen(false)}
                      className="flex-1 px-6 py-2 rounded-full bg-[#C41E3A] text-white font-medium hover:bg-[#A01830] transition-colors"
                    >
                      {t('search.ok')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Date Dropdown */}
          <div className="w-full lg:flex-1 lg:min-w-[200px] relative" ref={dateRef}>
            <button
              onClick={() => {
                setDateOpen(!dateOpen);
                setDestinationOpen(false);
                setGuestsOpen(false);
                setDateError(false); // Clear error on click
              }}
              className={`w-full bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-sm text-left hover:shadow-md transition-shadow ${
                dateError
                  ? 'border-2 border-red-500'
                  : 'border border-gray-200'
              }`}
            >

              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base text-gray-900 font-medium">
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : t('search.selectArrival')}
                </span>
                {dateOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Date Picker Dropdown */}
            {dateOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 w-full sm:min-w-[350px] sm:right-auto">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="font-medium text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {[
                    t('search.weekdays.mon'),
                    t('search.weekdays.tue'),
                    t('search.weekdays.wed'),
                    t('search.weekdays.thu'),
                    t('search.weekdays.fri'),
                    t('search.weekdays.sat'),
                    t('search.weekdays.sun')
                  ].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-600 py-2">
                      {day}
                    </div>
                  ))}

                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }).map(
                    (_, i) => (
                      <div key={`empty-${i}`} />
                    )
                  )}

                  {/* Calendar days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === currentMonth.getMonth() &&
                      selectedDate.getFullYear() === currentMonth.getFullYear();

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`p-2 text-center rounded-full hover:bg-gray-100 ${
                          isSelected
                            ? 'bg-[#C41E3A] text-white hover:bg-[#A01830]'
                            : 'text-gray-900'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full lg:w-auto bg-[#a71d34] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-[#A01830] transition-colors whitespace-nowrap shadow-lg hover:shadow-xl"
          >
            {t('search.searchAccommodation')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationSearch;
