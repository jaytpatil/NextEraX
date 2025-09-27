import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaWallet, FaMapMarkerAlt, FaPalette, FaCamera, FaCalendarAlt, FaRoute, FaEnvelope, FaUserCheck, FaCertificate, FaMoneyBillWave } from 'react-icons/fa';

const Navigation = ({ account, connectWallet, isAdmin }) => {
  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" className="modern-navbar shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <img 
            src="/logo.svg" 
            width="35" 
            height="35" 
            className="d-inline-block align-top me-2" 
            alt="NexteraX Logo" 
          />
          NexteraX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              <span className="me-1">🏠</span>Home
            </Nav.Link>
            <Nav.Link href="#destinations" className="nav-link-custom">
              <FaMapMarkerAlt className="me-1" />Destinations
            </Nav.Link>
            <Nav.Link href="#culture" className="nav-link-custom">
              <FaPalette className="me-1" />Culture
            </Nav.Link>
            <Nav.Link href="#festivals" className="nav-link-custom">
              <FaCalendarAlt className="me-1" />Festivals
            </Nav.Link>
            <Nav.Link href="#gallery" className="nav-link-custom">
              <FaCamera className="me-1" />Gallery
            </Nav.Link>
            <Nav.Link href="#plan-trip" className="nav-link-custom">
              <FaRoute className="me-1" />Plan Your Trip
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">
              <FaEnvelope className="me-1" />Contact
            </Nav.Link>
            {/* Previous navigation items */}
            <Nav.Link as={Link} to="/guides" className="nav-link-custom">
              <FaUserCheck className="me-1" />Guides
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className="nav-link-custom">
                <FaCertificate className="me-1" />Admin Dashboard
              </Nav.Link>
            )}
            {account && !isAdmin && (
              <Nav.Link as={Link} to="/tourist" className="nav-link-custom">
                <FaMoneyBillWave className="me-1" />Tourist Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {account ? (
              <div className="d-flex align-items-center">
                <span className="text-dark me-2 wallet-address">
                  <FaWallet className="me-1" />
                  {formatAddress(account)}
                </span>
                {isAdmin && (
                  <span className="badge bg-warning text-dark me-3">Admin</span>
                )}
              </div>
            ) : (
              <Button variant="primary" onClick={connectWallet} className="modern-btn">
                <FaWallet className="me-2" />
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;