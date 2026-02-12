/**
 * API Service Layer
 * Handles all backend API communication
 */

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';

class APIService {
  /**
   * Health check
   */
  static async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error('Health check failed');
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return null;
    }
  }

  /**
   * Get profile information
   */
  static async getAbout() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/about`);
      if (!response.ok) throw new Error('Failed to fetch about data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching about:', error);
      throw error;
    }
  }

  /**
   * Get projects list
   */
  static async getProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  /**
   * Submit contact form
   */
  static async submitContact(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit contact form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  }
}

// Export for use in other scripts
window.APIService = APIService;
