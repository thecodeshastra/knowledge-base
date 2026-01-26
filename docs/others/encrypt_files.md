---
title: Encrypt Files
---

# Encrypting Files examples

## PowerShell scripts Encryption/Obfuscation

- Turn of real time protection of windows defender
- Clone this repo first [Invoke-Obfuscation](https://github.com/danielbohannon/Invoke-Obfuscation.git)
- Link to GitHub readme page [Invoke-Obfuscation Github](https://github.com/danielbohannon/Invoke-Obfuscation/blob/master/README.md)
- Turn off windows defender real time protection
- Open windows power shell as administrator.
- cd to that cloned folder of repo.
- Try running `Import-Module .\Invoke-Obfuscation.psd1`
- If you get some exception then run this command first then re-run above command.
  - `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted`
- Then run `Ivoke-Obfuscation` in terminal, It will run the tool and open the command.
- Then type `set scriptpath c:\path\to\ps1\script`
- You can check if things are set properly or not using `show options` command.
- Then you can use any type of option to obfuscate it.
  - `TOKEN`
  - `STRING`
  - `ENCODING`
  - `COMPRESS`
- I prefer any one `COMPRESS` option.
- You can use `COPY` command to copy the whole obfuscated code in clipboard.
- We can also use `UNDO` command to undo that code

## Build or compile C sharp file into exe using dotnet SDK

- We will need to require .net SDK tool kit, we can download from microsoft official website.
- `cd` to parent folder where you want to make the build.
- Then run `dotnet new console -n tool_name`
- It will create `tool_name` folder for you.
- Then `cd tool_name` go to that tool_name folder
- Then you can replace or create you C sharp code under `program.cs` file.
- Then run `dotnet build`
- It will update the bin and obj folders, Inside bin folder you will find the .exe file.
- That you can run that exe file with bat file to do that process.
- To add any new package to your management run below command.
  - `dotnet add package System.Management`

## Python files Encryption/Obfuscation

- Install similar version of python matching to houdini python
- Run - `pip install pyarmor`
- Copy the location of pyarmor where it is installed
- And make a command `path/to/pyarmor`, You can also run `where pyarmor` to get the path
- `cd /module/parent/dir`
- `mkdir dist1`
- `cp -a module_name dist1/`
- `path/to/pyarmor gen -O dist1 -i module_name`
- Then copy the module inside dist1 to where you want to run that encrypted files
- Make sure your `pyarmor_runtime_000000` is linked properly in module files
- Its better to keep that outside the mode and modify all the python files to read directly instead of `.pyarmor_runtime_000000`
