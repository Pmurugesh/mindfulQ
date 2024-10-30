# MindfulQ - AI-Powered Mental Health Support Platform

## Overview
MindfulQ is an innovative mental health support platform that leverages AI technology to provide personalized guidance and resources. The platform aims to make mental health support more accessible, personalized, and effective through intelligent conversation analysis and resource recommendations.

## Features
- 🤖 AI-powered conversation analysis
- 💭 Personalized mental health resources
- 📊 Progress tracking and insights
- 🔒 Secure and private user data handling
- 📱 Responsive web design
- 🌙 Dark/Light mode support

## Tech Stack

### Frontend
- Next.js 13
- TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- Python
- FastAPI
- OpenAI API integration

### Database
- PostgreSQL (planned)

### Development Tools
- ESLint
- Prettier
- Git
- npm

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn
- Git

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Pmurugesh/mindfulQ.git
cd mindfulQ
```

2. **Frontend Setup**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Backend Setup**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start backend server
python main.py
```

### Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure
```
mindfulQ/
├── components/          # React components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # CSS styles
├── types/              # TypeScript types
├── utils/              # Utility functions
└── backend/            # Python backend code
```

## Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm test
```

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Use consistent naming conventions

### Git Workflow
1. Create feature branch from main
2. Make changes and commit with clear messages
3. Push changes and create pull request
4. Request code review
5. Merge after approval

## Future Enhancements
- [ ] User authentication system
- [ ] Enhanced AI conversation capabilities
- [ ] Progress tracking dashboard
- [ ] Mobile app development
- [ ] Integration with mental health professionals
- [ ] Community support features

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues
1. **Node Modules Issues**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

2. **Python Virtual Environment Issues**
```bash
# Recreate virtual environment
deactivate
rm -rf venv
python -m venv venv
```

## Security
- All user data is encrypted
- Regular security audits
- Compliance with data protection regulations
- Secure API endpoints

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- Project Maintainer: [Your Name]
- Email: [Your Email]
- Project Link: https://github.com/Pmurugesh/mindfulQ

## Acknowledgments
- OpenAI for API support
- Next.js team for the amazing framework
- All contributors who have helped with the project
```

To implement this README:

1. Save it as `README.md` in your project root:
```bash
# From project root
echo "[content above]" > README.md
```

2. Add to git:
```bash
git add README.md
git commit -m "Add comprehensive README"
git push
```

Remember to:
1. Update contact information
2. Modify features based on actual implementation
3. Update environment variables as needed
4. Add any project-specific instructions
5. Update troubleshooting section based on common issues
6. Modify future enhancements based on your roadmap