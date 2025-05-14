<p align="center"><img src=https://github.com/user-attachments/assets/58bcfa02-d795-4c52-a55d-361325f5e60a ></p>

## Readme guide for intallation and running


This Integrated system starts as inventory system and envisioned to be an integrated system for IT department in MCT (Including IT asset borrower, payroll, etc.) 


## Fresh Installation for the system

### Prerequisites before installation
Make sure the following dependencies are downloaded, see installation guide for each dependencies in the internet.
- Node.js, [official download site](https://nodejs.org/dist/v22.15.0/node-v22.15.0-x64.msi).
- Composer, [official download site](https://getcomposer.org/Composer-Setup.exe).
- Xampp, [official download site](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe).
- Git, [official download site](https://github.com/git-for-windows/git/releases/download/v2.49.0.windows.1/Git-2.49.0-64-bit.exe).
- VsCode, [official download site](https://code.visualstudio.com/Download)

### Dependencies and configuration set up
Assuming all dependencies are installed properly, proceed with these steps below.
- For xampp, go to `This PC > Windocs (C:) > xampp > php > open php.ini with notepad > ctrl + f and search ;extension=gd > remove semi-colon(;) > search again for ;extension=zip > search again for ;extension=ftp` and also uncomment semi colon.
- For GitHub, go to the [MCT-OJT](https://github.com/MCT-OJT) organization in GitHub. Go to _Repositories_ then click _mct-inventory-system_, click code, copy the link from _HTTPS_, go to any folder in your pc, right click then open _GitBas_h, enter command `git clone "the link you copied"` _ex. git clone https://example.com_, once done open VsCode and open folder repository.
- In the VsCode, open terminal and enter command `composer install` next is `npm install`.
- The system will need an .env file, copy that .env file and paste it to root folder.
⚠️ .env file consist of sensitive informations please be careful.
- Enter command in VsCode terminal `php artisan migrate` and select _yes_.
-  ℹ️ This dependencies and configuration set up is a one time process only so you only need to do this process once, if done then proceed to Running the Application guide.
  
## Running the application
- Open Xampp and start the _Apache_ and _MySQL_ modules
- In the VsCode, open two terminals, for the application server and database server. In _terminal one_ enter command `php artisan serve`, in _terminal two_ enter command `npm run dev`. Both commands should be up or running when coding to run the program.

## Code maintenance and updation
Please note that we use GitHub to streamline development, if not familiar kindly have a glimpse what is it about, especially the important concepts (git pull, git push, merge conflicts, etc.).

- After each coding please make sure to make a push to the repository or enter command `git push origin main` and also if the repository is advance like for example Jervin coded yesterday and he updated the based code (main repository in GitHub), make sure to enter command `git pull origin main` to update your local repository (the one in your PC).

## Guide for repository structure
Please take note that the system is developed using the following technologies: Laravel, ReactJS, Xampp, MySQL, and other dependencies.

- Laravel as fullstack framework for backend process.
- ReactJS for frontend UI.
- Xampp for serving the application and database servers locally (local PC/development PC).
- MySQL as main database management system.
- Other dependencies like time formatter, routers, etc. (see package.lock)

## Important folders for the repository
- _App_, contains _Controllers_ and _Models_ which are backend codes, this is where most of the time for backend coding takes place.
- _database_, contains codes for table creation and field definitions.
- _public_, contains assets like pictures ex. logo of the system.
- _resources > js_, contains the codes for UI, please note that as much as possible, use the concept of _reusable components_ for performance (see details about this in the net).
- _routes_, contains the defintions where the application will go _ex. '/inventory'_ will go to that page, configure it here.

Most of the time mao rana nga mga folders ang ma open perme pero naay instance maopen gyapon nang uban.
