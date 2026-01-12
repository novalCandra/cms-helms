"use client";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlarmClock, Calendar, HardHat, Undo2, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import dataDumyTable from "../data/dataDumy";
import HistoryData from "../data/HistoryDumy";
export default function Page() {
  const nontifikasi = () => toast("welcome");
  const [isModelOpen, setModalOpen] = useState(false);
  // const [isReturnModalOpen, setReturnModalOpen] = useState(true);
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John!
            </h1>
            <p className="text-muted-foreground">
              Manage your helmet borrowing and stay safe.
            </p>
          </div>
          {/* end welcome */}

          {/* Status card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 lg:gap-96 md:gap-16 sm:gap-44 mb-8">
            {/* Current Status */}
            <Card className="border-0 shadow-md lg:w-72 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Borrowing Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-8 h-8 text-sky-600" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        HLM-003
                      </p>
                      <p className="text-muted-foreground">
                        Currently Borrowed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Calendar size={20} className="text-gray-400" />
                    <p className="text-base text-muted-foreground">
                      Return by: 2024-02-10
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* end Current Status */}

            {/* borrows */}
            <Card className="border-0 shadow-md lg:w-72 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Borrows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-sky-200 py-2 px-2 rounded-sm">
                      <HardHat className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-base text-foreground">All time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* end borrows */}
            {/* borrows */}
            <Card className="border-0 shadow-md lg:w-72 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-200 py-2 px-2 rounded-sm">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">Rp 225.000</p>
                      <p className="text-base text-foreground">Total Spent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* end borrows */}


            {/* Quick Action */}
            <Card className="border-0 shadow-md lg:w-96 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isModelOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size={"lg"} disabled>
                      <HardHat className="w-4 h-4 mr-2" />
                      Borrow Helmet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Borrow a Helmet</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Select Helmet</Label>
                        <Input type="date" />
                      </div>
                      <div className="spave-y-2">
                        <Label>Return Schedule</Label>
                        <Input type="date" />
                      </div>
                      <Button className="w-full">Confirm Borrow</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full"
                      size={"lg"}
                      onClick={nontifikasi}
                    >
                      <Undo2 className="w-4 h-4 mr-2" />
                      Return Helments
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Return Helmet</DialogTitle>
                      <DialogDescription>Returning a Helms</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Helmet ID:
                          </span>
                          <span className="font-medium">HLM-003</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Borrowed on:
                          </span>
                          <span className="font-medium">2024-02-01</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Due date:
                          </span>
                          <span className="font-medium">2024-02-10</span>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <Button className="w-full">Confirm Return</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            {/* end borrows */}
          </div>
          {/*end status card */}

          {/* Table Avaible Helments */}
          <Card className="border-0 shadow-md mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="w-10 h-10 text-sky-300 " />
                <p className="text-xl font-bold">Available Helmets</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Helmet ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Price/Day</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataDumyTable.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.helmedId}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.condition}</TableCell>
                        <TableCell className="text-blue-400">
                          {item.price}
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          {/* end table Avaible Helments */}

          {/* Table History */}
          <Card className="border-0 shadow-md mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlarmClock className="h-10 w-10 text-sky-400" />
                <p className="text-xl font-bold">My Borrow History</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Borrow ID</TableHead>
                      <TableHead>Helmet ID</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {HistoryData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.borrow_id}</TableCell>
                        <TableCell>{item.helment_id}</TableCell>
                        <TableCell>{item.boorow_date}</TableCell>
                        <TableCell>{item.return_date}</TableCell>
                        <TableCell>{item.paymentId}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          {/* end Table History */}
        </main>
      </div>
    </>
  );
}
