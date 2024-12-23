# **AuroraInfra**

AuroraInfra is a deployment platform that enables users to deploy cloud infrastructure seamlessly on AWS, GCP, and Azure. This section covers the **frontend setup** only, allowing users to interact with a modern web-based form.

---

## **Getting Started**

Follow these steps to set up and run the AuroraInfra.

---

## **Prerequisites**

1. **Node.js**:
   - Ensure you have **Node.js** (version 16 or higher) installed.
   - Download from [Node.js Official Website](https://nodejs.org/).

2. **Code Editor**:
   - Use any editor of your choice. We recommend **PyCharm**, **Visual Studio Code**, or similar.

3. **Git**:
   - Make sure Git is installed for cloning the repository.
   - Download Git from [Git Downloads](https://git-scm.com/downloads).

---

## **Steps to Execute**

### **1. Clone the Repository**
1. Open your terminal and run the following command to clone the AuroraInfra repository:
   ```bash
   git clone <repository-url>
   cd AuroraInfra/frontend

### **2. Install Dependencies**
1. Install Node.js Dependencies:
   ```bash
    npm install

2. Check Installed Dependencies:
   ```text
    "dependencies": {
      "react": "^17.0.2",
      "react-dom": "^17.0.2",
      "react-scripts": "^4.0.3"
    }
3. Fix Missing Dependencies:
   ```bash
    rm -rf node_modules package-lock.json
    npm install
### **3. Start the Frontend Development Server**
1. Install Node.js Dependencies:
   ```bash
    npm start
2. The server will automatically open the app in your default browser at::
   ```text
    http://localhost:3000
## Front-end Overview

Here’s how the frontend form looks:

![Frontend Deployment Form](./images/frontend-form.png "Frontend Deployment Form")