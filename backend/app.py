from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Sample GreenGuard Gold certified products database
# In production, this would be a real database (PostgreSQL, MongoDB, etc.)
PRODUCTS = [
    {
        "id": 1,
        "name": "Armstrong Flooring - Luxury Vinyl Tile",
        "manufacturer": "Armstrong Flooring",
        "category": "Flooring",
        "subcategory": "Luxury Vinyl",
        "description": "Durable luxury vinyl tile with GreenGuard Gold certification for low chemical emissions",
        "certifications": ["GreenGuard Gold", "FloorScore"],
        "voc_level": "Very Low",
        "applications": ["Residential", "Commercial", "Healthcare"],
        "supplier_contact": "www.armstrongflooring.com",
        "price_range": "$3-6 per sq ft",
        "installation_notes": "Can be installed over most existing floors",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 2,
        "name": "Benjamin Moore Natura Paint",
        "manufacturer": "Benjamin Moore",
        "category": "Paint & Coatings",
        "subcategory": "Interior Paint",
        "description": "Zero VOC interior paint with excellent coverage and durability",
        "certifications": ["GreenGuard Gold", "Green Seal"],
        "voc_level": "Zero VOC",
        "applications": ["Residential", "Commercial", "Schools"],
        "supplier_contact": "www.benjaminmoore.com",
        "price_range": "$50-70 per gallon",
        "installation_notes": "Apply with standard painting techniques",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 3,
        "name": "Johns Manville Climate Pro Insulation",
        "manufacturer": "Johns Manville",
        "category": "Insulation",
        "subcategory": "Fiberglass Batt",
        "description": "High-performance fiberglass insulation with formaldehyde-free binder",
        "certifications": ["GreenGuard Gold", "ENERGY STAR"],
        "voc_level": "Very Low",
        "applications": ["Residential", "Commercial"],
        "supplier_contact": "www.jm.com",
        "price_range": "$0.50-1.50 per sq ft",
        "installation_notes": "Standard insulation installation practices",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 4,
        "name": "Interface Carpet Tile",
        "manufacturer": "Interface",
        "category": "Flooring",
        "subcategory": "Carpet Tile",
        "description": "Modular carpet tiles with carbon neutral manufacturing",
        "certifications": ["GreenGuard Gold", "NSF 140"],
        "voc_level": "Very Low",
        "applications": ["Commercial", "Office", "Healthcare"],
        "supplier_contact": "www.interface.com",
        "price_range": "$4-8 per sq ft",
        "installation_notes": "Modular installation, easy replacement",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 5,
        "name": "USG Sheetrock Brand Gypsum Panels",
        "manufacturer": "USG",
        "category": "Drywall & Panels",
        "subcategory": "Gypsum Board",
        "description": "Standard and moisture-resistant gypsum panels with low emissions",
        "certifications": ["GreenGuard Gold"],
        "voc_level": "Very Low",
        "applications": ["Residential", "Commercial", "Healthcare"],
        "supplier_contact": "www.usg.com",
        "price_range": "$10-15 per sheet",
        "installation_notes": "Standard drywall installation",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 6,
        "name": "Sherwin-Williams Harmony Paint",
        "manufacturer": "Sherwin-Williams",
        "category": "Paint & Coatings",
        "subcategory": "Interior Paint",
        "description": "Low odor, zero VOC interior acrylic latex paint",
        "certifications": ["GreenGuard Gold", "Master Painters Institute"],
        "voc_level": "Zero VOC",
        "applications": ["Residential", "Commercial", "Schools", "Healthcare"],
        "supplier_contact": "www.sherwin-williams.com",
        "price_range": "$45-65 per gallon",
        "installation_notes": "Excellent coverage, low odor application",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 7,
        "name": "Mohawk FloorCare Essentials Hardwood",
        "manufacturer": "Mohawk Industries",
        "category": "Flooring",
        "subcategory": "Hardwood",
        "description": "Engineered hardwood flooring with low-emission finishes",
        "certifications": ["GreenGuard Gold", "FloorScore", "FSC Certified"],
        "voc_level": "Very Low",
        "applications": ["Residential", "Commercial"],
        "supplier_contact": "www.mohawkflooring.com",
        "price_range": "$5-10 per sq ft",
        "installation_notes": "Floating or glue-down installation",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 8,
        "name": "CertainTeed EcoSmart Insulation",
        "manufacturer": "CertainTeed",
        "category": "Insulation",
        "subcategory": "Fiberglass Batt",
        "description": "Sustainable fiberglass insulation with bio-based binder",
        "certifications": ["GreenGuard Gold", "UL Environment"],
        "voc_level": "Very Low",
        "applications": ["Residential", "Commercial"],
        "supplier_contact": "www.certainteed.com",
        "price_range": "$0.60-1.80 per sq ft",
        "installation_notes": "Easy to cut and install",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 9,
        "name": "AFM Safecoat Zero VOC Paint",
        "manufacturer": "AFM",
        "category": "Paint & Coatings",
        "subcategory": "Interior Paint",
        "description": "Ultra-low odor paint designed for chemically sensitive individuals",
        "certifications": ["GreenGuard Gold", "LEED Compliant"],
        "voc_level": "Zero VOC",
        "applications": ["Residential", "Healthcare", "Schools"],
        "supplier_contact": "www.afmsafecoat.com",
        "price_range": "$55-75 per gallon",
        "installation_notes": "Ideal for sensitive environments",
        "image_url": "/api/placeholder/400/300"
    },
    {
        "id": 10,
        "name": "Shaw Contract Carpet",
        "manufacturer": "Shaw Industries",
        "category": "Flooring",
        "subcategory": "Commercial Carpet",
        "description": "High-performance commercial carpet with recycled content",
        "certifications": ["GreenGuard Gold", "NSF 140", "CRI Green Label Plus"],
        "voc_level": "Very Low",
        "applications": ["Commercial", "Office", "Hospitality"],
        "supplier_contact": "www.shawcontract.com",
        "price_range": "$3-7 per sq ft",
        "installation_notes": "Professional installation recommended",
        "image_url": "/api/placeholder/400/300"
    }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products with optional filtering"""
    category = request.args.get('category')
    search = request.args.get('search', '').lower()
    application = request.args.get('application')
    
    filtered_products = PRODUCTS
    
    # Filter by category
    if category:
        filtered_products = [p for p in filtered_products if p['category'] == category]
    
    # Filter by search term
    if search:
        filtered_products = [
            p for p in filtered_products 
            if search in p['name'].lower() 
            or search in p['manufacturer'].lower()
            or search in p['description'].lower()
        ]
    
    # Filter by application
    if application:
        filtered_products = [p for p in filtered_products if application in p['applications']]
    
    return jsonify({
        'products': filtered_products,
        'total': len(filtered_products)
    })

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product by ID"""
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all unique categories"""
    categories = list(set(p['category'] for p in PRODUCTS))
    return jsonify({'categories': sorted(categories)})

@app.route('/api/manufacturers', methods=['GET'])
def get_manufacturers():
    """Get all unique manufacturers"""
    manufacturers = list(set(p['manufacturer'] for p in PRODUCTS))
    return jsonify({'manufacturers': sorted(manufacturers)})

@app.route('/api/applications', methods=['GET'])
def get_applications():
    """Get all unique applications"""
    applications = set()
    for product in PRODUCTS:
        applications.update(product['applications'])
    return jsonify({'applications': sorted(list(applications))})

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get database statistics"""
    return jsonify({
        'total_products': len(PRODUCTS),
        'total_categories': len(set(p['category'] for p in PRODUCTS)),
        'total_manufacturers': len(set(p['manufacturer'] for p in PRODUCTS)),
        'last_updated': datetime.now().isoformat()
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
