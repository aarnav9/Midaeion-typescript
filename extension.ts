// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "midaeum-typescript" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('midaeum-typescript.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from midaeum_typeScript!');
	});

	context.subscriptions.push(disposable);
}
async function optimizeText(text: string): Promise<string> {
	const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
	  prompt: text,
	  max_tokens: 60,
	  temperature: 0.7,
	  n: 1,
	  stop: '\n'
	}, {
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer API_KEY`
	  }
	});
  
	return response.data.choices[0].text.trim();
  }  
const optimizeCommand = vscode.commands.registerCommand('extension.optimizeText', async () => {
	const editor = vscode.window.activeTextEditor;
  
	if (editor) {
	  const selection = editor.selection;
	  const text = editor.document.getText(selection);
  
	  const optimizedText = await optimizeText(text);
  
	  editor.edit((editBuilder) => {
		editBuilder.replace(selection, optimizedText);
	  });
	}
  });  
// This method is called when your extension is deactivated
export function deactivate() {}
