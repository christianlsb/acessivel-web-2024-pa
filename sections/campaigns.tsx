import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import sectionImage from "../assets/img/png/section-image-form.png";
import Image from "next/image";

const Campaigns = () => {
  const dataImg = [
    {
      img: sectionImage,
      title: "Campaign 1",
      description: "Description 1",
    },
    {
      img: sectionImage,
      title: "Campaign 2",
      description: "Description 2",
    },
    {
      img: sectionImage,
      title: "Campaign 3",
      description: "Description 3",
    },
    {
      img: sectionImage,
      title: "Campaign 4",
      description: "Description 4",
    },
    {
      img: sectionImage,
      title: "Campaign 5",
      description: "Description 5",
    },
  ];
  return (
    <>
      <section id="campaigns">
        <div className="grid content">
          <Carousel className="w-full">
            <CarouselContent>
              {dataImg.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="h-[370px]">
                      <CardContent
                        style={{
                          height: "370px",
                        }}
                        className="flex aspect-square items-center justify-center p-6"
                      >
                        <Image src={item.img} alt="" />
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
