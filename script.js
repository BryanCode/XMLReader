const enviarBtn = document.querySelector('.enviar');
const fileInput = document.querySelector('.fileInput');
const searchInput = document.querySelector('.tagName');
const resultDiv = document.querySelector('.resultados');
const resultConsInic = document.querySelector('.consultasIniciais');
const resultProcPrevent = document.querySelector('.procedimentosPreventivos');
const resultEndoConclDentesP = document.querySelector('.dentesPermanentes');
const resultProtesesUnitarias = document.querySelector('.protesesUnitarias');
const resultRaspSupraGengHemi = document.querySelector('.raspagemSupra');
const arrayResults = [resultConsInic, resultProcPrevent, resultEndoConclDentesP, resultProtesesUnitarias, resultRaspSupraGengHemi];
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

enviarBtn.addEventListener('click', () => {
    somarValoresDaTag();
});

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

        let totalConsInic = 0;
        let totalProcPrevent = 0;
        let totalEndoConclDentesP = 0;
        let totalProtesesUnitarias = 0;
        let totalRaspSupraGengHemi = 0;

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

        resultConsInic.textContent = totalConsInic;
        resultProcPrevent.textContent = totalProcPrevent;
        resultEndoConclDentesP.textContent = totalEndoConclDentesP;
        resultProtesesUnitarias.textContent = totalProtesesUnitarias;
        resultRaspSupraGengHemi.textContent = totalRaspSupraGengHemi;

        resultDiv.style.display = 'block';
    };

    reader.readAsText(file); // Inicia a leitura do arquivo
})

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
}

