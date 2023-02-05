
# Tech Incubator Project
Application meant to be used by a school tech incubator. Companies may sign up and create projects for users (students) to take on. Students may view these projects and submit before deadline. 

# Composition
## Technologies used
* FrontEnd
    - React
* Backend
    - Firebase
    - (DB) Firestore

# How it Works
Users are greeted with a login/signup page. If account exists, they may log in normally. If they are new to the application, the user has the option to sign up as a company or user (student) with a short form. 

<p align="center">
  <img src="https://github.com/hassankaz1/tech-incubator-project/blob/master/demo/login.gif" alt="animated" />
</p>



## User (student) Interface
Students are shown their dashboard with all the tasks they have signed up for. They can view how many total projects they are assigned, how many are completed and how many are left. All incomplete assignments are shown with color orange, and completed with green. There is also the option to have a further look at each individual project with the "view more" button. Here a pop up with all the description of the project is show as well as a submit link. 

<p align="center">
  <img src="https://github.com/hassankaz1/tech-incubator-project/blob/master/demo/user%20profile.gif" alt="animated" />
</p>

Students can submit via "view more" button and uploading link

<p align="center">
  <img src="https://github.com/hassankaz1/tech-incubator-project/blob/master/demo/submit.gif" alt="animated" />
</p>


Students can also take on new projects via the "Find New Projects" button

<p align="center">
  <img src="https://github.com/hassankaz1/tech-incubator-project/blob/master/demo/new%20p.gif" alt="animated" />
</p>


## Company Interface
Companies are shown their dashboard with all the projects they have created. They can view how many total projects they are assigned, how many are completed and how many are left. All incomplete assignments are shown with color orange, and completed with green. There is also the option to have a further look at each individual project with the "view more" button. Here a pop up with all the description of the project including any participants and submission links. Same as users.

Companies can also create new tasks via form. 


<p align="center">
  <img src="https://github.com/hassankaz1/tech-incubator-project/blob/master/demo/create.gif" alt="animated" />
</p>


### Editing User
Both companies and users can edit their profile via "edit profile" button. Here they can change their names as well as the profile picture.

<p align="center">
  <img src="https://github.com/hassankaz1/tech-incubator-project/blob/master/demo/edit%20profile.gif" alt="animated" />
</p>

# Improvements 
## Permission Issues
- Creating tasks or viewing tasks should be exclusive to either company or student. This is not handled correctly. Needs to be fixed. 
- Count of completed/ incomplete projects in Dashboard is not always refreshed. Needs to be updated and resolved as soon as there is a change. 

