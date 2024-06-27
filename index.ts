#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let currentBalance = 100000;
const pinCode = 1234;

console.log(chalk.blueBright(`\n\tWelcome to ATM\n\t`));

const answer = await inquirer.prompt([
  {
    name: "pinNumber",
    type: "number",
    message: chalk.yellow("Enter Your Pin Number : "),
  },
]);

if (answer.pinNumber === pinCode) {
  console.log("Correct Pin Code");

  let pinAnswer = await inquirer.prompt([
    
    {
      name: "account type",
      type: "list",
      choices: ["Current Account" ,"Saving Account"],
      message:chalk.yellow( "Select your account type"),
    },
    {
     name: "options",
     type: "list",
     choices: ["Fast Cash" ,"Withdraw", "Check Balance"],
     message: chalk.yellow("What do you want to do ?"),
    },
  ]);
  
  if(pinAnswer.options === "Fast Cash"){
    let amount  = await inquirer.prompt(
      [
        {
          name: "fastCash",
          type:"list",
          choices:
          [
            "1000",
            "3000",
            "5000"
          ],
          message:chalk.yellow( "Enter the amount to withdraw : ")
        }
      ]
    );
    if(currentBalance >= amount.fastCash)
     {
       currentBalance -= amount.fastCash;
        
       console.log(`${amount.fastCash} withdraw Sucessfully`);
       
       console.log(`Your remainig balance: ${currentBalance}`);
     }
      
  }
  else if (pinAnswer.options === "Withdraw") 
    {
     let amount = await inquirer.prompt
    (
      [
       {
         name: "withdrawAmount",
         type: "number",
         message:chalk.yellow( "Enter the amount to withdraw : "),
       },
      ]
    );
    if(currentBalance >= amount.withdrawAmount)
      {

       currentBalance -= amount.withdrawAmount;

       console.log(`${amount.withdrawAmount} withdraw Sucessfully`);
       
       console.log(`Your remainig balance: ${currentBalance}`);
      }
    else
     {
      console.log(chalk.red("Insufficient Balance"))
     }
    } 
  else if (pinAnswer.options === "Check Balance") {
    console.log("Your balance : " + currentBalance) }
} else {
  console.log(chalk.red("Please Enter Correct Pin "));
}
