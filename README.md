# !Note! this is a work-in-progress, and shouldn't be used yet.

new structure starts with index.js, with modules in /cmds

# qmanage

> the QLab Manager

a suite of command line functions to facilitate an easier and more consistent QLab project management.

# ToC

1. Folder Structure
2. Functions
  1. init
  2. sessions
  3. clean
  4. timestamp
  5. report
  6. archive

---

## Folder Structure

* [*Project Name*]
  * .**config.yaml**
  * Assets
      * .scripts
          * **makeAudioList_qlab.scpt**
          * **makeProjectionList_qlab.scpt**
      * (Audio)
          * Pre/Int/Post
          * Show
      * (Projection)
  * Documentation
  * Sessions
      * previousSessions
          * <1.0.0
          * tech
  * Times

---

# Functions

> 1. init
2. sessions
3. clean
4. timestamp
5. report
6. archive

## 1. init ( i )

init - creates a new project folder w/ everything set up

* **flags:** none

**Questions:**

1. Name of Project/Show/etc. (mandatory) *Project Name*
2. Number of Sections/Acts/etc. (default: 2)
3. Preshow? *Pre* (default: Yes)
4. Postshow? *Post* (default: Yes)
5. Intermission(s)? *Int* (default: Yes)
6. Stage Manager/Contact Name *SM Name*
7. Stage Manager/Contact Email Address *SM Email*
8. Sender Email address *Sender*
9. Audio, Projections, or Both (default: Audio)

**Confirm selections**

*Resulting .qmanage.yaml file:*

```json

project: *Project Name*
email:
    name: *SM Name*
    address: *SM Email*
sender: *Sender*
labels:
    - *Pre*?
    - Section1
    - *Int*?
    - SectionN?
    - *Post*?

```

**Usage:**

* Start a new project, creating a project folder and `./.config.yaml` file

```
qmanage > init
```

---

## 2. sessions ( s )

Organizes the `./sessions` folder, moving all but the most recent QLab session file to a given subfolder in `./sessions/previousSessions`.

* **flags**:

> full | short | folder
> ---|---|---
—sub-one | -s	| “/previousSessions/<1.0.0”
—tech | -t | “/previousSessions/tech”
default (no flags) |  | “/previousSessions”

**Usage:**

* Move all but most recent qlab session file into the "./sessions/previousSessions" folder


```
qmanage > sessions
Old sessions moved
```

* Move all but most recent qlab session into the "./sessions/previousSessions/<1.0.0" folder

```
qmanage > sessions -s
Old sessions moved
```

---

## 3. clean ( c )

Deletes files not being used by the project from the given folder

* **flags**:

> full | short | folder(s)
> ---|---|---
—audio | -a | “/Assets/Audio”
—projection | -p | “/Assets/Projection”
default (no flags) |  | *create menu to select between options*

**Usage:**

* Delete unused files in Both The Audio and Projection folders within "./Assets"

```
$ qmanage cleanfolder -ap
Audio and Projection cleaned
```
* Open a select menu to select between "./Assets/Audio", "./Assets/Projection", or both

```
$ qmanage f
```

---

## 4. timestamp ( t )

Timestamps a list of labels fired from qlab. labels come from `.config.json`, if not provided.

* **flags**:

> full | short | description
> ---|---|---
—label | -l | Save a timestamp with the `label` provided

**Usage:**

* Add a timestamp using the next label from the .config.json file to `./.tmp/_timestamp.txt`

```
qmanage > timestamp
Captured
```
* Add a timestamp with provided `label` to `./.tmp/_timestamp.txt`

```
qmanage > timestamp -l "Curtain Speech"
Captured
```

---

## 5. report ( r )

Creates report from temp file of timestamps and prints it to stdout, unless flags send it to disk of via email.

* **flags**:

> full | short | description
> ---|---|---
—email | -e | Send email to stage manager
—address | -a | Also email to given address. will implicitly send to stage manager
—save | -s | Save report to disk

**Usage:**

* Generate time report, emailing to stage manager and saving report to disk

```
qmanage > report -e -s
Report sent and saved
```
* Generate time report, emailing to stage manager and provided `address`

```
qmanage > report -a "anotheremail@domain.com"
Report sent
```

---

## 6. archive ( a )

Cleans project folders, then zips project for storage.

* **flags**: none

**Usage:**

* Archives Project

```
$ qmanage archive
$ qmanage a
Project Archived
```
