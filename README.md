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

Explain briefly what files are found where

```bash
repository
├── src                          ## source code of the package itself
├── scripts                      ## scripts, if needed
├── docs                         ## If needed, documentation   
├── README.md                    ## You are here
├── requirements.yml             ## If you use conda
```

<a name="installation"></a>

## 2. Installation

Provide sufficient instructions to reproduce and install your project. 
Provide _exact_ versions, test on CSIL or reference workstations.

```bash
git clone $THISREPO
cd $THISREPO
conda env create -f requirements.yml
conda activate amazing
```

<a name="repro"></a>
## 3. Reproduction
Demonstrate how your work can be reproduced, e.g. the results in your report.
```bash
mkdir tmp && cd tmp
wget https://yourstorageisourbusiness.com/dataset.zip
unzip dataset.zip
conda activate amazing
python evaluate.py --epochs=10 --data=/in/put/dir
```
Data can be found at ...
Output will be saved in ...

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
