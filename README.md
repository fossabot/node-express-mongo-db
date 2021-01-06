# Node, Express and MongoDB

[![Greenkeeper badge](https://badges.greenkeeper.io/alpersonalwebsite/node-express-mongo-db.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/alpersonalwebsite/node-express-mongo-db.svg?branch=master)](https://travis-ci.com/alpersonalwebsite/node-express-mongo-db)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)


`Node + Express` (locally) connecting, querying, parsing and retrieving to /x endpoint *22 users* from an external sever (`mLab`).

## Installation
```
npm install
```
## Running the server

### Development
```
npm run dev
```

### Production
```
npm start
```

## API endpoints or routes 

### Home or / 
Returns: `object`
```
{
    "message": "Node.js, Express, and MongoDB API!"
}
```
### Users or /users
Returns: 1000 records - `array of objects`
```json
[
    {
        "_id": 0,
        "index": 0,
        "guid": "3f049239-fc26-4ec0-9a15-c36bc9f78e21",
        "isActive": true,
        "age": 38,
        "name": "Frances",
        "lastname": "Tyler",
        "gender": "female",
        "company": "FROLIX",
        "email": "francestyler@frolix.com",
        "phone": "+1 (957) 595-3029",
        "address": "261 Jefferson Avenue, Terlingua, Kentucky, 8445"
    },
    {
        "_id": 1,
        "index": 1,
        "guid": "21491c1e-3c76-490a-8ed8-3769a2aa4447",
        "isActive": true,
        "age": 33,
        "name": "Coleman",
        "lastname": "Kemp",
        "gender": "male",
        "company": "POLARIA",
        "email": "colemankemp@polaria.com",
        "phone": "+1 (958) 454-2237",
        "address": "815 Fairview Place, Machias, Minnesota, 6497"
    }
    ...
    ...
    ...
]
```

#### Query string parameters

**Limit users**

Returns `n` record(s) where `n` is the value (type: Number) of the `limit` key.

Example: `users?limit=1`

Result
```json
[
    {
        "_id": 0,
        "index": 0,
        "guid": "3f049239-fc26-4ec0-9a15-c36bc9f78e21",
        "isActive": true,
        "age": 38,
        "name": "Frances",
        "lastname": "Tyler",
        "gender": "female",
        "company": "FROLIX",
        "email": "francestyler@frolix.com",
        "phone": "+1 (957) 595-3029",
        "address": "261 Jefferson Avenue, Terlingua, Kentucky, 8445"
    }
]
```

Wrong type for `n` value will return *all the users*.
Example: `users?limit=%27Hello%27`

**Setting offset**

Returns from `n` (PRIMARY KEY) where `n` is the value (type: Number) of the `offset` key.

Example: `users?offset=10`

Result:
```json
[
    {
        "_id": 10,
        "index": 10,
        "guid": "8f27a843-f873-496e-a65c-e92f951c7309",
        "isActive": false,
        "age": 22,
        "name": "Olive",
        "lastname": "Holman",
        "gender": "female",
        "company": "XUMONK",
        "email": "oliveholman@xumonk.com",
        "phone": "+1 (851) 470-3513",
        "address": "960 Pulaski Street, Malott, Virginia, 6802"
    },
    {
        "_id": 11,
        "index": 11,
        "guid": "297c956a-9372-4259-8687-0b9d6827586b",
        "isActive": true,
        "age": 25,
        "name": "Craig",
        "lastname": "Holloway",
        "gender": "male",
        "company": "SURELOGIC",
        "email": "craigholloway@surelogic.com",
        "phone": "+1 (996) 546-3352",
        "address": "626 Oxford Walk, Jacksonwald, Washington, 9040"
    }
  ...
  ...
  ...
]
```


### Latency or /latency
Returns: `object`
```
{
    "response": "Thanks for waiting 4 seconds"
}
```

#### Query string parameters

**Changing delay**

Increase latency (delay) to `n` milliseconds where, *min:1000* and *max:4000*. Default value: 1000ms.
Returns `n` record(s) where `n` is the value (type: Number) of the `limit` key.

Example: `latency?delay=2000`

Result
```
Thanks for waiting 2 seconds
```

Wrong type for `n` value will produce a default delay of 1000ms.

--- 

## Migrating from mLab to MongoDB Atlas

Since `mLab` was acquired by `MongoDB`, we have been forced to migrate our databases to `MongoDB Atlas`.

So... Here's an easy and brief tutorial to do so.

1. Create a [MongoDB Atlas account](https://mongodb.com/cloud/atlas) 
During the process create an `organization`, example: `MyOrganization`
1. Create a new `project`, example: `project1`. *Note:* Clusters are stored in Atlas projects, each of which live underneath an Atlas organization.
1. On the top left, next to your organization name, `MyOrganization` **click on the the gears icon**
1. Click on `Connect to mLab`
1. Log into your `mLab account`
1. Click on `Authorize` 
1. You will be redirected to your `MongoDB Atlas account` and you should be seeing your `mLab` deployments.
1. For each deployment, click on the `...` (under actions) and click on `Configure Migration`
1. Click on `Create or Select Target Project`
1. Select your project, `project1` and click on `Confirm Project and Continue`
1. On the `Import Database Users`, keep everything as it is and click on `Import Database Users and Continue`
1. On `Import Whitelist Entries` click on `Confirm and Continue`
1. On `Create or Select Target Cluster` you can select a previous cluster or, pick `Create most equivalent new cluster` (we are going to choose this option). Then, click on `Confirm Target and Continue`

*Note:* If you have a free plan and you want to create a new cluster, you will need to create a `new project`, then go to `settings` (gears icon), select `mLab Account` tab and re-start for clicking on `...`. Click on `Configure Migration`.

I will assume this is your case, since it is just a little more complex.

<img src="images/atlas-cluster-limits.png"
  alt="Error Target Cluster" 
  style="" />

14. Now, we need to go back to `Target Project`. So click on `Change Target Project` and select your new project name, example: `project2`. Then, `Confirm Project and Continue`.
1. Click on `Change Target Cluster` and select `Create most equivalent new cluster`. Then, click on `Confirm Target and Continue`.

<img src="images/atlas-cluster-limits-fix.png"
  alt="Fix for Error Target Cluster" 
  style="" />

Great job! We can start now with the **Migration**

16. Click on `Confirm Source and Target`. Then, `Continue and Continue`.
1. On the `Test Run` screen click on `Begin Test Run` (this is not mandatory, but highly advisable).
1. After the `Test Migration` is done, click on `Confirm Connectivity` and then, `Confirm and Continue`
1. On `Review Migration Process and Begin`, check the box `I understand that clicking "Begin Migration" will set the database user...` and click on `Begin Migration`.
1. Click on `Start Using Atlas`. Then, click on `I'm Done`.
1. Now, you can finish deleting your `mLab Deployment`. Check the box `I will confirm that my application is working as expected on my new Atlas cluster before deleting the source mLab database via mLab's UI.` and click on `Confirm and Close`.

<img src="images/atlas-migration-done.png"
  alt="Atlas migration done" 
  style="" />

Now, we are going to set **Network Access**

22. Go to your Project, example `project1`, then, under SECURITY click on `Network Access`
1. Click on `Add IP Address`
1. Click on `ALLOW ACCESS FROM ANYWHERE` (I have dummy data, in your case, probably, you will want to be more restrictive). Then, click on `Confirm` and wait until changes are *deployed*.

Now, we are going to set `Database Access`

25. Go to your Project, example `project1`, then, under SECURITY click on `Database Access`
1. Click on `Add New Database User`
1. I will use regular user/password pattern (in this case, select `password`).
1. Under `Password Authentication` type first the `username` and then the `password`
1. In my case, I will keep everything as default and click on `Add User`.
