import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const universities = [
    {
      name: "University of Johannesburg",
      abbr: "UJ",
      logo: "https://www.go2ppo.com/wp-content/uploads/2022/10/uj_logo.png",
      description: "A vibrant institution known for innovative teaching and cutting-edge research in the heart of Johannesburg."
    },
    {
      name: "North-West University",
      abbr: "NWU",
      logo: "https://veldfiremedia.com/wp-content/uploads/2022/12/NWU-logo-1200x620-1.png",
      description: "A leading multi-campus university with excellence in teaching, learning, and community engagement."
    },
    {
      name: "University of Free State",
      abbr: "UFS",
      logo: "https://www.universityworldnews.com/images/articles/20231214083815687_5.jpg",
      description: "A historically rich institution offering diverse academic programs with a focus on transformation."
    },
    {
      name: "University of Western Cape",
      abbr: "UWC",
      logo: "https://www.sabcnews.com/sabcnews/wp-content/uploads/2018/01/uwc-logo.jpg",
      description: "Committed to social justice and academic excellence, producing leaders for a democratic South Africa."
    },
    {
      name: "Walter Sisulu University",
      abbr: "WSU",
      logo: "https://s3-eu-west-1.amazonaws.com/ppreviews-wsu-7194626983/25488518/thumb.png",
      description: "A comprehensive university serving the Eastern Cape with quality education and community development."
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "One Form, Multiple Apps",
      description: "Fill out a single intelligent application form that automatically adapts to each university's requirements."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI-Powered Automation",
      description: "Our intelligent system handles document formatting, submission timing, and follow-ups automatically."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Wide Network Access",
      description: "Connect with South Africa's top universities and receive personalized recommendations based on your profile."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Pricing",
      description: "Affordable application services with no hidden fees. Pay once, apply to multiple institutions seamlessly."
    }
  ];

  const stats = [
    { value: "50K+", label: "Applications Processed" },
    { value: "15+", label: "Partner Universities" },
    { value: "98%", label: "Success Rate" },
    { value: "24h", label: "Average Response" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 min-h-[90vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-blue-100 font-medium">Now accepting 2027 applications</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up delay-100">
              Apply to Multiple <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Universities
              </span> with One Form
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              We use AI to automate your university applications. Apply to South Africa's top institutions, track your progress, and get accepted all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
              <button
                onClick={() => navigate('/application')}
                className="group px-8 py-4 bg-white text-indigo-900 rounded-xl font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                Start Your Application
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-indigo-900 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              Why Choose UniApply
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Streamlined Applications, <br />
              <span className="text-indigo-600">Better Results</span>
            </h2>
            <p className="text-lg text-slate-600">
              We've revolutionized the university application process for South African students. No more repetitive forms, missed deadlines, or confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-slate-100 hover:border-indigo-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section id="universities" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Supported Universities
            </h2>
            <p className="text-lg text-slate-600">
              We partner with leading South African universities to provide you with the best educational opportunities and streamlined admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {universities.map((university, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-indigo-200 hover:-translate-y-2"
              >
                <div className="h-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 group-hover:from-indigo-50 group-hover:to-blue-50 transition-colors duration-500">
                  <img 
                    src={university.logo} 
                    alt={university.name} 
                    className="max-h-20 w-auto object-contain filter group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                      {university.abbr}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1" title={university.name}>
                    {university.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {university.description}
                  </p>
                  
                  <button className="mt-4 w-full py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1 group/btn">
                    Learn more
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 mb-4">And many more institutions coming soon...</p>
            <div className="flex justify-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span className="w-2 h-2 bg-indigo-300 rounded-full"></span>
              <span className="w-2 h-2 bg-indigo-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to apply to multiple universities without the headache.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Fill Out One Form",
                description: "Complete our intelligent application form with your academic details, preferences, and supporting documents.",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02",
                title: "Select Universities",
                description: "Choose from our network of partner institutions. Our AI matches you with the best-fit programs.",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                step: "03",
                title: "We Handle The Rest",
                description: "Sit back while we format, submit, and track your applications. Get updates in real-time.",
                color: "from-purple-500 to-purple-600"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-slate-50 rounded-2xl p-8 h-full border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
                
                {/* Connector Line (hidden on mobile) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-slate-300">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-slate-300 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-blue-200 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Students Love UniApply
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                quote: "I applied to 5 universities in under 30 minutes. Got accepted to my dream program at UJ within 2 weeks!",
                author: "Thabo M.",
                role: "UJ Student, BCom Accounting"
              },
              {
                quote: "The AI recommendations were spot on. I wouldn't have considered NWU otherwise, and it's the perfect fit for me.",
                author: "Lisa K.",
                role: "NWU Student, BSc Computer Science"
              },
              {
                quote: "No more filling out the same information 10 times. This platform saved me weeks of work during matric finals.",
                author: "James N.",
                role: "UFS Student, BA Psychology"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-blue-100/90 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-blue-200/70">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your <br />University Journey?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join 50,000+ students who have successfully applied to South Africa's top universities using our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/application')}
                className="group px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Get Started Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            <p className="mt-6 text-blue-200/80 text-sm">
              Free application assessment • No hidden fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;