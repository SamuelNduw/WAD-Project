# Electronic Health Information System
This is a medical application that eases the flow of information between doctors and patients.

## Features
- Doctors book appointments for patients.
- Doctors make prescriptions for patients.
- Patients have a chatbot that responds to medical questions.
- Patients can view their prescriptions and appointments made by doctors.

## Technical featurs
- Role based access
- Cookie storage to track authentication and user role

# Setup
The Backend setup should be complete before the frontend is running.

## Frontend Setup
- Start the frontend by navigating to the /Home directory (located in the root directory)
- Then open the 'home.html' file.
- Use Live Server (VS Code extension that provides a local development server with a live reload feature for static and dynamic web pages) to start the frontend from.

## Backend Setup

### Step 1: Clone the Repository
```
git clone https://github.com/SamuelNduw/WAD-Project.git
cd WAD-Project
```

### Step 2: Go to backend directory
```
cd backend
```

#### Looks like this (do not put this in terminal; just for visual purposes)
```
backend
├─ backend
└─ requirements.txt
```

### Step 3: Create a virtual environment in the same directory 
```
python -m venv virt
```

### Step 4: Activate your Virtual Environment
- On windows
```
.\virt\Scripts\activate
```
- On Linux/macOS
```
source virt/bin/activate
```

### Step 5: Install Dependencies
```
pip install -r requirements.txt
```

### Step 6: Create a .env file and store your MySQL Password and OpenAI API key here
- On macOS/Linux:
```
touch .env
```
- On Windows:
```
echo. > .env
```

Write to the '.env' file
- On macOS/Linux
```
echo "DATABASE_PASSWORD=yourMySQLpassword" >> .env

```
```
echo "OPENAI_API_KEY=yourOpenAIApiKey" >>.env
```

- On Windows
```
echo DATABASE_PASSWORD=yourMySQLpassword >> .env
```
```
echo OPENAI_API_KEY=yourOpenAIApiKey >>.env
```

You can find your OpenAI API Key on the [API key page](https://platform.openai.com/api-keys). (requires an OpenAI account)

### Step 7: Database Setup
In MySQL create a databse called 'hospitaldb'

### Step 8: Make Migrations (in the project dirctory /backend/backend)
```
cd backend

python manage.py makemigrations
python manage.py migrate
```


### Step 9: Run the Development Server
```
python manage.py runserver
```

# Usage
Once the setup is complete and application is started:
- Register by clicking the 'Get Started' button on the home page.
- Toggle between Doctor or Patient, and register.
- Then navigate to any item on the navbar and explore the features.
- Register to a new role(patient/doctor) or Login to a different user. (This current version doesn't support Logout)
