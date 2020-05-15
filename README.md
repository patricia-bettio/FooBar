# FooBar

Front End Design Elective Spring 2020, Exam Assignment

# The Case

We, at FooBar are impressed with your work so far, so we wish to hire you for a bigger task.
We have a rather big amount of data, and we need you to build two services for us: A
Dashboard and an Order Form.

# The Dashboard

We have a lot of data, coming in all the time, and we want you to build a dashboard showing
the current state of our bar.
Which parts of the data you choose to work with is all up to you. You can dive deep into one
part, or you can create several small “components” that work with individual parts of the
data.
Visually we need the dashboard to be a coherent whole.
How the dashboard looks is up to you. You might find some inspiration here in this
google image search. But if you choose to take a more playful approach you are more than
welcome.
The Dashboard will be displayed on monitors across the bar, but it must also work on the
managers phone, laptops, etc.
The Order Form
The order form will be displayed on tablets located at each table in the bar or on the
customer's own phones. You must use the data (described below) to display the various
beers the customers can order. We have very little requirements and will leave it up to you
how to solve it, but we do have a few features you must implement:

- Displaying the beers
- Order beers
- Provide payment details (please validate the format, for the actual payment, just fake
  it)
- Editing the order (removing items)

# A message from the Back End Team

We’ve set up a service for you, please follow our instructions at
https://github.com/jonasholbech/foobarnodejs

# A message from the Design Team

Find additional data (images) in https://kea-alt-del.dk/2020/front/images.zip - feel free to crop
and modify images visually.

# A message from the Teachers (hints & notes)

As in the previous FooBar task we won’t tell you what to do. You have a lot of data, and it’s
up to you to decide how to show it. But we do have a few ideas for you

- Think in components; make your solution so that it consists of several small,
  individual parts. Build one thing at a time!
- You have to use our data, but there’s no restrictions on how or how detailed. For
  instance the queue is an array containing a list of customers waiting to be served.
  You can use the customers for something, or you can just use the .length.
- You might not even find a use for every bit of data — part of the task is to select the
  best data for your purpose.
- You can even combine the data to create something new

# The Official Stuff

Learning goals and the curriculum for the elective can be found at
https://kea.dk/images/EN/Files/Programmes/Curriculums/ElectivesMMD2018.pdf
On page 3 it is written that “it must appear clearly from the report what each group member
has contributed”, that is NOT REQUIRED!
Group Formation
The assignment must be done in groups of 2-4 people. Groups should be formed during
Monday 11/05, and you’ll have your first coach meeting soon there after. Once you have
found your group, register yourselves by handing in the Team Canvas on Fronter.
Mandatory Coach Meetings
During the exam period there will be 4 mandatory coaching sessions where you’ll have the
opportunity to discuss your solution, your findings, and your challenges in the process. The
meetings are held once a week, and your coach will let you know when.

Once we have all the groups registered, you’ll be assigned a time slot for your group.
Some of the meetings will require you to prepare by answering/discussing questions given
by the coaches. These questions can be seen in the schedule a few days in advance.
Your coach is not necessarily present at the exam.
Your focus
Remember our little saying:
It must

- Work
- Look good
- Feel right
  This means that you will not only be graded based on the technical aspects. UI and UX play
  a very big role as well.
  Optimization
  The solution should be optimized as much as possible. JS, CSS and similar must be
  minified, images should be as small as needed, and in general you should pay attention to
  speed and performance.
  You decide how you want to do minification in your build process, if it is done automatically
  or manually. As long as the result is optimized.

# The User Interface / The User Experience

You must document how you arrived at your final solution. The documentation must contain
sketches, moodboard and a style tile. Explain why you chose the visual style you did, and
what considerations/discussions you have had.
It is a good idea to document how you shape/draw your icons, UI-elements, illustrations, and
how you edit your photos (if you use any) in case that we are in doubt if the design is your
own. An easy way to document your design-process is by taking screen dumps regularly and
keep them in an organised folder.
Your UI, and thus CSS, must use Custom Properties and/or SASS variables.
Extras
You must also include something new, but can choose freely, as long as you include at least
one per group member. You can choose from the list below, and talk to your coach if you
have other ideas.

- React (perhaps only for The Order Form?)
- JS Classes
- A self taught framework
- Browser API’s that has not been covered in class
- Fake login
- Integrate your own database (restdb/wordpress)
- Theming (colors, fonts, etc.)
  The Final Hand-In
  For the final hand-in you must hand in the following.
- One report
- Your entire code base, before minification/building, zipped
- Links to your individual screencasts
  “It is your responsibility to comply with copyright law. For that reason, if you intend to use content
  from the internet or other sources, you must obtain consent from the copyright owner before using
  the content as part of your own task/assignment submissions.”

# The screencast

As part of the documentation, each group member must produce a screen recording where
you explain essential parts of your code. The content of the video is up to you. You can
provide a broad overview of the structure, the build process, how you worked with git etc, or
you can take a deeper dive into a specific feature or function.
Try avoiding discussing the same topics within the group.
Max length 3 minutes. If the video exceeds the 3 minutes, we’ll stop watching after 3
minutes.

# The Report

The official guidelines for the report can be seen at
https://kea.dk/images/EN/Files/Programmes/Curriculums/ElectivesMMD2018.pdf
The main thing is that your report is not an abstract, theoretical report. It’s documentation of
your process, the choices you took and what you based your choices upon. Using theories,
models, etc. to help you illustrate that, is great. But the report is not about showing off your
academic skills, it’s about how you applied what you’ve learned.
The elective is built around five core areas that each carry a weight, you should try to
structure your report so that we can see that you worked with each core area, and that you
put enough emphasis on it. The five core areas (and their weights) are listed below.

1. User-interface development, 50%
2. Content Production, 17%
3. UX, 17%
4. Technology, 8%
5. Business, 8%

Start your report with an explanation of your concept, who’s the solution for? Target
audience? Stuff we need to know to understand what you’ve built.
You can talk with the coaches about what to include in the report, but a few suggestions are

- User-tests, how you conducted them and the results
- Business models, and how they affected the outcome
- The code, how it’s structured - callgraphs, activity diagrams, object structure, JSON
  structure
- The technologies you’ve used
- Challenges you have faced
- Shortcomings in the final solution
- Your work process, how you structured working in a group, from kanban charts to git
  branches, Slack, Teams and beyond
- How did you define the needs of the client?
- Idea & layout sketches
- Visual research (mood boards etc)
- Style tiles
- Time estimates for the individual parts of the solution
  The front page of the report
  The front page of the report must include the following, make sure all links work
- A link to the working solution
- A link to “The list”
- A link to the github repo (the Master-branch must be identical to the working solution
- with respect to build-tool changes (like Parcel or minified code))
- The names of all group members
- Links to your screencasts
- Your group number / name

# After the hand-in

You are not allowed to make changes to your solution (including the GitHub repository) after
the hand-in. If you find errors or a need for improvements after the hand-in, make a copy
(fork) of your repository, do the fixes there, and upload to a different URL for your
presentation at the exam. Remember that you are still evaluated by the original hand-in!
