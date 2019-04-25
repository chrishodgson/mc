

### MVP - remaining

Styling - use bootstrap as stop gap

Import
- add mountain count, highest and lowest to mountainList
- delete database and re-run import 
- remove the savecounties

Add Challenge API
- add challenge to users

Add Challenge Screen
- page listing challenges with add challenge buttons
- add challenge page

View Challenge API
- restrict by user

Get MountainList API
- return list of mountains

View Challenge Screen
- show % complete, mountains climbed, mountains not climbed
- use Get MountainList API

Dashboard
- list challenges with % complete 
- list mountains climbed grouped by activity

Add Activity API
- add activity to users
- add mountains to activity

Add Activity Screen
- Selecting mountains either by:
    - Listing mountains (couhtry & area required)
    - Searching by mountain name (couhtry required)
- default values (00) for hours and minutes 
- add suffixes hrs and mins
- add hours and minutes specific renderers in Field component
- use library for formatting dates and hours/minutes from database
- form validation of date, mins and hours


---

### Post MVP

Database optimisation - add indexes

Styling - custom theme

Login - via Facebook / Create an Account on site

Users - add users to challenge / activity

Photos - add instagram images to activity

Mapping - show mountains as selected on a map

Mapping - add route to map 


---

### Spikes

- find mountains by proximity to a grid ref (maths required)

- auto zoom to fit map to markers on OS map
  https://www.ordnancesurvey.co.uk/forums/discussion/1001031/zoom-level-to-accommodate-loaded-markers
