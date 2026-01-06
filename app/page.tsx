import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import Image from "next/image";
import ImagePage from "@/public/assets/img/imageHelms.png";
import { StatsField } from "@/app/config/stats.fields";
import { FeaturesField } from "@/app/config/features.field";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/common/Footer";
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-sky-200 text-blue-500 px-4 py-2 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Safety Equipment Management
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Borrow Safety Helmets
                  <span className="text-blue-500">With Ease</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  A modern platform for managing helmet borrowing. Track your
                  borrows, set return reminders, and ensure workplace safety
                  compliance
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant={"outline"} className="cursor-pointer">
                    Start Borrowings
                  </Button>
                </div>
              </div>
              <div className="relative mb-100">
                <div className="absolute inset-0 bg-gray-400 rounded-3xl transform rotate-3">
                  <Image
                    src={ImagePage}
                    alt="Image Foto"
                    className="relative rounded-3xl shadow-2xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Hero Section */}

        {/* Stast section */}
        <section className="py-16 border-y borrder-border">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {StatsField.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
                  {item.value}
                </p>
                <p className="text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
        {/* end section */}

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose HelmetHub?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes helmet borrowing simple, safe, and efficient
                for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FeaturesField.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-500 rounded-sm flex items-center justify-center mb-4">
                        <Icon className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        {/* End Features Section */}

        {/* CTA Section */}
        <section className="py-20 px-4 bg-sky-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Join thousands of users who trust HelmetHub for their safety
              equipment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size={"lg"}>
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button size={"lg"} variant={"outline"}>
                Sign in
              </Button>
            </div>
          </div>
        </section>
        {/* End Cta Section */}

        {/* Footer */}
        <Footer />
        {/* end Footer */}
      </div>
    </>
  );
}
