# Project 2 ReadMe - Workout Planner

## Project Description

My second project of the General Assembly Software Engineering Immersive course afforded us more freedom, the build I chose was a Workout Planner.

## Deployment Link and Getting Started

Here's the link to the repo: https://github.com/jayteebee/workout_planner
Here's the link to the GitHub Pages hosted website: https://jayteebee.github.io/workout_planner/

No need for any extra steps, just open up each link in your browser.

## Timeframe

We were given the Project Description on Friday 14th April, and were given until 9AM on Friday 21st April to complete.

Similar to Project 1, we had to complete the work by ourselves but were able to ask the tutors for help at any given time.

## Technology Used

As I was having computer issues during this week, I did the majority of my coding on www.codesanbox.io but was able to transfer my work to VSCode on Thursday 19th.

This was our first React based app, and all coding was done with JavaScript or JSX.

We were also instructed to use an API, so I implemented the exerciseDB API via www.rapidapi.com

I made use of the dependency React Router Dom to handle multiple page views.

## Brief

### General
Build a web application from scratch, without a starter codebase. Must be your own work.
Use React with create-react-app to build your application.
Plan your application using wireframes and user stories.
Craft a README.md file that explains your app to the world.
Deploy your app online, where the rest of the world can access it.

### Technical

Select a Project Idea of your own. But the user must be able to:

Add a new item to a list
Mark the item as complete/favorite/(watch, read, listen) later/flag/etc
Edit an item from a list
Remove an item from a list
Clear/delete all items
Clear/delete only marked items
Fetch data from at least one 3rd party API using Axios or fetch.
Make frequent Git commits with descriptive messages, explaining your commit.
Use React Router to handle multiple pages/views.

## Planning

Building on the foundations from last project, my planning phase this time around was much more robust and definitely improved the experience of the entire project.

The first thing I did was to list all of the above requirements, and bullet point which user action would achieve which requirement, for example:

### 1 Add a new item to a list 

Adding exercises to a workout
Assigning a workout to a day
Assigning completed reps/sets to an exercise within a workout

### 2 Mark the item as complete/favorite/(watch, read, listen) 

Completing a workout
Completing a designated set/rep 
Completing a training week/month/cycle

The next step was to list all possible pages I could create, and include what sort of content they would have. For example:

Separate pages include:

**Home screen**: Data (Days Trained this week/month/year), Calendar (showing which workout on which day), Start Workout (If the current day is a workout day, have button to go straight there)

**Routine Creation**: Frequency? Which muscles on which days? Option to have different cycle lengths (EG: 7 day cycle, 9 day, 12 day)

**Workout Creation**: Exercise selection, sets/reps selection, muscles targeted.

**Workout in progress**: Timers (workout start to end, set start to end, rest between sets), Display all exercises in a given workout, highlight the current exercise, within exercise, show programmed sets/reps and a separate line for achieved sets/reps, completed workout button at bottom (also stops timer)

**Knowledge:** The Fundamentals Of Training, Exercise guidance, Stretching/Warm up guidance,

**Personal Bests:** All exercises have a PB counter, monitoring sets/reps/weight (total volume?)

Doing so made knowing how to create the wireframe a much more simple process.

The next step was to create my wireframe, which can be seen here: https://excalidraw.com/#json=CIpLiFwYznyP3TO8elfDJ,wYevM65HPMzYBjl--eihqQ

I went into much more detail this time around. After having created the flow of the app and representing the planned content visually, I then made several notes for each page describing how the different parts work together, and small code suggestions here and there with ideas about how to achieve parts.

Finally, I went through each page and wrote pseudocode. I thought about all variables, pieces of state, and data that would need to be stored and implemented. I went through this final stage several times, each time building on bits of pseudocode or deepening my understanding of how I would achieve certain functionality. 

With the planning stage over, I listed out the end result of how each page would achieve the requirements. For example:

**Workout Creation**

MVP REQS MET:  1 Add new item to list. 2 Mark as complete. 3 Edit Item from list 4 Remove item from list. 5 Clear/Delete All Items 7 Fetch data from API

Having done this for every page, it was clear to see that I needed to start with the Workout Creation Page, as that's what would get me closest to completing the project.

## Build/Code Process

Below I'll include the code built to pull data from the api, match it to what the user is typing in an inut field, then generate a dropdown with all the data that matches their input.

### JSX

This snippet is included in a form which upon submission, triggers the handleExerciseModuleCreationSubmit function below.

First, the value of the input is saved to a state called inputValue. 

Second, onClick, the exerciseSearch function was created to filter exercises to the input value. See below for details before reading next point for better understanding.

Third, only the filtered items will appear in the drop down menu.

Fourth, onSubmit, the handleExerciseModuleCreationSubmit function is triggered. See below for more details.

```
<div>
                  <input
                    className="exerciseSearchInput"
                    type="text"
                    placeholder="Search Exercise List"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <select
                    className="exersiceSearchDropDown"
                    name="exercise" onClick={exerciseSearch}>
                    {filteredExercises.map((exercise, index) => (
                      <option key={index} value={exercise.name}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </div>
```
### handleInputChange Function

This updates the inputValue state with user input generated in the above JSX.

```
  function handleInputChange(e) {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  }
```

### Exercise Search Function

This filters the exercise array data based on the inputValue state, to only include those exercises which include the same characters(in order and set to lower case) that the user has typed.

```
 function exerciseSearch() {
    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredExercises(filteredExercises);
    if (filteredExercises.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }}
```

### handleExerciseModuleCreationSubmit Function

This is the function that takes all aspects of the user input and terms them into a singular exercise module, which can then be deployed across the app. An exercise module consits of the exercise chosen, sets and reps to perform as well as weight to be lifted.

First, all elements of the form (only exercise listed here for simplicities sake) are saved to respective values, exercise to exercise, sets to sets etc.

Each variable is then passed into an object, newExerciseCreationCompleted. This is to format the exercise module in a readble manner and to allow for further manupulation down the line.

deleteCheck and completeCheck keys are also included, to aid in implementing other parts of the project requirements. For the sake of this explanation, they don't need any focus.

Finally, the formatted exercise is saved to is added to a state called completedOneExerciseCreation. This allows it to be used elsewhere.

```
// PURPOSE: Bring user generated exercise into state 13: completedOneExerciseCreation
// FED FROM: ExerciseCreation.JS - FORM - onSubmit

  const handleExerciseModuleCreationSubmit = (e) => {
    e.preventDefault();
    const exercise = e.target.elements.exercise.value;
    const sets = parseInt(e.target.elements.sets.value);
    const reps = parseInt(e.target.elements.reps.value);
    const weight = e.target.elements.weight.value;

    const newExerciseCreationCompleted = {
      exercise: exercise,
      sets: sets,
      reps: reps,
      weight: weight,
      deleteCheck: false,
      completeCheck: false
    };

    const newCompletedOneExerciseCreation = [
      ...completedOneExerciseCreation,
      newExerciseCreationCompleted
    ];
    setCompletedOneExerciseCreation(newCompletedOneExerciseCreation);
  };
```

### Challenges

One of the biggest challenges I faced in this project was how to dynamically render information in the UI based upon user input.

For example, the above code took me quite some time to figure out as there are several seperate states all coming together.

To solve this problem I initially wrote some more pseudocode of what each state would need to hold, and how the data could get passed around to end up on the UI.

### Wins

A particular section of code i'm happy with was the handling of the checkboxes when the user can choose the frequency at which they workout.

What I ended up with (below) took several iterations to get right. The biggest challenge I faced was making is so that when a user clicks on a specific checkbox, that checkbox updates state in the correct manner.

The breakthrough moment was when I coded:  checked={checked === "weekly"}

Before this, the checked value would update but there was no mention of whether it was weekly frequency or another value. 

```
  const handleNewCycleDurationStateChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setChecked(value);
      setCycleDuration([{ chosenCycleDuration: value }]);
    } else {
      setChecked(null);
      setCycleDuration(null);
    }
  };
```

```
 <div className="weekly_checkbox">
              <input
                onChange={handleNewCycleDurationStateChange}
                type="checkbox"
                id="durationCheckbox"
                name="weekly"
                value="weekly"
                checked={checked === "weekly"}
              />
              Weekly
            </div>
```


### Key Learnings/Takeaways

After having completed this project, I am much more familiar with all the syntax that goes into creating a React app. Specifically, the methods and implementations of state management and how they intertwine with functions for desired effect. 

I also grew more comfortable with the idea of asynchronous functions, how to work with them, the reasoning behind them and how to code with them in mind.

Another big takeaway has been the benefits of a thorough planning process. Compared to Project One, I've felt much more calm and relaxed which has allowed me to create better code. Additionally, whenever I found myself asking the question "what next?" I simple looked at my wireframe or planning notes to understand what I needed to do.

### Bugs

No bugs in the code as deployed. I spent the final day running through each line of code and cleaning up any bugs.

The main source was from my delete functions. Most of them would only update 1 of the 2 states required, which resulted in some minor bugs from a coding standpoint, but quite a major disruption of the UI and UX. 

### Future Improvements

This project was somewhat of a passion project for me. I've used several workout apps in the past to track progress and create training sessions but all of them fall short in one area or another. As such, I'm full of ideas and features to make this app better.

First I want to complete the project to the standard of the wireframe I created. That means several more pages, but mainly the "Workout In Progress" functionality.

Second, polish the CSS to be more user friendly.

Third, make much greater use of the API data. I only included exercise names in the project, but video demonstrations/illustrations/meal plans etc are all available.