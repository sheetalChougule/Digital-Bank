const fs = require("fs");
const readline = require("readline");

class Bank {
  constructor() {
    this.accounts = {};
  }
/* create account function */
  createAccount() {
    const accountNumber = Object.keys(this.accounts).length + 1;
    this.accounts[accountNumber] = 0;
    console.log(`Welcome, dear customers your account is successfully created. Your account number is ${accountNumber}`);
  }

/* deposit function */
  /* deposit(accountNumber, amount) {
    if (this.accounts.hasOwnProperty(accountNumber)) {
      this.accounts[accountNumber] += amount;
      console.log(`${amount} deposited to account number ${accountNumber}`);
    }
     else {
      console.log(`Sorry!, Account number ${accountNumber} does not exist.`);
    }
  }
 */
deposit(accountNumber, amount) {
 /*  if (amount<= 0) */ 
 if(isNaN(amount) || amount < 0)  {
    console.log(`Please enter a valid amount value . As value less than or equal to 0 or alphabet cannot be deposited`);
  }
  else{
  if (this.accounts.hasOwnProperty(accountNumber)) {
    this.accounts[accountNumber] += amount;
    console.log(`${amount} deposited to account number ${accountNumber}`);
  }
 
   else {
    console.log(`Sorry!, Account number ${accountNumber} does not exist.`);
  }
}
}
/* withdraw function */
  withdraw(accountNumber, amount) {
    if(isNaN(amount) || amount < 0)  {
      console.log(`Please enter a valid amount value . As value less than or equal to 0 or alphabet cannot be withdrawn`);
    }
    else{
    if (this.accounts.hasOwnProperty(accountNumber)) {
      if (this.accounts[accountNumber] >= amount) {
        this.accounts[accountNumber] -= amount;
        console.log(`${amount} withdrawn from account number ${accountNumber}`);
      } else {
        console.log("This transaction cannot be completed as withdrawal limit is exceeded");
      }
    } else {
      console.log(`Sorry!, Account number ${accountNumber} does not exist.`);
    }
  }
  }

/* display individual account balance */
  displayBalance(accountNumber) {
    if (this.accounts.hasOwnProperty(accountNumber)) {
      console.log(`Balance for account number ${accountNumber}: ${this.accounts[accountNumber]}`);
    } else {
      console.log(`Sorry!, Account number ${accountNumber} does not exist.`);
    }
  }

/* display entire bank balance */
  displayBankBalance() {
    const totalBalance = Object.values(this.accounts).reduce((total, balance) => total + balance, 0);
    console.log(`Total bank balance: ${totalBalance}`);
  }
}


/* Loading the input file. */
function processCommands(filename) {
  const bank = new Bank();
  

  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity
  });

  rl.on("line", (line) => {
    const tokens = line.trim().split(" ");
    const transaction = tokens[0];
    const args = tokens.slice(1);


  /* Function calls for commands */

    switch (transaction) {
      case "create_account":
        bank.createAccount();
        break;
      case "deposit":
        const depositAccount = parseInt(args[0]);
        const depositAmount = parseInt(args[1]);
        bank.deposit(depositAccount, depositAmount);
        break;
      case "withdraw":
        const withdrawAccount = parseInt(args[0]);
        const withdrawAmount = parseInt(args[1]);
        bank.withdraw(withdrawAccount, withdrawAmount);
        break;
      case "display_balance":
        const displayAccount = parseInt(args[0]);
        bank.displayBalance(displayAccount);
        break;
      case "display_bank_balance":
        bank.displayBankBalance();
        break;
      default:
        console.log(`Invalid command: ${transaction}`);
    }
  });
}

/* Checking if the filename is given in commandline */
if (process.argv.length < 3) {
  console.log("Usage: node bank.js <filename>");
} else {
  const filename = process.argv[2];
  processCommands(filename);
}




