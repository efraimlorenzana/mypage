import React, { Component } from 'react';

class Testimonials extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            formData: {
                name: '',
                company: '',
                role: '',
                message: '',
                email: ''
            },
            submitting: false,
            submitted: false,
            error: ''
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitting: true, error: '' });

        try {
            const response = await fetch('http://localhost:5000/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit testimonial');
            }

            this.setState({
                submitted: true,
                showForm: false,
                formData: {
                    name: '',
                    company: '',
                    role: '',
                    message: '',
                    email: ''
                }
            });
        } catch (err) {
            this.setState({ error: 'Failed to submit testimonial. Please try again.' });
        } finally {
            this.setState({ submitting: false });
        }
    };

    toggleForm = () => {
        this.setState(prevState => ({
            showForm: !prevState.showForm,
            submitted: false,
            error: ''
        }));
    };

    render() {
        const { testimonials } = this.props;
        const { showForm, formData, submitting, submitted, error } = this.state;

        return (
            <section id="testimonials" className="testimonials-section">
                <div className="testimonials-section__header">
                    <h2 className="testimonials-section__title">Testimonials</h2>
                    <button 
                        className="testimonials-section__add-btn"
                        onClick={this.toggleForm}
                    >
                        {showForm ? 'Cancel' : 'Add Testimonial'}
                    </button>
                </div>

                {submitted && (
                    <div className="testimonials-section__success">
                        Thank you for your testimonial! It will be reviewed and published soon.
                    </div>
                )}

                {showForm && (
                    <div className="testimonials-section__form-container">
                        <form onSubmit={this.handleSubmit} className="testimonials-section__form">
                            <h3>Share Your Experience</h3>
                            {error && <div className="testimonials-section__error">{error}</div>}
                            
                            <div className="testimonials-section__form-row">
                                <div className="testimonials-section__form-group">
                                    <label htmlFor="name">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={this.handleInputChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="testimonials-section__form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={this.handleInputChange}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="testimonials-section__form-row">
                                <div className="testimonials-section__form-group">
                                    <label htmlFor="company">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={this.handleInputChange}
                                        placeholder="Acme Inc."
                                    />
                                </div>
                                <div className="testimonials-section__form-group">
                                    <label htmlFor="role">Your Role</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={this.handleInputChange}
                                        placeholder="Software Engineer"
                                    />
                                </div>
                            </div>

                            <div className="testimonials-section__form-group">
                                <label htmlFor="message">Your Testimonial *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={this.handleInputChange}
                                    required
                                    rows="4"
                                    placeholder="Share your experience working with me..."
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="testimonials-section__submit-btn"
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Testimonial'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="testimonials-section__list">
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.filter(t => t.approved).map((testimonial, index) => (
                            <div key={index} className="testimonials-section__card">
                                <div className="testimonials-section__card-content">
                                    <p className="testimonials-section__message">"{testimonial.message}"</p>
                                    <div className="testimonials-section__author">
                                        <strong>{testimonial.name}</strong>
                                        {testimonial.role && testimonial.company && (
                                            <span>{testimonial.role} at {testimonial.company}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="testimonials-section__empty">
                            <p>No testimonials yet. Be the first to share your experience!</p>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default Testimonials;
