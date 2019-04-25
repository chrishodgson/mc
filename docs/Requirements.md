
### Launch

Possibly launch with wainwright and outlying fells lists only then enable more mountain lists later ?


### High Level Requirements 

purpose: log mountains climbed as part of a challenge or a simple activity log

screens: 
- add challenge - select from mountain lists
- view challenge - show % completed, list mountains climbed by date, list mountains remaining   
- add activity - select mountains climbed with filters on name, country, area
- dashboard - list mountains grouped by activity date, list challenges with % complete 


### Detailed Requirements: 

Import mountains: 
----
use following criteria

1. Country codes: England E, Scotland S and Wales W

2. classification codes 
* Munro M - Scottish 3000ft+ (282)
* Corbett C - Scottish 2500-2900ft (222)
* Graham G - Scottish 2000-2499ft (219)
* Furth F - English & Welsh 3000ft+ (21)
* Simm Sim - All 600m+ (1968.5ft+) (2307)	

* Synge Sy - Lakes list 300m+ (647)
* Fellranger Fel - Lakes list (227)
* Birkett B - Lakes list 304m+ / 1000ft+ (541)
* Wainwright W - Lakes list 1000ft+ (214)
* Wainwright Outlying Fell WO - Lakes list (116)

3. Create 12 mountain lists :
- munroes, corbetts, grahams, furths, synges, fellrangers, birketts, wainwrights, wainwright outlying 
- separate english / scottish / welsh simms 

Dashboard
----
list challenges with % complete
list recent activities - list mountains grouped by activity date

Add Challenges
----
simple table listing challenges with add button showing confirmation page  

View Challenge
----
show % completed, list mountains climbed by date, list mountains remaining   

Add Activity 
----
Select mountains, enter hours, minutes, date, title, notes 
Selecting mountains either by:
- Listing mountains (couhtry & area required)
- Searching by mountain name (couhtry required)


### Data modeling

Collections:
- user: name, admin, googleId, _challenges, _activities
- mountain: dobihId, name, gridref, easting, northing, metres, countryCode, _areas, _mountainLists
- mountainList: name, desc, mountain count, classificationCode, countryCode, _mountains
- activity: name, desc, mountain count, hours, minutes, start date, _users, _mountains
- challenge: name, desc, outstanding count, completed count, _users, _completedMountains, _outstandingMountains
- area: name, countrycodes 
