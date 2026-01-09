import Image from "next/image";
import ImagePage from "@/public/assets/img/imageHelms.png";
import FormAuth from "@/app/auth/_components/FormAuth";
export default function page() {
  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Hero */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-200 justify-center items-center p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <Image
              src={ImagePage}
              alt="FotoImage"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Safe & Secure Helmet Management
              </h2>
              <p className="text-muted-foreground">
                Borrow and manage safety helmets with ease. Track your borrowing
                history and never miss a return deadline.
              </p>
            </div>
          </div>
        </div>

        {/* Right Hero */}
        <div className="flex-1 flex items-center justify-center p-8">
          <FormAuth />
        </div>
      </div>
    </>
  );
}
