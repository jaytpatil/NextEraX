import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaTree, FaMountain, FaWater, FaPaw, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Home = ({ account, connectWallet }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sliderImages = [
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Netarhat - The Queen of Chotanagpur',
      description: 'Experience breathtaking sunsets and panoramic views'
    },
    {
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Hundru Falls - Majestic Waterfall',
      description: 'Witness the power of nature in its purest form'
    },
    {
      src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Betla National Park - Wildlife Sanctuary',
      description: 'Discover rich biodiversity and rare wildlife'
    },
    {
      src: 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Baidyanath Dham - Sacred Temple',
      description: 'Spiritual journey to one of the 12 Jyotirlingas'
    }
  ];

  const highlights = [
    {
      icon: <FaTree />,
      iconClass: 'forest',
      title: 'Netarhat',
      description: 'Known as the "Queen of Chotanagpur", Netarhat offers stunning hill station views, dense forests, and the famous Magnolia Point for spectacular sunsets.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaMountain />,
      iconClass: 'temple',
      title: 'Baidyanath Dham',
      description: 'One of the 12 Jyotirlingas, this sacred temple in Deoghar is a major pilgrimage destination with deep spiritual significance.',
      image: 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaWater />,
      iconClass: 'waterfall',
      title: 'Hundru Falls',
      description: 'One of the most spectacular waterfalls in Jharkhand, dropping from a height of 320 feet into the Subarnarekha River.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaPaw />,
      iconClass: 'wildlife',
      title: 'Betla National Park',
      description: 'Rich biodiversity with tigers, elephants, and various bird species. Experience wildlife safaris in pristine natural habitat.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Jharkhand</h1>
          <p>The Land of Forests & Waterfalls</p>
          {!account ? (
            <Button 
              className="hero-btn"
              onClick={connectWallet}
            >
              Connect Wallet to Explore
            </Button>
          ) : (
            <Link to="/guides" className="hero-btn">
              Explore Now
            </Link>
          )}
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="content-section" id="destinations">
        <Container>
          <h2 className="section-title">Jharkhand's Magnificent Attractions</h2>
          <div className="image-slider">
            <img 
              src={sliderImages[currentSlide].src} 
              alt={sliderImages[currentSlide].title}
              className="slider-image"
            />
            <button className="slider-nav prev" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button className="slider-nav next" onClick={nextSlide}>
              <FaChevronRight />
            </button>
            <div className="slider-dots">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Introduction Section */}
      <section className="content-section" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="section-title">Welcome to Jharkhand Tourism</h2>
              <p className="lead">
                Jharkhand, the "Land of Forests", is a treasure trove of natural beauty, rich cultural heritage, 
                and spiritual significance. From the misty hills of Netarhat to the sacred temples of Deoghar, 
                from cascading waterfalls to diverse wildlife, Jharkhand offers an unforgettable journey through 
                India's heartland.
              </p>
              <p>
                Experience the perfect blend of adventure, spirituality, and natural beauty as you explore 
                this enchanting state. Our blockchain-powered platform connects you with verified local guides 
                who will help you discover the hidden gems of Jharkhand while ensuring secure and transparent transactions.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Highlights Grid */}
      <section className="content-section">
        <Container>
          <h2 className="section-title">Must-Visit Destinations</h2>
          <Row>
            {highlights.map((highlight, index) => (
              <Col lg={6} md={6} className="mb-4" key={index}>
                <div className="highlight-card">
                  <div className={`highlight-icon ${highlight.iconClass}`}>
                    {highlight.icon}
                  </div>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="content-section" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <h2 className="section-title">How NexteraX Works</h2>
          <Row>
            <Col lg={6} className="mb-4">
              <div className="highlight-card">
                <h4>For Tourists</h4>
                <ol className="text-start">
                  <li>Connect your MetaMask wallet</li>
                  <li>Browse verified guides and their services</li>
                  <li>View guide certifications on the blockchain</li>
                  <li>Make secure payments directly to guides</li>
                  <li>Enjoy your tour with confidence</li>
                </ol>
              </div>
            </Col>
            <Col lg={6} className="mb-4">
              <div className="highlight-card">
                <h4>For Guides</h4>
                <ol className="text-start">
                  <li>Get registered by platform administrators</li>
                  <li>Receive verification and digital certification</li>
                  <li>Showcase your services to tourists</li>
                  <li>Receive direct payments to your wallet</li>
                  <li>Build your reputation on the blockchain</li>
                </ol>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <Container>
          <Row>
            <Col lg={4} className="mb-4">
              <div className="footer-brand">Jharkhand Tourism - NexteraX</div>
              <p>
                Your gateway to authentic Jharkhand experiences. 
                Connecting tourists with verified local guides through blockchain technology.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon"><FaFacebook /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
                <a href="#" className="social-icon"><FaLinkedin /></a>
                <a href="#" className="social-icon"><FaYoutube /></a>
              </div>
            </Col>
            <Col lg={4} className="mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#destinations" className="text-light">Destinations</a></li>
                <li><a href="#culture" className="text-light">Culture</a></li>
                <li><a href="#festivals" className="text-light">Festivals</a></li>
                <li><a href="#gallery" className="text-light">Gallery</a></li>
                <li><a href="#plan-trip" className="text-light">Plan Your Trip</a></li>
              </ul>
            </Col>
            <Col lg={4} className="mb-4">
              <h5>Contact Info</h5>
              <p>Jharkhand Tourism Department</p>
              <p>Ranchi, Jharkhand, India</p>
              <p>Email: info@jharkhandtourism.com</p>
              <p>Phone: +91-XXX-XXXXXXX</p>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row>
            <Col md={6}>
              <p>&copy; 2024 Jharkhand Tourism - NexteraX. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <a href="#" className="text-light me-3">Privacy Policy</a>
              <a href="#" className="text-light">Terms of Service</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;