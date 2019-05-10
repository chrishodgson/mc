
mongoexport -h <host> -d <db> -u <user> -p <password> -c areas -o areas.json -f _id,name 

mongoexport -h <host> -d <db> -u <user> -p <password> -c challenges -o challenges.json  
-f _id,name,description,countryCode,classificationCode,highestInMetres,lowestInMetres,mountainCount 