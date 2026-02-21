"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Funnel } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";




export type Bed = Schema["Bed"]["type"];
// functions :



export default function BedManagement() {
  // sTORE bED DETAILS
  const [beds, setBeds] = useState<Bed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetch beds from database using real-time subscription
  async function fetchBeds() {
    const response = await client.models.Bed.list();
    return response.data;
  }
  useEffect(() => {
    fetchBeds().then((data) => {
      setBeds(data);
      setIsLoading(false);
    });
  }, []);
  // Form Inputs for a New Bed
  const [bedNumber, setBedNumber] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [roomtype, setRoomtype] = useState<string>("");

  const [isOccupied, setIsOccupied] = useState<boolean>(false);

  const [assignedPatientId, setAssignedPatientId] = useState<string | null>(null);
  const [assignedDoctorId, setAssignedDoctorId] = useState<string | null>(null);

  const [admittedAt, setAdmittedAt] = useState<string | null>(null);
  const [dischargedAt, setDischargedAt] = useState<string | null>(null);

  const rooms = [
    { id: 1, bedNo: "A-101", type: "Private Room", status: "occupied" },
    { id: 2, bedNo: "B-102", type: "Normal Ward", status: "unoccupied" },
    { id: 3, bedNo: "B-103", type: "Normal Ward", status: "occupied" },
    { id: 4, bedNo: "S-104", type: "VIP Room", status: "unoccupied" },
  ];
  const status = [
    { name: "All Beds" },
    { name: "Occupied" },
    { name: "Unoccupied" },
    { name: "Maintenance" },
  ];




  return (
    <div className="bg-[#0B0C10] min-h-screen ">
      {/* heading */}
      <div className="px-0">
        <h1 className="text-white text-3xl font-bold px-6 pt-4 pb-2">Neural <span className="text-[#9333ea]">Infirmary</span></h1>
        <h1 className="text-white text-4xl font-bold px-6 pt-4 pb-2">
          Bed Management
        </h1>
        <div className="text-gray-400 px-6 text-xl">
          Monitor and Allocate Beds
        </div>
      </div>

      {/* Add New Bed */}
      <div className="">
        <Card className="bg-white/4 border-none m-6 flex flex-col p-4 ">
          <label htmlFor="" className="text-2xl font-bold">Add New Bed</label>
          <div className="flex flex-row gap-4">
            <Input placeholder="Room No" className="w-1/2" />
            <Input placeholder="Bed No" className="w-1/2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Select Bed Catagory</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuItem className="text-md">Normal Ward</DropdownMenuItem>
                <DropdownMenuItem className="text-md">Private Room</DropdownMenuItem>
                <DropdownMenuItem className="text-md">VIP Room</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-purple-600 hover:bg-purple-500 text-white">
              Add New Bed
            </Button>
          </div>
        </Card>
      </div>

      <div className="">
        <Card className="bg-white/4 border-none m-6 flex flex-col p-4 ">
          <div className="flex flex-row justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search Beds..."
                className="
                h-12
                pl-10
                rounded-full
                bg-slate-950
                border-slate-800
                text-slate-200
                placeholder:text-slate-400
                focus-visible:ring-1
                focus-visible:ring-slate-500
                w-[40%]
                placeholder:text-lg
                
              "
              />
            </div>

            {/* dropdown */}
            <div className="flex flex-row items-center gap-2 mr-10">
              <Funnel className="w-4 h-4 text-slate-400" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#111118] border border-[#1F1F2A] hover:bg-[#1a1a22] text-white text-md rounded-full p-4">
                    All Status
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-[#111118] border border-[#1F1F2A] text-white rounded-xl"
                >
                  {status.map((status) => (
                    <DropdownMenuItem
                      key={status.name}
                      className="hover:bg-[#1a1a22] focus:bg-[#1a1a22] hover:text-black text-md cursor-pointer"
                    >
                      {status.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Display Rooms */}
          <div className="">
            <div className="grid grid-cols-[1fr_1fr_2fr_1fr] items-center px-8 py-3 text-white text-xl font-medium mx-4">
              <span className="pl-4">Room No</span>
              <span>Bed No</span>
              <span>Room Type</span>
              <span className="text-right pr-4">Actions</span>
            </div>

            {/* Loading & Error States */}
            {isLoading && <div className="text-center text-gray-400 py-10 text-xl font-semibold">Loading beds...</div>}
            {error && <div className="text-center text-red-500 py-10 text-xl font-semibold">{error}</div>}
            {!isLoading && !error && beds.length === 0 && (
              <div className="text-center text-gray-400 py-10 text-xl font-semibold">No beds found. Add one to get started.</div>
            )}

            {!isLoading && !error && beds.map((bed) => (
              <div key={bed.bedNumber} className="">
                <Card className="grid grid-cols-[1fr_1fr_2fr_1fr] items-center bg-white/4 border-none mx-4 my-4 p-4 text-white">
                  <div className="text-xl flex items-center pl-4">
                    <p>{bed.roomNumber}</p>
                  </div>
                  <div className="text-xl flex items-center">
                    <p>{bed.bedNumber}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-xl font-semibold">
                      {bed.roomtype}
                    </p>
                    <p className="text-gray-400 text-sm capitalize">{bed.isOccupied ? "Occupied" : "Unoccupied"}</p>
                  </div>

                  <div className="flex justify-end pr-4">
                    {bed.isOccupied ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className=" bg-purple-600 hover:bg-purple-500 text-white !w-[120px]">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1C1D3A] border rounded-2xl shadow-2xl p-6 text-slate-100">
                          <DialogHeader>
                            <DialogTitle className="text-white">View Details</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Details for Bed {bed.bedNumber}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="text-gray-300 space-y-2">
                            <p><span className="font-semibold text-white">Room No:</span> {bed.roomNumber}</p>
                            <p><span className="font-semibold text-white">Bed No:</span> {bed.bedNumber}</p>
                            <p><span className="font-semibold text-white">Type:</span> {bed.roomtype}</p>
                            <p><span className="font-semibold text-white">Status:</span> {bed.isOccupied ? "Occupied" : "Unoccupied"}</p>
                          </div>
                          <Button className=" bg-purple-600 hover:bg-purple-500 text-white !w-[120px]">
                            De-Allocate
                          </Button>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className=" bg-purple-600 hover:bg-purple-500 text-white !w-[120px]">
                            Allocate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1a1a2e] border-[#2a2a3e] text-white">
                          <DialogHeader>
                            <DialogTitle className="text-white">Allocate Bed</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Allocate Bed {bed.bedNumber}
                              to a patientID <Input className="my-4" placeholder="Patient ID" />
                              <Button className=" bg-purple-600 hover:bg-purple-500 text-white !w-[120px]">
                                Allocate
                              </Button>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="text-gray-300 space-y-2">
                            <p><span className="font-semibold text-white">Bed No:</span> {bed.bedNumber}</p>
                            <p><span className="font-semibold text-white">Type:</span> {bed.roomtype}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
