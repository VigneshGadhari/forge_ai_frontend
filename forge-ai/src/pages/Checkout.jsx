import React, {useState} from 'react';
import './Checkout.css';

const Checkout = ({ agents, onBack }) => {
    const [formData, setFormData] = useState({
        email: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const totalCost = agents.reduce((sum, agent) => {
        return sum + agent.data.features.pricing.paid;
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment processing
        console.log('Processing payment:', formData);
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-header">
                    <button className="back-button" onClick={onBack}>←</button>
                    <h1>Complete Your Subscription</h1>
                </div>

                <div className="checkout-content">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="selected-agents">
                            {agents.map(agent => (
                                <div key={agent.id} className="checkout-agent-card">
                                    <div className="agent-info">
                                        <h3>{agent.data.name}</h3>
                                        <p>{agent.data.description}</p>
                                        <div className="agent-features">
                                            <span className="feature">
                                                <span className="feature-icon">⭐</span>
                                                {agent.data.features.rating}
                                            </span>
                                            <span className="feature">
                                                <span className="feature-icon">👥</span>
                                                {agent.data.features.users.toLocaleString()} users
                                            </span>
                                        </div>
                                    </div>
                                    <div className="agent-price">
                                        {agent.data.features.pricing.paid}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="price-summary">
                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>${totalCost.toFixed(2)}</span>
                            </div>
                            <div className="price-row">
                                <span>Tax</span>
                                <span>${(totalCost * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="price-row total">
                                <span>Total</span>
                                <span>${(totalCost * 1.1).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="payment-section">
                        <h2>Payment Details</h2>
                        <form onSubmit={handleSubmit} className="payment-form">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Name on Card</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.cardName}
                                    onChange={e => setFormData({...formData, cardName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="1234 5678 9012 3456"
                                    value={formData.cardNumber}
                                    onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MM/YY"
                                        value={formData.expiry}
                                        onChange={e => setFormData({...formData, expiry: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="123"
                                        value={formData.cvv}
                                        onChange={e => setFormData({...formData, cvv: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="submit-button">
                                Complete Purchase
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 