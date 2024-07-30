# Minister awards

## Installation

- Clone the project using `git clone git@github.com:tinojdev/minister-awards.git`

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
6. Run `python manage.py createsuperuser`
   - Follow the steps to create your superuser
7. Run `python manage.py runserver`
8. Login with the superuser at: `http://localhost:8000/api-auth/login`

- You can now access the backend at http://localhost:8000/api/ and http://localhost:8000/admin/
