import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CarFormData {
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  location: string;
  color: string;
  owner: string;
  sellerType: string;
  engine: string;
  maxPower: string;
  maxTorque: string;
  drivetrain: string;
  length: number;
  width: number;
  height: number;
  seatingCapacity: number;
  fuelTankCapacity: number;
}

const CarPredictionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CarFormData>({
    make: "",
    model: "",
    year: 2020,
    fuelType: "",
    transmission: "",
    location: "",
    color: "",
    owner: "",
    sellerType: "",
    engine: "",
    maxPower: "",
    maxTorque: "",
    drivetrain: "",
    length: 0,
    width: 0,
    height: 0,
    seatingCapacity: 5,
    fuelTankCapacity: 50,
  });
  
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CarFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const simulatePrediction = () => {
    // Simulate ML prediction with some realistic logic
    const basePrice = 500000; // Base price in rupees
    const yearFactor = (formData.year - 2000) * 25000;
    const engineFactor = formData.maxPower ? parseInt(formData.maxPower) * 100 : 50000;
    const randomFactor = Math.random() * 200000;
    
    return Math.round(basePrice + yearFactor + engineFactor + randomFactor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const price = simulatePrediction();
      setPredictedPrice(price);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: "Car price has been successfully predicted!",
      });
    }, 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-gradient-secondary border-border/50 shadow-automotive">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Car Details
          </CardTitle>
          <CardDescription>
            Enter your car specifications for price prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Select onValueChange={(value) => handleInputChange('make', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="tata">Tata</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="mahindra">Mahindra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="e.g., Swift, i20, Nexon"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  min="1990"
                  max="2024"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select onValueChange={(value) => handleInputChange('fuelType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select onValueChange={(value) => handleInputChange('transmission', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="owner">Owner Type</Label>
                <Select onValueChange={(value) => handleInputChange('owner', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Owner</SelectItem>
                    <SelectItem value="second">Second Owner</SelectItem>
                    <SelectItem value="third">Third Owner</SelectItem>
                    <SelectItem value="fourth">Fourth+ Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="length">Length (mm)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="e.g., 4000"
                  value={formData.length || ""}
                  onChange={(e) => handleInputChange('length', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor="width">Width (mm)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="e.g., 1750"
                  value={formData.width || ""}
                  onChange={(e) => handleInputChange('width', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor="height">Height (mm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 1600"
                  value={formData.height || ""}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:shadow-automotive transition-all duration-300"
            >
              {isLoading ? "Predicting..." : "Predict Price"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Prediction Result */}
      <Card className="bg-gradient-secondary border-border/50 shadow-automotive">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Price Prediction
          </CardTitle>
          <CardDescription>
            AI-powered car price estimation
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px]">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Analyzing car specifications...</p>
            </div>
          ) : predictedPrice ? (
            <div className="text-center">
              <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                ₹{predictedPrice.toLocaleString('en-IN')}
              </h3>
              <p className="text-muted-foreground">Estimated Market Price</p>
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Price Range</p>
                <div className="flex justify-between text-sm">
                  <span>₹{Math.round(predictedPrice * 0.9).toLocaleString('en-IN')}</span>
                  <span>₹{Math.round(predictedPrice * 1.1).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="w-24 h-24 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p>Fill in the car details to get price prediction</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarPredictionForm;