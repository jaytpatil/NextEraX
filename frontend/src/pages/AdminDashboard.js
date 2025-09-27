import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { FaUserPlus, FaUserCheck, FaSpinner } from 'react-icons/fa';

const AdminDashboard = ({ account, isAdmin, contracts }) => {
  // State variables
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [newGuide, setNewGuide] = useState({
    address: '',
    name: '',
    serviceType: ''
  });

  // Load guides on component mount
  useEffect(() => {
    if (contracts.guideRegistry) {
      loadGuides();
    }
  }, [contracts.guideRegistry]);

  // Load all guides from the contract
  const loadGuides = async () => {
    try {
      setLoading(true);
      setError('');
      
      const guideAddresses = await contracts.guideRegistry.getAllGuideAddresses();
      
      const guidesData = await Promise.all(
        guideAddresses.map(async (address) => {
          const details = await contracts.guideRegistry.getGuideDetails(address);
          return {
            address,
            name: details[0],
            serviceType: details[1],
            isVerified: details[2],
            verificationDate: details[3].toString(),
            tokenId: details[4].toString()
          };
        })
      );
      
      setGuides(guidesData);
    } catch (err) {
      console.error('Error loading guides:', err);
      setError('Failed to load guides. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuide({
      ...newGuide,
      [name]: value
    });
  };

  // Add a new guide
  const addGuide = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Validate inputs
      if (!newGuide.address || !newGuide.name || !newGuide.serviceType) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      // Call contract method
      const tx = await contracts.guideRegistry.addGuide(
        newGuide.address,
        newGuide.name,
        newGuide.serviceType
      );
      
      await tx.wait();
      
      // Reset form
      setNewGuide({
        address: '',
        name: '',
        serviceType: ''
      });
      
      setSuccess('Guide added successfully!');
      
      // Reload guides
      loadGuides();
    } catch (err) {
      console.error('Error adding guide:', err);
      setError('Failed to add guide. Please check the address and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify a guide
  const verifyGuide = async (address) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Call contract method
      const tx = await contracts.guideRegistry.verifyGuide(address);
      await tx.wait();
      
      setSuccess(`Guide ${address} verified successfully!`);
      
      // Reload guides
      loadGuides();
    } catch (err) {
      console.error('Error verifying guide:', err);
      setError('Failed to verify guide. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp || timestamp === '0') return 'Not verified';
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          You do not have admin access to this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-4">Admin Dashboard</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Row>
        <Col lg={5}>
          <Card className="admin-section">
            <Card.Body>
              <h3 className="mb-4">
                <FaUserPlus className="me-2" />
                Add New Guide
              </h3>
              <Form onSubmit={addGuide}>
                <Form.Group className="mb-3">
                  <Form.Label>Wallet Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={newGuide.address}
                    onChange={handleInputChange}
                    placeholder="0x..."
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Guide Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newGuide.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="serviceType"
                    value={newGuide.serviceType}
                    onChange={handleInputChange}
                    placeholder="e.g., City Tours, Food Tours, etc."
                    required
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="me-2 fa-spin" />
                      Processing...
                    </>
                  ) : (
                    'Add Guide'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={7}>
          <Card className="admin-section">
            <Card.Body>
              <h3 className="mb-4">
                <FaUserCheck className="me-2" />
                Manage Guides
              </h3>
              
              {loading && guides.length === 0 ? (
                <div className="spinner-container">
                  <FaSpinner className="fa-spin" size={30} />
                </div>
              ) : guides.length === 0 ? (
                <Alert variant="info">No guides registered yet.</Alert>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Service Type</th>
                        <th>Status</th>
                        <th>Verification Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guides.map((guide) => (
                        <tr key={guide.address}>
                          <td>{guide.name}</td>
                          <td>{guide.serviceType}</td>
                          <td>
                            {guide.isVerified ? (
                              <span className="badge bg-success">Verified</span>
                            ) : (
                              <span className="badge bg-secondary">Pending</span>
                            )}
                          </td>
                          <td>{formatDate(guide.verificationDate)}</td>
                          <td>
                            {!guide.isVerified && (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => verifyGuide(guide.address)}
                                disabled={loading}
                              >
                                {loading ? (
                                  <FaSpinner className="fa-spin" />
                                ) : (
                                  'Verify'
                                )}
                              </Button>
                            )}
                            {guide.isVerified && guide.tokenId !== '0' && (
                              <span className="badge bg-info">
                                NFT ID: {guide.tokenId}
                              </span>
                            )}
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
  );
};

export default AdminDashboard;