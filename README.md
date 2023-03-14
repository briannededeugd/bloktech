![phonto 2](https://user-images.githubusercontent.com/92082302/225131845-e6e3e5bd-47ba-4e98-874a-f3ff189835d4.jpg)

# Matchmaking Application: Rhythm Roulette

Welkom bij Rhythm Roulette! Een app die jouw binnen enkele seconden matcht met een lied dat jij nou écht moet ontdekken. Het enige wat jij hoeft te doen is de app laten weten in welke bui jij je bevindt, wat voor elementen (de bassen, de backing vocals, of de instrumenten bijvoorbeeld) je tof vindt in liedjes en in welke taal jij het liefste naar muziek luistert. Dan geeft Rhythm Roulette jou een nieuw lied wat je meteen kan beluisteren.

Blijkt het dat het lied dat jij krijgt toch totaal niet bij jouw opgegeven bui, lievelingselement of taal hoort? Dan kan jij Rhythm Roulette een stukje op weg helpen door linksonderin het scherm het lied helemaal opnieuw te categoriseren, zodat het makkelijker te vinden is voor mensen die er wel aan toe zijn. En daarna kan je natuurlijk gewoon weer opnieuw het supersnelle proces doorlopen. Rhythm Roulette heeft wel vijftien liedjes voor jou om te ontdekken. Dat kan je niet missen!

## Hoe installeer ik deze applicatie?
Open je terminal en voer het volgende in:

`git clone https://github.com/briannededeugd/matching-application/`

Na het klonen is het van belang dat je ook de gebruikte packages kloont. Voer nu in:

`npm install`
`node install`
`node --version`

Om het project op te starten, run je de volgende code:

`npm run dev`

Vervolgens kan je de applicatie openen door in je browser (het liefst Chrome) `localhost:8080` in te typen. En genieten maar :)  
(Supertip: Rhythm Roulette is bedoeld als mobiele app, dus als je eenmaal in Chrome zit, word je aangeraden om `rechtermuisknop`, `inspecteren`, en `device: [any mobile phone]` te kiezen voor de beste experience!)

## Templating View Engine + database
Deze applicatie maakt gebruik van de 'EJS' templating view engine en werkt met Mongoose van MongoDb Atlas, een noSQL database die runt in de cloud.

## License
[Bekijk license](https://github.com/briannededeugd/matching-application/blob/main/LICENSE.md)

## Resources
[Zie mijn hele bronnenlijst in de wiki.](https://github.com/briannededeugd/matching-application/wiki/Resources)
