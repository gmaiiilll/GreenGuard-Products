# GreenGuard Gold Products Directory

A professional web application for contractors to easily find and browse GreenGuard Gold certified building products for sustainable construction projects.

## Features

### 🌿 Core Functionality
- **Product Search**: Search by product name, manufacturer, category, or description
- **Advanced Filtering**: Filter by category (Flooring, Paint, Insulation, etc.) and application (Residential, Commercial, Healthcare, etc.)
- **Detailed Product Information**: View certifications, VOC levels, pricing, installation notes, and supplier contacts
- **Contractor-Focused**: Designed specifically for green building professionals

### 🎨 Modern UI/UX
- Clean, professional design with TailwindCSS
- Responsive layout for desktop, tablet, and mobile
- Intuitive search and filter interface
- Expandable product cards with detailed specifications

### 📊 Product Database
Currently includes 10 sample GreenGuard Gold certified products:
- Flooring (Luxury Vinyl, Carpet Tile, Hardwood)
- Paint & Coatings (Zero VOC Interior Paint)
- Insulation (Fiberglass Batt)
- Drywall & Panels (Gypsum Board)

## Technology Stack

### Backend
- **Flask**: Python web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Python 3.8+**: Required

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports query params: category, search, application)
- `GET /api/products/<id>` - Get a specific product by ID

### Filters
- `GET /api/categories` - Get all product categories
- `GET /api/manufacturers` - Get all manufacturers
- `GET /api/applications` - Get all application types

### System
- `GET /api/stats` - Get database statistics
- `GET /api/health` - Health check endpoint

## Usage Guide for Contractors

### Finding Products

1. **Quick Search**: Use the search bar to find products by name, manufacturer, or keyword
2. **Category Filter**: Select a specific category (e.g., "Flooring", "Paint & Coatings")
3. **Application Filter**: Filter by project type (e.g., "Healthcare", "Commercial")
4. **View Details**: Click "View Details" on any product card to see full specifications

### Product Information

Each product includes:
- **Certifications**: All relevant certifications including GreenGuard Gold
- **VOC Levels**: Emission levels (Zero VOC or Very Low)
- **Applications**: Suitable building types
- **Price Range**: Estimated cost per unit
- **Installation Notes**: Key installation considerations
- **Supplier Contact**: Direct link to manufacturer website

## Expanding the Database

### Adding More Products

To add more products, edit `backend/app.py` and add entries to the `PRODUCTS` list:

```python
{
    "id": 11,
    "name": "Product Name",
    "manufacturer": "Manufacturer Name",
    "category": "Category",
    "subcategory": "Subcategory",
    "description": "Product description",
    "certifications": ["GreenGuard Gold", "Other Cert"],
    "voc_level": "Zero VOC" or "Very Low",
    "applications": ["Residential", "Commercial"],
    "supplier_contact": "www.supplier.com",
    "price_range": "$X-Y per unit",
    "installation_notes": "Installation details",
    "image_url": "/api/placeholder/400/300"
}
```

### Connecting to a Real Database

For production use, replace the in-memory `PRODUCTS` list with a real database:

1. **PostgreSQL** (recommended for production):
```bash
pip install psycopg2-binary sqlalchemy
```

2. **MongoDB** (good for flexible schemas):
```bash
pip install pymongo
```

3. Update `app.py` to connect to your database and query products

## Deployment

### Backend Deployment (Example: Heroku)

1. Create a `Procfile`:
```
web: python app.py
```

2. Update `app.py` to use environment port:
```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

### Frontend Deployment (Example: Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

3. Update API URLs to point to your production backend

## Future Enhancements

### Potential Features
- **User Accounts**: Save favorite products, create project lists
- **Product Comparison**: Compare multiple products side-by-side
- **Advanced Search**: Filter by price range, VOC levels, multiple certifications
- **Project Calculator**: Estimate quantities and costs for projects
- **Supplier Integration**: Real-time pricing and availability
- **Product Reviews**: Contractor ratings and reviews
- **Export Functionality**: Generate PDF reports of product selections
- **Mobile App**: Native iOS/Android applications

### Data Integration
- Connect to official GreenGuard certification database API
- Integrate with building material supplier APIs
- Add real-time inventory and pricing data

## About GreenGuard Gold Certification

GreenGuard Gold certification is a rigorous third-party certification that ensures products meet strict chemical emissions limits. Products with this certification contribute to healthier indoor air quality and are ideal for:

- Healthcare facilities
- Schools and childcare centers
- Senior living facilities
- Residential projects
- LEED-certified buildings

## Support & Contact

For questions or support:
- Email: info@greenguardproducts.com
- Phone: 1-800-GREEN-BUILD

## License

This project is provided as-is for educational and commercial use.

---

Built with ❤️ for sustainable construction professionals
