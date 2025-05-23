
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleDollarSign, MapPin, Percent, Users } from "lucide-react";
import { Link } from "react-router-dom";

export interface PropertyData {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  price: number;
  expectedReturn: number;
  type: "development" | "completed";
  fundingProgress: number;
  investorsCount: number;
  minimumInvestment: number;
}

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const {
    id,
    title,
    location,
    imageUrl,
    price,
    expectedReturn,
    type,
    fundingProgress,
    investorsCount,
    minimumInvestment,
  } = property;

  return (
    <Card className="property-card h-full flex flex-col">
      <Link to={`/properties/${id}`} className="relative overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <Badge 
          className={`absolute top-3 right-3 ${
            type === "development" 
              ? "bg-gold-500 hover:bg-gold-600" 
              : "bg-navy-600 hover:bg-navy-700"
          }`}
        >
          {type === "development" ? "Development" : "Completed"}
        </Badge>
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-navy-600 h-2.5 rounded-full" 
              style={{ width: `${fundingProgress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${price.toLocaleString()} total</span>
            <span>{fundingProgress}% Funded</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 gap-4 flex-wrap">
        <div className="flex items-center space-x-1 text-sm">
          <Percent className="h-4 w-4 text-gold-500" />
          <span className="text-gray-700">{expectedReturn}% Return</span>
        </div>
        
        <div className="flex items-center space-x-1 text-sm">
          <CircleDollarSign className="h-4 w-4 text-gold-500" />
          <span className="text-gray-700">${minimumInvestment.toLocaleString()} Min</span>
        </div>
        
        <div className="flex items-center space-x-1 text-sm">
          <Users className="h-4 w-4 text-gold-500" />
          <span className="text-gray-700">{investorsCount} Investors</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
