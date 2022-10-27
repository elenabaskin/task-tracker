Task Tracker

This is a simple task tracker with local storage (I attempted to use an Express server, but could not figure out how to make it connect with JSON data).

I started with the visual direction of the task tracker and was given the vision to make it have a book/journal vibe. I played around with grid to achieve the layouts I wanted for device responsiveness and I'm happy with how that came out.
I also added in JavaScript buttons to hide the Create Task functions for mobile/tablet users so they can have a larger viewing window for their actual task lists and a Tips button for all devices to undersand how the features of the tracker work (mainly since I used a double click to edit function as opposed to an edit button).
Thinking about how users would interact with the application and what I would would want function-wise was what navigated the overall direction my project went in.

My biggest struggles actually came from implementing an edit feature and attempting the back-end portion. The original tracker I based mine off of didn't have an edit button or any editing features so trying to add one was quite hard. I ended up changing to a different design that also didn't have a physical edit button but that's why I created the Tips button for help with navigating the tracker.
I also majorly struggled with the server. I was able to get my Express server running on port 5000 but after that, I was completely lost. I had to rely on my mentor a lot and even then, there was just so much work to do and I couldn't figure out how to proceed. We made it to a point to where the server could understand there was JSON object, but it wouldn't read it and I had no clue how to fix that. I decided to switch to local storage so I could at least have a functional project.

In the future, I would like to get the tracker to run on fs and add more functions to it, like categorizing the tasks.
