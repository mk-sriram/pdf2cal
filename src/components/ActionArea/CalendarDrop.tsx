"use client";

import { useState, useEffect } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Calendar {
  id: number;
  name: string;
}

export default function CalendarDrop() {
  const [selected, setSelected] = useState<Calendar | null>(null);
  const [calendarNames, setCalendarNames] = useState<Calendar[]>([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await fetch("/api/get-calendar-list");
        const data = await response.json();
        setCalendarNames(data.calendars);
        setSelected(data.calendars[0]);
      } catch (error) {
        console.error("Error fetching calendars", error);
      }
    };

    fetchCalendars();
  }, []);

  if (!selected) {
    return (
      <div className="relative mt-2 w-[50%] animate-pulse">
        <div className="relative w-full cursor-default rounded-md bg-gray-200 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b7dffd4] sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block truncate bg-gray-300 h-5 w-full rounded-md"></span>
          </span>
        </div>
      </div>
    ); // Show a loading state while fetching data
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-800">
        Choose Calendar
      </Label> */}
      <div className="relative mt-2 w-[50%]">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b7dffd4] sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {calendarNames.map((calendar) => (
            <ListboxOption
              key={calendar.id}
              value={calendar}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-[#0b7dffd4] data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {calendar.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#0b7dffd4] group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
