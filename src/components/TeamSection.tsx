import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AutoScroll from 'embla-carousel-auto-scroll';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Olubukola Martins",
    role: "Team Lead",
    image: "https://res.cloudinary.com/detc4yjdi/image/upload/v1746353220/Bukola-Afritap_toqtfc.png",
    bio: "Technical PM | Business Developer"
  },
  {
    id: 2,
    name: "Abdulrahman Bin Umar",
    role: "Mobile Developer",
    image: "https://res.cloudinary.com/detc4yjdi/image/upload/v1746353209/Abdul-Afritap_abnbnj.png",
    bio: "AI specialist | mobile developer "
  },
  {
    id: 3,
    name: "Similoluwa Abidoye",
    role: "Blockchain developer",
    image: "https://res.cloudinary.com/detc4yjdi/image/upload/v1746352917/Simi-Afritap_weeyx4.png",
    bio: "Blockchain developer | Software engineer "
  },
  {
    id: 4,
    name: "Bolaji Oluwatobi",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/detc4yjdi/image/upload/v1746352901/Tcrown-Afritap_krrane.png",
    bio: "Blockchain || Software developer"
  },
//   {
//     id: 5,
//     name: "Fatima Diallo",
//     role: "Head of Marketing",
//     image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
//     bio: "Digital marketing strategist focused on financial inclusion"
//   },
//   {
//     id: 6,
//     name: "Chidi Okonkwo",
//     role: "Financial Advisor",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
//     bio: "Former banking executive with expertise in microfinance solutions"
//   },
];

const TeamSection = () => {
  const plugin = React.useMemo(() => AutoScroll({ speed: 0.5 }), []);

  return (
    <section id="team" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-[#2E7D32]">Team</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The passionate experts behind AfriTap working to transform financial access across Africa.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {teamMembers.map((member) => (
              <CarouselItem key={member.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center p-6">
                      <Avatar className="w-24 h-24 mb-4 border-2 border-[#2E7D32]">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-[#2E7D32] font-medium text-sm">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 text-center">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative static left-0 translate-y-0 hover:bg-[#2E7D32] hover:text-white" />
            <CarouselNext className="relative static right-0 translate-y-0 hover:bg-[#2E7D32] hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TeamSection;
