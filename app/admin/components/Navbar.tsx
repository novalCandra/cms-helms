import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardPen, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className=" border-b-gray-500 top-0 z-50">
      <div className="container mx-auto flex px-10 py-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-[5px] cursor-pointer"
                >
                  <ClipboardPen />
                  Assign Borrow
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Assign Helmet to User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>User name</Label>
                    <InputGroup>
                      <InputGroupInput placeholder="Enter Your username" />
                    </InputGroup>
                    <Label>Select Helmet</Label>
                    <Select>
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Chosose A helments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Helmentd Id</SelectLabel>
                          <SelectItem value="M">
                            HLM-001 - Standard (M)
                          </SelectItem>
                          <SelectItem value="L">
                            HLM-002 - Standard (L)
                          </SelectItem>
                          <SelectItem value="P">
                            HLM-005 - Premium (M)
                          </SelectItem>
                          <SelectItem value="Xl">
                            HLM-007 - Indurtial (XL)
                          </SelectItem>
                          <SelectItem value="S">
                            HLM-008 - Standard (S)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Label>Borrow Date</Label>
                    <Input id="borrow" type="date" />

                    <Label>Return Date</Label>
                    <Input id="retun" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full">Assign Borrow</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  variant={"default"}
                  className="rounded-[5px] cursor-pointer"
                >
                  <Plus />
                  Add Helments
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Helmet</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Helmet ID</Label>
                    <InputGroup>
                      <InputGroupInput placeholder="e.g. HTLM-051" />
                    </InputGroup>
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type Helms</SelectLabel>
                          <SelectItem value="standart">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="indurtial">Indurtial</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Label>Size</Label>
                    <Select>
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Size Helms</SelectLabel>
                          <SelectItem value="small">Small (S)</SelectItem>
                          <SelectItem value="medium">Medium (M)</SelectItem>
                          <SelectItem value="large">Large (L)</SelectItem>
                          <SelectItem value="extra">
                            Extra Large (XL)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Label>Condition</Label>
                    <Select>
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Select Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type Helms</SelectLabel>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant={"default"} className="w-full">
                    Add helments
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}
