# Minister awards

## Installation

### Frontend

1. Go to the frontend folder
2. Run `npm install`
3. Run the app using `npm run dev`

### Backend

1. Create a virtual environment using `python -m venv venv`
2. Activate the virtual environment: `./venv/Scripts/Activate.ps1`
   - If you are not using powershell instead run `./venv/Scripts/activate.bat` or `./venv/Scripts/activate`
3. Install dependancies: `pip install -r requirements.txt`
4. Go to the backend folder
5. Run `python manage.py migrate`
6. Run `python manage.py runserver`
