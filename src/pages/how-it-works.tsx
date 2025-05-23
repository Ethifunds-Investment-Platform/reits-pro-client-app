import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  CircleDollarSign,
  FileText,
  PieChart,
  Search,
  ShieldCheck,
  Building,
  BadgeCheck,
  Percent,
  ClipboardList,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-navy-800 mb-4">How RealtyRise Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're making real estate investing more accessible, transparent, and efficient 
          by connecting investors with pre-vetted real estate opportunities.
        </p>
      </div>

      {/* Main process steps */}
      <div className="mb-20">
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-navy-200 z-0"></div>
          
          <div className="space-y-16">
            {/* Step 1: Browse Properties */}
            <div className="relative z-10">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0">
                  <div className="md:text-right">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navy-100 text-navy-800 mb-4">
                      <Search className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-800 mb-3">Browse Investment Opportunities</h2>
                    <p className="text-gray-600">
                      Explore our curated selection of real estate investments, from new development projects 
                      to cash-flowing properties. Each listing includes detailed information about the property, 
                      expected returns, and investment terms.
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center h-16 w-16 rounded-full bg-navy-800 text-white border-4 border-white shadow-md">
                  <span className="text-xl font-bold">1</span>
                </div>
                
                <div className="md:w-1/2 md:pl-16">
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-gray-200 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
                        alt="Browse properties" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Step 2: Research and Due Diligence */}
            <div className="relative z-10">
              <div className="md:flex items-center flex-row-reverse">
                <div className="md:w-1/2 md:pl-16 mb-8 md:mb-0">
                  <div>
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navy-100 text-navy-800 mb-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-800 mb-3">Research and Due Diligence</h2>
                    <p className="text-gray-600">
                      Access comprehensive information about each investment opportunity, including financial 
                      projections, developer track records, market analyses, and legal documentation. Our 
                      platform provides all the information you need to make informed investment decisions.
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center h-16 w-16 rounded-full bg-navy-800 text-white border-4 border-white shadow-md">
                  <span className="text-xl font-bold">2</span>
                </div>
                
                <div className="md:w-1/2 md:pr-16">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                          <span className="font-medium text-navy-800">Developer Profile</span>
                          <BadgeCheck className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                          <span className="font-medium text-navy-800">Financial Projections</span>
                          <PieChart className="h-5 w-5 text-navy-600" />
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                          <span className="font-medium text-navy-800">Market Analysis</span>
                          <Search className="h-5 w-5 text-navy-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-navy-800">Legal Documentation</span>
                          <ClipboardList className="h-5 w-5 text-navy-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Step 3: Invest Securely */}
            <div className="relative z-10">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0">
                  <div className="md:text-right">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navy-100 text-navy-800 mb-4">
                      <CircleDollarSign className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-800 mb-3">Invest Securely</h2>
                    <p className="text-gray-600">
                      Invest with confidence through our secure platform. Choose your investment amount 
                      (starting from the minimum investment threshold), complete the necessary paperwork 
                      electronically, and fund your investment using your preferred payment method.
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center h-16 w-16 rounded-full bg-navy-800 text-white border-4 border-white shadow-md">
                  <span className="text-xl font-bold">3</span>
                </div>
                
                <div className="md:w-1/2 md:pl-16">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="text-sm text-gray-600 mb-1">Investment Amount</div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <div className="border border-gray-300 rounded-md px-8 py-2 bg-gray-50">50,000</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">Payment Method</div>
                          <div className="flex items-center space-x-4">
                            <div className="border border-navy-600 rounded-md px-4 py-2 flex items-center bg-navy-50">
                              <CreditCard className="h-4 w-4 text-navy-800 mr-2" />
                              <span className="text-sm font-medium text-navy-800">Bank Transfer</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-navy-800 hover:bg-navy-700 text-white">
                          Complete Investment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Step 4: Track and Manage */}
            <div className="relative z-10">
              <div className="md:flex items-center flex-row-reverse">
                <div className="md:w-1/2 md:pl-16 mb-8 md:mb-0">
                  <div>
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navy-100 text-navy-800 mb-4">
                      <Percent className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-800 mb-3">Track and Receive Returns</h2>
                    <p className="text-gray-600">
                      Monitor your investments through our intuitive dashboard. Receive regular updates 
                      on your investment's performance, project milestones, and distributions. Earnings 
                      are automatically deposited into your account based on the distribution schedule.
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center h-16 w-16 rounded-full bg-navy-800 text-white border-4 border-white shadow-md">
                  <span className="text-xl font-bold">4</span>
                </div>
                
                <div className="md:w-1/2 md:pr-16">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-navy-800">Portfolio Value</h3>
                          <span className="text-lg font-bold text-navy-800">$125,000</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Skyline Heights</span>
                            <span className="font-medium text-gray-900">$75,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-navy-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Riverfront Office</span>
                            <span className="font-medium text-gray-900">$50,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-navy-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total Returns</span>
                            <span className="text-lg font-bold text-green-600">+$15,750</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Approach */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Our Approach to Real Estate Investing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're redefining real estate investment by focusing on quality, transparency, and investor protection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-navy-100 text-navy-800 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Rigorous Vetting</h3>
              <p className="text-gray-600">
                We carefully evaluate each property and developer. Only high-quality opportunities that meet our 
                strict investment criteria are presented on our platform.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-navy-100 text-navy-800 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Experienced Developers</h3>
              <p className="text-gray-600">
                We partner with established real estate developers with proven track records of delivering successful 
                projects and generating strong returns for investors.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-navy-100 text-navy-800 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Complete Transparency</h3>
              <p className="text-gray-600">
                We provide comprehensive information about each investment opportunity, including detailed financials, 
                risk factors, and fee structures. No hidden surprises.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* FAQ section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about how RealtyRise is revolutionizing real estate investing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-navy-800">Who can invest on RealtyRise?</h3>
            <p className="text-gray-600">
              Our platform is open to accredited investors who meet certain income or net worth requirements, 
              as defined by securities regulations. Some offerings may also be available to non-accredited investors.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-navy-800">What is the minimum investment?</h3>
            <p className="text-gray-600">
              Minimum investments vary by opportunity, typically starting at $25,000 and ranging up to $100,000 
              for larger developments. Each listing clearly indicates the minimum investment requirement.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-navy-800">How are returns distributed?</h3>
            <p className="text-gray-600">
              Investment returns are typically distributed on a quarterly basis, but this may vary by project. 
              Distributions are automatically deposited into your linked bank account or can be reinvested.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-navy-800">Are the investments liquid?</h3>
            <p className="text-gray-600">
              Real estate investments are generally illiquid, meaning your capital is committed for the duration 
              of the investment term (typically 3-7 years). Some opportunities may offer early redemption options.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-navy-800">What fees does RealtyRise charge?</h3>
            <p className="text-gray-600">
              RealtyRise typically charges a 1-2% annual management fee based on your investment amount. 
              All fees are clearly disclosed for each investment opportunity before you invest.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-navy-800">How are projects selected?</h3>
            <p className="text-gray-600">
              Our investment team evaluates each potential project based on market fundamentals, developer track record, 
              financial projections, and risk assessment. Less than 5% of reviewed projects make it onto our platform.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-navy-800 rounded-xl overflow-hidden">
        <div className="px-6 py-12 sm:px-12 lg:px-16">
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Ready to start investing in real estate?</h2>
              <p className="mt-2 text-navy-100">
                Browse our curated selection of investment opportunities and start building your real estate portfolio today.
              </p>
            </div>
            <div className="md:w-1/3 md:text-right">
              <Button asChild className="bg-navy-800 hover:bg-navy-700 text-white font-semibold border border-white">
                <Link to="/properties" className="inline-flex items-center">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
