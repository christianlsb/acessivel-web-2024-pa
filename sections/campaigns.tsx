import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { campaings } from "@/data";

const Campaigns = () => {
  return (
    <>
      <section id="campaigns" className="section_container">
        <div className="gridProject content">
          <Carousel className="w-full">
            <CarouselContent>
              {campaings.map(({ image, description, title }, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="h-[370px]">
                      <CardContent
                        style={{
                          height: "370px",
                        }}
                        className="flex aspect-square items-center justify-center"
                      >
                        <Image
                          width={1152}
                          height={372}
                          src={image}
                          alt={title}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Campaigns;
