import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHistory, FaSpinner, FaMoneyBillWave, FaUsers, FaMapMarkedAlt, FaRobot, FaGlobeAmericas, FaCommentDots, FaCube } from 'react-icons/fa';
import { ethers } from 'ethers';
import TouristNavbar from '../components/TouristNavbar';
import '../styles/TouristDashboard.css'; // Import custom CSS for Tourist Dashboard

const TouristDashboard = ({ account, contracts }) => {
  const navigate = useNavigate();
  // State variables
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState(18);

  // Load payments and token details on component mount
  useEffect(() => {
    if (contracts.paymentSystem && contracts.paymentToken && account) {
      loadPaymentHistory();
      loadTokenDetails();
    }
  }, [contracts.paymentSystem, contracts.paymentToken, account]);

  // Load payment history from the contract
  const loadPaymentHistory = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get payment indices for the tourist
      const paymentIndices = await contracts.paymentSystem.getTouristPayments(account);
      
      // Get payment details for each index
      const paymentDetails = await Promise.all(
        paymentIndices.map(async (index) => {
          const payment = await contracts.paymentSystem.getPaymentDetails(index);
          
          // Get guide details
          const guideDetails = await contracts.guideRegistry.getGuideDetails(payment.guide);
          
          return {
            index: index.toString(),
            tourist: payment.tourist,
            guide: payment.guide,
            guideName: guideDetails[0],
            serviceType: guideDetails[1],
            amount: payment.amount.toString(),
            timestamp: payment.timestamp.toString(),
            serviceDescription: payment.serviceDescription
          };
        })
      );
      
      // Sort payments by timestamp (newest first)
      const sortedPayments = paymentDetails.sort((a, b) => 
        parseInt(b.timestamp) - parseInt(a.timestamp)
      );
      
      setPayments(sortedPayments);
    } catch (err) {
      console.error('Error loading payment history:', err);
      setError('Failed to load payment history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load token details
  const loadTokenDetails = async () => {
    try {
      // Get token symbol
      const symbol = await contracts.paymentToken.symbol();
      setTokenSymbol(symbol);
      
      // Get token decimals
      const decimals = await contracts.paymentToken.decimals();
      setTokenDecimals(decimals);
      
      // Get user's token balance
      const balance = await contracts.paymentToken.balanceOf(account);
      setTokenBalance(balance.toString());
    } catch (err) {
      console.error('Error loading token details:', err);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  // Format token amount for display
  const formatTokenAmount = (amount) => {
    if (!amount) return '0';
    return ethers.formatUnits(amount, tokenDecimals);
  };

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear local storage, reset account state, then redirect to login
    console.log("Logging out...");
    // Example: clear account and redirect
    // setAccount(null); 
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <TouristNavbar account={account} onLogout={handleLogout} />
      <Container className="tourist-dashboard">
        <h2 className="my-4 text-center">Welcome, {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Tourist!'}</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Row className="mb-4 dashboard-cards">
          <Col md={6} lg={4} className="mb-3">
            <Card className="dashboard-card clickable-card" onClick={() => navigate('/guides')}> {/* Link to Guides */}
              <Card.Body className="text-center">
                <FaUsers size={40} className="card-icon" />
                <Card.Title>Verified Guides Available</Card.Title>
                <Card.Text>Browse and book verified local guides.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Card className="dashboard-card clickable-card" onClick={() => navigate('/map')}> {/* Link to Tourist Map */}
              <Card.Body className="text-center">
                <FaMapMarkedAlt size={40} className="card-icon" />
                <Card.Title>Tourist Map</Card.Title>
                <Card.Text>Explore Jharkhand tourist destinations.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Card className="dashboard-card clickable-card" onClick={() => navigate('/ai-assistant')}> {/* Link to AI Assistant */}
              <Card.Body className="text-center">
                <FaRobot size={40} className="card-icon" />
                <Card.Title>AI Tourism Assistant</Card.Title>
                <Card.Text>Get personalized trip recommendations.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Card className="dashboard-card clickable-card" onClick={() => navigate('/jharkhand360')}> {/* Link to Jharkhand 360 */}
              <Card.Body className="text-center">
                <FaGlobeAmericas size={40} className="card-icon" />
                <Card.Title>Jharkhand 360 View</Card.Title>
                <Card.Text>Experience immersive 360° virtual tours.</Card.Text>
              </Card.Body>
            </Card>
          
          <Col md={6} lg={4} className="mb-3">
            <Card
              className="dashboard-card clickable-card"
              onClick={() => window.open('file:///D:/nexterax/ARVR/navigation/jharkhand_nav_streetview.html', '_blank')}
            >
              <Card.Body className="text-center">
                <FaCube size={40} className="card-icon" />
                <Card.Title>3D Navigation</Card.Title>
                <Card.Text>Explore Jharkhand in 3D street view.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={4} className="mb-4">
            <Card className="h-100 balance-card">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <FaMoneyBillWave size={50} className="mb-3 balance-icon" />
                <Card.Title className="text-center">Your Balance</Card.Title>
                <hr className="w-75" />
                <h2 className="mb-0 display-4 balance-amount">
                  {formatTokenAmount(tokenBalance)} {tokenSymbol}
                </h2>
                <p className="text-muted mt-2">Available for payments to guides</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8} className="mb-4">
            <Card className="h-100 payment-history-card">
              <Card.Body>
                <Card.Title className="mb-4 text-center"><FaHistory className="me-2" /> Payment History</Card.Title>
                <hr />
                {loading ? (
                  <div className="spinner-container">
                    <FaSpinner className="fa-spin" size={30} />
                  </div>
                ) : payments.length === 0 ? (
                  <Alert variant="info" className="text-center">
                    You haven't made any payments yet. Visit the <Link to="/guides">Guides</Link> page to find and pay for services.
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover className="payment-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Guide</th>
                          <th>Service</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.index}>
                            <td>{formatDate(payment.timestamp)}</td>
                            <td>
                              <Link to={`/guide/${payment.guide}`}>
                                {payment.guideName || formatAddress(payment.guide)}
                              </Link>
                            </td>
                            <td>{payment.serviceDescription}</td>
                            <td>
                              {formatTokenAmount(payment.amount)} {tokenSymbol}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TouristDashboard;