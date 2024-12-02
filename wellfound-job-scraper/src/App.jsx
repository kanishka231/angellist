import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Predefined job roles with categories
const JOB_ROLES = {
  'Software Development': [
    'software-engineer',
    'full-stack-developer',
    'backend-developer',
    'frontend-developer',
    'mobile-developer',
    'devops-engineer',
    'cloud-engineer',
  ],
  'Design': [
    'ux-designer',
    'ui-designer',
    'product-designer',
    'graphic-designer',
    'interaction-designer',
  ],
  'Data': [
    'data-scientist',
    'data-analyst',
    'machine-learning-engineer',
    'ai-engineer',
    'data-engineer',
  ],
  'Product & Management': [
    'product-manager',
    'project-manager',
    'technical-product-manager',
    'scrum-master',
    'engineering-manager',
  ],
  'Sales & Marketing': [
    'sales-engineer',
    'marketing-specialist',
    'growth-marketing',
    'sales-development-representative',
  ],
  'Customer Success': [
    'customer-success-manager',
    'customer-support-specialist',
    'technical-support',
  ],
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [freeTextRole, setFreeTextRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [searchMethod, setSearchMethod] = useState('freeText');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFreeTextRoleChange = (e) => {
    setFreeTextRole(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedRole('');
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSearchMethodChange = (method) => {
    setSearchMethod(method);
    setFreeTextRole('');
    setSelectedCategory('');
    setSelectedRole('');
  };

  const handleScrape = async () => {
    const roleToSearch = searchMethod === 'freeText' 
      ? freeTextRole.toLowerCase().replace(/\s+/g, '-')
      : selectedRole;

    if (!roleToSearch) {
      setError('Please enter or select a job role');
      return;
    }

    setIsLoading(true);
    setError(null);
    setJobs([]);

    try {
      const response = await axios.get(`http://localhost:5000/scrape?role=${roleToSearch}`);
      
      if (!response.data || response.data.length === 0) {
        setError(`No jobs found for "${roleToSearch}". Try a different job role.`);
        return;
      }

      setJobs(response.data);
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setError('Scraping endpoint not found. Please check the server.');
            break;
          case 500:
            setError('Internal server error. Please try again later.');
            break;
          case 403:
            setError('Access forbidden. There might be scraping restrictions.');
            break;
          default:
            setError(err.response.data?.error || 'An unexpected error occurred');
        }
      } else if (err.request) {
        setError('No response from the server. Please check your internet connection.');
      } else {
        setError('Error setting up the request. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Wellfound Job Scraper</h1>
        
        <div className="search-method-toggle">
          <button 
            className={`toggle-btn ${searchMethod === 'freeText' ? 'active' : ''}`}
            onClick={() => handleSearchMethodChange('freeText')}
          >
            Free Text Search
          </button>
          <button 
            className={`toggle-btn ${searchMethod === 'category' ? 'active' : ''}`}
            onClick={() => handleSearchMethodChange('category')}
          >
            Category Search
          </button>
        </div>
        
        <div className="search-container">
          {searchMethod === 'freeText' ? (
            <div className="search-input-container">
              <input 
                type="text" 
                value={freeTextRole}
                onChange={handleFreeTextRoleChange}
                placeholder="Enter job role (e.g., software engineer)"
                className="search-input"
              />
            </div>
          ) : (
            <div className="role-selection-container">
              <select 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                className="role-select"
              >
                <option value="">Select Job Category</option>
                {Object.keys(JOB_ROLES).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select 
                value={selectedRole}
                onChange={handleRoleChange}
                className="role-select"
                disabled={!selectedCategory}
              >
                <option value="">
                  {selectedCategory 
                    ? 'Select Specific Role' 
                    : 'Select a Category First'}
                </option>
                {selectedCategory && 
                  JOB_ROLES[selectedCategory].map((role) => (
                    <option key={role} value={role}>
                      {role.replace(/-/g, ' ')}
                    </option>
                  ))
                }
              </select>
            </div>
          )}

          <button 
            onClick={handleScrape} 
            disabled={isLoading || 
              (searchMethod === 'freeText' && !freeTextRole) || 
              (searchMethod === 'category' && !selectedRole)}
            className="search-button"
          >
            {isLoading ? 'Scraping...' : 'Scrape Jobs'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-message">
            <strong>⚠️ {error}</strong>
          </p>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="job-listings">
          <h2>
            Job Listings for {searchMethod === 'freeText' 
              ? freeTextRole 
              : selectedRole.replace(/-/g, ' ')}
          </h2>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching jobs...</p>
            </div>
          ) : (
            <div className="job-card-container">
              {jobs.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-card-header">
                    <h3 className="job-role">{job.Role}</h3>
                    <span className="job-company">{job.Company}</span>
                  </div>
                  
                  <div className="job-card-details">
                    {job.Location && (
                      <div className="job-detail">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{job.Location}</span>
                      </div>
                    )}
                     {job.Salary && (
                      <div className="job-detail">
                        <i className="fas fa-dollar-sign"></i>
                        <span>{job.Salary}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="job-card-actions">
                    <a 
                      href={job.Link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="job-link-button"
                    >
                      View Job Details
                    </a>
                    <button 
                      className="apply-button"
                      onClick={() => window.open(job.Link, '_blank')}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="job-summary">
            <p>
              Total Jobs Found: {jobs.length}
              <span className="job-summary-detail">
                (Showing all available listings)
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;