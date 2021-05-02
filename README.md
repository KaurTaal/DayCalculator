# Kasutatud vahendid

- **Vue** - raamistik
- **Vuetify** - kujundus
- **OpenLayers** - kaarti implementeerimine
- **Echarts** - diagrammi kuvamine
- **SunCalc** - arvutuste tegemine
- **i18n** - tõlkimine
- **Font Awesome** - ikoonid
- **GitHub pages** - veebilehe ülespanemine




# Kokkuvõte

Lehe ehitamist alustasin 19.aprillil ja arendamise lõpetasin 1.mail. Tööd tegin pea iga päev ning päevas kulutasin keskmiselt 4 tundi lehe arendamisele. Esmalt tegin esialgse plaani, mille järgi hakkasin veebilehte tegema. Arendamise käigus lisasin jooksvalt ideid juurde ja samas muutsin ka kujundust. 

Arendamiseks kasutasin Vue raamistikku, sest olen varasemalt sellega juba kokku puutunud. Lisaks teadsin ka, et Vue võimaldab kasutada Vuetifyd, mis oli kogu arendamise käigus suureks abiks. Lehel kasutatavad tekstiväljad, nupud ja kalendrid võtsin Vuetifyst ja muutsin neid sobiva stiiliga. Seega oli kalkulaatori kujundust üsna lihtne teha. Rohkem raskusi valmistas aga arvutused ise. Arvasin, et kõige parem oleks andmeid pärida tasuta andmebaasist, sest sealsed andmed oleksid üsna täpsed. Pärimisega tekkis aga probleem diagrammi juures, sest mu päringute limiit sai täis ning mul polnud enam võimalik valitud andmebaasist päringuid teha. Pärast mõnda aega otsimist avastasin mooduli “SunCalc”, mille abil sain vajalikud arvutused tehtud. Ainsaks miinuseks oli, et vastused erinesid tegelikkusest umbes 3 minutit. SunCalc arvutused põhinevad Astronomy Answers artiklite põhjal.

Otsustasin rakenduse jaoks kasutada OpenLayers kaarti. Alguses proovisin naiivselt kasutada ka Google Mapsi, aga peagi sain aru, et selle eest tuleks maksta. Mul pole varasemalt kokkupuudet kaardi implementeerimisega olnud, mistõttu oli algul natuke raske aru saada, kuidas kaart täpsemalt töötab. Näidete vaatamise ja katsetamise käigus sain aru, et kaart kasutab erinevaid kihte. Kui aga õppisin kihte tegema, siis muutus kaardi arendamine lihtsamaks. Arvan, et minu jaoks kõige raskem oligi kaardiga töötamine. Üsna tihti tekkis probleeme markeri kuvamise ja liigutamisega, mille parandamine võttis üsna palju aega. 

Diagrammi jaoks kasutasin Apache Echartsi valmis tehtud komponente. Diagrammi implementeerimine läks üsna sujuvalt. Seda enamasti Apache Echartsi kergesti jälgitava dokumentatsiooni pärast. Ütleks, et tulemuste kuvamine sobival kujul võttis diagrammi juures kõige rohkem aega. Diagrammile lisasin ka võimaluse tulemusi Exceli failina alla laadida. Exceli faili nimeks otsustasin panna vastava asukoha nime. Asukoha nime saamiseks otsustasin teha päringu avalikku andmebaasi. 

Viimaseks otsustasin oma rakenduse ka avalikuks teha. Panin loodud veebilehe üles GitHub lehele. Veebirakenduse nägemiseks vajutage [siia](https://kaurtaal.github.io/DayCalculator/).



# Edasiarenduse mõtted

Projekti saaks kindlasti veel paremaks ja stiilsemaks muuta. Hetkel on rakendust võimalik mugavalt kasutada ainult läbi arvuti. Tulevikus oleks võimalik rakendus ka kasutuskõlblikuks teha mobiilide jaoks. Selleks tuleks stiili muuta, et kõik komponendid võtaksid sobiva asukoha ja suuruse. Lisaks oleks võimalik kasutusele võtta täpsemad arvutused. Hetkel jäi silma moodul nimega “MeeusJs”, kommentaaride põhjal on see moodul täpsem kui “SunCalc”. Teine võimalus oleks arvutused ise teha kasutades NASA lehelt saadavat valemit. 
