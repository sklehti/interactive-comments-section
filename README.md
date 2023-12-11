# Frontend Mentor - Interactive comments section

- Coding challenge on the page: https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9

## Built with

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en)
- Typescript
- CSS
- mySql
- Heroku
- Mobile-first workflow

## The application is running

- https://interactive-comments-section-4237c7a4f001.herokuapp.com/

### Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from the database.
- You can only edit or delete your own (`currentUser`) comments and replies.
- all changes occur on all users' pages at the same time
