const enviarBtn = document.querySelector('.enviar');
const fileInput = document.querySelector('.fileInput');
const searchInput = document.querySelector('.tagName');
const resultDiv = document.querySelector('.resultados');
const resultConsInic = document.querySelector('.consultasIniciais');
const resultProcPrevent = document.querySelector('.procedimentosPreventivos');
const resultEndoConclDentesP = document.querySelector('.dentesPermanentes');
const resultProtesesUnitarias = document.querySelector('.protesesUnitarias');
const resultRaspSupraGengHemi = document.querySelector('.raspagemSupra');
const resultVidasAtivasGP1 = document.querySelector('.vidasAtivasGP1');
const resultVidasAtivasGP2 = document.querySelector('.vidasAtivasGP2');
const arrayResults = [resultConsInic, resultProcPrevent, resultEndoConclDentesP, resultProtesesUnitarias, resultRaspSupraGengHemi, resultVidasAtivasGP1, resultVidasAtivasGP2];
resultDiv.style.display = 'none';

//NOMES DAS TAGS
/*
    consultasOdontoInic
    procedimentosPrevent
    trataEndoConclDentesP
    protesesOdontoUnitarias
    raspSupraGengHemi
*/

function copyNumber(index) {
    navigator.clipboard.writeText(arrayResults[index].textContent);
    $('.popup').toggleClass('show-popup');
      setTimeout(function() {
        $('.popup').toggleClass('show-popup');
      }, 3000);
}

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contents, 'text/xml');

        const tagsConsInic = xmlDoc.getElementsByTagName('consultasOdontoInic');
        const tagsProcPrevent = xmlDoc.getElementsByTagName('procedimentosPrevent');
        const tagsEndoConclDentesP = xmlDoc.getElementsByTagName('trataEndoConclDentesP');
        const tagsProtesesUnitarias = xmlDoc.getElementsByTagName('protesesOdontoUnitarias');
        const tagsRaspSupraGengHemi = xmlDoc.getElementsByTagName('raspSupraGengHemi');
        const ProcOdontoTags = xmlDoc.getElementsByTagName('procedimentosOdonto');
        const ufs = xmlDoc.getElementsByTagName('uf');

        const uniqueBeneficiariosGP1 = new Set();
        const uniqueBeneficiariosGP2 = new Set();

        let totalConsInic = 0;
        let totalProcPrevent = 0;
        let totalEndoConclDentesP = 0;
        let totalProtesesUnitarias = 0;
        let totalRaspSupraGengHemi = 0;
        let totalVidasAtivasGP1 = 0;
        let totalVidasAtivasGP2 = 0;
        let ufsArr = [];


        for (let i = 0; i < ufs.length; i++) {
            const uf = ufs[i].textContent;
                ufsArr.push(uf);
            
        }

        for (let i = 1; i < tagsRaspSupraGengHemi.length; i++) {
            const eventos = tagsRaspSupraGengHemi[i].querySelector('beneficiarios');
            if (eventos) {
                const valor = parseInt(eventos.textContent);
                if (!uniqueBeneficiariosGP2.has(valor)) {
                    uniqueBeneficiariosGP2.add(valor);
                    totalVidasAtivasGP2 += valor;
                }
            }
        }

        for (let i = 1; i < ProcOdontoTags.length; i++) {
            const eventos = ProcOdontoTags[i].querySelector('beneficiarios');
            if (eventos) {
                const valor = parseInt(eventos.textContent);
                if (!uniqueBeneficiariosGP1.has(valor)) {
                    uniqueBeneficiariosGP1.add(valor);
                    totalVidasAtivasGP1 += valor;
                }
            }
        }

        for (let i = 1; i < tagsConsInic.length; i++) {
            const eventos = tagsConsInic[i].querySelector('eventos');
            if (eventos) {
                totalConsInic += parseInt(eventos.textContent);
            }
        }

        for (let i = 1; i < tagsProcPrevent.length; i++) {
            const eventos = tagsProcPrevent[i].querySelector('eventos');
            if (eventos) {
                totalProcPrevent += parseInt(eventos.textContent);
            }
        }

        for (let i = 1; i < tagsEndoConclDentesP.length; i++) {
            const eventos = tagsEndoConclDentesP[i].querySelector('eventos');
            if (eventos) {
                totalEndoConclDentesP += parseInt(eventos.textContent);
            }
        }

        for (let i = 1; i < tagsProtesesUnitarias.length; i++) {
            const eventos = tagsProtesesUnitarias[i].querySelector('eventos');
            if (eventos) {
                totalProtesesUnitarias += parseInt(eventos.textContent);
            }
        }

        for (let i = 1; i < tagsRaspSupraGengHemi.length; i++) {
            const eventos = tagsRaspSupraGengHemi[i].querySelector('eventos');
            if (eventos) {
                totalRaspSupraGengHemi += parseInt(eventos.textContent);
            }
        }


        resultVidasAtivasGP2.textContent = totalVidasAtivasGP2;
        resultVidasAtivasGP1.textContent = totalVidasAtivasGP1;
        resultConsInic.textContent = totalConsInic;
        resultProcPrevent.textContent = totalProcPrevent;
        resultEndoConclDentesP.textContent = totalEndoConclDentesP;
        resultProtesesUnitarias.textContent = totalProtesesUnitarias;
        resultRaspSupraGengHemi.textContent = totalRaspSupraGengHemi;
        console.log(ufsArr);

        resultDiv.style.display = 'block';
    };

    reader.readAsText(file); // Inicia a leitura do arquivo
})

/*
enviarBtn.addEventListener('click', () => {
    somarValoresDaTag();
});
*/

/*
function somarValoresDaTag() {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contents, 'text/xml');

        const tagName = searchInput.value;

        const tags = xmlDoc.getElementsByTagName(tagName);

        let total = 0;

        for (let i = 1; i < tags.length; i++) {
            const eventos = tags[i].querySelector('eventos');
            if (eventos) {
                console.log(eventos.textContent);
                const valor = parseInt(eventos.textContent);
                total += valor;
            }
        }

        alert('Total: ' + total);

    };

    reader.readAsText(file); // Inicia a leitura do arquivo
}*/

