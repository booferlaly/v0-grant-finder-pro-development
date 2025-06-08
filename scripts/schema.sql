-- Create grants table
CREATE TABLE IF NOT EXISTS grants (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  shortDescription TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  deadline TIMESTAMP NOT NULL,
  awardAmount VARCHAR(100) NOT NULL,
  eligibility TEXT NOT NULL,
  isActive BOOLEAN DEFAULT true,
  isNew BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  grantId INTEGER REFERENCES grants(id),
  userId VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  projectTitle VARCHAR(255) NOT NULL,
  projectSummary TEXT NOT NULL,
  requestedAmount DECIMAL(10,2) NOT NULL,
  timeline TEXT,
  impact TEXT,
  submittedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create application_history table for tracking status changes
CREATE TABLE IF NOT EXISTS application_history (
  id SERIAL PRIMARY KEY,
  applicationId INTEGER REFERENCES applications(id),
  status VARCHAR(50) NOT NULL,
  note TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdBy VARCHAR(255) NOT NULL
);

-- Insert sample grants
INSERT INTO grants (title, shortDescription, description, category, deadline, awardAmount, eligibility, isActive, isNew)
VALUES 
('Community Development Grant', 
 'Funding for projects that improve local communities and neighborhoods', 
 'This grant provides funding for projects that aim to improve local communities through infrastructure development, social programs, or environmental initiatives. Projects should demonstrate clear benefits to the community and have a sustainable impact.',
 'Community',
 CURRENT_TIMESTAMP + INTERVAL '30 days',
 '$5,000 - $25,000',
 'Non-profit organizations, community groups',
 true,
 true),
 
('Educational Innovation Fund', 
 'Supporting innovative approaches to education and learning', 
 'The Educational Innovation Fund supports projects that introduce new and effective approaches to education and learning. We are looking for initiatives that can transform how education is delivered, improve learning outcomes, or increase access to quality education.',
 'Education',
 CURRENT_TIMESTAMP + INTERVAL '45 days',
 '$10,000 - $50,000',
 'Educational institutions, teachers, non-profits',
 true,
 false),
 
('Environmental Sustainability Grant', 
 'Funding for projects that promote environmental conservation and sustainability', 
 'This grant supports projects focused on environmental conservation, sustainability, renewable energy, or addressing climate change. Projects should demonstrate measurable environmental impact and community engagement.',
 'Environment',
 CURRENT_TIMESTAMP + INTERVAL '60 days',
 '$15,000 - $75,000',
 'Non-profits, research institutions, community organizations',
 true,
 true);
