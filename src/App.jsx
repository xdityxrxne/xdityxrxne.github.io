import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Award, TrendingUp, Zap, Database, Brain, Cloud, ChevronDown, Menu, X } from 'lucide-react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.fillStyle = 'rgba(100, 255, 218, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />;
};

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);
  
  return <span ref={countRef}>{count}{suffix}</span>;
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delay-1 {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        
        .animate-slide-up-delay-3 {
          animation: slide-up 0.8s ease-out 0.6s both;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-emerald-400">AR</span>
            <span className="text-slate-100">.</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm transition-colors hover:text-emerald-400 ${activeSection === item.toLowerCase() ? 'text-emerald-400' : 'text-slate-300'}`}
              >
                {item}
              </button>
            ))}
            <a 
              href="https://drive.google.com/file/d/your-resume-link" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-emerald-400 text-emerald-400 rounded-md hover:bg-emerald-400 hover:text-slate-950 transition-all"
            >
              Resume
            </a>
          </div>
          
          <button 
            className="md:hidden text-emerald-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-md">
            <div className="px-6 py-4 flex flex-col gap-4">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleNetwork />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-emerald-400 text-sm mb-6">
              Available for Opportunities
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Aditya Rane
          </h1>
          
          <p className="text-xl md:text-2xl text-emerald-400 mb-4 animate-slide-up-delay-1">
            Data Analyst • AI Engineer • Business Strategist
          </p>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up-delay-2">
            Transforming data into <span className="text-emerald-400 font-semibold">£1M+ revenue impact</span> through AI-driven solutions. 
            Gold Medalist engineer with national hackathon wins, patents, and a track record of delivering 
            measurable business outcomes.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-slide-up-delay-3">
            <a 
              href="mailto:rane5973@gmail.com"
              className="px-8 py-3 bg-emerald-400 text-slate-950 rounded-md hover:bg-emerald-300 transition-all font-semibold shadow-lg shadow-emerald-400/20"
            >
              Get in Touch
            </a>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 border border-emerald-400 text-emerald-400 rounded-md hover:bg-emerald-400 hover:text-slate-950 transition-all"
            >
              View Work
            </button>
          </div>
          
          <div className="flex gap-6 justify-center animate-fade-in-delay">
            <a href="https://github.com/xdityxrxne" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/aditya-rane-802098140/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:rane5973@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-emerald-400/50" />
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                £<AnimatedCounter end={1} />M+
              </div>
              <div className="text-slate-400 text-sm">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                <AnimatedCounter end={85} />%
              </div>
              <div className="text-slate-400 text-sm">CTR Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                <AnimatedCounter end={2} />
              </div>
              <div className="text-slate-400 text-sm">Patents Secured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                AIR <AnimatedCounter end={4} />
              </div>
              <div className="text-slate-400 text-sm">National Hackathon</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About <span className="text-emerald-400">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                I'm a <span className="text-emerald-400 font-semibold">data professional</span> who bridges the gap between 
                analytics, engineering, and business strategy. My work has directly contributed to £1M+ in revenue through 
                AI-powered solutions at MiQ Digital, where I architect data pipelines and build intelligent systems that drive 
                measurable outcomes.
              </p>
              
              <p>
                With a <span className="text-emerald-400 font-semibold">Gold Medal in B.Tech Electronics</span> and recognition 
                as a national-level hackathon winner (AIR 4, Rank 1), I combine deep technical expertise with a relentless 
                focus on impact. I've secured two patents, published research in IEEE, and led a 50+ member robotics club.
              </p>
              
              <p>
                Currently pursuing advanced studies in <span className="text-emerald-400 font-semibold">AI & MLOps at IIIT Bangalore</span>, 
                I'm passionate about building production-grade AI systems that solve real problems. Whether it's optimizing 
                programmatic advertising with weather-sync algorithms or deploying real-time object detection pipelines, 
                I thrive at the intersection of data, AI, and business value.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
                <div className="flex items-start gap-4">
                  <TrendingUp className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Business Impact</h3>
                    <p className="text-slate-400 text-sm">
                      Every project I build is measured by its ROI. From £1M revenue solutions to 
                      85% CTR improvements, I focus on metrics that matter.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
                <div className="flex items-start gap-4">
                  <Brain className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI & Research</h3>
                    <p className="text-slate-400 text-sm">
                      Published in IEEE, trained models to 95% accuracy, and deployed real-time ML 
                      systems. I bring research rigor to production environments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
                <div className="flex items-start gap-4">
                  <Zap className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Full-Stack Data</h3>
                    <p className="text-slate-400 text-sm">
                      From ETL pipelines on AWS/Databricks to interactive dashboards in Tableau, 
                      I engineer complete data solutions end-to-end.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Professional <span className="text-emerald-400">Experience</span>
          </h2>
          
          <div className="space-y-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-emerald-400/30 transition-all group">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Data Analyst</h3>
                  <p className="text-emerald-400 font-semibold mb-1">MiQ Digital</p>
                  <p className="text-slate-500 text-sm">Global Programmatic Media Partner</p>
                </div>
                <div className="text-slate-400 text-sm mt-4 md:mt-0">Jan 2024 – Present</div>
              </div>
              
              <div className="space-y-3 text-slate-300">
                <div className="flex gap-3">
                  <span className="text-emerald-400 mt-1">▹</span>
                  <p>
                    <span className="text-emerald-400 font-semibold">Revenue Impact:</span> Designed a Trust Measurement Solution 
                    combining GenAI and internal APIs to define new KPIs, directly generating <span className="text-emerald-400 font-semibold">£1M in incremental revenue</span>
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="text-emerald-400 mt-1">▹</span>
                  <p>
                    <span className="text-emerald-400 font-semibold">Campaign Optimization:</span> Architected a weather-sync targeting algorithm 
                    using PySpark and weather APIs, increasing CTR by <span className="text-emerald-400 font-semibold">85%</span>
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="text-emerald-400 mt-1">▹</span>
                  <p>
                    <span className="text-emerald-400 font-semibold">Strategic Insights:</span> Partnered with cross-functional teams 
                    to deliver actionable insights across 10+ verticals, driving data-backed strategies for <span className="text-emerald-400 font-semibold">£5M+ in client investments</span>
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="text-emerald-400 mt-1">▹</span>
                  <p>
                    <span className="text-emerald-400 font-semibold">Pipeline Automation:</span> Engineered automated ETL pipelines 
                    on Databricks and AWS, reducing manual reporting time by <span className="text-emerald-400 font-semibold">15+ hours per week</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-2 text-amber-400">
                  <Award size={20} />
                  <span className="font-semibold">MiQ Impact Award (Q4 2024, Q2 2025)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-emerald-400/30 transition-all group">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">AI Research Intern</h3>
                  <p className="text-emerald-400 font-semibold mb-1">Symbiosis Centre for Applied AI</p>
                  <p className="text-slate-500 text-sm">Research & Development</p>
                </div>
                <div className="text-slate-400 text-sm mt-4 md:mt-0">Jul 2023 – Dec 2023</div>
              </div>
              
              <div className="space-y-3 text-slate-300">
                <div className="flex gap-3">
                  <span className="text-emerald-400 mt-1">▹</span>
                  <p>
                    <span className="text-emerald-400 font-semibold">Model Optimization:</span> Processed large-scale multimodal datasets 
                    (RGB + IR) to train object detection models, achieving <span className="text-emerald-400 font-semibold">95% accuracy</span>
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="text-emerald-400 mt-1">▹</span>
                  <p>
                    <span className="text-emerald-400 font-semibold">Deployment:</span> Deployed real-time detection analytics using Streamlit, 
                    enabling live monitoring and reducing data processing time by <span className="text-emerald-400 font-semibold">50%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-emerald-400/30 transition-all group hover:-translate-y-2 duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Database className="text-emerald-400" size={32} />
                  <a href="https://github.com/xdityxrxne" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">Market Intelligence Dashboard</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Built a predictive analytics tool using Python, Google APIs, and Prophet, delivering demand 
                  forecasting visualizations to support inventory planning decisions.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">Python</span>
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">Prophet</span>
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">APIs</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-emerald-400/30 transition-all group hover:-translate-y-2 duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Brain className="text-emerald-400" size={32} />
                  <a href="https://github.com/xdityxrxne" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">Intruder Detection System</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Developed a real-time computer vision pipeline using YOLOv8 and Flask, implementing 
                  automated alerts for security anomalies with high accuracy.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">YOLOv8</span>
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">Flask</span>
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">Computer Vision</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-emerald-400/30 transition-all group hover:-translate-y-2 duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="text-amber-400" size={32} />
                  <a href="https://github.com/xdityxrxne" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">Autonomous Medical Robot</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Led a team of four to build a robot with SLAM-based navigation and face detection. 
                  Secured a patent for a novel pill-dispensing mechanism.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-400/10 text-amber-400 text-xs rounded-full">Patented</span>
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">SLAM</span>
                  <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full">Robotics</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://github.com/xdityxrxne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-400 text-emerald-400 rounded-md hover:bg-emerald-400 hover:text-slate-950 transition-all"
            >
              View All Projects <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Technical <span className="text-emerald-400">Arsenal</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold">Data Analysis</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Pandas', 'NumPy', 'SQL', 'A/B Testing'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold">BI & Visualization</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Tableau', 'Power BI', 'Excel', 'Folium'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold">Data Engineering</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'Databricks', 'PySpark', 'ETL', 'MongoDB'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold">Machine Learning</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Scikit-learn', 'TensorFlow', 'NLP', 'YOLOv8'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold">GenAI & LLMs</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Prompt Engineering', 'LLM Integration', 'Streamlit'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold">Leadership</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Stakeholder Management', 'Strategic Planning'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Recognition & <span className="text-emerald-400">Achievements</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Award className="text-amber-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Gold Medalist</h3>
                  <p className="text-slate-300 mb-2">B.Tech in Electronics & Telecommunication</p>
                  <p className="text-slate-400 text-sm">GPA: 8.9/10.0 • Symbiosis Institute of Technology (2024)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 border border-emerald-400/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Award className="text-emerald-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">National Hackathon Winner</h3>
                  <p className="text-slate-300 mb-2">AIR 4 – National Computer Vision Hackathon (2023)</p>
                  <p className="text-slate-400 text-sm">Rank 1 – FlytBase Global Hackathon (2023)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 border border-emerald-400/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Award className="text-emerald-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">MiQ Impact Award</h3>
                  <p className="text-slate-300 mb-2">Awarded Twice (Q4 2024, Q2 2025)</p>
                  <p className="text-slate-400 text-sm">For exceptional contributions to business innovation</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400/10 to-blue-600/10 border border-blue-400/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Award className="text-blue-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Leadership</h3>
                  <p className="text-slate-300 mb-2">President – Robotics Club</p>
                  <p className="text-slate-400 text-sm">Led 50+ members at Symbiosis Institute of Technology</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Patents & Publications</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-emerald-400 font-semibold mb-3">Patents Secured</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-emerald-400">▹</span>
                    <span>Smart Waste Management System (2023)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">▹</span>
                    <span>Autonomous Healthcare Robot (2023)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-emerald-400 font-semibold mb-3">Research Publications</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-emerald-400">▹</span>
                    <span>IEEE Xplore: Automated Crop Health</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400">▹</span>
                    <span>IET Smart Cities: Urban Infrastructure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Let's <span className="text-emerald-400">Connect</span>
          </h2>
          
          <p className="text-slate-400 text-center mb-12 text-lg">
            I'm currently open to new opportunities in data analytics, AI engineering, and business intelligence roles.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a 
              href="mailto:rane5973@gmail.com"
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all text-center group"
            >
              <Mail className="text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-slate-400 text-sm">rane5973@gmail.com</p>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/aditya-rane-802098140/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all text-center group"
            >
              <Linkedin className="text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-slate-400 text-sm">Connect with me</p>
            </a>
            
            <a 
              href="https://github.com/xdityxrxne"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-emerald-400/30 transition-all text-center group"
            >
              <Github className="text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-slate-400 text-sm">View my code</p>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-slate-500 mb-2">📍 Based in Bangalore, India</p>
            <p className="text-slate-500">📞 +91 98493 09833</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            Designed & Built by Aditya Rane • 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
