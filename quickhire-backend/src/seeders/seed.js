require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@quickhire.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create regular user
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });

    console.log('Users seeded');

    // Seed jobs
    const jobs = [
      {
        title: 'Email Marketing',
        company: 'Revolut',
        location: 'Madrid, Spain',
        category: 'Marketing',
        type: 'Full-Time',
        description:
          'Revolut is looking for an Email Marketing specialist to help team manage and execute email campaigns. You will be responsible for creating, testing, and deploying email campaigns that drive engagement and revenue. The ideal candidate has experience with marketing automation platforms, strong analytical skills, and a passion for driving results through data-driven marketing strategies.',
        requirements: [
          '3+ years of email marketing experience',
          'Proficiency with marketing automation tools (Mailchimp, HubSpot, etc.)',
          'Strong analytical and A/B testing skills',
          'Excellent written communication',
          'Experience with HTML/CSS for email templates',
        ],
        tags: ['Marketing', 'Design'],
        featured: true,
        companyLogo: '/logos/revolut.svg',
        createdBy: admin._id,
      },
      {
        title: 'Brand Designer',
        company: 'Dropbox',
        location: 'San Francisco, US',
        category: 'Design',
        type: 'Full-Time',
        description:
          'Dropbox is looking for a Brand Designer to help the team create compelling visual identities and brand assets. You will work closely with marketing, product, and leadership teams to develop and maintain brand guidelines, create marketing collateral, and ensure brand consistency across all touchpoints.',
        requirements: [
          '5+ years of brand design experience',
          'Expert proficiency in Figma, Adobe Creative Suite',
          'Strong portfolio showcasing brand identity work',
          'Experience with motion design is a plus',
          'Excellent collaboration skills',
        ],
        tags: ['Design', 'Business'],
        featured: true,
        companyLogo: '/logos/dropbox.svg',
        createdBy: admin._id,
      },
      {
        title: 'Email Marketing',
        company: 'Pitch',
        location: 'Berlin, Germany',
        category: 'Marketing',
        type: 'Full-Time',
        description:
          'Pitch is looking for a Customer Manager to join their marketing team. You will develop and execute email marketing strategies, manage customer communications, and work closely with the product team to drive user engagement and retention through targeted email campaigns.',
        requirements: [
          '3+ years in email marketing or CRM',
          'Experience with Salesforce or similar CRM',
          'Strong data analysis skills',
          'Knowledge of GDPR compliance',
          'Creative thinking and problem solving',
        ],
        tags: ['Marketing'],
        featured: true,
        companyLogo: '/logos/pitch.svg',
        createdBy: admin._id,
      },
      {
        title: 'Visual Designer',
        company: 'Blinklist',
        location: 'Granada, Spain',
        category: 'Design',
        type: 'Full-Time',
        description:
          'Blinklist is looking for a Visual Designer to help their team design beautiful and intuitive user experiences. You will create visual concepts, wireframes, and prototypes for web and mobile applications, ensuring consistent design language across all products.',
        requirements: [
          '4+ years of visual/UI design experience',
          'Strong proficiency in Figma and prototyping tools',
          'Understanding of design systems',
          'Experience with responsive web design',
          'Strong attention to detail',
        ],
        tags: ['Design'],
        featured: true,
        companyLogo: '/logos/blinklist.svg',
        createdBy: admin._id,
      },
      {
        title: 'Product Designer',
        company: 'ClassPass',
        location: 'Manchester, UK',
        category: 'Design',
        type: 'Full-Time',
        description:
          'ClassPass is looking for a Product Designer to help us create world-class digital experiences. You will own the end-to-end design process from research and ideation to final implementation, working closely with product managers and engineers.',
        requirements: [
          '3+ years product design experience',
          'Experience conducting user research',
          'Proficiency in Figma and prototyping tools',
          'Understanding of front-end development principles',
          'Portfolio with case studies',
        ],
        tags: ['Marketing', 'Design'],
        featured: true,
        companyLogo: '/logos/classpass.svg',
        createdBy: admin._id,
      },
      {
        title: 'Lead Designer',
        company: 'Canva',
        location: 'Ontario, Canada',
        category: 'Design',
        type: 'Full-Time',
        description:
          'Canva is looking for a Lead Engineer to help develop new features and improve existing ones. Must have experience with modern JavaScript frameworks, team leadership, and a passion for building great user experiences.',
        requirements: [
          '7+ years of design experience',
          '2+ years in a leadership role',
          'Expert in design systems and component libraries',
          'Experience mentoring junior designers',
          'Strong strategic thinking abilities',
        ],
        tags: ['Design', 'Business'],
        featured: true,
        companyLogo: '/logos/canva.svg',
        createdBy: admin._id,
      },
      {
        title: 'Brand Strategist',
        company: 'GoDaddy',
        location: 'Marseille, France',
        category: 'Marketing',
        type: 'Full-Time',
        description:
          'GoDaddy is looking for a Brand Strategist to join the team and help shape the future of our brand. You will develop comprehensive brand strategies, conduct market research, and create compelling brand narratives.',
        requirements: [
          '5+ years in brand strategy or marketing',
          'Experience with market research and brand audits',
          'Strong presentation skills',
          'Knowledge of digital marketing trends',
          'MBA or equivalent preferred',
        ],
        tags: ['Marketing'],
        featured: true,
        companyLogo: '/logos/godaddy.svg',
        createdBy: admin._id,
      },
      {
        title: 'Data Analyst',
        company: 'Twitter',
        location: 'San Francisco, US',
        category: 'Technology',
        type: 'Full-Time',
        description:
          'Twitter is looking for a Data Analyst to help team design data-driven solutions. You will analyze large datasets, develop insights, and support decision-making across the organization.',
        requirements: [
          '3+ years of data analysis experience',
          'Proficiency in SQL, Python, and R',
          'Experience with Tableau or similar BI tools',
          'Strong statistical analysis skills',
          'Excellent communication abilities',
        ],
        tags: ['Technology'],
        featured: true,
        companyLogo: '/logos/twitter.svg',
        createdBy: admin._id,
      },
      {
        title: 'Social Media Assistant',
        company: 'Nomad',
        location: 'Paris, France',
        category: 'Marketing',
        type: 'Full-Time',
        description:
          'Nomad is looking for a Social Media Assistant to manage and grow our social media presence across multiple platforms. You will create engaging content, monitor analytics, and interact with our community.',
        requirements: [
          '1+ years social media management experience',
          'Knowledge of major social platforms',
          'Content creation skills',
          'Basic graphic design skills',
          'Excellent communication',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/nomad.svg',
        createdBy: admin._id,
      },
      {
        title: 'Social Media Assistant',
        company: 'Netlify',
        location: 'Paris, France',
        category: 'Marketing',
        type: 'Full-Time',
        description:
          'Netlify is looking for a Social Media Assistant to help grow our developer community. You will create technical content, manage social media channels, and engage with the developer ecosystem.',
        requirements: [
          '1+ years social media experience',
          'Understanding of developer tools and communities',
          'Content writing skills',
          'Basic knowledge of web development',
          'Community management experience',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/netlify.svg',
        createdBy: admin._id,
      },
      {
        title: 'Brand Designer',
        company: 'Dropbox',
        location: 'San Francisco, USA',
        category: 'Design',
        type: 'Full-Time',
        description:
          'Dropbox is looking for a Brand Designer to create stunning visual assets that communicate our brand values. Work with a talented team of designers and marketers to shape the visual identity of one of the world\'s most recognized brands.',
        requirements: [
          '4+ years brand design experience',
          'Expert in Adobe Creative Suite and Figma',
          'Portfolio showcasing brand work',
          'Understanding of print and digital media',
          'Collaborative mindset',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/dropbox.svg',
        createdBy: admin._id,
      },
      {
        title: 'Brand Designer',
        company: 'Maze',
        location: 'San Francisco, USA',
        category: 'Design',
        type: 'Full-Time',
        description:
          'Maze is looking for a Brand Designer to help build and evolve our brand identity. You will work on everything from marketing materials to product design, ensuring a cohesive visual language across all touchpoints.',
        requirements: [
          '3+ years brand or visual design experience',
          'Experience with user research tools',
          'Strong typography and layout skills',
          'Knowledge of motion graphics is a plus',
          'Startup experience preferred',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/maze.svg',
        createdBy: admin._id,
      },
      {
        title: 'Interactive Developer',
        company: 'Terraform',
        location: 'Hamburg, Germany',
        category: 'Engineering',
        type: 'Full-Time',
        description:
          'Terraform is looking for an Interactive Developer to build engaging web experiences. You will combine creativity with technical skills to create immersive interactive applications using modern web technologies.',
        requirements: [
          '3+ years front-end development experience',
          'Strong JavaScript/TypeScript skills',
          'Experience with Three.js, WebGL, or similar',
          'Understanding of animation principles',
          'Portfolio showcasing interactive projects',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/terraform.svg',
        createdBy: admin._id,
      },
      {
        title: 'Interactive Developer',
        company: 'Udacity',
        location: 'Hamburg, Germany',
        category: 'Engineering',
        type: 'Full-Time',
        description:
          'Udacity is looking for an Interactive Developer to create innovative learning experiences. You will build interactive educational content using modern web technologies, ensuring accessibility and engagement for learners worldwide.',
        requirements: [
          '3+ years of web development experience',
          'Experience with React or Vue.js',
          'Knowledge of accessibility standards',
          'Experience with educational technology',
          'Strong problem-solving skills',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/udacity.svg',
        createdBy: admin._id,
      },
      {
        title: 'HR Manager',
        company: 'Packer',
        location: 'Lucern, Switzerland',
        category: 'Human Resource',
        type: 'Full-Time',
        description:
          'Packer is looking for an HR Manager to lead our people operations. You will be responsible for recruitment, employee relations, performance management, and creating a positive work culture.',
        requirements: [
          '5+ years HR management experience',
          'Knowledge of employment law',
          'Experience with HRIS systems',
          'Strong interpersonal skills',
          'SHRM or CIPD certification preferred',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/packer.svg',
        createdBy: admin._id,
      },
      {
        title: 'HR Manager',
        company: 'Webflow',
        location: 'Lucern, Switzerland',
        category: 'Human Resource',
        type: 'Full-Time',
        description:
          'Webflow is looking for an HR Manager to help build a world-class remote-first team. You will develop and implement HR strategies, manage talent acquisition, and foster a culture of inclusion and innovation.',
        requirements: [
          '5+ years HR experience, preferably in tech',
          'Experience with remote team management',
          'Strong knowledge of global employment practices',
          'Excellent communication skills',
          'Experience with HR analytics',
        ],
        tags: ['Marketing', 'Design'],
        companyLogo: '/logos/webflow.svg',
        createdBy: admin._id,
      },
      {
        title: 'Sales Manager',
        company: 'Stripe',
        location: 'New York, US',
        category: 'Sales',
        type: 'Full-Time',
        description:
          'Stripe is looking for a Sales Manager to drive revenue growth. You will lead a team of account executives, develop sales strategies, and build relationships with enterprise clients.',
        requirements: [
          '5+ years of B2B sales experience',
          '2+ years in a management role',
          'Experience with SaaS sales',
          'Strong CRM skills (Salesforce preferred)',
          'Proven track record of exceeding targets',
        ],
        tags: ['Sales', 'Business'],
        companyLogo: '/logos/stripe.svg',
        createdBy: admin._id,
      },
      {
        title: 'Financial Analyst',
        company: 'Goldman Sachs',
        location: 'London, UK',
        category: 'Finance',
        type: 'Full-Time',
        description:
          'Goldman Sachs is seeking a Financial Analyst to join our investment banking division. You will analyze financial data, build models, and support senior team members in client engagements.',
        requirements: [
          'Bachelor\'s degree in Finance or related field',
          '2+ years financial analysis experience',
          'Strong Excel and financial modeling skills',
          'Knowledge of capital markets',
          'CFA or pursuing CFA preferred',
        ],
        tags: ['Finance', 'Business'],
        companyLogo: '/logos/goldman.svg',
        createdBy: admin._id,
      },
      {
        title: 'Business Development Manager',
        company: 'Shopify',
        location: 'Toronto, Canada',
        category: 'Business',
        type: 'Full-Time',
        description:
          'Shopify is looking for a Business Development Manager to identify and develop strategic partnerships. You will work with potential partners, negotiate deals, and drive growth through strategic initiatives.',
        requirements: [
          '4+ years business development experience',
          'Experience in e-commerce or SaaS',
          'Strong negotiation skills',
          'Ability to work cross-functionally',
          'Strategic thinking and analytical skills',
        ],
        tags: ['Business', 'Sales'],
        companyLogo: '/logos/shopify.svg',
        createdBy: admin._id,
      },
      {
        title: 'Frontend Developer',
        company: 'Vercel',
        location: 'Remote',
        category: 'Technology',
        type: 'Full-Time',
        description:
          'Vercel is hiring a Frontend Developer to work on the future of web development. You will build and maintain web applications using Next.js and React, working closely with the open source community.',
        requirements: [
          '3+ years React/Next.js experience',
          'Strong TypeScript skills',
          'Understanding of web performance optimization',
          'Experience with CI/CD pipelines',
          'Open source contribution experience is a plus',
        ],
        tags: ['Technology', 'Engineering'],
        companyLogo: '/logos/vercel.svg',
        createdBy: admin._id,
      },
    ];

    await Job.insertMany(jobs);
    console.log(`${jobs.length} jobs seeded`);
    console.log('\nAdmin credentials:');
    console.log('Email: admin@quickhire.com');
    console.log('Password: admin123');
    console.log('\nUser credentials:');
    console.log('Email: john@example.com');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
