describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    // const settingsBtn = await page.click('img');
    await page.waitForTimeout(500);

  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000); /// changed from 30000 to 3000

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');

    expect(page.url().substring(page.url().length - 8)).toBe('/#entry1');
  }, 10000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    let objHeader = await page.$('h1');

    const strHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(strHeader).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let expectedEntryContent = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };

    
    let actualEntryContent = await page.$eval('entry-page', (entry) => {
      return entry.entry;
    });

    // // Maybe use entry-page instead journal-entry
    // let actualEntryObj = await page.$('journal-entry');
    // // Something to do with this line
    // let actualEntryContent = await page.evaluate(actualEntryObj => actualEntryObj.jsonValue, actualEntryObj);


    expect(actualEntryContent).toEqual(expectedEntryContent);
    
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    let expectedClass = 'single-entry';
    let actualClass = await page.$eval('body', (page) => {
      return page.className;
    });

    expect(actualClass).toBe(expectedClass);
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const settingsBtn = await page.click('img');
    
    expect(page.url().substring(page.url().length - 10)).toBe('/#settings')
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const settingsBtn = await page.click('img');
    let objHeader = await page.$('h1');
    const expectedHeader = 'Settings';

    const actualHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(actualHeader).toBe(expectedHeader);
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let expectedClass = 'settings';
    let actualClass = await page.$eval('body', (page) => {
      return page.className;
    });

    expect(actualClass).toBe(expectedClass);
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();

    expect(page.url().substring(page.url().length - 8)).toBe('/#entry1')
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    
    // removes the class attribute
    let expectedClass = '';
    let actualClass = await page.$eval('body', (page) => {
      return page.className;
    });

    expect(actualClass).toBe(expectedClass);
  });

  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {
    let objHeader = await page.$('h1');
    const expectedHeader = 'Journal Entries';

    const actualHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(actualHeader).toBe(expectedHeader);
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('test13: On the home page the <body> element should not have any class attribute ', async() => {
    // removes the class attribute
    let expectedClass = 0;
    let actualClass = await page.$eval('body', (page) => {
      return page.classList.length;
    });

    expect(actualClass).toBe(expectedClass);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async() => {
    let expectedUrl = '/#entry2';
    let actualUrl = await page.$$('journal-entry');
    await actualUrl[1].click();
    await page.waitForNavigation();

    expect(page.url().substring(page.url().length - 8)).toBe(expectedUrl);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async() => {
    let objHeader = await page.$('h1');
    const expectedHeader = 'Entry 2';

    const actualHeader = await page.evaluate(objHeader => objHeader.textContent, objHeader);

    expect(actualHeader).toBe(expectedHeader);

  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    let expectedEntryContent = {"date":"4/26/2021","title":"Run, Forrest! Run!","content":"Mama always said life was like a box of chocolates. You never know what you're gonna get.","image":{"src":"https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg","alt":"forrest running"}}

    let actualEntryContent = await page.$eval('entry-page', (entry) => {
      return entry.entry;
    });

    expect(actualEntryContent).toEqual(expectedEntryContent);
  });

  // create your own test 17

  // create your own test 18

  // create your own test 19

  // create your own test 20
  
});
