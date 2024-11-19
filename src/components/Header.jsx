import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useLocation } from "@/hooks/Weather";

function Header() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { isLoading, locations, getLocations } = useLocation();

  // Default suggestion locations
  const defaultSuggestLocations = [
    {
      name: "Hyderabad",
      state: "Telangana",
      lat: "17.360589",
      lon: "78.4740613",
      country: "IN",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      lat: "13.0836939",
      lon: "80.270186",
      country: "IN",
    },
    {
      name: "Mumbai",
      state: "Maharashtra",
      lat: "19.0785451",
      lon: "72.878176",
      country: "IN",
    },
    {
      name: "Delhi",
      state: "Delhi",
      lat: "28.651717",
      lon: "77.2219388",
      country: "IN",
    },
    {
      name: "Bengaluru",
      state: "Karnataka",
      lat: "12.9767936",
      lon: "77.590082",
      country: "IN",
    },
  ];

  useEffect(() => {
    if (inputValue) {
      getLocations(inputValue);
    }
  }, [inputValue]);

  const handleSelect = (cityData) => {
    const [lat, lon, name] = cityData.split("|");

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50 py-1">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img src="/skykast-logo.png" alt="skykast logo" className="h-14" />
        </Link>

        {/* Search Bar */}
        <div
          onClick={() => setOpen(true)}
          className="flex items-center justify-start gap-4 sm:w-60 sm:border border-gray-300 rounded px-4 py-2 cursor-pointer"
        >
          <Search className="size-6 sm:h-4 sm:w-4" />
          <span className="hidden sm:block text-sm text-muted-foreground">
            Search Locations...
          </span>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Search Locations..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {inputValue.length > 2 && !isLoading && (
              <CommandEmpty>No Locations found.</CommandEmpty>
            )}

            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="size-4 animate-spin" />
              </div>
            )}

            {/* Suggestions for Search locations */}
            <CommandGroup heading="Suggestions">
              {locations.length
                ? locations.map((location) => (
                    <CommandItem
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      key={`${location.lat}-${location.lon}`}
                      onSelect={handleSelect}
                    >
                      <Search className="size-4 mr-2" />
                      <span>{location.name},</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          {location.state},
                        </span>
                      )}
                      <span>{location.country}</span>
                    </CommandItem>
                  ))
                : defaultSuggestLocations.map((suggest) => (
                    <CommandItem
                      value={`${suggest.lat}|${suggest.lon}|${suggest.name}|${suggest.country}`}
                      key={`${suggest.lat}-${suggest.lon}`}
                      onSelect={handleSelect}
                    >
                      <Search className="size-4 mr-2" />
                      <span>{suggest.name},</span>
                      {suggest.state && (
                        <span className="text-sm text-muted-foreground">
                          {suggest.state},
                        </span>
                      )}
                      <span>{suggest.country}</span>
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </header>
  );
}

export default Header;
