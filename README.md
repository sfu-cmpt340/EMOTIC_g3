# SFU CMPT 340 Project - EMOTIC - EEG Monitoring of Thoughts and Individual Conditions

A project using EEG data from the MindWave Mobile 2 to analyze and interpret users' emotional states through neural signal processing and machine learning.

## Team Members
1. Maisha Supritee Chowdhury
2. Edan Stasiuk
3. Rashed Hadi
4. Zihao Xie
5. Daniel Kim

## Important Links

| [Timesheet](https://1sfu-my.sharepoint.com/:x:/g/personal/hamarneh_sfu_ca/ERekhh3WcIJFiFAbFqt5bpkB1A5hviZGSfY0xAEeKkKm4Q?e=TQPpXc) | [Slack channel](https://app.slack.com/client/T07K7SWL5A4/C07JS13BQUT) | [Project report](https://www.overleaf.com/project/66d0af91ae7460ea9a4852ad) |
|-----------|---------------|-------------------------|


## Video/demo/GIF
Record a short video (1:40 - 2 minutes maximum) or gif or a simple screen recording or even using PowerPoint with audio or with text, showcasing your work.


## Table of Contents
1. [Demo](#demo)

2. [Installation](#installation)

3. [Reproducing this project](#repro)

4. [Guidance](#guide)


<a name="demo"></a>
## 1. Example demo

A minimal example to showcase your work

```python
from amazing import amazingexample
imgs = amazingexample.demo()
for img in imgs:
    view(img)
```

### What to find where

```bash
repository
├── backend                      ## Flask backend
    ├── app.py                   ## server
    ├── model.pkl                ## trained svm model
    ├── requirements.txt         ## required packages for project
├── frontend                     ## NextJS frontend
├── README.md                    ## You are here
├── GRU_model                    ## Gated Recurrent Unit model 
    ├── model.py                 ## model
    ├── process.py               ## processing data for model
    ├── predict.py               ## trying to predict with this model
├── KNN_model                    ## K Nearest Neighbors model
    ├── knn_model.py             ## model
    ├── process_data.py          ## processing data for model    
├── process_data.py              ## process data for main svm model
├── svm_model.py                 ## main model used for prediction
├── generate_sample.py           ## generates 1 sample for each emotion to try to predict


```

<a name="installation"></a>

## 2. Installation

### Clone the Repository

```bash
git clone https://github.com/sfu-cmpt340/EMOTIC_g3.git
cd EMOTIC_g3
```

### Install Dependencies

#### Frontend (Next.js)

```bash
cd frontend
npm install
```

Then navigate back to the main directory:

```bash
cd ..
```

#### Backend (Flask)

```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

<a name="repro"></a>
## 3. Reproduction

### (Optional) Running the Web Application and Server

To run the full-stack application locally, you need to start both the backend server and the frontend web application. Follow the steps below:

#### 1. Start the Backend Server

Navigate to the `backend` folder and run the Flask server with your virtual environment activated:

```bash
cd backend
flask --app app run
```

#### 2. Start the Frontend

Open a new terminal, navigate to the frontend folder, and start the Next.js development server:

```bash
cd frontend
npm run dev
```

Open your browser and navigate to http://localhost:3000/ to use the web application.

### Running the ML Model Standalone

You can run the ML model without the frontend and backend.

#### 1. Navigate to the Backend Folder

```bash
cd backend
wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1gd-Yq185JqMDNfjOpzwSitxRZQV2VJlg' -O emotic_data.zip
unzip emotic_data.zip
. .venv/bin/activate
python model.py
```

Data can be found at https://drive.google.com/file/d/1gd-Yq185JqMDNfjOpzwSitxRZQV2VJlg/view?usp=sharing

Output will be saved in..., and displayed in the web app if being run locally.

<a name="guide"></a>
## 4. Guidance

- Use [git](https://git-scm.com/book/en/v2)
    - Do NOT use history re-editing (rebase)
    - Commit messages should be informative:
        - No: 'this should fix it', 'bump' commit messages
        - Yes: 'Resolve invalid API call in updating X'
    - Do NOT include IDE folders (.idea), or hidden files. Update your .gitignore where needed.
    - Do NOT use the repository to upload data
- Use [VSCode](https://code.visualstudio.com/) or a similarly powerful IDE
- Use [Copilot for free](https://dev.to/twizelissa/how-to-enable-github-copilot-for-free-as-student-4kal)
- Sign up for [GitHub Education](https://education.github.com/) 
