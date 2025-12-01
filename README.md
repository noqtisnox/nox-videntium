# nox-videntium | View & Grade Assignments With Ease

## Project Overview

*Nox-Videntium* is a full-stack web application designed to simplify the workflow for educators to view, manage, and grade student submissions efficiently. The system provides a unified interface for navigating assignment lists and accessing a specialized grading view for detailed feedback and score input.

## Tech-Stack

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

## Local Development Setup

To get this project running locally, you need Python (3.10+) and Node.js (18+).

### 1. Backend Setup (FastAPI)

Navigate to the backend directory, set up the virtual environment, and install dependencies.

1. Navigate to the backend directory

    ```bash
    cd backend
    ```

2. Create and activate a virtual environment

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate
    ```

3. Install Python dependencies

    ```bash
    pip install -r requirements.txt
    ```

4. Run the server

    ```bash
    uvicorn main:app --reload
    ```

### 2. Frontend Setup (React)

Open a new terminal window, navigate to the frontend directory, and install Node dependencies.

1. Navigate to the frontend directory

    ```bash
    cd frontend
    ```

2. Install Node dependencies

    ```bash
    npm install
    ```

3. Start the React development server

    ```bash
    npm run dev # or npm start, depending on your setup
    # Server will run at http://localhost:5173/
    ```
