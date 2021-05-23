# Lab8_Starter

## Names
Ryan Lay
Andres Gutierrez
Sanjai Subramanian

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

Within your a GitHub action that runs whenever code is pushed into a pull request.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No we would not because this "message" feature is too broad and encompasses too many individual components to be considered a "unit."

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

A unit test fits here because the message length is a specific and easily testable feature for a unit test to catch.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

It will run tests without a browser UI so we won't have any UI to view to understand what's going on.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

```JavaScript
const settingsBtn = await page.click('img');
```

This allows us to simulate clicking the settings button. So even if the url doesn't work, we can 
at least navigate to the settings page using this code.