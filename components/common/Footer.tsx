import { HardHat } from "lucide-react";
export default function Footer() {
  return (
    <>
      <footer className="py-12 pt-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4988C4] rounded-md flex items-center justify-center">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                HelmentHub
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 HelmenHub, All righ getshered
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
