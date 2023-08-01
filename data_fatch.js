// TODO: ------------query--------->

// Map words to numeric values
// const wordToNumberMap = {};

// Generate word-to-number mappings for numbers one to ten
// Map words to numeric values
const wordToNumberMap = {
    zero:0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five:5,
    six:6,
    seven:7,
    eight:8,
    nine:9,
    ten:10,
    eleven:11
  };
  
  
  // Generate word-to-number mappings for numbers one to nineteen
  // const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  // for (let i = 1; i < 20; i++) {
  //   wordToNumberMap[ones[i]] = i;
  //   console.log(wordToNumberMap[ones[i]])
  // }
  
  // Generate word-to-number mappings for multiples of ten up to one hundred
  // const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  // for (let i = 20; i < 100; i += 10) {
  //   wordToNumberMap[tens[i / 10]] = i;
  // }
  
  // Generate word-to-number mappings for numbers one hundred to one thousand
  // for (let i = 100; i <= 1000; i += 100) {
  //   const hundreds = ones[i / 100];
  //   wordToNumberMap[hundreds + ' hundred'] = i;
  
  //   for (let j = 1; j < 20; j++) {
  //     const number = i + j;
  //     const word = hundreds + ' hundred ' + ones[j];
  //     wordToNumberMap[word] = number;
  //   }
  // }
  
  // Test the word-to-number mapping
  // console.log(wordToNumberMap);
  
  // Output:
  // {
  //   one: 1,
  //   two: 2,
  //   three: 3,
  //   ...
  //   nine hundred: 900,
  //   nine hundred one: 901,
  //   nine hundred two: 902,
  //   ...
  //   one thousand: 1000
  // }
  
  
  
  app.get("/dummy-user/query/fatch_data/:value", (req, res) => {
    const { value } = req.params;
  
    // Split the string into individual words
    const words = value.split('-');
    console.log(words)
  
    // Convert each word to its corresponding numeric value
    const numericValue = words
      .map(word => wordToNumberMap[word])
      .join('');
      
    // Send the numeric value as the response
    res.send(`Numeric value: ${numericValue}`);
  });
  // END-----------params--------------->
  
  // TODO: ------------params--------->
  app.get("/dummy-user/params/:id", async (req, res) => {
    const { id } = req.params;
    res.json(id);
  });
  // END-----------params--------------->