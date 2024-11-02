# Backend Setup

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

### Step 6: Create a .env file and write your MySQL Password there
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

- On Windows
```
echo DATABASE_PASSWORD=yourMySQLpassword >> .env
```

### Step 7: Database Setup
In MySQL create a databse called 'hospitaldb'

### Step 8: Make Migrations (in the project dirctory /backend/backend)
```
cd backend

python manage.py makemigrations
python manage.py migrate
```

### Step 8: Run the Development Server
```
python manage.py runserver
```