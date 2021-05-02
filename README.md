# Kasutatud tehnoloogiad
- **Vue** - front-end javascript raamistik
- **Vuetify** - valmis Vue komponendid
- **OpenLayers** - avatud lähtekoodiga JavaScripti teek kaardi kuvamiseks
- **Echarts** - graafikute ja andmete visualiseerimise teek
- **SunCalc** - moodul päikesetõusu ja loojangu arvutamiseks
- **i18n** - keele vahetamine
- **Font Awesome** - fondi ja ikooni tööriistakomplekt
- **GitHub pages** - veebilehe host
- **JUnit** - testimisraamistik
- **GitHub actions** - ehitamiste ja testide automaatne jooksutamine

### Veebileht
 Veebirakenduse nägemiseks vajutage [siia](https://kaurtaal.github.io/DayCalculator/).


# Kokkuvõte
Lehe ehitamist alustasin 19.aprillil ja arendamise lõpetasin 1.mail. Tööd tegin pea iga päev ning päevas kulutasin keskmiselt 4 tundi lehe arendamisele. Esmalt tegin esialgse plaani, mille järgi hakkasin veebilehte tegema. Arendamise käigus lisasin jooksvalt ideid juurde ja samas muutsin ka kujundust. 

Arendamiseks kasutasin Vue raamistikku, sest olen varasemalt sellega juba kokku puutunud. Lisaks teadsin ka, et Vue võimaldab kasutada Vuetifyd, mis oli kogu arendamise käigus suureks abiks. Lehel kasutatavad tekstiväljad, nupud ja kalendrid võtsin Vuetifyst ja lisasin neile sobiva stiili. Seega oli kalkulaatori kujundust üsna lihtne teha. Rohkem raskusi valmistas aga arvutused. Arvasin, et kõige parem oleks andmeid pärida tasuta andmebaasist, sest sealsed andmed oleksid üsna täpsed. Pärimisega tekkis aga probleem diagrammi juures, sest mu päringute limiit sai täis ning mul polnud enam võimalik valitud andmebaasist päringuid teha. Pärast mõnda aega otsimist avastasin mooduli “SunCalc”, mille abil sain vajalikud arvutused tehtud. Ainsaks miinuseks oli, et vastused erinesid tegelikkusest umbes 3 minutit. SunCalc arvutused põhinevad Astronomy Answers artiklite põhjal.

Otsustasin rakenduse jaoks kasutada OpenLayers kaarti. Alguses proovisin naiivselt kasutada Google Mapsi, aga peagi sain aru, et selle eest tuleks maksta. Mul pole varasemalt kokkupuudet kaardi implementeerimisega olnud, mistõttu oli algul natuke raske aru saada, kuidas kaart täpsemalt töötab. Näidete vaatamise ja katsetamise käigus sain aru, et kaart kasutab erinevaid kihte. Kui õppisin kihte tegema, siis muutus kaardi arendamine lihtsamaks. Arvan, et minu jaoks kõige raskem oligi kaardiga töötamine. Üsna tihti tekkis probleeme markeri kuvamise ja liigutamisega, mille parandamine võttis üsna palju aega. 

Diagrammi jaoks kasutasin Apache Echartsi valmis tehtud komponente. Diagrammi implementeerimine läks üsna sujuvalt. Seda enamasti Apache Echartsi kergesti jälgitava dokumentatsiooni tõttu. Ütleks, et tulemuste kuvamine sobival kujul võttis diagrammi juures kõige rohkem aega. Diagrammile lisasin ka võimaluse tulemusi Exceli failina alla laadida. Exceli faili nimeks otsustasin panna vastava asukoha nime. Asukoha nime saamiseks otsustasin teha päringu avalikku andmebaasi. 

Lõpuks otsustasin oma rakenduse ka avalikuks teha. Panin loodud veebilehe üles GitHub lehele, mida saab näha [siin](https://kaurtaal.github.io/DayCalculator/).

# Edasiarenduse mõtted
Projekti saaks kindlasti paremaks ja stiilsemaks muuta. Hetkel on rakendust võimalik mugavalt kasutada ainult läbi arvuti. Tulevikus oleks võimalik rakendus teha kasutuskõlblikuks ka mobiilide jaoks. Selleks tuleks komponentide stiili muuta, et kõik komponendid võtaksid sobiva asukoha ja suuruse. Lisaks oleks võimalik kasutusele võtta täpsemad arvutused. Hetkel jäi silma moodul nimega “MeeusJs”, kommentaaride põhjal on see moodul täpsem kui “SunCalc”. Teine võimalus oleks arvutused ise teha kasutades NASA lehelt saadavat valemit. 
