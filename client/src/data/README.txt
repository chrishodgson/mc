
mongoexport -h <host> -d <db> -u <user> -p <password> -c areas -f _id,name -o areas.json

mongoexport -h <host> -d <db> -u <user> -p <password> -c challenges -f _id,title,description,countryCode,classificationCode,highestInMetres,lowestInMetres,mountainCount -o challenges.json 