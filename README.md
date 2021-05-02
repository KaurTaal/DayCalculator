# Kasutatud tehnoloogiad
- **Vue** - front-end Javascript raamistik
- **Vuetify** - valmis Vue komponendid
- **OpenLayers** - avatud lähtekoodiga JavaScripti teek kaardi kuvamiseks
- **Echarts** - graafikute ja andmete visualiseerimise teek
- **SunCalc** - moodul päikesetõusu ja loojangu arvutamiseks
- **i18n** - keele vahetamine
- **Font Awesome** - fondi ja ikooni tööriistakomplekt
- **BigDataCloud tasuta API** - koordinaatide geokodeerimine asukohaks
- **GitHub pages** - veebilehe host
- **JUnit** - testimisraamistik
- **GitHub actions** - ehitamiste ja testide automaatne jooksutamine

### Veebileht
 Veebirakenduse nägemiseks vajutage [siia](https://kaurtaal.github.io/DayCalculator/).


# Kokkuvõte
Lehe ehitamist alustasin 19.aprillil ja arendamise lõpetasin 1.mail. Tööd tegin pea iga päev ning päevas kulutasin keskmiselt 4 tundi lehe arendamisele. Esmalt tegin esialgse plaani, mille järgi hakkasin veebilehte tegema. Arendamise käigus lisasin jooksvalt ideid juurde ja samas muutsin ka kujundust. 

Arendamiseks kasutasin Vue raamistikku, sest olen varasemalt sellega juba kokku puutunud. Lisaks teadsin ka, et Vue võimaldab kasutada Vuetifyd, mis oli kogu arendamise käigus suureks abiks. Lehel kasutatavad tekstiväljad, nupud ja kalendrid võtsin Vuetifyst ja lisasin neile sobiva stiili. Seega oli kalkulaatori kujundust üsna lihtne teha. Rohkem raskusid valmistasid aga arvutused. Arvasin, et kõige parem oleks andmeid pärida tasuta API-st, sest sealt saadud andmed olid üsna täpsed. Andmeid kontollisin [Earth System Research Laboratories](https://www.esrl.noaa.gov/gmd/grad/solcalc/) poolt loodud kalkulaatoriga.  Päringute saatmisega tekkis aga probleem diagrammi juures. Nimelt sai API poolt määratud päringute limiit kiirelt täis, kui valida pikk periood. Pärast mõnda aega otsimist avastasin mooduli “SunCalc”, mille abil sain vajalikud arvutused tehtud. Ainsaks miinuseks oli, et vastused erinesid eelnevalt mainitud ESRL kalkulaatori vastustega umbes 3 minutit. SunCalc arvutused põhinevad [Astronomy Answers](https://www.aa.quae.nl/en/reken/zonpositie.html) artiklite põhjal.

Otsustasin rakenduse jaoks kasutada OpenLayers kaarti. Alguses proovisin naiivselt kasutada Google Mapsi, aga peagi sain aru, et selle eest tuleks maksta. Mul pole varasemalt kokkupuudet kaardi implementeerimisega olnud, mistõttu oli algul natuke raske aru saada, kuidas kaart täpsemalt töötab. Näidete vaatamise ja katsetamise käigus sain aru, et kaart kasutab erinevaid kihte. Kui õppisin kihte tegema, siis muutus kaardi arendamine lihtsamaks. Arvan, et minu jaoks kõige raskem oligi kaardiga töötamine. Üsna tihti tekkis probleeme markeri kuvamise ja liigutamisega, mille parandamine võttis üsna palju aega. 

Diagrammi jaoks kasutasin Apache Echartsi valmis tehtud komponente. Diagrammi implementeerimine läks üsna sujuvalt. Seda enamasti Apache Echartsi kergesti jälgitava dokumentatsiooni tõttu. Ütleks, et graafiku disainimine võttis diagrammi juures kõige rohkem aega. Diagrammile lisasin ka võimaluse tulemusi Exceli failina alla laadida. Exceli faili nimeks otsustasin panna vastava asukoha nime. Asukoha nime saamiseks teeb rakendus päringuid tasuta API-sse, kus geokodeeritakse koordinaadid ja tagastatakse asukoha kohta käiv informatsioon, sealhulgas kohanimi.

Lõpuks otsustasin oma rakenduse ka avalikuks teha. Panin loodud veebilehe üles GitHub lehele, mida saab näha [siin](https://kaurtaal.github.io/DayCalculator/).

# Edasiarenduse mõtted
Projekti saaks kindlasti paremaks ja stiilsemaks muuta. Hetkel on rakendust võimalik mugavalt kasutada ainult läbi arvuti. Tulevikus oleks võimalik rakendus teha kasutuskõlblikuks ka mobiilide jaoks. Selleks tuleks komponentide stiili muuta, et kõik komponendid võtaksid sobiva asukoha ja suuruse. Lisaks oleks võimalik kasutusele võtta täpsemad arvutused. Hetkel jäi silma moodul nimega “MeeusJs”, kommentaaride põhjal on see moodul täpsem kui “SunCalc”. Teine võimalus oleks arvutused ise teha kasutades NASA lehelt saadavat valemit. 
