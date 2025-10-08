# Quick Start Guide

Get your GreenGuard Gold Products website running in 5 minutes!

## Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

You should see: `Running on http://127.0.0.1:5000`

## Step 2: Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

You should see: `Local: http://localhost:3000`

## Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

## That's It! 🎉

You now have a fully functional GreenGuard Gold products directory running locally.

## What You Can Do

- **Search** for products using the search bar
- **Filter** by category (Flooring, Paint, Insulation, etc.)
- **Filter** by application (Residential, Commercial, Healthcare, etc.)
- **View Details** by clicking on any product card
- **Browse** 10 sample GreenGuard Gold certified products

## Next Steps

1. **Add More Products**: Edit `backend/app.py` to add more products to the database
2. **Customize Design**: Modify the React components in `frontend/src/components/`
3. **Connect Real Database**: Replace the in-memory database with PostgreSQL or MongoDB
4. **Deploy**: Follow the deployment guide in README.md

## Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed: `python --version`
- Try: `pip install --upgrade pip` then reinstall requirements

### Frontend won't start
- Make sure Node.js 16+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again

### Port already in use
- Backend: Change port in `app.py`: `app.run(port=5001)`
- Frontend: Change port in `vite.config.js`: `server: { port: 3001 }`

## Need Help?

Check the full README.md for detailed documentation and API reference.
