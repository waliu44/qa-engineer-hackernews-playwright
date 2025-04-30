# QA Wolf Take-Home Assignment

This project is part of a take-home assessment for the QA Engineer role at QA Wolf.

## 📌 Assignment Overview

- Navigate to [Hacker News - Newest](https://news.ycombinator.com/newest)
- Validate that the first **100 articles** are sorted **newest to oldest**
- Automated using **Playwright** and **JavaScript**

## 🛠 How to Run

1. Install dependencies:
   ```bash
   npm install
   
 How the Sorting Is Verified
The script uses Playwright to open the newest Hacker News page.

It extracts timestamps from the first 100 articles.

The timestamps are then compared in order to ensure that each article is not older than the one before it.

If the list is correctly sorted (from newest to oldest), the script logs a success message.

If it's not, the script will indicate a failure.
