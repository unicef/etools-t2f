eTools Frontend Template
====================================

Installation
------------

Using git, clone to a local directory:

```bash
$ git clone https://github.com/unicef-polymer/etools-frontend-template.git
```
Assuming node and npm are already installed, make sure bower is also installed, if not run:

```bash
$ npm install -g bower
```
Also install polymer-cli:
```bash
$ npm install -g polymer-cli
```

Install packages:
```bash
$ npm install
$ bower install
```

Build Application
-----------------

To build the distribution version:

```bash
$ gulp
```

We will be using a bundled build since we don't support
HHTP/2 and server push.

Before the build is created the CSS and images are minified,
Javascript is uglifyed, also there are javascript and html hints.
If any of these tasks fail, the entire build process fails.
So correct your code and try again :)

Run Application
---------------

To run the application you can use:

```bash
$ polymer serve
View your app at http://localhost:8080
```
This command will start the server and serve your files directly from app sources.
At this point you do not need to build anything, the files will not be served from build folder.

```bash
$ polymer serve build/bundled
View your app at http://localhost:8080
```
This command will start the server and use the bundled build (build/bundled folder) to serve the files from.
Before you can serve the bundled build you have to generate the build files.
Service worker only works in the built app, so test service worker functionality here.

Additional options for gulp tasks
---------------------------------

Set -l parameter for any gulp task to activate polymer logs during build process

```bash
$ gulp -l
```

Permission Matrix Editor
------------------------

The editor, active only on the branch p-matrix-editor allow users to modify, downoad and temporarily test T2F permission matrix.

Keep in mind that the editor is SLOW and Ugly, it's not a tool for the end user but is the most effective way to fiddle with the complex permission system.

The  editor outputs and accept as an input a YAML file, according to the needs of the backend. but is easy to modify to accept and use JSON instead.

How to use it:

- Once again, be patient while it loads, it needs to inject an awfull amount of element in the dom.
-  Travel Permissions:
-- A list of travel permission role is displayed
-- Clicking a travel role ( ex: Traveler) open a list of status
--- clicking a staus (ex: planned) open the permission matrix.
--- Each field has  two checkkbox:  V and E which enable: view and edit for that  Role-TravelStatus combination.
--- A button with a bin allow to delete  a field WARNING: for consistency the field is deleted across ALL the Permission Matrix travelStatuses
--- A button with a cross (in the header section eg: Activities) allows to add a field,  WARNING: for consistency the field is added across ALL the Permission Matrix travelStatuses

-- Adding  a field modal:
--- This modal permit to choose  a name for the field  ( mandatory )
---  it's possible to choose a field from which to copy the permission (Ex: field Date has V: true E: true, if I choose it as a copy for my new field: Date_Two the field date TWO will be added across all the permission matrix with values: V: true E: true)

-- A button with a plus on the right of Travel Permission allow to add a new fieldset ( example: Expenses) WARNING: for consistency the fieldSet is added across ALL the Permission Matrix roles

- Same concepts apply to Action Points (with limited features due to less complexity)

- In the header is possible to find and use the  following buttons:
-- Download: download the current state of the p-matrix (including any change done in the page)
-- Test: load back the current changes in the  t2f local db, allowing to use the app with the changed matrix ( this is temporary and get reverted using the reload button on the right corner of the app )
- An input field to chose a file
-  An inport button: it will load the chosen YAML file back in the scope.

The YAML file are named with the timestamp of the download for easy  storing of them.

Ultimately this file need to be stored in the backend so the backend can serve it.




