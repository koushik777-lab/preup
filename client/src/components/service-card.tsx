import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ServiceCardProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

export default function ServiceCard({ name, description, image, onClick }: ServiceCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
      data-testid={`service-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240`;
        }}
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-primary">
          <span className="font-medium">Explore More</span>
          <ChevronRight className="w-4 h-4 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
}
